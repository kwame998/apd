import React,{useEffect} from 'react';
import { Input, Checkbox, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import { useDispatch } from 'redux-react-hook';

const { Option } = Select;

const TextboxDetail = ({ widget,form }) => {
  const { detail } = widget;
  const {getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
  };
  useEffect(() => {
    form.resetFields();
  },[widget]);
  return (
    <Form {...formItemLayout} >
      <Form.Item label="控件标识">
        {getFieldDecorator('id',{
          initialValue: widget.id
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="标题">
        {getFieldDecorator('label',{
          initialValue: detail.label
        })(<Input />)}
      </Form.Item>
      <Form.Item label="隐藏标签">
        {getFieldDecorator('hideLabel',{
          initialValue: detail.hideLabel
        })(<Checkbox />)}
      </Form.Item>
      <Form.Item label="属性">
        {getFieldDecorator('dataAttribute',{
          initialValue: detail.dataAttribute
        })(<Input />)}
      </Form.Item>
      <Form.Item label="查找">
        {getFieldDecorator('lookup',{
          initialValue: detail.lookup
        })(<Input />)}
      </Form.Item>
      <Form.Item label="输入方式">
        {getFieldDecorator('inputMode',{
          initialValue: detail.inputMode
        })(
          <Select style={{width:140}}>
            <Option value="default">缺省</Option>
            <Option value="readonly">只读</Option>
            <Option value="required">必填</Option>
          </Select>
        )}
      </Form.Item>
    </Form>
  )
};

export default Form.create({
  onValuesChange: (props, changedFields, allFields) => {
    props.dispatch({ type: 'updateWidgetDetail', payload: {...changedFields} });
  }
})(TextboxDetail);
