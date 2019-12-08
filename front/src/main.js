import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import io from "socket.io-client"

Vue.prototype.$socket = io("https://d4eee0f6.ngrok.io")

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
