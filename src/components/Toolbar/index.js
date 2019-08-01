import React, { useState, Fragment, useMemo } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import Palette from '../Palette';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faListAlt,
  faCommentAlt
} from '@fortawesome/free-solid-svg-icons';
import Detail from '../Detail';
library.add(
  faPalette,
  faListAlt,
  faCommentAlt
);

const Toolbar = ({width = 80}) => {
  const [paletteVisible,setPaletteVisible] = useState(false);
  const [detailVisible,setDetailVisible] = useState(false);
  const [dialogVisible,setDialogVisible] = useState(false);
  const [position,setPosition] = useState({x:window.innerWidth-width-20,y:10});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'toolbar' },
    end:(item,monitor) => {
      let x = monitor.getSourceClientOffset().x;
      let y = monitor.getSourceClientOffset().y;
      if(x < 0)
        x = 0;
      else if(x+width+20 > window.innerWidth)
        x = window.innerWidth - width;
      setPosition({x,y});
      return true;
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const rootStyle = useMemo(
    () => ({
      left: position.x,
      top: position.y,
      width,
      opacity: isDragging ? 0 : 1,
    }),
    [isDragging,width],);
  return (
    <Fragment>
      <div className={styles.root} ref={drag} style={rootStyle}>
        <FontAwesomeIcon icon="palette" style={{fontSize: 20,marginRight: 8,color:'#f5222d'}} onClick={()=>setPaletteVisible(!paletteVisible)}/>
        <FontAwesomeIcon icon="list-alt" style={{fontSize: 20,marginRight: 8,color:'#faad14'}} onClick={()=>setDetailVisible(!detailVisible)}/>
        <FontAwesomeIcon icon="comment-alt" style={{fontSize: 20,color:'#1890ff'}} onClick={()=>setDialogVisible(!dialogVisible)}/>
      </div>
      <Palette visible={paletteVisible} onCancel={()=>setPaletteVisible(false)}/>
      <Detail visible={detailVisible} onCancel={()=>setDetailVisible(false)}/>
    </Fragment>
  );
};

export default Toolbar;