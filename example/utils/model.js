import { query } from '../services/graphql'
import gql from 'graphql-tag'

function createModel(modelName, obj) {
  const { state, effects, subscriptions, reducers } = obj;
  return {
    namespace: `${modelName}`,
    state: Object.assign(
      {
        items: [],
        item: {},
        itemIdx: 0,
        pagination: {
          current: 1,
          pageSize: 10,
        },
        total: 0,
        sorter: [],
        filter: [],
      },
      state
    ),
    subscriptions: Object.assign({}, subscriptions),
    effects: Object.assign(
      {
        *fetch({ payload }, { select, call, put }) {

        },
        *reset({ payload }, { select, call, put }) {

        },
        *findOne({ payload }, { select, call, put }) {

        },
        * save({ payload }, { select, call, put }) {

        },
        * remove({ payload }, { select, call, put }) {

        },
        * preview({ payload }, { select, call, put }) {

        },
        * next({ payload }, { select, call, put }) {

        },
      },
      effects
    ),
    reducers: Object.assign(
      {
        setValue(state, action) {
          return { ...state, ...action.payload };
        },
        setItemValue(state, action) {
          return {
            ...state,
            item: {
              ...state.item,
              ...action.payload,
            },
          };
        },
      },
      reducers
    ),
  };
}

export { createModel };
