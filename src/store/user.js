import firebase from 'firebase/app';

class User {
  constructor (id) {
    this.id = id;
  }
}

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: s => s.user,
    getIsUserLoggedIn: s => s.user !== null,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
  },
  actions: {
    // Регистрация пользователя
    async registerUser ({commit}, {email, password}) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        const user = await firebase.auth().
          createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid));
        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setLoading', false, {root: true});
        commit('globals/setError', error.code, {root: true});
        throw error;
      }
    },
    // Авторизация пользователя
    async loginUser ({commit}, {email, password}) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        const user = await firebase.auth().
          signInWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid));
        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setLoading', false, {root: true});
        commit('globals/setError', error.code, {root: true});
        throw error;
      }
    },
    // Поддержка авторизации пользователя
    autoLoginUser ({commit}, user) {
      commit('setUser', new User(user.uid));
    },
    // Выход из учётной записи
    async logout ({commit}) {
      await firebase.auth().signOut();
      commit('setUser', null);
    },
    // Для получения всех данных авторизованного пользователя
    getUid () {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};