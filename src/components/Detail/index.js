import React, { useEffect } from 'react';
import styles from './index.less'
import DraggableModal from '../DraggableModal';
import { useMappedState } from 'redux-react-hook';
import { Form, Input } from 'antd';
import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import TextboxDetail from './TextboxDetail';
import TableDetail from './TableDetail';
import MultilineTextboxDetail from './MultilineTextboxDetail';
import TabDetail from './TabDetail';
import TableColDetail from './TableColDetail';

const mapState = state => ({
  selectedWidget: state.selectedWidget,
});
const Detail = ({visible,onCancel,form}) => {
  const { selectedWidget } = useMappedState(mapState);
  const title = selectedWidget ? selectedWidget.title : "";
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
  },[selectedWidget]);
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={400} title={`${title}属性`}>
      <div className={styles.root}>
        <Form {...formItemLayout} >
          <Form.Item label="控件标识">
            {getFieldDecorator('id',{
              initialValue: selectedWidget.id
            })(<Input disabled />)}
          </Form.Item>
          { selectedWidget.type === 'textbox' && <TextboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'multilinetextbox' && <MultilineTextboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'table' && <TableDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'tablecol' && <TableColDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'tab' && <TabDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
        </Form>
      </div>
    </DraggableModal>
  );
};


export default Form.create({
  onValuesChange: (props, changedFields, allFields) => {
    props.dispatch({ type: 'updateWidgetDetail', payload: {...changedFields} });
  }
})(Detail);
