import React from 'react';
import { Input, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const TabDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="类型">{getFieldDecorator('type',{ initialValue: detail.inputMode })(
        <Select style={{width:140}}>
          <Option value="list">列表</Option>
          <Option value="insert">插入</Option>
        </Select>
      )}
      </Form.Item>
    </>
  )
};

export default TabDetail;
