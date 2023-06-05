/**
 * vuex状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import theme from './modules/theme';
import web from './modules/web';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    web,
    theme
  },
  getters
});
