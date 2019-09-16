import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { getRenderer } from '../../utils';
import { DataContext } from '../../utils/context';
import { Row } from 'antd';

const SectionRowRenderer = ({widget}) => {
  const widgets = useContext(DataContext);
  return (
    <Row>
      {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getRenderer(item))}
    </Row>
  )
};

export default SectionRowRenderer;
