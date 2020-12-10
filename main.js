import Vue from 'vue'
import App from './App'
import tui  from './common/webview.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$tui = tui
const app = new Vue({
    ...App
})
app.$mount()
