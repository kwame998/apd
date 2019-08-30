import React, { useMemo, } from 'react';
import { useDispatch } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { useDrag } from 'react-dnd';


const Hyperlink = ({widget}) => {
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
      padding: 4,
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
        <a href="#" style={{textDecoration:'underline'}}>{label}</a>
      </div>
    </ContextMenuTrigger>
  )
};

export default Hyperlink;
