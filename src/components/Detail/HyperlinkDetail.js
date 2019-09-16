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

const HyperlinkDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="事件类型">{getFieldDecorator('event',{ initialValue: detail.event })(<Input />)}</Form.Item>
      <Form.Item label="控制目标标识">{getFieldDecorator('targetId',{ initialValue: detail.targetId })(<Input />)}</Form.Item>
      <Form.Item label="事件值">{getFieldDecorator('eventValue',{ initialValue: detail.eventValue })(<Input />)}</Form.Item>
      <Form.Item label="文本对齐">{getFieldDecorator('align',{ initialValue: detail.align })((
        <Select style={{width:140}}>
          <Option value="center">居中</Option>
          <Option value="left">左</Option>
          <Option value="right">右</Option>
        </Select>
      ))}</Form.Item>
      <Form.Item label="图像文件名">{getFieldDecorator('image',{ initialValue: detail.image })(<Input />)}</Form.Item>
      <Form.Item label="图像对齐">{getFieldDecorator('imageAlign',{ initialValue: detail.imageAlign })((
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

export default HyperlinkDetail;
