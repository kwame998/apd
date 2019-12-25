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

const TextboxDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="隐藏标题">{getFieldDecorator('hideLabel',{ initialValue: detail.hideLabel, valuePropName: 'checked' })(<Checkbox />)}</Form.Item>
      <Form.Item label="属性">{getFieldDecorator('dataAttribute',{ initialValue: detail.dataAttribute })(<Input />)}</Form.Item>
      <Form.Item label="数据源标识">{getFieldDecorator('dataSrc',{ initialValue: detail.dataSrc })(<Input />)}</Form.Item>
      <Form.Item label="查找">{getFieldDecorator('lookup',{ initialValue: detail.lookup })(<Input />)}</Form.Item>
      <Form.Item label="输入方式">{getFieldDecorator('inputMode',{ initialValue: detail.inputMode })(
          <Select style={{width:140}}>
            <Option value="default">缺省</Option>
            <Option value="readonly">只读</Option>
            <Option value="required">必填</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="宽度">{getFieldDecorator('width',{ initialValue: detail.width })(<InputNumber min={1} precision={0.1}/>)}</Form.Item>
      <Form.Item label="菜单类型">{getFieldDecorator('menuType',{ initialValue: detail.menuType })(<Input />)}</Form.Item>
    </>
  )
};

export default TextboxDetail;
