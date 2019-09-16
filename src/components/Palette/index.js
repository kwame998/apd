import React, { useMemo, useState, } from 'react';
import { useDrag } from 'react-dnd'
import styles from './index.less'
import classNames from 'classnames';
import DraggableModal from '../DraggableModal';


const widgets = [
  { type: 'tabgroup', title: '标签组',detail: { label: '标签组', }, icon:require('../assets/widgets/tabgroup.gif') },
  { type: 'tab', title: '标签',detail: { label: '标签', }, icon:require('../assets/widgets/tab.gif') },
  { type: 'attachments', title: '附件', detail: { label: '附件', }, icon:require('../assets/widgets/attachments.gif')},
  { type: 'section', title: '部分',detail: { label: '部分', }, icon:require('../assets/widgets/section.gif') },
  { type: 'sectionrow', title: '部分行',detail: { label: '部分行', }, icon:require('../assets/widgets/sectionrow.gif') },
  { type: 'sectioncol', title: '部分列',detail: { label: '部分列', }, icon:require('../assets/widgets/sectioncol.gif') },
  { type: 'table', title: '表格', detail: { label: '表格', }, icon:require('../assets/widgets/table.gif') },
  { type: 'tablecol', title: '表格列', detail: { label: '表格列', }, icon:require('../assets/widgets/tablecol.gif') },
  { type: 'combobox', title: '下拉框', detail: { label: '下拉框', }, icon:require('../assets/widgets/combobox.gif')},
  { type: 'pushbutton', title: '按钮', detail: { label: '按钮', }, icon:require('../assets/widgets/pushbutton.gif')},
  { type: 'buttongroup', title: '按钮组', detail: { label: '按钮组', }, icon:require('../assets/widgets/buttongroup.gif')},
  { type: 'checkbox', title: '复选框', detail: { label: '复选框', }, icon:require('../assets/widgets/checkbox.gif')},
  { type: 'radiobutton', title: '单选框', detail: { label: '单选框', }, icon:require('../assets/widgets/radiobutton.gif')},
  { type: 'radiobuttongroup', title: '单选框组', detail: { label: '单选框组', }, icon:require('../assets/widgets/radiobuttongroup.gif')},
  { type: 'hyperlink', title: '链接', detail: { label: '链接', },icon:require('../assets/widgets/hyperlink.gif')},
  { type: 'textbox', title: '文本框', detail: { label: "文本框", }, icon:require('../assets/widgets/textbox.gif') },
  { type: 'multilinetextbox', title: '多行文本框', detail: { label: '多行文本框' }, icon:require('../assets/widgets/multilinetextbox.gif') },
  { type: 'image', title: '图像', detail: { label: '图像', width: 120, height: 120 }, icon:require('../assets/widgets/image.gif') },
  { type: 'statictext', title: '静态文本', detail: { label: '静态文本' }, icon:require('../assets/widgets/statictext.gif') },
  { type: 'blankline', title: '空行', detail: { label: '空白行' }, icon:require('../assets/widgets/blankline.gif') },
  { type: 'datasrc', title: '数据源', detail: { label: '数据源' }, icon:require('../assets/widgets/uploadfile.gif') },
];

function getDragImg(item){
  const [collectProps, drag] = useDrag({ item });
  return <img ref={drag} src={item.icon} />
}

const Switcher = ({checked = false,style = {},onClick}) => {
  return (
    <button style={style} className={checked ? classNames(styles.switcher,styles.switcherChecked) : styles.switcher} onClick={onClick} />
  );
};


const Palette = ({visible,onCancel}) => {
  const [titleVisible,setTitleVisible] = useState(true);
  const title = <div className={styles.title}>
    <span>控件</span>
    <Switcher style={{marginTop: 4}} checked={titleVisible} onClick={()=>setTitleVisible(!titleVisible)}/>
  </div>;
  return (
    <DraggableModal visible={visible} onCancel={onCancel} width={176} title={title}>
      <div className={styles.root}>
        {widgets.map((item,i) => <div className={styles.widget} key={`widget_${i}`}>
            <div className={styles.widgetImg}>{getDragImg(item)}</div>
            {titleVisible && <div className={styles.widgetTitle}>{item.title}</div>}
          </div>
        )}
      </div>
    </DraggableModal>
  );
};

export default Palette;
