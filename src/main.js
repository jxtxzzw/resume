import Vue from 'vue';

import ViewUI from 'view-design';
import VueCodemirror from 'vue-codemirror';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import router from './router';

import 'view-design/dist/styles/iview.css';

// import more codemirror resource...
import 'codemirror/lib/codemirror';
// import base style
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/idea.css';
// codemirror language
import 'codemirror/mode/clike/clike'; // Java, C, C++ 都是 clike 中的
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/mllike/mllike';
// codemirror active-line.js
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/search/search';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

const { messages } = require('./assets/lang');

Vue.use(ViewUI);
// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)
Vue.use(VueI18n);
Vue.use(VueCodemirror, {
  options: { theme: 'idea' },
  events: ['scroll'],
});

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
