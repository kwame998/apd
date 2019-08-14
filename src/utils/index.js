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

export function getWidgetComponent(widget) {
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
    default:
      return null;
  }
}

export function getWidgetAccept(widget) {
  switch (widget.type){
    case 'canvas':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','pushbutton','buttongroup'];
    case 'section':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','pushbutton','buttongroup'];
    case 'sectionrow':
      return ['sectioncol'];
    case 'sectioncol':
      return ['tabgroup','section','table','textbox','multilinetextbox','pushbutton','buttongroup'];
    case 'table':
      return ['tablecol'];
    case 'tabgroup':
      return ['tab'];
    case 'tab':
      return ['tabgroup','section','sectionrow','table','textbox','multilinetextbox','pushbutton','buttongroup'];
    case 'buttongroup':
      return ['pushbutton'];
    default:
      return null;
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
