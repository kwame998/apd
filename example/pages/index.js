import React, { useState } from 'react';
import AppDesigner from '../../dist'
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div style={{height:50,width:'100%',backgroundColor:'#fff'}}/>
      <AppDesigner />
    </div>
  );
}
