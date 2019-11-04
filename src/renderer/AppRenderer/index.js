import React, { useEffect, useMemo, useRef } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';
import { Form } from 'antd';

const AppRenderer = ({widgets,form}) => {
  return (
    <DataContext.Provider value={{form,widgets,}}>
      <Form layout="inline">
        {widgets && widgets.filter(d => d.parentId === 'canvas').map(item => getRenderer(item))}
      </Form>
    </DataContext.Provider>
  )
};

export default Form.create()(AppRenderer);
