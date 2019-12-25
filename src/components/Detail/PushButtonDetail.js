import React from 'react';
import { Input, Checkbox, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const PushButtonDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="事件">{getFieldDecorator('event',{ initialValue: detail.event })(<Input />)}</Form.Item>
      <Form.Item label="目标标识">{getFieldDecorator('targetId',{ initialValue: detail.targetId })(<Input />)}</Form.Item>
      <Form.Item label="值">{getFieldDecorator('value',{ initialValue: detail.value })(<Input />)}</Form.Item>
      <Form.Item label="图标">{getFieldDecorator('icon',{ initialValue: detail.icon, })(<Input />)}</Form.Item>
      <Form.Item label="尺寸"> {getFieldDecorator('size',{ initialValue: detail.size })(
        <Select style={{width:140}}>
          <Option value="small">小</Option>
          <Option value="default">中</Option>
          <Option value="large">大</Option>
        </Select>
      )}
      </Form.Item>
      <Form.Item label="默认">{getFieldDecorator('isDefault',{ initialValue: detail.isDefault, valuePropName: 'checked'})(<Checkbox />)}</Form.Item>
    </>
  )
};

export default PushButtonDetail;
