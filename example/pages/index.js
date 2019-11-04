import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { AppDesigner, AppRenderer } from '../../dist';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
const { TabPane } = Tabs;

const AppDemo = () => {
  const [widgets,setWidgets] = useState([]);
  return (
    <div className={styles.root}>
      <Tabs type="card" >
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner onChange={(data) => setWidgets(data)}/>
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
