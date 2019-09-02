import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useMappedState } from 'redux-react-hook';
import styles from './index.less'
import { ContextMenuTrigger } from "react-contextmenu";
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import { getWidgetAccept, getWidgetComponent, getWidgetDOMPosition } from '../../utils';
import { Pagination,Icon } from 'antd'
import 'antd/lib/pagination/style';
import 'antd/lib/icon/style';

const mapState = state => ({
  widgets: state.widgets,
});

const TableCol = ({widget,children}) => {
  const [collectProps, drag] = useDrag({item: widget});
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const tdStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
    }),
    [selected],);
  return (
    <td ref={drag}
        style={tdStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }} >
      <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
        {children}
      </ContextMenuTrigger>
    </td>
  )
};

const Table = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const rootRef = useRef();
  const trRef = useRef();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getWidgetAccept(widget),
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+rootRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,trRef.current.children);
        dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, idx } });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  useEffect(()=>{
    drag(drop(rootRef.current));
  },[]);
  const rootStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : null,
    }),
    [isOverCurrent,selected],);
  const { detail } = widget;
  const { label,pageSize = 20 } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <div ref={rootRef}
           onClick={(e)=>{
             dispatch({ type: 'selectWidget', payload: widget.id });
             e.stopPropagation()
           }}
           style={rootStyle}
           className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>{widget.title}...</div>
          <div className={styles.toolbar}>
            <Pagination
              disabled={true}
              simple
              defaultCurrent={1}
              total={100}
              current={1}
              pageSize={pageSize}
              style={{ display: 'inline-block', marginRight: 16 }}
            />
            <Icon type="filter" theme="filled" />
            <span className="iconfont icon-eraser"></span>
            <span className="iconfont icon-search"></span>
            <span className="iconfont icon-download"></span>
          </div>
        </div>
        <table>
          <thead>
            <tr ref={trRef}>
            {widgets && widgets.filter(d => d.parentId === widget.id).map((column,i) => (
              <TableCol key={`${i}`} widget={column}>{column.detail.label}</TableCol>
            ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {widgets && widgets.filter(d => d.parentId === widget.id).map((column,i) => (
                <TableCol key={`${i}`} widget={column}> </TableCol>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </ContextMenuTrigger>
  );
};

export default Table;
