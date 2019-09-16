import React, { useContext } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';

const SectionRowRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <div style={{display: 'flex',flexWrap: 'nowrap'}}>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </div>
  )
};

export default SectionRowRenderer;
