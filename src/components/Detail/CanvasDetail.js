import React from 'react';
import { Input, Checkbox, Select, Form, InputNumber } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const CanvasDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="Model 类">{getFieldDecorator('model',{ initialValue: detail.model })(<Input />)}</Form.Item>
      <Form.Item label="对象名称">{getFieldDecorator('objName',{ initialValue: detail.objName })(<Input />)}</Form.Item>
      <Form.Item label="排序条件">{getFieldDecorator('orderBy',{ initialValue: detail.orderBy })(<Input />)}</Form.Item>
      <Form.Item label="Where 子句">{getFieldDecorator('whereClause',{ initialValue: detail.whereClause })(<Input />)}</Form.Item>
      <Form.Item label="主列表标识">{getFieldDecorator('resultsTableId',{ initialValue: detail.resultsTableId })(<Input />)}</Form.Item>
    </>
  )
};

export default CanvasDetail;
