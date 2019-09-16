import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';

const SectionRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <div>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </div>
  )
};

export default SectionRenderer;
