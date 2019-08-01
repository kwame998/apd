import React, { useMemo, } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetComponent } from '../../utils';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'

const mapState = state => ({
  widgets: state.widgets,
});

const SectionCol = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['section','textbox','table'],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let y = monitor.getSourceClientOffset().y;
        if(item.id) {
          dispatch({ type: 'moveWidget', payload: { id:item.id, parentId: widget.id, y } });
        } else {
          dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, y } });
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const { detail = {} } = widget;
  const { width = 'auto' } = detail;
  const rootStyle = useMemo(
    () => ({
      width,
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : '#fff',
    }),
    [isOverCurrent,selected,width],);
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props)=> ({widgetId:widget.id})}>
      <div
        ref={instance => {
          const node = findDOMNode(instance);
          drag(drop(node))
        }}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}
        className={styles.root}
        style={rootStyle}>
        {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getWidgetComponent(item))}
      </div>
    </ContextMenuTrigger>
  );
};

export default SectionCol;