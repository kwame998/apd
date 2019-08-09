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
        if (!widget.id && widget.parentId)
          widget.id = _.uniqueId(`${widget.parentId}_${widget.type}_${state.widgets.length + 1}`);
        const parent = state.widgets.find(w => widget.parentId === w.id);
        if(parent) {
          const children = state.widgets.filter(w => widget.parentId === w.parentId && w.id !== widget.id);
          children.splice(idx,0,widget);
          const others = state.widgets.filter(w => widget.parentId !== w.parentId && w.id !== widget.id);
          return { ...state, widgets: [...others,...children]  };
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
