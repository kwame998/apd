import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd'
import { ContextMenu, MenuItem, } from "react-contextmenu";
import styles from './index.less'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetAccept, getWidgetComponent, getWidgetDOMPosition } from '../../utils';
import { DROP_COLOR, } from '../../constants';
import Toolbar from '../Toolbar';

const Menu = () => {
  const dispatch = useDispatch();
  return <ContextMenu id="rightMenu" className={styles.menu}>
    <MenuItem onClick={()=>{}}>
      <span className="iconfont icon-detail-fill" style={{fontSize: 16,marginRight: 8,color:'#faad14'}} />属 性
    </MenuItem>
    <MenuItem disabled onClick={()=>{}}>
      <span className="iconfont icon-scissor" style={{fontSize: 16,marginRight: 8,color:'#73d13d'}} />剪 切
    </MenuItem>
    <MenuItem onClick={()=>{}}>
      <span className="iconfont icon-file-copy" style={{fontSize: 16,marginRight: 8,color:'#69c0ff'}} />复 制
    </MenuItem>
    <MenuItem onClick={()=>{}}>
      <span className="iconfont icon-snippets" style={{fontSize: 16,marginRight: 8,color:'#eb2f96'}} />粘 贴
    </MenuItem>
    <MenuItem onClick={(e,{widget},target)=> dispatch({ type: 'removeWidget', payload: widget })}>
      <span className="iconfont icon-delete" style={{fontSize: 16,marginRight: 8,color:'#ffa39e'}} />删 除
    </MenuItem>
  </ContextMenu>
};

const mapState = state => ({
  widgets: state.widgets,
});

const Canvas = ({item,height}) => {
  const { id } = item;
  const toolbarWidth = 80;
  const toolbarHeight = 32;
  const rootRef = useRef();
  const [bounds,setBounds] = useState({minX:null,minY:null,maxX:null,maxY:null});
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getWidgetAccept(item),
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
