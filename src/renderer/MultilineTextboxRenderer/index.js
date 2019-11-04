import React, { useContext, useMemo } from 'react';
import { Form, Input } from 'antd';
import { DataContext } from '../../utils/context';
const { TextArea } = Input;

const MultilineTextboxRenderer = ({widget}) => {
  const { form } = useContext(DataContext);
  const { detail } = widget;
  const { label,hideLabel,inputMode,lookup,rows,cols,dataAttribute } = detail;
  const inputStyle = useMemo(
    () => ({
      width: 30 * cols,
      resize: 'none'
    }),
    [cols],);
  const comp = dataAttribute ? form.getFieldDecorator(dataAttribute, {
    rules: [ {required: inputMode === 'required' } ],
    initialValue: '',
  })(<TextArea style={inputStyle} />) : <TextArea style={inputStyle} />;
  return (
    <div style={{padding:8}}>
      <Form.Item label={!hideLabel ? label : null}>
        {comp}
      </Form.Item>
    </div>
  )
};

export default MultilineTextboxRenderer;
