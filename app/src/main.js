/** 主入口js */
import Vue from 'vue';
import App from './App.vue';
import './config/axios-config';
import store from './store';
import router from './router';
import './config/axios-config';
import permission from './utils/permission';
import './styles/index.scss';
import EleAdmin from 'ele-admin';
import DialogDirective from 'ele-admin/packages/dialog-directive';
import VueClipboard from 'vue-clipboard2';
import i18n from './lang';
import VueLazyload from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import constant from "@/config/constant"
import common from './utils/common'

// 引入 jquery
import $ from 'jquery'

// 引入js
import './utils/title'

// 引入 css
import './assets/css/animation.css'
import './assets/css/index.css'
import './assets/css/tocbot.css'
import './assets/css/color.css'
import './assets/css/markdown-highlight.css'
import './assets/css/font-awesome.min.css'
import 'mavon-editor/dist/css/index.css'

// 点击涟漪效果
import Ripple from 'vue-ripple-directive'
import {vueBaberrage} from 'vue-baberrage'

// wow滚动效果
import {WOW} from 'wowjs'
import 'wowjs/css/libs/animate.css'

// 配置 jquery
window.jquery = window.$ = $

// 涟漪效果配置
Ripple.color = 'var(--rippleColor)'
Vue.directive("ripple", Ripple)

Vue.config.productionTip = false;
Vue.use(EleAdmin, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(permission);
Vue.use(DialogDirective);
Vue.use(VueClipboard);
Vue.use(vueBaberrage)
Vue.use(mavonEditor)

// 懒加载配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/404.jpg'),
  loading: require('./assets/img/loading.svg'),
  attempt: 1,
  listenEvents: ['scroll']
})

Vue.prototype.$common = common
Vue.prototype.$constant = constant
Vue.prototype.$wow = new WOW({
  boxClass: 'wow', // 需要执行动画的元素的 class
  animateClass: 'animated', //animation.css 动画的 class
  offset: 0, // 距离可视区域多少开始执行动画
  mobile: true, // 是否在移动设备上执行动画
  live: false // 异步加载的内容是否有效
}).init()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
