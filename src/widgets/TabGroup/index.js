import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getWidgetComponent, getWidgetDOMPosition } from '../../utils';
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import classNames from 'classnames';
import { ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'

const mapState = state => ({
  widgets: state.widgets,
});

const Tab = ({widget,className,onClick}) => {
  const [collectProps, drag] = useDrag({item: widget});
  return (
    <div className={className} onClick={onClick} ref={drag}>
      {widget.title}
    </div>
  )
};

const TabPane = ({widget,className}) => {
  const { widgets } = useMappedState(mapState);
  const tabPaneRef = useRef();
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['textbox', 'section','sectionrow', 'table',],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+tabPaneRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,tabPaneRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(()=>{
    drop(tabPaneRef);
  },[]);
  const rootStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : '#fff',
    }),
    [isOverCurrent,],);
  return (
    <div className={styles.tabsTabPane} ref={tabPaneRef} style={rootStyle}>
      {widgets.filter(d => d.parentId === widget.id).map(item => getWidgetComponent(item))}
    </div>
  )
};

const TabGroup = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const [activeTab,setActiveTab] = useState(0);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const rootRef = useRef();
  const tabsBarRef = useRef();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, tabsBarDrop] = useDrop({
    accept: ['tab'],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+tabsBarRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,tabsBarRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(()=>{
    drag(rootRef);
    tabsBarDrop(tabsBarRef.current);
  },[]);
  const rootStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : '#fff',
    }),
    [isOverCurrent,selected],);
  return (
      <div ref={rootRef}
           onClick={(e) => {
             dispatch({ type: 'selectWidget', payload: widget.id });
             e.stopPropagation();
           }}
           style={rootStyle}
           className={styles.tabs}>
        <div className={styles.tabsBar}>
          <div className={styles.tabsNav} ref={tabsBarRef}>
            {widgets && widgets.filter(d => d.parentId === widget.id).map((item,i) =>
              <Tab widget={item}
                   key={item.id}
                   className={classNames(i === activeTab ? styles.tabsTabActive : null,styles.tabsTab)}
                   onClick={(e)=>{
                     setActiveTab(i);
                     e.stopPropagation();
                   }} />
            )}
          </div>
        </div>
        <div className={styles.tabsContent}>
          {widgets && widgets.filter(d => d.parentId === widget.id).map((item,i) =>
            i === activeTab ? <TabPane widget={item} key={item.id} /> : null
          )}
        </div>
      </div>
  );
};

export default TabGroup;
