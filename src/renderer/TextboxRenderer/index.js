import React from 'react';
import { Input } from 'antd';

const TextboxRenderer = ({widget}) => {
  return (
    <div>
      <label>{`${widget.detail.label}: `}</label>
      <Input />
    </div>
  )
};

export default TextboxRenderer;
