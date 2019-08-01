import React, { useMemo, useState, } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import DraggableModal from '../DraggableModal';

const SectionIcon = () => {
  const [collectProps, drag] = useDrag({item: { type: 'section', title: '部分', height: 50, innerX: 16, innerY: 16,}});
  return (
    <img ref={drag} src={require('../assets/section.gif')} />
  )
};

const SectionRowIcon = () => {
  const [collectProps, drag] = useDrag({item: { type: 'sectionrow', title: '部分行', height: 50, innerX: 16, innerY: 16,}});
  return (
    <img ref={drag} src={require('../assets/sectionrow.gif')} />
  )
};

const SectionColIcon = () => {
  const [collectProps, drag] = useDrag({item: { type: 'sectioncol', title: '部分列', height: 34, innerX: 16, innerY: 16}});
  return (
    <img ref={drag} src={require('../assets/sectioncol.gif')} />
  )
};

const TableIcon = () => {
  const [collectProps, drag] = useDrag({
    item: {
      type: 'table',
      title: '列表',
      height: 78,
      innerX: 0,
      innerY: 0,
      detail: {
        columns:[{
          title: '列1',
          dataIndex: 'col1'
        },{
          title: '列2',
          dataIndex: 'col2'
        }]
      }
    }
  });
  return (
    <img ref={drag} src={require('../assets/table.gif')} />
  )
};

const TextboxIcon = () => {
  const [collectProps, drag] = useDrag({
    item: {
      type: 'textbox',
      title: '文本框',
      height: 64,
      innerX: 0,
      innerY: 0,
      detail: {
        label: "文本框",
        length: 200
      }
    }
  });
  return (
    <img ref={drag} src={require('../assets/textbox.gif')} />
  )
};

const widgets = [
  { title:'部分', component: <SectionIcon /> },
  { title:'部分行', component: <SectionRowIcon /> },
  { title:'部分列', component: <SectionColIcon /> },
  { title:'列表', component: <TableIcon /> },
  { title:'文本框', component: <TextboxIcon /> },
];

const Palette = ({visible,onCancel}) => {
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={186} title="控件">
      {widgets.map((w,i) => <div className={styles.widget} key={`widget_${i}`}>
          <div className={styles.widgetImg}>{w.component}</div>
          <div className={styles.widgetTitle}>{w.title}</div>
        </div>
      )}
    </DraggableModal>
  );
};

export default Palette;