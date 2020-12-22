import Vue from 'vue';
import Vuex from 'vuex';

import globals from '@/store/globals';
import ads from '@/store/ads';
import user from '@/store/user';
import orders from '@/store/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    globals,
    ads,
    user,
    orders,
  },
});
