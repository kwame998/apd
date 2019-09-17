import React, { useMemo } from 'react';
import { Input } from 'antd';
import styles from '../TextboxRenderer/index.less';
const { TextArea } = Input;

const MultilineTextboxRenderer = ({widget}) => {
  const { detail } = widget;
  const { label,hideLabel,inputMode,lookup,rows,cols,dataAttribute } = detail;
  const inputStyle = useMemo(
    () => ({
      width: 30 * cols,
      resize: 'none'
    }),
    [cols],);
  return (
    <div style={{padding:8}}>
      { inputMode === 'required' && <span className={styles.required}>*</span> }
      { !hideLabel && <label className={styles.label}>{`${label}: `}</label> }
      <TextArea style={inputStyle} rows={rows}/>
    </div>
  )
};

export default MultilineTextboxRenderer;
