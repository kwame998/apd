import EE from 'eventemitter3'
import request from './request';

export default class AppBean extends EE {

  buttons = [
    { type: 'appbutton', id: 'workorder_addBtn', detail: { label: '新增', isDefault:true,event:'insert',visible:'list' }},
    { type: 'appbutton', id: 'workorder_prevBtn', detail: { label: '上一条', event:'previous',visible:'insert' }},
    { type: 'appbutton', id: 'workorder_nextBtn', detail: { label: '下一条', event:'next',visible:'insert' }},
    { type: 'appbutton', id: 'workorder_saveBtn', detail: { label: '保存', isDefault:true, event:'save',visible:'insert' }},
  ];

  widgets = [];

  items = [];

  item = {};

  modelName = '';

  constructor(widgets) {
    super();
    this.widgets = widgets;
    const canvasWidgets = widgets.filter(d => d.type === 'canvas');
    const widget = canvasWidgets[0] || {};
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
    this.on('changeTab',this.changeTab);
    this.on('dialogOpen',this.dialogOpen);
    this.on('dialogClose',this.dialogClose);
  }

  updateWidgets(widgets){
    this.widgets = widgets;
    this.emit(`widgetsUpdated`,this.widgets);
  }

  async find(params) {
    const { widgetId, modelName, pagination, filter, sorter } = params;
    const gql = modelName === 'workorder' ?
      `
        id
        woNum
        desc
      `:
      `
        id
        eqNum
        desc
        status
      `;
    const Find_GQL = `
            query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
              ${modelName}_find (app: $app, pagination: $pagination, sorter: $sorter){
                list{
                  ${gql}
                }
                count
              },
            }
          `;
    const response = await this.query(Find_GQL, {
      app: modelName,
      pagination: pagination || { currentPage: 1, pageSize: 10 },
    });
    if(this.modelName === modelName){
      this.items = response.data[`${modelName}_find`].list;
      this.total = response.data[`${modelName}_find`].count;
    }
    this.emit(`${widgetId}:find`,{
      items: response.data[`${modelName}_find`].list,
      total: response.data[`${modelName}_find`].count,
    });
  }

  async findOne(params) {
    const { widgetId, modelName, value } = params;
    const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              ${modelName}_findOne (app: $app, id: $id){
                id
                woNum
                desc
                assocEQ{
                  list{
                    id
                    eqNum
                    desc
                    status
                  }
                  count
                }
              },
            }
          `;
    const response = await this.query(FindOne_GQL, {
      app: modelName,
      id: value,
    });
    if(this.modelName === modelName){
      this.item = {...this.item,...response.data[`${modelName}_findOne`]};
      this.emit(`itemUpdated`,this.item);
    }else {
      this.emit(`${modelName}:findOne`, {
        item: response.data[`${modelName}_findOne`],
      });
    }
  }

  async selectRecord(params){
    const { modelName } = params;
    this.emit('findOne',params);
    const tabgroup = this.widgets.find(w => w.type === 'tabgroup' && w.detail.isMain);
    if(tabgroup){
      const tab = this.widgets.find(w => w.type === 'tab' && w.parentId === tabgroup.id && w.detail.type === 'insert');
      if(tab) {
        this.emit('changeTab', { modelName,widgetId: tab.id });
      }
    }
  }

  async findByTable(params){
    const { widgetId, modelName, objName, pagination, filter, sorter } = params;
    const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              ${modelName}_findOne (app: $app, id: $id){
                ${objName}{
                  list{
                    id
                    eqNum
                    desc
                    status
                  }
                  count
                }
              },
            }
          `;
    const response = await this.query(FindOne_GQL, {
      app: modelName,
      id: this.item.id,
    });
    if(this.modelName === modelName){
      this.item = {...this.item,...response.data[`${modelName}_findOne`]};
    }
    this.emit(`${widgetId}:find`,{
      items: response.data[`${modelName}_findOne`][objName].list,
      total: response.data[`${modelName}_findOne`][objName].count,
    });
  }

  async findByTab(params) {
    const { widgetId, modelName } = params;
    const gql = widgetId === 'canvas_tabgroup2_tab1' ?
      `
        assocItem{
          list{
            id
            itemNum
            desc
            amount
            cost
          }
          count
        }
        `
      :
      `
        assocPerson{
          list{
            id
            personID
            name
            email
          }
          count
        }
        `;
    const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              ${modelName}_findOne (app: $app, id: $id){
                ${gql}
              },
            }
          `;
    const response = await this.query(FindOne_GQL, {
      app: modelName,
      id: this.item.id,
    });
    if(this.modelName === modelName){
      this.item = {...this.item,...response.data[`${modelName}_findOne`]};
      this.emit(`itemUpdated`,this.item);
    }else {
      this.emit(`${modelName}:findOne`,{
        item: response.data[`${modelName}_findOne`],
      });
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

  changeTab(params){
    const { modelName,widgetId } = params;
    this.emit(`${modelName}:changeTab`,widgetId);
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
