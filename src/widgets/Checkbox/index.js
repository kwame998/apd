import React, { useMemo } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Checkbox as AntdCheckBox } from 'antd';
import 'antd/lib/checkbox/style';
import { useDrag } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const mapState = state => ({
  widgets: state.widgets,
});

const Checkbox = ({widget}) => {
  const { widgets } = useMappedState(mapState);
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
      marginBottom: 16,
    }),
    [selected],);
  const { detail } = widget;
  const { label } = detail;
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
        <AntdCheckBox ref={instance => {
                        const node = findDOMNode(instance);
                        drag(node)
                      }}
                      onClick={(e) => {
                        dispatch({ type: 'selectWidget', payload: widget.id });
                        e.stopPropagation();
                      }}
                      style={rootStyle}
                      checked={true}>{label}</AntdCheckBox>
    </ContextMenuTrigger>
  )
};

export default Checkbox;
