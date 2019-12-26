import React from 'react';
import { Form,InputNumber } from 'antd';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const SectionColDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="宽度">{getFieldDecorator('width',{ initialValue: detail.width })(<InputNumber min={1} precision={0.1}/>)}</Form.Item>
    </>
  )
};

export default SectionColDetail;
