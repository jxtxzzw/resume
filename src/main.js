import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import router from './router';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
