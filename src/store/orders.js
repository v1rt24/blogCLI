import firebase from 'firebase/app';

class Order {
  constructor (name, phone, alias, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.alias = alias;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    getNoDone (state) {
      return state.orders.filter(el => !el.done);
    },
    getDone (state) {
      return state.orders.filter(el => el.done);
    },
    getOrders (state, getters) {
      return [...getters.getNoDone, ...getters.getDone];
    },
  },
  mutations: {
    setOrder (state, order) {
      state.orders = order;
    },
  },
  actions: {
    async createOrder (
      {commit, dispatch}, {name, phone, alias, adId, ownerId}) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      const order = new Order(
        name,
        phone,
        alias,
        adId,
      );

      try {
        const uid = await dispatch('user/getUid', null, {root: true});
        await firebase.database().ref(`users/${uid}/orders`).push(order);
        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setError', error.code, {root: true});
        commit('globals/setLoading', false, {root: true});
        throw error;
      }
    },
    async fetchOrders ({commit, dispatch}) {
      commit('globals/clearError', null, {root: true});
      // commit('globals/setLoading', true, {root: true});

      try {
        const uid = await dispatch('user/getUid', null, {root: true});

        const res = (await firebase.database().
          ref(`users/${uid}/orders`).
          once('value')).val();

        const data = Object.keys(res).map(key => ({...res[key], id: key}));
        commit('setOrder', data);

        // commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setError', error.code, {root: true});
        // commit('globals/setLoading', false, {root: true});
        throw error;
      }
    },
    async markOrderDone ({commit, dispatch}, id) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        const uid = await dispatch('user/getUid', null, {root: true});
        await firebase.database().
          ref(`users/${uid}/orders`).
          child(id).
          update({
            done: true,
          });

        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setLoading', false, {root: true});
        commit('globals/setError', error.code, {root: true});
        throw error;
      }
    },
  },
};