import React, { useEffect, useState } from 'react';
import AppDesigner from '../../dist';
import AppRenderer from '../../../apd-renderer/dist'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
const { TabPane } = Tabs;

const demoData = [
  { type: 'canvas', id: 'canvas', title: '画布', detail: {} },
  { type: 'tabgroup', parentId: 'canvas', id: 'canvas_tabgroup1', title: '标签组', detail: {}},
  { type: 'tab', parentId: 'canvas_tabgroup1', id: 'canvas_tabgroup1_tab1', title: '标签', detail: { label: '列表'}},
  { type: 'tab', parentId: 'canvas_tabgroup1', id: 'canvas_tabgroup1_tab2', title: '标签', detail: { label: '详情'}},
  { type: 'sectionrow', parentId: 'canvas_tabgroup1_tab1', id: 'canvas_tabgroup1_tab1_row1', title: '行', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab1_row1', id: 'canvas_tabgroup1_tab1_row1_col1', title: '列', detail: {}},
  { type: 'sectioncol', parentId: 'canvas_tabgroup1_tab1_row1', id: 'canvas_tabgroup1_tab1_row1_col2', title: '列', detail: {}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab1_row1_col1', id: 'canvas_tabgroup1_tab1_row1_col1_text1', title: '文本框', detail: {label:'类型'}},
  { type: 'textbox', parentId: 'canvas_tabgroup1_tab1_row1_col1', id: 'canvas_tabgroup1_tab1_row1_col1_text2', title: '文本框', detail: {label:'描述'}},
  { type: 'pushbutton', parentId: 'canvas_tabgroup1_tab1_row1_col2', id: 'canvas_tabgroup1_tab1_row1_col2_btn1', title: '按钮', detail: {label:'查询'}},
  { type: 'table', parentId: 'canvas_tabgroup1_tab1', id: 'canvas_tabgroup1_tab1_table1', title: '表格', detail: { label: ''}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab1_table1', id: 'canvas_tabgroup1_tab1_table1_col1', title: '表格列', detail: { label: '名称'}},
  { type: 'tablecol', parentId: 'canvas_tabgroup1_tab1_table1', id: 'canvas_tabgroup1_tab1_table1_col2', title: '表格列', detail: { label: '描述'}},
];

const AppDemo = () => {
  const [widgets,setWidgets] = useState([]);
  return (
    <div className={styles.root}>
      <Tabs type="card" >
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner data={demoData} onChange={(data) => setWidgets(data)}/>
        </TabPane>
        <TabPane tab="预览" key="2">
          <div style={{padding: 16,minHeight: 800}}>
            <AppRenderer widgets={widgets} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AppDemo;
