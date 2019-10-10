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

const TableCol = ({widget,isHeader,children}) => {
  const [collectProps, drag] = useDrag({item: widget});
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const tdStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
    }),
    [selected],);
  const { detail } = widget;
  return (
    <td ref={drag}
        style={tdStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }} >
      <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
        { isHeader && children }
        { !isHeader && (detail.dataAttribute ? " " :"未绑定") }
      </ContextMenuTrigger>
    </td>
  )
};

const TableFooter = ({widget,parent}) => {
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'buttongroup',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch({ type: 'addWidget', payload: { ...item, parentId: parent.id, idx:99 } });
      }
    },
    canDrop: (item, monitor) => {
      return !widget
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const rootStyle = useMemo(
    () => ({
      backgroundColor: isOverCurrent ? DROP_COLOR : null,
    }),
    [isOverCurrent],);
  return (
    <div ref={drop} className={styles.footer} style={rootStyle}>
      {widget && getWidgetComponent(widget)}
    </div>
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
  const footerBtnGroup = widgets.find(d => d.parentId === widget.id && d.type === 'buttongroup');
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
          <div className={styles.title}>{label}</div>
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
            <Icon type="filter" />
            <Icon type="rest" theme="filled" style={{color:'#ddd'}}/>
            <Icon type="search" />
            <Icon type="unordered-list" />
            <Icon type="download" />
          </div>
        </div>
        <table>
          <thead>
            <tr ref={trRef}>
            {widgets && widgets.filter(d => d.parentId === widget.id && d.type === 'tablecol').map((column,i) => (
              <TableCol key={`${i}`} isHeader={true} widget={column}>{column.detail.label}</TableCol>
            ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {widgets && widgets.filter(d => d.parentId === widget.id && d.type === 'tablecol').map((column,i) => (
                <TableCol key={`${i}`} isHeader={false} widget={column}></TableCol>
              ))}
            </tr>
          </tbody>
        </table>
        <TableFooter widget={footerBtnGroup} parent={widget} />
      </div>
    </ContextMenuTrigger>
  );
};

export default Table;
