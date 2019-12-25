import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('workorder', {
  state: {
    buttons: [{ type: 'pushbutton', title: '按钮', id: 'workorder_addBtn', parentId: 'canvas', detail: { label: '新增', isDefault:true }}],
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
                  assocEQ{
                    list{
                      eqNum
                      desc
                      status
                    }
                    count
                  }
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
      const FindOne_GQL = `
            query Find($app: String!, $id: ID!){
              workorder_findOne (app: $app, id: $id){
                id
                woNum
                desc
                assocEQ{
                  list{
                    eqNum
                    desc
                    status
                  }
                  count
                }
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
  },
  reducers: {
    test(state, { payload }) {
      return {
        ...state
      }
    }
  }
});
