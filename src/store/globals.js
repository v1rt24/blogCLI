export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
  },
  getters: {
    getLoading: s => s.loading,
    getError: s => s.error,
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    },
  },
  actions: {
    loading ({commit}, payload) {
      commit('setLoading', payload);
    },
    error ({commit}, payload) {
      commit('setError', payload);
    },
    clearError ({commit}) {
      commit('clearError');
    },
  },
};