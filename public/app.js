/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/12
 */

/* 核心依赖 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'

import App from './components/App.vue';
import store from './store';
import router from './routers';

/* 过滤器 */
import {dateFormat} from './filters';

Vue.filter('dateFormat', dateFormat);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
