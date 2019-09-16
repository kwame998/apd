import React from 'react';
import { Input, Checkbox, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const RadioButtonGroupDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="隐藏标题">{getFieldDecorator('hideLabel',{ initialValue: detail.hideLabel })(<Checkbox />)}</Form.Item>
      <Form.Item label="属性">{getFieldDecorator('dataAttribute',{ initialValue: detail.dataAttribute })(<Input />)}</Form.Item>
      <Form.Item label="值属性">{getFieldDecorator('valueAttribute',{ initialValue: detail.valueAttribute })(<Input />)}</Form.Item>
      <Form.Item label="描述属性">{getFieldDecorator('descAttribute',{ initialValue: detail.descAttribute })(<Input />)}</Form.Item>
      <Form.Item label="数据源标识">{getFieldDecorator('dataSrc',{ initialValue: detail.dataSrc })(<Checkbox />)}</Form.Item>
    </>
  )
};

export default RadioButtonGroupDetail;
