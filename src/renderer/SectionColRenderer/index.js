import React, { useContext, } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';

const SectionColRenderer = ({widget}) => {
  const { widgets } = useContext(DataContext);
  return (
    <div style={{flex:'1 1 auto',padding:16}}>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </div>
  )
};

export default SectionColRenderer;
