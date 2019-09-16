import { createStore } from 'redux';
import _ from 'lodash';

function beforeAdd(widget,widgets){
  switch (widget.type) {
    case 'tabgroup':
      return [
        ...widgets,
        { type: 'tab', title: '标签', id: `${widget.id}_tab_1`, parentId: widget.id, detail: { label: '标签一' } },
        { type: 'tab', title: '标签', id: `${widget.id}_tab_2`, parentId: widget.id, detail: { label: '标签二' } }
      ];
    case 'table':
      return [
        ...widgets,
        { type: 'tablecol', title: '表列', id: `${widget.id}_tablecol_1`, parentId: widget.id, detail: { label: '列一' } },
        { type: 'tablecol', title: '表列', id: `${widget.id}_tablecol_2`, parentId: widget.id, detail: { label: '列二' } }
      ];
    case 'buttongroup':
      return [
        ...widgets,
        { type: 'pushbutton', title: '按钮', id: `${widget.id}_pushbutton_1`, parentId: widget.id, detail: { label: '按钮' } }
      ];
    case 'radiobuttongroup':
      return [
        ...widgets,
        { type: 'radiobutton', title: '单选按钮', id: `${widget.id}_radiobutton_1`, parentId: widget.id, detail: { label: '单选按钮1' }},
        { type: 'radiobutton', title: '单选按钮', id: `${widget.id}_radiobutton_2`, parentId: widget.id, detail: { label: '单选按钮2' }},
      ];
    default:
      return widgets;
  }
}

function canDelete(widget,widgets){
  const parent = widgets.find(w => widget.parentId === w.id);
  const children = widgets.filter(w => widget.parentId === w.parentId && w.id !== widget.id);
  if(widget.type === 'pushbutton' && parent.type === 'buttongroup' && children.length === 0){
    return false;
  }else if(widget.type === 'radiobutton' && parent.type === 'radiobuttongroup' && children.length === 0){
    return false;
  }else if(widget.type === 'tab' && children.length === 0){
    return false;
  }else if(widget.type === 'tablecol'&& children.length === 0){
    return false;
  }
  return true;
}

function copyChildren(widget,widgets,parentId){
  const children = widgets.filter(w => widget.id === w.parentId);
  return children.flatMap(child => {
    const newId = child.id+'_new';
    const newChild = Object.assign({}, child, { id: newId, parentId: parentId });
    return copyChildren(child,widgets,newId).concat(newChild);
  });
}

export function makeStore() {
  return createStore((state, action)=> {
    switch (action.type) {
      case 'selectWidget':
        return {
          ...state,
          selectedWidget: state.widgets.find(w => w.id === action.payload),
          widgets: state.widgets.map(w => {
            if(w.id === action.payload){
              w.selected = true;
            }else{
              w.selected = false;
            }
            return w;
          })
        };
      case 'addWidget': {
        const widget = action.payload;
        const { idx } = widget;
        let isAdd = false;
        if (!widget.id && widget.parentId) {
          widget.id = _.uniqueId(`${widget.parentId}_${widget.type}_${state.widgets.length + 1}`);
          isAdd = true;
        }
        const parent = state.widgets.find(w => widget.parentId === w.id);
        if(parent) {
          const children = state.widgets.filter(w => widget.parentId === w.parentId && w.id !== widget.id);
          if(!!idx)
            children.splice(idx,0,widget);
          else
            children.push(widget);
          const others = state.widgets.filter(w => widget.parentId !== w.parentId && w.id !== widget.id);
          let widgets = [...others,...children];
          if(isAdd){
            widgets = beforeAdd(widget,widgets);
          }
          return { ...state, widgets: widgets };
        }
        return { ...state, widgets: [...state.widgets, widget] };
      }
      case 'removeWidget': {
        const widget = action.payload;
        const { id } = widget;
        if(canDelete(widget,state.widgets)) {
          const idx = state.widgets.findIndex(w => w.id === id);
          const widgets = [...state.widgets.slice(0, idx), ...state.widgets.slice(idx + 1)];
          return { ...state, widgets: widgets };
        }else{
          return state;
        }
      }
      case 'updateWidgetDetail': {
        const detail = action.payload;
        const selectedWidget = {
          ...state.selectedWidget,
          detail: {
            ...state.selectedWidget.detail,
            ...detail
          }
        };
        const widgets = state.widgets.map(w => {
          if(w.id === state.selectedWidget.id){
            return {
              ...w,
              detail: {
                ...w.detail,
                ...detail
              }
            };
          }
          return w;
        });
        return {
          ...state,
          selectedWidget: selectedWidget,
          widgets: widgets,
        }
      }
      case 'setValue':{
        return {
          ...state,
          ...action.payload
        }
      }
      case 'copyWidget':{
        const widget = action.payload;
        const id = widget.id + '_new';
        const newWidget = Object.assign({}, widget, { id });
        const newWidgets = copyChildren(widget,state.widgets,id).concat(newWidget);
        const widgets = [...state.widgets, ...newWidgets];
        return {
          ...state,
          widgets: widgets,
          clipboard: newWidget,
        }
      }
      case 'export':{
        const widget = action.payload;
      }
      default:
        return state;
    }
  }, {
    selectedWidget: {},
    widgets: [{ type: 'canvas', id: 'canvas', title: '画布' }],
    detailModalVisible: false,
    clipboard: {},
  });
}
