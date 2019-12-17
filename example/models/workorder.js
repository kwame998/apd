import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('workorder', {
  state: {

  },
  effects: {
    *fetch({ payload }, { select, call, put }) {
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
      const response = yield call(query, Find_GQL, {
        app: 'workorder',
        pagination: { currentPage: 1, pageSize: 10 },
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
  },
  reducers: {
    test(state, { payload }) {
      return {
        ...state
      }
    }
  }
});
