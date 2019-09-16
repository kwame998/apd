import React, { useMemo } from 'react';
import { useDispatch, } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Icon,Input } from 'antd';
import 'antd/lib/input/style';
import 'antd/lib/icon/style';
import styles from './index.less'
import { useDrag } from 'react-dnd';

const Textbox = ({widget}) => {
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
    }),
    [selected],);
  const { detail } = widget;
  const { label,hideLabel,inputMode,lookup,dataAttribute,width = '100%' } = detail;
  let search = null;
  if(lookup){
    search = <Icon type="search" />
  }
  const inputStyle = useMemo(
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
        { inputMode === 'required' && <span className={styles.required}>*</span> }
        { !hideLabel && <label className={styles.label}>{`${label}: `}</label> }
        <Input disabled={true} addonAfter={search} style={inputStyle} value={dataAttribute?"":"未绑定"}/>
      </div>
    </ContextMenuTrigger>
  )
};

export default Textbox;
