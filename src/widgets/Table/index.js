import React, { useMemo, useState } from 'react';
import {findDOMNode} from 'react-dom';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useMappedState } from 'redux-react-hook';
import styles from './index.less'
import { ContextMenuTrigger } from "react-contextmenu";
import { DROP_COLOR, SELECTED_COLOR } from '../../constants';

const mapState = state => ({
  widgets: state.widgets,
});

const Table = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ['tablecol'],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        let x = monitor.getSourceClientOffset().x;
        if(item.id) {
          dispatch({ type: 'moveWidget', payload: { id:item.id, parentId: widget.id, x } });
        } else {
          dispatch({ type: 'addWidget', payload: { ...item, parentId: widget.id, x } });
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
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
          ref={instance => {
            const node = findDOMNode(instance);
            drag(drop(node))
          }}
          style={rootStyle}
          className={styles.root}
          onClick={(e)=>{
            dispatch({ type: 'selectWidget', payload: widget.id });
            e.stopPropagation()
          }}>
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