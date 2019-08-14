import { createStore } from 'redux';
import _ from 'lodash';

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
          children.splice(idx,0,widget);
          const others = state.widgets.filter(w => widget.parentId !== w.parentId && w.id !== widget.id);
          let widgets = [...others,...children];
          if(isAdd){
            if(widget.type === 'tabgroup')
              widgets = [...widgets,
                { type: 'tab', title: '标签一', id: `${widget.id}_tab_1`, parentId: widget.id},
                { type: 'tab', title: '标签二', id: `${widget.id}_tab_2`, parentId: widget.id}];
            else if(widget.type === 'table')
              widgets = [...widgets,
                { type: 'tablecol', title: '列一', id: `${widget.id}_tablecol_1`, parentId: widget.id},
                { type: 'tablecol', title: '列二', id: `${widget.id}_tablecol_2`, parentId: widget.id}];
            else if(widget.type === 'buttongroup')
              widgets = [...widgets, { type: 'pushbutton', title: '按钮', id: `${widget.id}_pushbutton_1`,detail:{ label: '按钮'}, parentId: widget.id}];
          }
          return { ...state, widgets: widgets  };
        }
        return { ...state, widgets: [...state.widgets, widget] };
      }
      case 'removeWidget': {
        const id = action.payload;
        const idx = state.widgets.findIndex(w => w.id === id);
        return { ...state, widgets: [...state.widgets.slice(0, idx), ...state.widgets.slice(idx + 1)] };
      }
      default:
        return state;
    }
  }, {
    selectedWidget: {},
    widgets: [],
  });
}
