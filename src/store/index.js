import { createStore } from 'redux';
import _ from 'lodash';

function resetParentHeight(widget, widgets, reduce = false){
  const parent = widgets.find(w => w.id === widget.parentId);
  if(parent && parent.parentId){
    parent.height = reduce ? parent.height -  widget.height : parent.height +  widget.height;
    const bigBrothers = widgets.filter(w => w.parentId === parent.parentId && w.y > parent.y); // 大于父级控件y值的其他同级控件
    bigBrothers.map(b => {b.y = reduce ? b.y -  widget.height : b.y +  widget.height;});
    resetParentHeight(parent,widgets,reduce);
  }
  return widgets;
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
        const newWidget = action.payload;
        const { type } = newWidget;
        if (!newWidget.id && newWidget.parentId) // 如果id为空则初始化id
          newWidget.id = _.uniqueId(`${newWidget.parentId}_${newWidget.type}_${state.widgets.length + 1}`);
        const parent = state.widgets.find(w => newWidget.parentId === w.id); // 找到父级控件
        if(parent) {
          let children = state.widgets.filter(w => newWidget.parentId === w.parentId); // 找到父级控件的一级子控件
          children = _.sortBy(children,['y']); // 将自控件按照y值排序
          let largeThan = false; // 用于判断是否大于当前控件y值
          let accHeight = parent.y + parent.innerY; // 累加高度总和
          console.log(newWidget.y);
          children = children.map(child => {
            console.log(child.type+":"+child.y);
            if(child.y > newWidget.y){ // 如果子控件大于当前控件y值，则设置控件y值为当前累加高度，并增加子控件y值
              newWidget.y = accHeight;
              child.y = child.y + newWidget.height;
              largeThan = true;
            }else if(largeThan) { // 如果已经找到大于的子控件，则剩余子控件依次增加y值
              child.y = child.y + newWidget.height;
            }else { // 累加高度
              accHeight += child.height;
            }
            return child;
          });
          if(children.length === 0 || !largeThan){ // 如果没有子控件或插入在末尾
            newWidget.y = accHeight;
          }
          let others = state.widgets.filter(w => w.parentId !== newWidget.parentId && parent.id !== w.id); // 其他无关控件
          children = _.sortBy([newWidget,...children],['y']); // 分别排序防止多层控件位置混乱
          others = _.sortBy([...others,parent,],['y']);
          let widgets = [...others,...children];
          widgets = resetParentHeight(newWidget,widgets); // 递归重置父级高度和受影响的其他控件y值
          return { ...state, widgets  };
        }
        return { ...state, widgets: [...state.widgets, newWidget] };
      }
      case 'moveWidget': {
        const { id,parentId,y } = action.payload;
        const widget = state.widgets.find(w => w.id === id);
        const oldParent = state.widgets.find(w => w.id === widget.parentId);
        let oldParentChildren = state.widgets.filter(w => w.parentId === widget.parentId && w.id !== widget.id);
        oldParentChildren.map(child => {

        });
        if(oldParent.parentId)
          oldParent.height -= widget.height;

        widget.parentId = parentId;
        const idx = state.widgets.findIndex(w => w.id === id);
        return { ...state, widgets: [...state.widgets,] };
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