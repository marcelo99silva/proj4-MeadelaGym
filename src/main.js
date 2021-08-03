import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'
import VueToast from 'vue-toast-notification'
import VueToastr from "vue-toastr"


Vue.config.productionTip = false
Vue.use(VueSession);
Vue.use(VueToastr);
Vue.use(VueToast);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
