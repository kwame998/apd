import React, { useEffect, useMemo, useRef } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';

const AppRenderer = ({widgets,app}) => {
  return (
    <DataContext.Provider value={widgets}>
      <div>
        {widgets && widgets.filter(d => d.parentId === app.id).map(item => getRenderer(item))}
      </div>
    </DataContext.Provider>
  )
};

export default AppRenderer;
