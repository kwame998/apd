import React, { useState } from 'react';
import { AppDesigner, AppRenderer } from '../../dist';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
const { TabPane } = Tabs;

export default function() {
  const [widgets,setWidgets] = useState([]);
  return (
    <div className={styles.root}>
      <Tabs type="card" >
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner onChange={(data) => setWidgets(data)}/>
        </TabPane>
        <TabPane tab="预览" key="2">
          <div style={{padding: 8}}>
            <AppRenderer widgets={widgets} app={{id:'canvas'}}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
