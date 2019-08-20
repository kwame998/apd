import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'

const DraggableModal = ({visible,onCancel,width,title,children}) => {
  const rootRef = useRef();
  const [position,setPosition] = useState({x:0,y:0});
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'palette' },
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
    setPosition({x:canvasRect.width/2 - clientRect.width/2,y:40});
    preview(rootRef);
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
  return (
    <div ref={rootRef} className={styles.root} style={rootStyle}>
      <div ref={drag} className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div>{onCancel !== undefined && <span className="iconfont icon-close" onClick={onCancel} />}</div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default DraggableModal;
