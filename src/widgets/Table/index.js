import React, { useEffect, useMemo, useRef, useState } from 'react';
import {findDOMNode} from 'react-dom';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useMappedState } from 'redux-react-hook';
import styles from './index.less'
import { ContextMenuTrigger } from "react-contextmenu";
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';
import { getWidgetDOMPosition } from '../../utils';

const mapState = state => ({
  widgets: state.widgets,
});

const Table = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const rootRef = useRef();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['tablecol'],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getClientOffset().x+rootRef.current.scrollLeft+window.scrollX;
        const idx = getWidgetDOMPosition(x,rootRef.current.children);
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
      backgroundColor: isOverCurrent ? DROP_COLOR : selected ? SELECTED_COLOR : '#fff',
    }),
    [isOverCurrent,selected],);
  const { detail } = widget;
  const { columns } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props)=> ({widgetId: widget.id})}>
        <table
          ref={rootRef}
          onClick={(e)=>{
            dispatch({ type: 'selectWidget', payload: widget.id });
            e.stopPropagation()
          }}
          style={rootStyle}
          className={styles.root}>
          <thead>
            <tr>
            {
              columns && columns.map((column,i) => {
                return <th key={`${i}`}>
                  {column.title}
                </th>
              })
            }
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                columns && columns.map((column,i) => {
                  return <td key={`${i}`}>

                  </td>
                })
              }
            </tr>
          </tbody>
        </table>
    </ContextMenuTrigger>
  );
};

export default Table;
