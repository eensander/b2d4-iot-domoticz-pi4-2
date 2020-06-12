import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

import './assets/styles/index.css';


import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
