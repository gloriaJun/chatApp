import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    username: '',
    rooms: [],
    messages: [],
  },
  getters: {
    username: state => state.username,
    rooms: state => state.rooms,
    messages: state => state.messages,
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.username = payload;
    },
    [types.SET_MESSAGE](state, payload) {
      state.messages = [...payload];
    },
    [types.PUSH_MESSAGE](state, payload) {
      state.messages.push(payload);
    },
    [types.SET_ROOMS](state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
    [types.LOGIN]({ commit }, payload) {
      commit(types.SET_USER, payload.username);
      commit(types.SET_ROOMS, payload.rooms);
    },

    [types.LEAVE_ROOM]({ commit }, payload) {
      commit(types.SET_ROOMS, payload);
      commit(types.SET_MESSAGE, []);
    },
  },
});
