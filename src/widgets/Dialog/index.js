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
  const { detail } = widget;
  const { visible,width,label } = detail;
  const selected = widget ? widget.selected : false;
  const rootRef = useRef();
  const bodyRef = useRef();
  const footerRef = useRef();
  const [position,setPosition] = useState({x:0,y:0});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'dialog' },
    end:(item,monitor) => {
      const canvas = rootRef.current.parentNode.parentNode;
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
  const [{ isOverCurrent }, bodyDrop] = useDrop({
    accept: getWidgetAccept(widget),
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let y = monitor.getClientOffset().y+bodyRef.current.scrollTop+window.scrollY;
        const idx = getWidgetDOMPosition(y,bodyRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const [{ isOverCurrent:isFooterOver }, footerDrop] = useDrop({
    accept: 'pushbutton',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+footerRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,footerRef.current.children);
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
    drag(rootRef.current);
    bodyDrop(bodyRef.current);
    footerDrop(footerRef.current);
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
  const headerStyle = useMemo(()=>({
    backgroundColor: selected ? SELECTED_COLOR : null,
  }),[selected]);
  const bodyStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : null,
    }),
    [isOverCurrent, ]);
  const footerStyle = useMemo(
    () => ({
      backgroundColor: isFooterOver ? DROP_COLOR : null,
    }),
    [isFooterOver]);
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <div ref={rootRef}
           className={styles.root}
           style={rootStyle}
           onClick={(e) => {
             dispatch({ type: 'selectWidget', payload: widget.id });
             e.stopPropagation();
           }}>
        <div ref={drag} className={styles.header} style={headerStyle}>
          <div className={styles.title}>{label}</div>
          <div>{ <Icon type="close" onClick={()=>dispatch({ type: 'updateWidgetDetail', payload: { visible:false } })} />}</div>
        </div>
        <div className={styles.body} style={bodyStyle} ref={bodyRef}>
          {widgets && widgets.filter(d => d.parentId === widget.id && d.type !== 'pushbutton').map(item => getWidgetComponent(item))}
        </div>
        <div className={styles.footer} style={footerStyle} ref={footerRef}>
          {widgets && widgets.filter(d => d.parentId === widget.id && d.type === 'pushbutton').map(item => getWidgetComponent(item))}
        </div>
      </div>
    </ContextMenuTrigger>
  );
};

export default Dialog;
