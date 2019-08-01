import React, { useState } from 'react';
import AppDesigner from '../../dist'
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <AppDesigner />
    </div>
  );
}
