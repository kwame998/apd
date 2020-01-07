import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('workorder', {
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
              workorder_find (app: $app, pagination: $pagination, sorter: $sorter){
                list{
                  id
                  woNum
                  desc
                }
                count
              },
            }
          `;
      const {pagination,filter,sorter} = payload;
      const response = yield call(query, Find_GQL, {
        app: 'workorder',
        pagination: pagination || { currentPage: 1, pageSize: 10 },
      });
      yield put({
        type: 'setValue',
        payload: {
          items: response.data[`workorder_find`].list,
          item: response.data[`workorder_find`].list[0],
          total: response.data[`workorder_find`].count,
        },
      });
    },
    *findOne({ payload }, { select, call, put }) {
      const idx = yield select(state => {
        const { items } = state['workorder'];
        return items.findIndex(i => i.id === payload);
      });
      const { gql } = payload;
      const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              workorder_findOne (app: $app, id: $id){
                ${gql}
              },
            }
          `;
      const response = yield call(query, FindOne_GQL, {
        app: 'workorder',
        id: payload.id,
      });
      yield put({ type: 'setItemValue', payload: response.data[`workorder_findOne`] });
      yield put({ type: 'setValue', payload: { itemIdx: idx > -1 ? idx : 0 } });
    },
    *findItem({ payload }, { select, call, put }) {
      const item = yield select(state => (state['workorder'].item));
      const { gql } = payload;
      const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              workorder_findOne (app: $app, id: $id){
                ${gql}
              },
            }
          `;
      const response = yield call(query, FindOne_GQL, {
        app: 'workorder',
        id: item.id,
      });
      yield put({ type: 'setItemValue', payload: response.data[`workorder_findOne`] });
    },
  },
  reducers: {
    test(state, { payload }) {
      return {
        ...state
      }
    }
  }
});
