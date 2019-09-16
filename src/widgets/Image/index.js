import React, { useMemo, } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SELECTED_COLOR } from '../../constants';
import { ContextMenuTrigger } from "react-contextmenu";
import { Icon } from 'antd';
import 'antd/lib/icon/style';
import { useDrag } from 'react-dnd';


const Image = ({widget}) => {
  const selected = widget ? widget.selected : false;
  const dispatch = useDispatch();
  const { detail } = widget;
  const { width,height } = detail;
  const [collectProps, drag] = useDrag({item: widget});
  const rootStyle = useMemo(
    () => ({
      backgroundColor: selected ? SELECTED_COLOR : null,
      padding: 4,
      width,
      height,
    }),
    [selected,width,height]);
  return (
    <ContextMenuTrigger id="rightMenu" holdToDisplay={-1} collect={(props) => ({ widget })}>
      <div
        ref={drag}
        style={rootStyle}
        onClick={(e)=>{
          dispatch({ type: 'selectWidget', payload: widget.id });
          e.stopPropagation()
        }}>
        <Icon type="picture" style={{ fontSize: '100px', color: '#ccc' }}/>
      </div>
    </ContextMenuTrigger>
  )
};

export default Image;
