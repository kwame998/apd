import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import Palette from '../Palette';
import Detail from '../Detail';
import { Tooltip,message } from 'antd';
import 'antd/lib/tooltip/style';
import 'antd/lib/message/style';
import { useDispatch, useMappedState } from 'redux-react-hook';

const mapState = state => ({
  selectedWidget: state.selectedWidget,
  detailModalVisible: state.detailModalVisible,
});
const Toolbar = () => {
  const rootRef = useRef();
  const { detailModalVisible,selectedWidget } = useMappedState(mapState);
  const dispatch = useDispatch();
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
    const clientRect = rootRef.current.getBoundingClientRect();
    const canvas = rootRef.current.parentNode;
    const canvasRect = canvas.getBoundingClientRect();
    setPosition({x:canvasRect.width - clientRect.width - 2,y:0});
    drag(rootRef);
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
        <Tooltip placement="bottomRight" title="编辑对话框">
          <img src={require('../assets/icons/nav_icon_tree.gif')} onClick={()=>setDialogVisible(!dialogVisible)}/>
        </Tooltip>
      </div>
      <Palette visible={paletteVisible} onCancel={()=>setPaletteVisible(false)}/>
      <Detail visible={detailModalVisible} dispatch={dispatch} onCancel={()=> dispatch({ type: 'setValue', payload: {detailModalVisible:false} })}/>
    </>
  );
};

export default Toolbar;
