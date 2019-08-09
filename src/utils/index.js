import React from 'react';
import Section from '../widgets/Section';
import SectionRow from '../widgets/SectionRow';
import SectionCol from '../widgets/SectionCol';
import Table from '../widgets/Table';
import Textbox from '../widgets/Textbox';

export function getWidgetComponent(widget) {
  switch (widget.type){
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
