import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { AppDesigner, AppRenderer } from '../../dist';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style';
import styles from './index.less';
const { TabPane } = Tabs;

const AppDemo = ({workorder,dispatch}) => {
  const [widgets,setWidgets] = useState([]);
  useEffect(() => { dispatch({type: 'workorder/fetch'}) }, []);
  return (
    <div className={styles.root}>
      <Tabs type="card" >
        <TabPane tab="设计器" key="1" style={{padding:16}}>
          <AppDesigner onChange={(data) => setWidgets(data)}/>
        </TabPane>
        <TabPane tab="预览" key="2">
          <div style={{padding: 16,minHeight: 800}}>
            <AppRenderer dispatch={dispatch} widgets={widgets} model={workorder}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default connect(({ workorder, loading }) => ({
  workorder,
  loading: loading.effects['workorder/fetch'],
}))(AppDemo);
