import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    username: '',
    userList: [],
    rooms: [],
    messages: [],
  },
  getters: {
    username: state => state.username,
    userList: state => state.userList.filter(obj => obj.username !== state.username),
    rooms: state => state.rooms,
    messages: state => state.messages,
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.username = payload;
    },
    [types.SET_USER_LIST](state, payload) {
      state.userList = payload;
    },
    [types.SET_MESSAGE](state, payload) {
      state.messages = [...payload];
    },
    [types.PUSH_MESSAGE](state, payload) {
      state.messages.push(payload);
    },
    [types.SET_ROOMS](state, payload) {
      state.rooms = payload;
    },    [types.SET_ROOMS](state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
    [types.LOGIN]({ commit }, payload) {
      commit(types.SET_USER, payload.username);
      commit(types.SET_ROOMS, payload.rooms);
      commit(types.SET_USER_LIST, payload.users);
    },

    [types.LEAVE_ROOM]({ commit }, payload) {
      commit(types.SET_ROOMS, payload);
      commit(types.SET_MESSAGE, []);
    },
  },
});
