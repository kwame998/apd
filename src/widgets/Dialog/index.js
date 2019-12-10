import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getWidgetComponent, getWidgetDOMPosition,getWidgetAccept } from '../../utils';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from 'react-contextmenu';
import styles from './index.less';
import { Button, Icon } from 'antd';

const mapState = state => ({
  widgets: state.widgets,
});

const Dialog = ({ widget }) => {
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  const { visible,width,title } = widget;
  const selected = widget ? widget.selected : false;
  const rootRef = useRef();
  const [position,setPosition] = useState({x:0,y:0});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'dialog' },
    end:(item,monitor) => {
      const canvas = rootRef.current.parentNode;
      const canvasRect = canvas.getBoundingClientRect();
      let x = monitor.getSourceClientOffset().x - canvasRect.left + canvas.scrollLeft;
      let y = monitor.getSourceClientOffset().y - canvasRect.top + canvas.scrollTop;
      if(x < 0)
        x = 0;
      if(y < 0)
        y = 0;
      setPosition({x,y});
      return true;
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getWidgetAccept(widget),
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let y = monitor.getClientOffset().y+rootRef.current.scrollTop+window.scrollY;
        const idx = getWidgetDOMPosition(y,rootRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(()=>{
    const clientRect = rootRef.current.getBoundingClientRect();
    const canvas = rootRef.current.parentNode;
    const canvasRect = canvas.getBoundingClientRect();
    setPosition({x:canvasRect.width/2 - clientRect.width/2,y:40});
    preview(rootRef);
    drag(drop(rootRef.current));
  },[]);
  const rootStyle = useMemo(
    () => ({
      left: position.x,
      top: position.y,
      width,
      visibility:visible?'visible':'hidden',
      opacity: isDragging ? 0 : 1,
    }),
    [visible,isDragging,width],);
  const bodyStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : null,
    }),
    [isOverCurrent, selected]);
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <div ref={rootRef}
           className={styles.root}
           style={rootStyle}
           onClick={(e) => {
             dispatch({ type: 'selectWidget', payload: widget.id });
             e.stopPropagation();
           }}>
        <div ref={drag} className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div>{ <Icon type="close" onClick={()=>dispatch({ type: 'updateWidget', payload: { ...widget, visible:false } })} />}</div>
        </div>
        <div className={styles.body} style={bodyStyle}>
          {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getWidgetComponent(item))}
        </div>
        <div className={styles.footer}>

        </div>
      </div>
    </ContextMenuTrigger>
  );
};

export default Dialog;
