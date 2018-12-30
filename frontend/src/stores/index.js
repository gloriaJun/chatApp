import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    username: '',
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.username = payload;
    },
  },
  actions: {
    [types.LOGIN]({ commit }, payload) {
      commit(types.SET_USER, payload.username);
    },
  },
});
