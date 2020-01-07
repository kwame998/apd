import { createModel } from '../utils/model';
import { query } from '../services/graphql';

export default createModel('person', {
  state: {
    buttons: [

    ],
    tab: 'list'
  },
  effects: {
    *find({ payload }, { select, call, put }) {
      const Find_GQL = `
            query Find($app: String!, $pagination: Pagination, $sorter: [SortItem!]){
              person_find (app: $app, pagination: $pagination, sorter: $sorter){
                list{
                  id
                  personID
                  name
                  phone
                }
                count
              },
            }
          `;
      const {pagination,filter,sorter} = payload;
      const response = yield call(query, Find_GQL, {
        app: 'person',
        pagination: pagination || { currentPage: 1, pageSize: 10 },
      });
      yield put({
        type: 'setValue',
        payload: {
          items: response.data[`person_find`].list,
          item: response.data[`person_find`].list[0],
          total: response.data[`person_find`].count,
        },
      });
    },
  },
});
