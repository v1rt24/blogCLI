import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';
import Media from 'vue-media';
import VueMeta from 'vue-meta';

Vue.use(Vuelidate);
Vue.component('Media', Media);
Vue.use(VueMeta);

import 'material-design-icons-iconfont';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/scss/index.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
