import Vue from 'vue';
import ViewUI from 'view-design';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import 'view-design/dist/styles/iview.css';

const { messages } = require('./assets/lang');

Vue.use(ViewUI);
// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)
Vue.use(VueI18n);

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'cn', // 设置地区
  messages, // 设置地区信息
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  i18n, // 通过 `i18n` 选项创建 Vue 实例
}).$mount('#app');
