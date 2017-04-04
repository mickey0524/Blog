import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
