import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    username: 'test',
    messages: [],
  },
  getters: {
    username: state => state.username,
    messages: state => state.messages,
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.username = payload;
    },
    [types.SET_MESSAGES](state, payload) {
      state.messages.push(payload);
    },
  },
  actions: {
    [types.LOGIN]({ commit }, payload) {
      commit(types.SET_USER, payload.username);
    },
  },
});
