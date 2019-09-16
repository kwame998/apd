import React, { useMemo } from 'react';
import { Icon, Input } from 'antd';
import styles from './index.less'

const TextboxRenderer = ({widget}) => {
  const { detail } = widget;
  const { label,hideLabel,inputMode,lookup,dataAttribute,width = '100%' } = detail;
  let search = null;
  if(lookup){
    search = <Icon type="search" />
  }
  const inputStyle = useMemo(
    () => ({
      width
    }),
    [width],);
  return (
    <div>
      { inputMode === 'required' && <span className={styles.required}>*</span> }
      { !hideLabel && <label className={styles.label}>{`${label}: `}</label> }
      <Input addonAfter={search} style={inputStyle} />
    </div>
  )
};

export default TextboxRenderer;
