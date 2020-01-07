import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('item', {
  state: {
    buttons: [

    ],
    tab: 'list'
  },
  effects: {
    *find({ payload }, { select, call, put }) {
      const Find_GQL = `
            query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
              item_find (app: $app, pagination: $pagination, sorter: $sorter){
                list{
                  id
                  itemNum
                  desc
                  amount
                  cost
                }
                count
              },
            }
          `;
      const {pagination,filter,sorter} = payload;
      const response = yield call(query, Find_GQL, {
        app: 'item',
        pagination: pagination || { currentPage: 1, pageSize: 10 },
      });
      yield put({
        type: 'setValue',
        payload: {
          items: response.data[`item_find`].list,
          item: response.data[`item_find`].list[0],
          total: response.data[`item_find`].count,
        },
      });
    },
  },
});
