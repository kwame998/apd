import React from 'react';
import { Input, Checkbox, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const RadioButtonDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="按钮值">{getFieldDecorator('value',{ initialValue: detail.value })(<Checkbox />)}</Form.Item>
    </>
  )
};

export default RadioButtonDetail;
