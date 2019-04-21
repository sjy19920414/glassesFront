import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import 'babel-polyfill'
import './styles/basic.scss'
import './styles/vars.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('./common/lang/zh_CN'),
    'en': require('./common/lang/en')
  }
})
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')