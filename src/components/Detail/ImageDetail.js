import React from 'react';
import { Input, Checkbox, Select, Form, InputNumber } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const ImageDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标签">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="数据源标识">{getFieldDecorator('dataSrc',{ initialValue: detail.dataSrc })(<Input />)}</Form.Item>
      <Form.Item label="高度">{getFieldDecorator('height',{ initialValue: detail.height })(<InputNumber min={1} precision={0.1}/>)}</Form.Item>
      <Form.Item label="宽度">{getFieldDecorator('width',{ initialValue: detail.width })(<InputNumber min={1} precision={0.1}/>)}</Form.Item>
      <Form.Item label="是缩略图">{getFieldDecorator('thumbnail',{ initialValue: detail.thumbnail, valuePropName: 'checked' })(<Checkbox />)}</Form.Item>
    </>
  )
};

export default ImageDetail;
