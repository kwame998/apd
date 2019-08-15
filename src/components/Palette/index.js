import React, { useMemo, useState, } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import DraggableModal from '../DraggableModal';

const widgets = [
  { type: 'tabgroup', title: '标签组',detail: { label: '标签组', }, icon:require('../assets/tabgroup.gif') },
  { type: 'tab', title: '标签',detail: { label: '标签', }, icon:require('../assets/tab.gif') },
  { type: 'attachments', title: '附件', detail: { label: '附件', }, icon:require('../assets/attachments.gif')},
  { type: 'section', title: '部分',detail: { label: '部分', }, icon:require('../assets/section.gif') },
  { type: 'sectionrow', title: '部分行',detail: { label: '部分行', }, icon:require('../assets/sectionrow.gif') },
  { type: 'sectioncol', title: '部分列',detail: { label: '部分列', }, icon:require('../assets/sectioncol.gif') },
  { type: 'table', title: '表格', detail: { label: '表格', }, icon:require('../assets/table.gif') },
  { type: 'tablecol', title: '表格列', detail: { label: '表格列', }, icon:require('../assets/tablecol.gif') },
  { type: 'combobox', title: '下拉框', detail: { label: '下拉框', }, icon:require('../assets/combobox.gif')},
  { type: 'pushbutton', title: '按钮', detail: { label: '按钮', }, icon:require('../assets/pushbutton.gif')},
  { type: 'buttongroup', title: '按钮组', detail: { label: '按钮组', }, icon:require('../assets/buttongroup.gif')},
  { type: 'checkbox', title: '复选框', detail: { label: '复选框', }, icon:require('../assets/checkbox.gif')},
  { type: 'radiobuttongroup', title: '单选框组', detail: { label: '单选框组', }, icon:require('../assets/radiobuttongroup.gif')},
  { type: 'radiobutton', title: '单选框', detail: { label: '单选框', }, icon:require('../assets/radiobutton.gif')},
  { type: 'hyperlink', title: '链接', detail: { label: '链接', },icon:require('../assets/hyperlink.gif')},
  { type: 'textbox', title: '文本框', detail: { label: "文本框", }, icon:require('../assets/textbox.gif') },
  { type: 'multilinetextbox', title: '多行文本框', detail: { label: '多行文本框' }, icon:require('../assets/multilinetextbox.gif') },
];

function getDragImg(item){
  const [collectProps, drag] = useDrag({ item });
  return <img ref={drag} src={item.icon} />
}

const Palette = ({visible,onCancel}) => {
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={270} title="控件">
      {widgets.map((item,i) => <div className={styles.widget} key={`widget_${i}`}>
          <div className={styles.widgetImg}>{getDragImg(item)}</div>
          <div className={styles.widgetTitle}>{item.title}</div>
        </div>
      )}
    </DraggableModal>
  );
};

export default Palette;
