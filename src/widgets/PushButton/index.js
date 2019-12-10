import React, { useMemo } from 'react';
import { useDispatch, } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Button } from 'antd';
import 'antd/lib/button/style';
import { useDrag } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const PushButton = ({widget}) => {
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      marginRight: 8,
    }),
    [selected],);
  const { detail } = widget;
  const { label,icon,isDefault } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <Button
        ref={instance => {
          const node = findDOMNode(instance);
          drag(node)
        }}
        type={isDefault ? "primary":"default"}
        icon={icon}
        style={rootStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}>{label}</Button>
    </ContextMenuTrigger>
  )
};

export default PushButton;
