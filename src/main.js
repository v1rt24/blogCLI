import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';
import Media from 'vue-media';
import VueMeta from 'vue-meta';
import Loading from '@/components/Loading';
import BuyModal from '@/components/BuyModal';

// firebase
import config from './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import 'firebase/messaging';

firebase.initializeApp(config);
// /firebase

Vue.component('Media', Media);
Vue.component('Loading', Loading);
Vue.component('ByModal', BuyModal);
Vue.use(Vuelidate);
Vue.use(VueMeta);

import 'material-design-icons-iconfont';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/scss/index.scss';

Vue.config.productionTip = false;

// Оригинал
/*new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');*/

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // Поддержка авторизации
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('user/autoLoginUser', user);
      }
    });
    // Получаем все записи при загрузки приложения
    store.dispatch('ads/fetchAds');
  },
}).$mount('#app');
