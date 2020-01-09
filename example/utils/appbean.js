import EE from 'eventemitter3'
import request from './request';
import _ from 'lodash';

export default class AppBean extends EE {

  buttons = [
    { type: 'appbutton', id: 'workorder_addBtn', detail: { label: '新增', isDefault:true,event:'insert',visible:'list' }},
    { type: 'appbutton', id: 'workorder_prevBtn', detail: { label: '上一条', event:'previous',visible:'insert' }},
    { type: 'appbutton', id: 'workorder_nextBtn', detail: { label: '下一条', event:'next',visible:'insert' }},
    { type: 'appbutton', id: 'workorder_saveBtn', detail: { label: '保存', isDefault:true, event:'save',visible:'insert' }},
  ];

  widgets = [];

  rootWidget = {};

  items = [];

  item = {};

  modelName = '';

  constructor(widgets) {
    super();
    this.widgets = widgets;
    const canvasWidgets = widgets.filter(d => d.type === 'canvas');
    const widget = canvasWidgets[0] || {};
    this.rootWidget =  widget;
    const {detail = {}} = widget;
    this.modelName = detail.modelName;
    this.initEvents();
  }

  initEvents(){
    this.on('find',this.find);
    this.on('findOne',this.findOne);
    this.on('selectRecord',this.selectRecord);
    this.on('findByTab',this.findByTab);
    this.on('findByTable',this.findByTable);
    this.on('changeAppTab',this.changeAppTab);
    this.on('dialogOpen',this.dialogOpen);
    this.on('dialogClose',this.dialogClose);
  }

  updateWidgets(widgets){
    this.widgets = widgets;
    this.emit(`widgetsUpdated`,this.widgets);
  }

  changeAppTab(params){
    const { widgetId } = params;
    this.emit(`appTabChanged`,widgetId);
  }

  setItem(payload){
    this.item = {...this.item,...payload};
    this.emit(`itemUpdated`,this.item);
  }

  appendGQL(widget){
    const { detail = {} } = widget;
    const { dataAttribute,objName } = detail;
    const children = this.widgets.filter(w => w.parentId === widget.id);
    if(widget.type === 'table'){
      if(objName){
        return `
          ${objName}{
            list{
              id
              ${children.map(child => this.appendGQL(child)).filter(child => !!child).join('\n')}
            }
            count
          }
        `;
      }
      return `
        list{
          id
          ${children.map(child => this.appendGQL(child)).filter(child => !!child).join('\n')}
        }
        count
      `;
    }else if(widget.type === 'tabgroup'){
      let tab = children.filter(child => child.detail.visible);
      if(!tab){
        tab = children[0];
      }
      return this.appendGQL(tab)
    }else if(dataAttribute){
      return `
        ${dataAttribute}
        ${children.map(child => this.appendGQL(child)).filter(child => !!child).join('\n')}
      `;
    }else if(objName){
      return `
        ${objName}{
          id
          ${children.map(child => this.appendGQL(child)).filter(child => !!child).join('\n')}
        }
      `;
    }else if(!_.isEmpty(children)) {
      return children.map(child => this.appendGQL(child)).filter(child => !!child).join('\n');
    }else {
      return undefined;
    }
  }

  getGQL(widgetId){
    const widget = this.widgets.find(w => w.id === widgetId);
    const gql = this.appendGQL(widget);
    if(widget.type === 'table'){
      const { detail:{isMain,dataSrc,objName} } = widget;
      if(isMain){
        return `
          query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
            ${this.modelName}_find (app: $app, pagination: $pagination, sorter: $sorter){
              ${gql}
            }
          }
        `
      }else if(dataSrc){
        const ds = this.widgets.find(w => w.type === 'datasrc' && w.id === dataSrc);
        const { detail:{modelName}} = ds;
        return `
          query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
            ${modelName}_find (app: $app, pagination: $pagination, sorter: $sorter){
              ${gql}
            }
          }
        `
      }else if(objName){
        return `
          query Find($app: String!, $id: ID!){
            ${this.modelName}_findOne (app: $app, id: $id){
              id
              ${gql}
            }
          }
        `;
      }
    }else if(widget.type === 'tab'){
      return `
        query Find($app: String!, $id: ID!){
          ${this.modelName}_findOne (app: $app, id: $id){
            id
            ${gql}
          }
        }
      `;
    }
  }

  async find(params) {
    const { widgetId, modelName, pagination, filter, sorter } = params;
    const gql = this.getGQL(widgetId);
    const response = await this.query(gql, {
      app: modelName,
      pagination: pagination || { currentPage: 1, pageSize: 10 },
    });
    if(this.modelName === modelName){
      this.items = response.data[`${modelName}_find`].list;
      this.total = response.data[`${modelName}_find`].count;
    }
    this.emit(`${modelName}:find:${widgetId}`,{
      items: response.data[`${modelName}_find`].list,
      total: response.data[`${modelName}_find`].count,
    });
  }

  async findOne(params) {
    const { widgetId, modelName, value } = params;
    const gql = this.getGQL(widgetId);
    const response = await this.query(gql, {
      app: modelName,
      id: value,
    });
    if(this.modelName === modelName){
      this.setItem(response.data[`${modelName}_findOne`]);
    }else {
      this.emit(`${modelName}:findOne`, {
        item: response.data[`${modelName}_findOne`],
      });
    }
  }

  async findByTable(params){
    const { widgetId, modelName, objName, pagination, filter, sorter } = params;
    const gql = this.getGQL(widgetId);
    const response = await this.query(gql, {
      app: modelName,
      id: this.item.id,
    });
    if(this.modelName === modelName){
      this.setItem(response.data[`${modelName}_findOne`]);
    }
    this.emit(`${modelName}:find:${widgetId}`,{
      items: response.data[`${modelName}_findOne`][objName].list,
      total: response.data[`${modelName}_findOne`][objName].count,
    });
  }

  async findByTab(params) {
    const { widgetId, modelName } = params;
    const gql = this.getGQL(widgetId);
    const response = await this.query(gql, {
      app: modelName,
      id: this.item.id,
    });
    if(this.modelName === modelName){
      this.setItem(response.data[`${modelName}_findOne`]);
    }else {
      this.emit(`${modelName}:findOne`,{
        item: response.data[`${modelName}_findOne`],
      });
    }
    this.setTabVisible({widgetId});
  }

  async selectRecord(params){
    const { modelName,value } = params;
    const tabgroup = this.widgets.find(w => w.type === 'tabgroup' && w.detail.isMain);
    if(tabgroup){
      const tab = this.widgets.find(w => w.type === 'tab' && w.parentId === tabgroup.id && w.detail.type === 'insert');
      if(tab) {
        this.emit('findOne',{ modelName,widgetId: tab.id,value });
        this.emit('changeAppTab', { widgetId: tab.id });
      }
    }
  }

  dialogOpen(params){
    const { value:dialogId } = params;
    const widgets = this.widgets.map(w => {
      if(w.type === 'dialog' && w.detail.dialogId === dialogId){
        return {
          ...w,
          detail: {
            ...w.detail,
            visible:true,
          }
        };
      }
      return w;
    });
    this.updateWidgets(widgets);
  }

  dialogClose(params){
    const { value:dialogId } = params;
    const widgets = this.widgets.map(w => {
      if(w.type === 'dialog' && w.detail.dialogId === dialogId){
        return {
          ...w,
          detail: {
            ...w.detail,
            visible:false,
          }
        };
      }
      return w;
    });
    this.updateWidgets(widgets);
  }

  setTabVisible(params){
    const { widgetId } = params;
    const widget = this.widgets.find(w => w.id === widgetId);
    this.widgets = this.widgets.map(w => {
      if(w.type === 'tab' && w.id === widgetId){
        return {
          ...w,
          detail: {
            ...w.detail,
            visible:true,
          }
        };
      }else if(w.type === 'tab' && w.parentId === widget.parentId){
        return {
          ...w,
          detail: {
            ...w.detail,
            visible:false,
          }
        };
      }
      return w;
    });
  }


  toggleRecord(params){

  }

  duplicate(){

  }
  insert(){

  }
  save(){

  }
  previous(){

  }
  next(){

  }
  routeWF(){

  }

  async query(params,variables) {
    return request(`/api/graphql`, {
      method: 'POST',
      data: {query:params,variables},
    });
  }

}
