import React, { useMemo } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'
import { useDrag } from 'react-dnd';

const mapState = state => ({
  widgets: state.widgets,
});

const Textbox = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : '#fff',
    }),
    [selected],);
  const { detail } = widget;
  const { label } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props)=> ({widgetId:widget.id})}>
      <div
        ref={drag}
        className={styles.root}
        style={rootStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}
      >
        <label className={styles.label}>{`${label}: `}</label>
        <div className={styles.input}/>
      </div>
    </ContextMenuTrigger>
  )
};

export default Textbox;