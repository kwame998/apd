import React, { useEffect, Fragment, useMemo } from 'react';
import { useDrop } from 'react-dnd'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'
import { StoreContext, useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetComponent } from '../../utils';
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
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'addWidget', payload: item }); // add root
  },[item]);
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['textbox','section','sectionrow','table'],
    drop: (child, monitor) => {
      const didDrop = monitor.didDrop();
      if(!didDrop){
        let y = monitor.getSourceClientOffset().y;
        if(child.id) {
          dispatch({ type: 'moveWidget', payload: { id: child.id, parentId: id, y } });
        } else {
          dispatch({ type: 'addWidget', payload: { ...child, parentId: id, y } });
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const rootStyle = useMemo(
    () => ({
      height,
      padding:16,
      border:'1px solid #ddd',
      backgroundColor: isOverCurrent ? DROP_COLOR : '#fff',
    }),
    [isOverCurrent,height],);
  return (
    <Fragment>
      <div ref={drop} style={rootStyle}>
        {widgets && widgets.filter(d => d.parentId === id).map(item => getWidgetComponent(item))}
      </div>
      <Menu />
    </Fragment>
  );
};

export default Canvas;