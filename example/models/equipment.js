import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('equipment', {
  state: {
    buttons: [
      { type: 'appbutton', id: 'workorder_addBtn', detail: { label: '新增', isDefault:true,event:'insert',visible:'list' }},
      { type: 'appbutton', id: 'workorder_prevBtn', detail: { label: '上一条', event:'previous',visible:'insert' }},
      { type: 'appbutton', id: 'workorder_nextBtn', detail: { label: '下一条', event:'next',visible:'insert' }},
      { type: 'appbutton', id: 'workorder_saveBtn', detail: { label: '保存', isDefault:true, event:'save',visible:'insert' }},
    ],
    tab: 'list'
  },
  effects: {
    *find({ payload }, { select, call, put }) {
      const Find_GQL = `
            query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
              equipment_find (app: $app, pagination: $pagination, sorter: $sorter){
                list{
                  id
                  eqNum
                  desc
                  status
                }
                count
              },
            }
          `;
      const {pagination,filter,sorter} = payload;
      const response = yield call(query, Find_GQL, {
        app: 'equipment',
        pagination: pagination || { currentPage: 1, pageSize: 10 },
      });
      yield put({
        type: 'setValue',
        payload: {
          items: response.data[`equipment_find`].list,
          item: response.data[`equipment_find`].list[0],
          total: response.data[`equipment_find`].count,
        },
      });
    },
  },
});