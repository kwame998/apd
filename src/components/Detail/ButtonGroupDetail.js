import React from 'react';
import { Input, Checkbox, Select, Form, InputNumber } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const ButtonGroupDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="文本对齐">{getFieldDecorator('labelAlign',{ initialValue: detail.labelAlign })((
        <Select style={{width:140}}>
          <Option value="center">居中</Option>
          <Option value="left">左</Option>
          <Option value="right">右</Option>
        </Select>
      ))}</Form.Item>
      <Form.Item label="按钮对齐">{getFieldDecorator('align',{ initialValue: detail.align })((
        <Select style={{width:140}}>
          <Option value="center">居中</Option>
          <Option value="left">左</Option>
          <Option value="right">右</Option>
        </Select>
      ))}</Form.Item>
      <Form.Item label="显示容器">{getFieldDecorator('show',{ initialValue: detail.show })(<Checkbox />)}</Form.Item>
    </>
  )
};

export default ButtonGroupDetail;
