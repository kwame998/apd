import React from 'react';
import { Input, Select, Form, Checkbox } from 'antd';
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const TabGroupDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="应用主标签">{getFieldDecorator('isMain',{ initialValue: detail.isMain, valuePropName: 'checked' })(<Checkbox />)}</Form.Item>
    </>
  )
};

export default TabGroupDetail;
