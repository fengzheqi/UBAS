/**
 * @file 定义路由
 * @author tommyzqfeng
 * @date 2016/12/20
 */
import VueRouter from 'vue-router';

import AppList from './components/AppList.vue';
import Dashboard from './components/dashboard/Dashboard.vue';

import VisitPage from './components/pageAnalysis/VisitPage.vue';
import ThermalMap from './components/pageAnalysis/ThermalMap.vue';
import FlowMap from './components/pageAnalysis/FlowMap.vue';

import Location from './components/visitorAnalysis/Location.vue';
import NewVisitor from './components/visitorAnalysis/NewVisitor.vue';
import Origin from './components/visitorAnalysis/Origin.vue';
import StandTime from './components/visitorAnalysis/StandTime.vue';
import System from './components/visitorAnalysis/System.vue';
import Terminal from './components/visitorAnalysis/Terminal.vue';

import BuryPoint from './components/customAnalysis/BuryPoint.vue';
import FunnelChart from './components/customAnalysis/FunnelChart.vue';

/**
 * 前端全局路由定义
 * @type {*[]}
 */
const routes = [
  { path: '/', component: AppList },

  /* 主面板 */
  { path: '/app', component: Dashboard},

  /* 页面分析 */
  { path: '/app/visitPage', component: VisitPage},
  { path: '/app/thermalMap', component: ThermalMap},
  { path: '/app/flowMap', component: FlowMap},

  /* 访客分析 */
  { path: '/app/location', component: Location},
  { path: '/app/newVisitor', component: NewVisitor},
  { path: '/app/origin', component: Origin},
  { path: '/app/standTime', component: StandTime},
  { path: '/app/system', component: System},
  { path: '/app/terminal', component: Terminal},

  /* 定制分析 */
  { path: '/app/buryPoint', component: BuryPoint},
  { path: '/app/funnelChart', component: FunnelChart},

];

export default new VueRouter({
  routes // （缩写）相当于 routes: routes
});


