import React, { useMemo } from 'react';
import { useDispatch, } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Radio } from 'antd';
import 'antd/lib/radio/style';
import { useDrag } from 'react-dnd';
import {findDOMNode} from 'react-dom';

const RadioButton = ({widget}) => {
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
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <Radio ref={instance => {
               const node = findDOMNode(instance);
               drag(node)
             }}
             style={rootStyle}
             onClick={(e)=>{
               dispatch({ type: 'selectWidget', payload: widget.id });
               e.stopPropagation()
             }}>{label}</Radio>
    </ContextMenuTrigger>
  )
};

export default RadioButton;
