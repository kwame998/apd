import React, { useState, useMemo, } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import Palette from '../Palette';
import Detail from '../Detail';

const Toolbar = ({width = 80,minX = 0,minY = 0,maxX = 0, maxY = 0}) => {
  const [paletteVisible,setPaletteVisible] = useState(false);
  const [detailVisible,setDetailVisible] = useState(false);
  const [dialogVisible,setDialogVisible] = useState(false);
  const [position,setPosition] = useState({x:maxX,y:minY});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'toolbar' },
    end:(item,monitor) => {
      let x1 = monitor.getSourceClientOffset().x;
      let y1 = monitor.getSourceClientOffset().y;
      if(x1 < minX)
        x1 = minX;
      else if(x1 > maxX)
        x1 = maxX;
      if(y1 < minY)
        y1 = minY;
      else if(y1 > maxY)
        y1 = maxY;
      setPosition({x:x1,y:y1});
      return true;
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  useMemo(
    () => (setPosition({x:maxX,y:minY})),
    [minX, minY, maxX, maxY]);
  const rootStyle = useMemo(
    () => ({
      left: position.x,
      top: position.y,
      width,
      opacity: isDragging ? 0 : 1,
    }),
    [isDragging,position]);
  return (
    <>
      <div className={styles.root} ref={drag} style={rootStyle}>
        <span className="iconfont icon-layout-fill" style={{fontSize: 20,marginRight: 8,color:'#f5222d'}} onClick={()=>setPaletteVisible(!paletteVisible)}/>
        <span className="iconfont icon-detail-fill" style={{fontSize: 20,marginRight: 8,color:'#faad14'}} onClick={()=>setDetailVisible(!detailVisible)}/>
        <span className="iconfont icon-message-fill" style={{fontSize: 20,color:'#1890ff'}} onClick={()=>setDialogVisible(!dialogVisible)}/>
      </div>
      <Palette visible={paletteVisible} onCancel={()=>setPaletteVisible(false)}/>
      <Detail visible={detailVisible} onCancel={()=>setDetailVisible(false)}/>
    </>
  );
};

export default Toolbar;
