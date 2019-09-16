import React from 'react';
import { Input, Checkbox, Select, Form} from 'antd'
import 'antd/lib/select/style';
import 'antd/lib/input/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
const { Option } = Select;

const TableColDetail = ({ widget, getFieldDecorator }) => {
  const { detail } = widget;
  return (
    <>
      <Form.Item label="标题">{getFieldDecorator('label',{ initialValue: detail.label })(<Input />)}</Form.Item>
      <Form.Item label="属性">{getFieldDecorator('dataAttribute',{ initialValue: detail.dataAttribute })(<Input />)}</Form.Item>
      <Form.Item label="类型">{getFieldDecorator('type',{ initialValue: detail.type })(
        <Select style={{width:140}}>
          <Option value="event">事件</Option>
          <Option value="link">链接</Option>
        </Select>
      )}
      </Form.Item>
      <Form.Item label="可排序">{getFieldDecorator('sortable',{ initialValue: detail.sortable })(<Checkbox />)}</Form.Item>
      <Form.Item label="可过滤">{getFieldDecorator('filterable',{ initialValue: detail.filterable })(<Checkbox />)}</Form.Item>
      <Form.Item label="事件">{getFieldDecorator('event',{ initialValue: detail.event })(<Input />)}</Form.Item>
      <Form.Item label="目标标识">{getFieldDecorator('targetId',{ initialValue: detail.targetId })(<Input />)}</Form.Item>
      <Form.Item label="变更事件">{getFieldDecorator('onDataChange',{ initialValue: detail.onDataChange })(
        <Select style={{width:140}}>
          <Option value="refreshTable">刷新表</Option>
          <Option value="resetChildren">复位子级</Option>
        </Select>
      )}
      </Form.Item>
      <Form.Item label="查找">{getFieldDecorator('lookup',{ initialValue: detail.lookup })(<Input />)}</Form.Item>
      <Form.Item label="输入方式">{getFieldDecorator('inputMode',{ initialValue: detail.inputMode })(
        <Select style={{width:140}}>
          <Option value="default">缺省</Option>
          <Option value="readonly">只读</Option>
          <Option value="required">必填</Option>
        </Select>
      )}
        <Form.Item label="菜单类型">{getFieldDecorator('menuType',{ initialValue: detail.menuType })(<Input />)}</Form.Item>
      </Form.Item>
    </>
  )
};

export default TableColDetail;
