import React, { useContext } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';

const SectionRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <div style={{padding:16}}>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </div>
  )
};

export default SectionRenderer;
