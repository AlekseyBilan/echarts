import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import IEcharts from 'vue-echarts-v3/src/lite.js';
import 'echarts/lib/chart/bar';

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
