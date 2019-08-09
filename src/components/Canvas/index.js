import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'
import { StoreContext, useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetComponent,getWidgetDOMPosition } from '../../utils';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import _ from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListAlt,
  faCut,
  faCopy,
  faPaste,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Toolbar from '../Toolbar';
library.add(
  faListAlt,
  faCut,
  faCopy,
  faPaste,
  faTrashAlt
);

const Menu = () => {
  const dispatch = useDispatch();
  return <ContextMenu id="rightMenu" className={styles.menu}>
    <MenuItem onClick={()=>{}}>
      <FontAwesomeIcon icon="list-alt" style={{fontSize: 16,marginRight: 8,color:'#faad14'}} />属 性
    </MenuItem>
    <MenuItem disabled onClick={()=>{}}>
      <FontAwesomeIcon icon="cut" style={{fontSize: 16,marginRight: 8,color:'#73d13d'}} />剪 切
    </MenuItem>
    <MenuItem onClick={()=>{}}>
      <FontAwesomeIcon icon="copy" style={{fontSize: 16,marginRight: 8,color:'#69c0ff'}} />复 制
    </MenuItem>
    <MenuItem onClick={()=>{}}>
      <FontAwesomeIcon icon="paste" style={{fontSize: 16,marginRight: 8,color:'#eb2f96'}} />粘 贴
    </MenuItem>
    <MenuItem onClick={(e,{widgetId},target)=> dispatch({ type: 'removeWidget', payload: widgetId })}>
      <FontAwesomeIcon icon="trash-alt" style={{fontSize: 16,marginRight: 8,color:'#ffa39e'}} />删 除
    </MenuItem>
  </ContextMenu>
};

const mapState = state => ({
  widgets: state.widgets,
});

const Canvas = ({item}) => {
  const {id,height = 800} = item;
  const toolbarWidth = 80;
  const toolbarHeight = 32;
  const rootRef = useRef();
  const [bounds,setBounds] = useState({minX:null,minY:null,maxX:null,maxY:null});
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['textbox','section','sectionrow','table'],
    drop: (child, monitor) => {
      const didDrop = monitor.didDrop();
      if(!didDrop){
        let y = monitor.getClientOffset().y+rootRef.current.scrollTop+window.scrollY;
        const idx = getWidgetDOMPosition(y,rootRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...child, parentId: id, idx } });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(() => {
    dispatch({ type: 'addWidget', payload: item }); // add root
  },[item]);
  useEffect(()=>{
    setBounds({
      minX: rootRef.current.offsetLeft,
      minY: rootRef.current.offsetTop,
      maxX: rootRef.current.offsetWidth - toolbarWidth,
      maxY: rootRef.current.offsetHeight - toolbarHeight,
    });
    drop(rootRef);
  },[]);
  const rootStyle = useMemo(
    () => ({
      height,
      padding:16,
      overflow:'auto',
      border:'1px solid #ddd',
      backgroundColor: isOverCurrent ? DROP_COLOR : '#fff',
    }),
    [isOverCurrent,height],);
  return (
    <>
      <div ref={rootRef} style={rootStyle}>
        {widgets && widgets.filter(d => d.parentId === id).map(item => getWidgetComponent(item))}
      </div>
      <Toolbar width={toolbarWidth} minX={bounds.minX} minY={bounds.minY} maxX={bounds.maxX} maxY={bounds.maxY} />
      <Menu />
    </>
  );
};

export default Canvas;
