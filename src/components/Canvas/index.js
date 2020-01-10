import React, { useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd'
import { ContextMenu, MenuItem, } from "react-contextmenu";
import styles from './index.less'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetAccept, getWidgetComponent, getWidgetDOMPosition } from '../../utils';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import Toolbar from '../Toolbar';
import { message } from 'antd';
import classNames from 'classnames';
import 'antd/lib/message/style';

const mapState = state => ({
  widgets: state.widgets,
  clipboard: state.clipboard,
});

const Menu = () => {
  const dispatch = useDispatch();
  const { clipboard } = useMappedState(mapState);
  return <ContextMenu id="rightMenu"
                      className={styles.menu}
                      onShow={({detail:{data:{widget}}}) => dispatch({ type: 'selectWidget', payload: widget.id})}>
    <MenuItem onClick={(e,{widget},target)=> dispatch({ type: 'setValue', payload: {detailModalVisible:true}})}>
      <img src={require('../assets/icons/nav_icon_properties.gif')} />属 性
    </MenuItem>
    <MenuItem onClick={(e,{widget},target)=>{
                dispatch({ type: 'setValue', payload: {clipboard: widget} });
                dispatch({ type: 'removeWidget', payload: widget });
              }}>
      <img src={require('../assets/icons/nav_icon_cut.gif')} />剪 切
    </MenuItem>
    <MenuItem onClick={(e,{widget},target)=> dispatch({ type: 'setValue', payload: {clipboard: widget} })}>
      <img src={require('../assets/icons/nav_icon_copy.gif')} />复 制
    </MenuItem>
    <MenuItem onClick={(e,{widget},target)=>{
                if(clipboard.type) {
                  if(getWidgetAccept(widget).findIndex(w => w === clipboard.type) >= 0) {
                    dispatch({ type: 'copyWidget', payload: { ...clipboard, parentId: widget.id } });
                  } else {
                    message.warning('该控件不能放置到此处!')
                  }
                } else {
                  message.warning('请先复制一个控件!')
                }
              }}>
      <img src={require('../assets/icons/nav_icon_paste.gif')} />粘 贴
    </MenuItem>
    <MenuItem onClick={(e,{widget},target) => dispatch({ type: 'removeWidget', payload: widget })}>
      <img src={require('../assets/icons/nav_icon_delete.gif')} />删 除
    </MenuItem>
  </ContextMenu>
};

const Canvas = ({height}) => {
  const rootRef = useRef();
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  const widget = widgets.find(w => w.type === 'canvas');
  const selected = widget ? widget.selected : false;
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getWidgetAccept(widget),
    drop: (child, monitor) => {
      const didDrop = monitor.didDrop();
      if(!didDrop){
        let y = monitor.getClientOffset().y+rootRef.current.scrollTop+window.scrollY;
        const idx = getWidgetDOMPosition(y,rootRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...child, parentId: widget.id, idx } });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(()=>{
    drop(rootRef);
  },[]);
  const rootStyle = useMemo(
    () => ({
      height,
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : '#fff',
    }),
    [isOverCurrent,height,selected],);
  return (
    <>
    {
      !!widget 
      && 
      <div ref={rootRef}
           className={classNames(styles.root,'canvas')}
           style={rootStyle}
           onClick={(e)=>{
             const isCanvasClick = typeof e.nativeEvent.target.className === 'string'
               && e.nativeEvent.target.className.indexOf(' canvas') > -1;
             if(isCanvasClick) {
               dispatch({ type: 'selectWidget', payload: widget.id });
             }
             e.stopPropagation()
           }}>
        {widgets && widgets.filter(d => d.parentId === widget.id).map(item => getWidgetComponent(item))}
        <Toolbar />
        <Menu />
      </div>
    }
    </>
  );
};

export default Canvas;
