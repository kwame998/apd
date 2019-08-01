import React, { useMemo, useState,Fragment } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import DraggableModal from '../DraggableModal';
import { useDispatch, useMappedState } from 'redux-react-hook';

const ColDetail = () => {
  return (
    <Fragment>
      <div className={styles.row}>
        <div className={styles.label}>宽度: </div>
        <div><input /></div>
      </div>
    </Fragment>
  )
};

const mapState = state => ({
  selectedWidget: state.selectedWidget,
});
const Detail = ({visible,onCancel}) => {
  const { selectedWidget } = useMappedState(mapState);
  const title = selectedWidget ? selectedWidget.title : "";
  const dispatch = useDispatch();
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={400} title={`${title}属性`}>
      <div className={styles.root}>
        <ColDetail />
      </div>
    </DraggableModal>
  );
};

export default Detail;