import React, { useContext } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const TabGroupRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <Tabs type="card">
      {widgets && widgets.filter(d => d.parentId === widget.id).map(tab => (
        <TabPane tab={tab.detail.label} key={tab.id} style={{padding:16}}>
          {widgets && widgets.filter(d => d.parentId === tab.id).map(item => getRenderer(item))}
        </TabPane>
      ))}
    </Tabs>
  )
};

export default TabGroupRenderer;
