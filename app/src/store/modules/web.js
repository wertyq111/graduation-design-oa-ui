/**
 * 前端管理
 */
import axios from 'axios';
import setting from '@/config/setting';
import {formatMenus} from 'ele-admin';
import createPersistedState from "vuex-persistedstate";

export default {
  namespaced: true,
  state: {
    toolbar: {
      visible: false,
      enter: true
    },
    categories: [],
    currentUser: {},
    currentAdmin: {},
    webInfo: {
      webName: "",
      webTitle: [],
      notices: [],
      footer: "",
      backgroundImage: "",
      avatar: ""
    }
  },
  getters: {
    articleTotal: state => {
      if (state.categories !== null && state.categories.length !== 0) {
        if (state.categories.length === 1) {
          return state.categories[0].countOfSort;
        } else {
          return state.categories.reduce((prev, curr) => {
            if (typeof prev === "number") {
              return prev + curr.countOfSort;
            } else {
              return prev.countOfSort + curr.countOfSort;
            }
          });
        }
      } else {
        return 0;
      }
    },
    navigationBar: state => {
      if (state.categories !== null && state.categories.length !== 0) {
        return state.categories.filter(f => f.sortType === 0);
      } else {
        return [];
      }
    }
  },
  mutations: {
    CHANGE_TOOLBAR_STATUS(state, toolbarState) {
      state.toolbar = toolbarState;
    },
    LOAD_CATEGORIES(state, categories) {
      if (categories !== null && categories.length !== 0) {
        state.categories = categories.sort((s1, s2) => s1.priority - s2.priority);
      }
    },
    LOAD_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    LOAD_CURRENT_ADMIN(state, user) {
      state.currentAdmin = user;
    },
    LOAD_WEB_INFO(state, webInfo) {
      webInfo.webTitle = webInfo.webTitle.split('');
      webInfo.notices = JSON.parse(webInfo.notices);
      state.webInfo = webInfo;
    }
  },
  actions: {
    changeToolbarStatus({commit}, obj) {
      commit('CHANGE_TOOLBAR_STATUS', obj);
    },
    /**
     * 加载分类列表
     *
     * @param commit
     * @param obj
     */
    loadCategories({commit}, obj) {
      commit('LOAD_CATEGORIES', obj);
    },
    /**
     * 设置当前用户
     *
     * @param commit
     * @param obj
     */
    loadCurrentUser({commit}, obj) {
      commit('LOAD_CURRENT_USER', obj);
    },
    /**
     * 设置当前管理员
     *
     * @param commit
     * @param obj
     */
    loadCurrentAdmin({commit}, obj) {
      commit('LOAD_CURRENT_ADMIN', obj);
    },
    /**
     * 设置网站信息
     *
     * @param commit
     * @param obj
     */
    loadWebInfo({commit}, obj) {
      commit('LOAD_WEB_INFO', obj);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
}
