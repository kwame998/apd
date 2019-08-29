import React, { PureComponent, useEffect, useMemo, useState } from 'react';
import styles from './index.less'
import DraggableModal from '../DraggableModal';
import { useDispatch, useMappedState } from 'redux-react-hook';
import TextboxDetail from './TextboxDetail';

const mapState = state => ({
  selectedWidget: state.selectedWidget,
});
const Detail = ({visible,onCancel}) => {
  const { selectedWidget } = useMappedState(mapState);
  const dispatch = useDispatch();
  const title = selectedWidget ? selectedWidget.title : "";
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={400} title={`${title}属性`}>
      <div className={styles.root}>
        { selectedWidget.type === 'textbox' && <TextboxDetail widget={selectedWidget} dispatch={dispatch}/> }
      </div>
    </DraggableModal>
  );
};

export default Detail;
