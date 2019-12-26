import React, { useState } from 'react';
import AppDesigner from '../../dist';
import AppRenderer from '../../../apd-renderer/dist'
import { connect } from 'dva';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
const { TabPane } = Tabs;

const demoData = [
  { type: 'canvas', id: 'workorder', title: '画布', detail: {modelName:'workorder'} },
  { type: 'datasrc', parentId: 'workorder', id: 'canvas_datasrc1', title: '数据源', detail: {modelName:'equipment',whereClause:'woNum := woNum and status=1'} },

  { type: 'tabgroup', parentId: 'workorder', id: 'canvas_tabgroup1', title: '标签组', detail: { isMain:true }},
  { type: 'tab', parentId: 'canvas_tabgroup1', id: 'canvas_tabgroup1_tab1', title: '标签', detail: { label: '列表',type:'list',icon:'arrow-left'}},
  { type: 'table', parentId: 'canvas_tabgroup1_tab1', id: 'canvas_tabgroup1_tab1_table1', title: '表格',
    detail: { label: '',isMain: true }},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab1_table1', id: 'canvas_tabgroup1_tab1_table1_col1', title: '表格列',
    detail: { label: '工单编号',dataAttribute:'woNum',event:'selectRecord'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab1_table1', id: 'canvas_tabgroup1_tab1_table1_col2', title: '表格列',
    detail: { label: '工单描述',dataAttribute:'desc'}},

  { type: 'tab', parentId: 'canvas_tabgroup1', id: 'canvas_tabgroup1_tab2', title: '标签', detail: { label: '详情',type:'insert'}},
  { type: 'sectionrow', parentId: 'canvas_tabgroup1_tab2', id: 'canvas_tabgroup1_tab2_row1', title: '行', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab2_row1', id: 'canvas_tabgroup1_tab2_row1_col1', title: '列', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab2_row1', id: 'canvas_tabgroup1_tab2_row1_col2', title: '列', detail: {}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab2_row1_col1', id: 'canvas_tabgroup1_tab2_row1_col1_text1', title: '文本框',
    detail: {label:'工单编号',dataAttribute: 'woNum'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab2_row1_col1', id: 'canvas_tabgroup1_tab2_row1_col1_text2', title: '文本框',
    detail: {label:'工单描述',dataAttribute: 'desc'}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup1_tab2_row1_col2', id: 'canvas_tabgroup1_tab2_row1_col2_btn1', title: '按钮',
    detail: {label:'测试事件',event: 'dialogOpen',value:'selectEQ'}},
  { type: 'section', parentId: 'canvas_tabgroup1_tab2', id: 'canvas_tabgroup1_tab2_section1', title: '区域', detail: {}},
  { type: 'table', parentId: 'canvas_tabgroup1_tab2_section1', id: 'canvas_tabgroup1_tab2_section1_table1', title: '表格',
    detail: { label: '关联装备',objName: 'assocEQ',pageSize: 5}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_col1', title: '表格列',
    detail: { label: '装备编号',dataAttribute:'eqNum'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_col2', title: '表格列',
    detail: { label: '装备描述',dataAttribute:'desc'}},
  { type: 'buttongroup', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_bg1', title: '按钮组',detail: {label:'',}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup1_tab2_table1_bg1', id: 'canvas_tabgroup1_tab2_table1_bg1_btn1', title: '按钮',
    detail: {label:'选择装备',event: 'dialogOpen',value:'selectEQ'}},

  { type: 'dialog', parentId: 'workorder', id: 'canvas_dialog1', title: '对话框', detail: { dialogId: 'selectEQ',label: '选择装备', width: 600}},
  { type: 'table', parentId: 'canvas_dialog1', id: 'canvas_dialog1_table_EQ', title: '表格',
    detail: { label: '',dataSrc: 'canvas_datasrc1',pageSize:5}},
  { type: 'tablecol', parentId: 'canvas_dialog1_table_EQ', id: 'canvas_dialog1_table_EQ_col1', title: '表格列',
    detail: { label: '装备编号',dataAttribute:'eqNum',event:'toggleRecord'}},
  { type: 'tablecol', parentId: 'canvas_dialog1_table_EQ', id: 'canvas_dialog1_table_EQ_col2', title: '表格列',
    detail: { label: '装备描述',dataAttribute:'desc'}},
  { type: 'pushbutton', title: '按钮', id: 'canvas_dialog1_btn2', parentId: 'canvas_dialog1',
    detail: { label: '取消',event: 'dialogClose' }},
];

const AppDemo = ({dispatch,model}) => {
  const [widgets,setWidgets] = useState(demoData);
  const events = {
    fetch: (modelName,pagination,filter,sorter) => {
      dispatch({type:`${modelName}/find`,payload: {pagination,filter,sorter}});
    },
    fetchTable: (modelName,objName,pagination,filter,sorter) => {
      dispatch({type:`${modelName}/findOneList`,payload: {objName,pagination,filter,sorter}});
    },
    duplicate: () => {},
    insert: () => {

    },
    save: () => {

    },
    previous: () => {

    },
    next: () => {},
    routeWF: () => {},
    selectRecord: (modelName,record) => {
      dispatch({type:`${modelName}/findOne`,payload: {id:record.id}});
      const tabgroup = widgets.find(w => w.type === 'tabgroup' && w.detail.isMain);
      if(tabgroup){
        const tab = widgets.find(w => w.type === 'tab' && w.parentId === tabgroup.id && w.detail.type === 'insert');
        if(tab)
          events.changeTab(modelName,tab.id);
      }
    },
    toggleRecord: (modelName,record) => {

    },
    changeTab: (modelName,tabId) => {
      dispatch({type:`${modelName}/setValue`,payload: {tab:tabId}});
    },
    dialogOpen: (dialogId)=>{
      setWidgets(widgets.map(w => {
        if(w.type === 'dialog' && w.detail.dialogId === dialogId){
          return {
            ...w,
            detail: {
              ...w.detail,
              visible:true,
            }
          };
        }
        return w;
      }));
    },
    dialogClose: (dialogId)=>{
      setWidgets(widgets.map(w => {
        if(w.type === 'dialog' && w.detail.dialogId === dialogId){
          return {
            ...w,
            detail: {
              ...w.detail,
              visible:false,
            }
          };
        }
        return w;
      }));
    }
  };
  return (
    <div className={styles.root}>
      <Tabs type="card">
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner data={demoData} onChange={(data) => setWidgets(data)}/>
        </TabPane>
        <TabPane tab="预览" key="2">
          <div style={{padding: 16,minHeight: 800}}>
            <AppRenderer widgets={widgets} events={events} model={model} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect((model) => ({
  model: model
}))(AppDemo);
