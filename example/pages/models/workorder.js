export default {
  namespace: 'workorder',

  state: {
    items: [],
    item: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = [{id:1,name:'test1'},{id:2,name:'test2'}];
      yield put({ type: 'setValue', payload: {items: response},});
      yield put({ type: 'findOne', payload: {},});
    },
    *findOne({ payload }, { call, put }) {
      const response = {id:3,name:'test3'};
      yield put({ type: 'setValue', payload: {item: response},});
    },
  },

  reducers: {
    setValue(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
