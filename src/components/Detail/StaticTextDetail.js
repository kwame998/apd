import React from 'react';
import { Input, Select, Form, } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const StaticTextDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="属性">{getFieldDecorator('dataAttribute',{ initialValue: detail.dataAttribute })(<Input />)}</Form.Item>
      <Form.Item label="文本对齐">{getFieldDecorator('align',{ initialValue: detail.align })((
        <Select style={{width:140}}>
          <Option value="center">居中</Option>
          <Option value="left">左</Option>
          <Option value="right">右</Option>
        </Select>
      ))}</Form.Item>
      <Form.Item label="跨距">{getFieldDecorator('span',{ initialValue: detail.span })(<Input />)}</Form.Item>
    </>
  )
};

export default StaticTextDetail;
