import React, { useMemo } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import styles from './index.less'
import { useDrag } from 'react-dnd';
import { Select } from 'antd';
import 'antd/lib/select/style';

const Combobox = ({widget}) => {
  const { detail } = widget;
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
    }),
    [selected],);
  const { label,width = '100%' } = detail;
  const selectStyle = useMemo(
    () => ({
      width
    }),
    [width],);
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props)=> ({ widget })}>
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
        <Select className={styles.select} style={selectStyle} open={false}/>
      </div>
    </ContextMenuTrigger>
  )
};

export default Combobox;
