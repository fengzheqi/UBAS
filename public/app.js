/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/12
 */
import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import VueResource from 'vue-resource';
import {dateFormat} from './filters';

Vue.filter('dateFormat', dateFormat);
Vue.use(VueResource);


new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
