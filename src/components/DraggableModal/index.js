import React, { useMemo, useState,useEffect } from 'react';
import { useDrag } from 'react-dnd'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);
import styles from './index.less'

const DraggableModal = ({visible,onCancel,width,title,children}) => {
  const [position,setPosition] = useState({x:window.innerWidth/2-width/2,y:100});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'palette' },
    end:(item,monitor) => {
      let x = monitor.getSourceClientOffset().x;
      let y = monitor.getSourceClientOffset().y;
      if(x < 0)
        x = 0;
      else if(x+width > window.innerWidth)
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
      visibility:visible?'visible':'hidden',
      opacity: isDragging ? 0 : 1,
    }),
    [visible,isDragging,width],);
  return (
    <div ref={preview} className={styles.root} style={rootStyle}>
      <div ref={drag} className={styles.header}>
        <div>{title}</div>
        <div>{onCancel !== undefined && <FontAwesomeIcon icon="times" onClick={onCancel} />}</div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default DraggableModal;