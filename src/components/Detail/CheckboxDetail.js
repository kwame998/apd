import React from 'react';
import { Input, Checkbox, Select, Form, InputNumber } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const CheckboxDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="属性">{getFieldDecorator('dataAttribute',{ initialValue: detail.dataAttribute })(<Input />)}</Form.Item>
      <Form.Item label="数据源">{getFieldDecorator('dataSrc',{ initialValue: detail.dataSrc })(<Input />)}</Form.Item>
    </>
  )
};

export default CheckboxDetail;
