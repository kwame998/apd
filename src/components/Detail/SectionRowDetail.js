import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const SectionRowDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
    </>
  )
};

export default SectionRowDetail;
