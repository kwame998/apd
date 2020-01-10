import React, { useEffect, useMemo, useState } from 'react';
import AppDesigner from '../../dist';
import AppRenderer from '../../../apd-renderer/dist'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
import AppBean from '../utils/appbean';
import demoData from './demo';
const { TabPane } = Tabs;

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
