import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';
import { Col } from 'antd';

const SectionColRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <Col>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </Col>
  )
};

export default SectionColRenderer;
