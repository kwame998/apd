import React from 'react';
import Section from '../widgets/Section';
import SectionRow from '../widgets/SectionRow';
import SectionCol from '../widgets/SectionCol';
import Table from '../widgets/Table';
import Textbox from '../widgets/Textbox';
import TabGroup from '../widgets/TabGroup';
import MultilineTextbox from '../widgets/MultilineTextbox';
import PushButton from '../widgets/PushButton';
import ButtonGroup from '../widgets/ButtonGroup';
import Checkbox from '../widgets/Checkbox';
import RadioButton from '../widgets/RadioButton';
import RadioButtonGroup from '../widgets/RadioButtonGroup';
import Combobox from '../widgets/Combobox';
import Attachments from '../widgets/Attachments';
import BlankLine from '../widgets/BlankLine';
import StaticText from '../widgets/StaticText';
import Hyperlink from '../widgets/Hyperlink';
import Image from '../widgets/Image';
import Datasrc from '../widgets/Datasrc';
import Dialog from '../widgets/Dialog';

export function getWidgetComponent(widget) {
  if(!widget)
    return null;
  switch (widget.type){
    case 'tabgroup':
      return <TabGroup widget={widget} key={widget.id} />;
    case 'section':
      return <Section widget={widget} key={widget.id} />;
    case 'sectionrow':
      return <SectionRow widget={widget} key={widget.id} />;
    case 'sectioncol':
      return <SectionCol widget={widget} key={widget.id} />;
    case 'table':
      return <Table widget={widget} key={widget.id} />;
    case 'textbox':
      return <Textbox widget={widget} key={widget.id} />;
    case 'multilinetextbox':
      return <MultilineTextbox widget={widget} key={widget.id} />;
    case 'pushbutton':
      return <PushButton widget={widget} key={widget.id} />;
    case 'buttongroup':
      return <ButtonGroup widget={widget} key={widget.id} />;
    case 'checkbox':
      return <Checkbox widget={widget} key={widget.id} />;
    case 'radiobutton':
      return <RadioButton widget={widget} key={widget.id} />;
    case 'radiobuttongroup':
      return <RadioButtonGroup widget={widget} key={widget.id} />;
    case 'combobox':
      return <Combobox widget={widget} key={widget.id} />;
    case 'attachments':
      return <Attachments widget={widget} key={widget.id} />;
    case 'blankline':
      return <BlankLine widget={widget} key={widget.id} />;
    case 'statictext':
      return <StaticText widget={widget} key={widget.id} />;
    case 'hyperlink':
      return <Hyperlink widget={widget} key={widget.id} />;
    case 'image':
      return <Image widget={widget} key={widget.id} />;
    case 'datasrc':
      return <Datasrc widget={widget} key={widget.id} />;
    case 'dialog':
      return <Dialog widget={widget} key={widget.id} />;
    default:
      return null;
  }
}

export function getWidgetAccept(widget) {
  if(!widget)
    return [];
  switch (widget.type){
    case 'canvas':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','attachments','blankline','hyperlink',
        'pushbutton','buttongroup','checkbox','combobox','radiobuttongroup','hyperlink','image','statictext','image','datasrc'];
    case 'section':
      return ['tabgroup','sectionrow','table','textbox','multilinetextbox','attachments','blankline','hyperlink',
        'pushbutton','buttongroup','checkbox','combobox','radiobuttongroup','hyperlink','image','statictext','image'];
    case 'sectionrow':
      return ['sectioncol'];
    case 'sectioncol':
      return ['tabgroup','section','table','textbox','multilinetextbox','attachments','blankline','hyperlink',
        'pushbutton','buttongroup','checkbox','combobox','radiobuttongroup','hyperlink','image','statictext','image'];
    case 'table':
      return ['tablecol'];
    case 'tabgroup':
      return ['tab'];
    case 'tab':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','attachments','blankline','hyperlink',
        'pushbutton','buttongroup','checkbox','combobox','radiobuttongroup','hyperlink','image','statictext','image'];
    case 'buttongroup':
      return ['pushbutton'];
    case 'radiobuttongroup':
      return ['radiobutton'];
    case 'dialog':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','attachments','blankline','hyperlink',
        'buttongroup','checkbox','combobox','radiobuttongroup','hyperlink','image','statictext','image','datasrc'];
    default:
      return [];
  }
}

export function getWidgetDOMPosition(value,children = [],byX = false) {
  let position = children.length;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (byX && child.offsetLeft > value || !byX && child.offsetTop > value) {
      position = i;
      break;
    }
  }
  return position;
}
