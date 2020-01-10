import React, { useEffect, useMemo, useState } from 'react';
import AppDesigner from '../../dist';
import AppRenderer from '../../../apd-renderer/dist'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
import AppBean from '../utils/appbean';
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
    detail: {label:'选择装备',event: 'dialogOpen',value:'selectEQ'}},
  { type: 'section', parentId: 'canvas_tabgroup1_tab2', id: 'canvas_tabgroup1_tab2_section1', title: '区域', detail: {label:'关联装备'}},
  { type: 'table', parentId: 'canvas_tabgroup1_tab2_section1', id: 'canvas_tabgroup1_tab2_section1_table1', title: '表格',
    detail: { objName: 'assocEQ',pageSize: 5}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_col1', title: '表格列',
    detail: { label: '装备编号',dataAttribute:'eqNum'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_col2', title: '表格列',
    detail: { label: '装备描述',dataAttribute:'desc'}},
  { type: 'buttongroup', parentId: 'canvas_tabgroup1_tab2_section1_table1', id: 'canvas_tabgroup1_tab2_table1_bg1', title: '按钮组',detail: {label:'',}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup1_tab2_table1_bg1', id: 'canvas_tabgroup1_tab2_table1_bg1_btn1', title: '按钮',
    detail: {label:'选择装备',event: 'dialogOpen',value:'selectEQ'}},

  { type: 'tab', parentId: 'canvas_tabgroup1', id: 'canvas_tabgroup1_tab3', title: '标签', detail: { label: '计划',type:'insert'}},
  { type: 'sectionrow', parentId: 'canvas_tabgroup1_tab3', id: 'canvas_tabgroup1_tab3_row1', title: '行', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab3_row1', id: 'canvas_tabgroup1_tab3_row1_col1', title: '列', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab3_row1', id: 'canvas_tabgroup1_tab3_row1_col2', title: '列', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab3_row1', id: 'canvas_tabgroup1_tab3_row1_col3', title: '列', detail: {}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab3_row1_col1', id: 'canvas_tabgroup1_tab3_row1_col1_text1', title: '文本框',
    detail: {label:'工单编号',dataAttribute: 'woNum'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab3_row1_col1', id: 'canvas_tabgroup1_tab3_row1_col1_text2', title: '文本框',
    detail: {label:'工单描述',dataAttribute: 'desc'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab3_row1_col2', id: 'canvas_tabgroup1_tab3_row1_col2_text3', title: '文本框',
    detail: {label:'创建人',dataAttribute: 'created_by.name'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab3_row1_col2', id: 'canvas_tabgroup1_tab3_row1_col2_text4', title: '文本框',
    detail: {label:'创建时间',dataAttribute: 'created_time'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab3_row1_col3', id: 'canvas_tabgroup1_tab3_row1_col3_text5', title: '文本框',
    detail: {label:'工单状态',dataAttribute: 'status'}},

  { type: 'tabgroup', parentId: 'canvas_tabgroup1_tab3', id: 'canvas_tabgroup2', title: '标签组', detail: { }},
  { type: 'tab', parentId: 'canvas_tabgroup2', id: 'canvas_tabgroup2_tab1', title: '标签', detail: { label: '物料'}},
  { type: 'section', parentId: 'canvas_tabgroup2_tab1', id: 'canvas_tabgroup2_tab1_section1', title: '区域', detail: {}},
  { type: 'table', parentId: 'canvas_tabgroup2_tab1_section1', id: 'canvas_tabgroup2_tab1_section1_table1', title: '表格',
    detail: { label: '关联物料',objName: 'assocItem',pageSize: 5}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab1_section1_table1', id: 'canvas_tabgroup2_tab1_table1_col1', title: '表格列',
    detail: { label: '物料编号',dataAttribute:'itemNum'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab1_section1_table1', id: 'canvas_tabgroup2_tab1_table1_col2', title: '表格列',
    detail: { label: '物料描述',dataAttribute:'desc'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab1_section1_table1', id: 'canvas_tabgroup2_tab1_table1_col3', title: '表格列',
    detail: { label: '单价',dataAttribute:'cost'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab1_section1_table1', id: 'canvas_tabgroup2_tab1_table1_col4', title: '表格列',
    detail: { label: '数量',dataAttribute:'amount'}},
  { type: 'buttongroup', parentId: 'canvas_tabgroup2_tab1_section1_table1', id: 'canvas_tabgroup2_tab1_table1_bg1', title: '按钮组',detail: {label:'',}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup2_tab1_table1_bg1', id: 'canvas_tabgroup2_tab1_table1_bg1_btn1', title: '按钮',
    detail: {label:'选择物料',event: 'dialogOpen',value:'selectItem'}},
  { type: 'tab', parentId: 'canvas_tabgroup2', id: 'canvas_tabgroup2_tab2', title: '标签', detail: { label: '人员'}},
  { type: 'section', parentId: 'canvas_tabgroup2_tab2', id: 'canvas_tabgroup2_tab2_section1', title: '区域', detail: {}},
  { type: 'table', parentId: 'canvas_tabgroup2_tab2_section1', id: 'canvas_tabgroup2_tab2_section1_table1', title: '表格',
    detail: { label: '关联人员',objName: 'assocPerson',pageSize: 5}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab2_section1_table1', id: 'canvas_tabgroup2_tab2_table1_col1', title: '表格列',
    detail: { label: '人员编号',dataAttribute:'personID'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab2_section1_table1', id: 'canvas_tabgroup2_tab2_table1_col2', title: '表格列',
    detail: { label: '人员名称',dataAttribute:'name'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup2_tab2_section1_table1', id: 'canvas_tabgroup2_tab2_table1_col3', title: '表格列',
    detail: { label: '邮箱',dataAttribute:'email'}},
  { type: 'buttongroup', parentId: 'canvas_tabgroup2_tab2_section1_table1', id: 'canvas_tabgroup2_tab2_table1_bg1', title: '按钮组',detail: {label:'',}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup2_tab2_table1_bg1', id: 'canvas_tabgroup2_tab2_table1_bg1_btn1', title: '按钮',
    detail: {label:'选择人员',event: 'dialogOpen',value:'selectPerson'}},

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

const AppDemo = () => {
  const [widgets,setWidgets] = useState(demoData);
  const [item,setItem] = useState({});
  const model = useMemo(()=>{
    const appBean = new AppBean(widgets);
    appBean.on('widgetsUpdated',(w)=>setWidgets(w));
    appBean.on('itemUpdated',(i)=>setItem(i));
    return appBean
  },[]);
  return (
    <div className={styles.root}>
      <Tabs type="card">
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner data={demoData} onChange={(data) => setWidgets(data)}/>
        </TabPane>
        <TabPane tab="预览" key="2">
          <div style={{padding: 16,minHeight: 800}}>
            <AppRenderer model={model} item={item} widgets={widgets}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppDemo;
