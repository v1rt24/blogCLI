import firebase from 'firebase/app';

class Ad {
  constructor (
    title,
    alias,
    description,
    imgSrc = '',
    ownerId,
    promo,
    id = null,
  ) {
    this.title = title;
    this.alias = alias;
    this.description = description;
    this.imgSrc = imgSrc;
    this.ownerId = ownerId;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  namespaced: true,
  state: {
    ads: [],
  },
  getters: {
    ads: state => state.ads,
    promoAds: state => state.ads.filter(a => a.promo),
    myAds (state, getters, rootState, rootGetters) {
      const user = rootGetters['user/getUser'];
      if (user) {
        return state.ads.filter(el => el.ownerId === user.id);
      }
      return [];
    },
    adById: state => alias => state.ads.find(als => als.alias === alias),
  },
  mutations: {
    setCreateAd (state, payload) {
      state.ads.push(payload);
    },
    loadAds (state, payload) {
      state.ads = payload;
    },
    updateAd (state, payload) {
      const ad = state.ads.find(el => el.id === payload.id);
      ad.title = payload.title;
      ad.description = payload.description;
    },
  },
  actions: {
    // Создаём новую запись
    async createAds ({commit, dispatch}, dataForm) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        const userId = await dispatch('user/getUid', null, {root: true});

        const newAd = new Ad(
          dataForm.title,
          dataForm.alias,
          dataForm.description,
          '',
          userId,
          dataForm.promo,
        );

        const res = await firebase.database().ref('ads').push(newAd);

        // ДОБАВЛЕНИЕ КАРТИНКИ
        const image = dataForm.image;
        const imageExt = image.name.slice(image.name.lastIndexOf('.'));
        const fileData = firebase.storage().
          ref().
          child(`ads/${res.key}${imageExt}`).
          put(image);

        fileData.on('state_changed',
          function (snapshot) {},
          function (error) {},
          function () {
            fileData.snapshot.ref.getDownloadURL().
              then(async function (downloadURL) {
                await firebase.database().ref('ads').child(res.key).update({
                  imgSrc: downloadURL,
                });

                commit('setCreateAd', {
                  ...newAd,
                  imgSrc: downloadURL,
                  id: res.key,
                });
              });
          });
        // /ДОБАВЛЕНИЕ КАРТИНКИ

        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setLoading', false, {root: true});
        commit('globals/setError', error.code, {root: true});
        throw error;
      }
    },
    // Получаем все записи при загрузки приложения
    async fetchAds ({commit}) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        const data = (await firebase.database().ref('ads').once('value')).val();

        if (data) {
          const res = Object.keys(data).map(key => ({...data[key], id: key}));
          commit('loadAds', res);
        }

        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setLoading', false, {root: true});
        commit('globals/setError', error.code, {root: true});
        throw error;
      }
    },
    // Обновление данных при редактировании записи
    async updateAd ({commit}, {title, description, id}) {
      commit('globals/clearError', null, {root: true});
      commit('globals/setLoading', true, {root: true});

      try {
        await firebase.database().ref('ads').child(id).update({
          title,
          description,
        });

        commit('updateAd', {
          title, description, id,
        });

        commit('globals/setLoading', false, {root: true});
      }
      catch (error) {
        commit('globals/setError', error.code, {root: true});
        commit('globals/setLoading', false, {root: true});
        throw error;
      }
    },
  },
};