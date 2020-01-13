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
import TabGroupDetail from './TabGroupDetail';
import TableColDetail from './TableColDetail';
import PushButtonDetail from './PushButtonDetail';
import ComboboxDetail from './ComboboxDetail';
import DatasrcDetail from './DatasrcDetail';
import CanvasDetail from './CanvasDetail';
import ImageDetail from './ImageDetail';
import ButtonGroupDetail from './ButtonGroupDetail';
import CheckboxDetail from './CheckboxDetail';
import RadioButtonGroupDetail from './RadioButtonGroupDetail';
import RadioButtonDetail from './RadioButtonDetail';
import HyperlinkDetail from './HyperlinkDetail';
import StaticTextDetail from './StaticTextDetail';
import DialogDetail from './DialogDetail';
import SectionRowDetail from './SectionRowDetail';
import SectionColDetail from './SectionColDetail';
import SectionDetail from './SectionDetail';

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
          { selectedWidget.type === 'canvas' && <CanvasDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'datasrc' && <DatasrcDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'textbox' && <TextboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'multilinetextbox' && <MultilineTextboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'table' && <TableDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'tablecol' && <TableColDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'tabgroup' && <TabGroupDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'tab' && <TabDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'pushbutton' && <PushButtonDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'buttongroup' && <ButtonGroupDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'combobox' && <ComboboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'checkbox' && <CheckboxDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'radiobuttongroup' && <RadioButtonGroupDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'radiobutton' && <RadioButtonDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'image' && <ImageDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'hyperlink' && <HyperlinkDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'statictext' && <StaticTextDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'dialog' && <DialogDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'sectionrow' && <SectionRowDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'sectioncol' && <SectionColDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
          { selectedWidget.type === 'section' && <SectionDetail widget={selectedWidget} getFieldDecorator={getFieldDecorator}/> }
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
