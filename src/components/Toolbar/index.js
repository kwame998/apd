import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import Palette from '../Palette';
import Detail from '../Detail';
import DialogEditor from '../DialogEditor';
import { Tooltip,Icon,Divider,message } from 'antd';
import 'antd/lib/tooltip/style';
import 'antd/lib/icon/style';
import 'antd/lib/divider/style';
import 'antd/lib/message/style';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetAccept } from '../../utils';
import debounce from 'lodash/debounce';

const mapState = state => ({
  selectedWidget: state.selectedWidget,
  detailModalVisible: state.detailModalVisible,
  clipboard: state.clipboard,
});
const Toolbar = () => {
  const rootRef = useRef();
  const { detailModalVisible,selectedWidget,clipboard } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [expanded,setExpanded] = useState(true);
  const [paletteVisible,setPaletteVisible] = useState(false);
  const [dialogVisible,setDialogVisible] = useState(false);
  const [position,setPosition] = useState({x:0,y:0});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'toolbar' },
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

  useEffect(()=>{
    let clientRect = rootRef.current.getBoundingClientRect();
    let canvas = rootRef.current.parentNode;
    let canvasRect = canvas.getBoundingClientRect();
    setPosition({x:canvasRect.width - clientRect.width - 2,y:0});
    // drag(rootRef);
    const triggerResizeEvent = debounce(() => {
      clientRect = rootRef.current.getBoundingClientRect();
      canvas = rootRef.current.parentNode;
      canvasRect = canvas.getBoundingClientRect();
      setPosition({x:canvasRect.width - clientRect.width - 2,y:0});
    });
    window.addEventListener("resize", triggerResizeEvent);
    return () => {
      triggerResizeEvent.cancel();
      window.removeEventListener("resize", triggerResizeEvent);
    }
  },[]);
  const rootStyle = useMemo(
    () => ({
      left: position.x,
      top: position.y,
      opacity: isDragging ? 0 : 1,
    }),
    [isDragging,position]);
  return (
    <>
      <div className={styles.root} ref={rootRef} style={rootStyle}>
        { expanded &&
          <>
            <Tooltip placement="bottom" title="导入">
              <img src={require('../assets/icons/nav_icon_import.gif')}
                   onClick={()=>dispatch({ type: 'import' })} />
            </Tooltip>
            <Tooltip placement="bottom" title="导出">
              <img style={{marginRight:0}}  src={require('../assets/icons/nav_icon_export.gif')}
                   onClick={()=>dispatch({ type: 'export' })} />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title="控件选用板">
              <img src={require('../assets/icons/nav_icon_toolbox.gif')} onClick={()=>setPaletteVisible(!paletteVisible)}/>
            </Tooltip>
            <Tooltip placement="bottom" title="控件属性">
              <img src={require('../assets/icons/nav_icon_properties.gif')}
                   onClick={()=> {
                     if (selectedWidget.id) {
                       dispatch({ type: 'setValue', payload: { detailModalVisible: !detailModalVisible } })
                     } else {
                       message.warning('请先选择一个控件!')
                     }
                   }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="编辑对话框">
              <img style={{marginRight:0}} src={require('../assets/icons/nav_icon_tree.gif')} onClick={()=>setDialogVisible(!dialogVisible)}/>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title="删除">
              <img src={require('../assets/icons/nav_icon_delete.gif')}
                   onClick={()=> {
                     if (selectedWidget.id) {
                       dispatch({ type: 'removeWidget', payload: selectedWidget })
                     } else {
                       message.warning('请先选择一个控件!')
                     }
                   }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="剪切">
              <img src={require('../assets/icons/nav_icon_cut.gif')}
                   onClick={()=> {
                     if (selectedWidget.id) {
                       dispatch({ type: 'setValue', payload: {clipboard: selectedWidget} });
                       dispatch({ type: 'removeWidget', payload: selectedWidget });
                     } else {
                       message.warning('请先选择一个控件!')
                     }
                   }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="复制">
              <img src={require('../assets/icons/nav_icon_copy.gif')}
                   onClick={()=> {
                     if (selectedWidget.id) {
                       dispatch({ type: 'setValue', payload: {clipboard: selectedWidget} });
                     } else {
                       message.warning('请先选择一个控件!')
                     }
                   }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="粘贴">
              <img src={require('../assets/icons/nav_icon_paste.gif')}
                   onClick={()=> {
                     if(clipboard.type) {
                       if(getWidgetAccept(selectedWidget).findIndex(w => w === clipboard.type) >= 0) {
                         if (selectedWidget.id) {
                           dispatch({ type: 'copyWidget', payload: { ...clipboard, parentId: selectedWidget.id } });
                         } else {
                           dispatch({ type: 'copyWidget', payload: { ...clipboard, parentId: 'canvas' } });
                         }
                       } else {
                         message.warning('该控件不能放置到此处!')
                       }
                     } else {
                       message.warning('请先复制一个控件!')
                     }
                   }}/>
            </Tooltip>
          </>
        }
      </div>
      <Palette visible={paletteVisible} onCancel={()=>setPaletteVisible(false)}/>
      <Detail visible={detailModalVisible} dispatch={dispatch} onCancel={()=> dispatch({ type: 'setValue', payload: {detailModalVisible:false} })}/>
      <DialogEditor visible={dialogVisible}
                    onOk={(d)=> {
                      dispatch({ type: 'updateDialog', payload: d });
                      setDialogVisible(false);
                    }}
                    onCancel={()=>setDialogVisible(false)}/>
    </>
  );
};

export default Toolbar;
