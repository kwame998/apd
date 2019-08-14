import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'
import { useDrag, useDrop } from 'react-dnd';
import { getWidgetAccept, getWidgetComponent, getWidgetDOMPosition } from '../../utils';

const mapState = state => ({
  widgets: state.widgets,
});

const ButtonGroup = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const rootRef = useRef();
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getWidgetAccept(widget),
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+rootRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,rootRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  useEffect(()=>{
    drag(drop(rootRef.current));
  },[]);
  const rootStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : null,
    }),
    [isOverCurrent,selected],);
  const { detail } = widget;
  const { label } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widgetId: widget.id })}>
      <div
        ref={rootRef}
        className={styles.root}
        style={rootStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}>
        <span style={{marginRight:8,padding:'6px 0'}}>{label}...</span>
        {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getWidgetComponent(item))}
      </div>
    </ContextMenuTrigger>
  )
};

export default ButtonGroup;
