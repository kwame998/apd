import React, { useMemo, } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Icon } from 'antd';
import 'antd/lib/icon/style';
import { useDrag } from 'react-dnd';


const Attachments = ({widget}) => {
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
    }),
    [selected]);
  const { detail } = widget;
  const { label } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <div
        ref={drag}
        style={rootStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}>
        <span style={{marginRight:8}}>{label}...</span>
        <Icon type="link" style={{ fontSize: '16px', color: '#08c' }}/>
      </div>
    </ContextMenuTrigger>
  )
};

export default Attachments;
