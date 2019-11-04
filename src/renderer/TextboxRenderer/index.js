import React, { useContext, useMemo } from 'react';
import { Icon, Input,Form } from 'antd';
import { DataContext } from '../../utils/context';

const TextboxRenderer = ({widget}) => {
  const { form } = useContext(DataContext);
  const { detail } = widget;
  const { label,hideLabel,inputMode,lookup,dataAttribute,width = '90%' } = detail;
  let search = null;
  if(lookup){
    search = <Icon type="search" />
  }
  const inputStyle = useMemo(
    () => ({
      width
    }),
    [width],);
  const comp = dataAttribute ? form.getFieldDecorator(dataAttribute, {
    rules: [ {required: inputMode === 'required' } ],
    initialValue: '',
  })(<Input addonAfter={search} style={inputStyle} />) : <Input addonAfter={search} style={inputStyle} />;
  return (
    <div style={{padding:8}}>
      <Form.Item label={!hideLabel ? label : null}>
        {comp}
      </Form.Item>
    </div>
  )
};

export default TextboxRenderer;
