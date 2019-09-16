import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const MultilineTextboxRenderer = ({widget}) => {
  const { rows } = widget.detail;
  return (
    <div>
      <label>{`${widget.detail.label}: `}</label>
      <TextArea style={{resize: 'none'}} rows={rows}/>
    </div>
  )
};

export default MultilineTextboxRenderer;
