import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI);

NProgress.configure({ showSpinner: false }); //进度条配置

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
