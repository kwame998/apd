import React,{useEffect} from 'react';
import { Input, InputNumber, Select, Form, Checkbox} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;


const TableDetail = ({ widget,getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="对象名">{getFieldDecorator('objName',{ initialValue: detail.objName })(<Input />)}</Form.Item>
      <Form.Item label="Where子句">{getFieldDecorator('whereClause',{ initialValue: detail.whereClause })(<Input />)}</Form.Item>
      <Form.Item label="排序条件">{getFieldDecorator('orderBy',{ initialValue: detail.orderBy })(<Input />)}</Form.Item>
      <Form.Item label="关系">{getFieldDecorator('relationship',{ initialValue: detail.relationship })(<Input />)}</Form.Item>
      <Form.Item label="数据源标识">{getFieldDecorator('dataSrc',{ initialValue: detail.dataSrc })(<Input />)}</Form.Item>
      <Form.Item label="控制类">{getFieldDecorator('beanClass',{ initialValue: detail.beanClass })(<Input />)}</Form.Item>
      <Form.Item label="宽度">{getFieldDecorator('width',{ initialValue: detail.width })(<InputNumber min={1} max={10000}/>)}</Form.Item>
      <Form.Item label="输入方式"> {getFieldDecorator('inputMode',{ initialValue: detail.inputMode })(
          <Select style={{width:140}}>
            <Option value="default">缺省</Option>
            <Option value="readonly">只读</Option>
            <Option value="required">必填</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="选择方式"> {getFieldDecorator('selectMode',{ initialValue: detail.selectMode })(
          <Select style={{width:140}}>
            <Option value="single">单个</Option>
            <Option value="multiple">多个</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="每页行数">{getFieldDecorator('pageSize',{ initialValue: detail.pageSize })(<InputNumber min={1} max={100}/>)}</Form.Item>
      <Form.Item label="主应用表格">{getFieldDecorator('isMain',{ initialValue: detail.isMain, valuePropName: 'checked'})(<Checkbox />)}</Form.Item>
      <Form.Item label="显示边框">{getFieldDecorator('bordered',{ initialValue: detail.bordered, valuePropName: 'checked'})(<Checkbox />)}</Form.Item>
    </>
  )
};

export default TableDetail;
