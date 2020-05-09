import Vue from 'vue'
import App from './App'
import pageHead from './components/page-head.vue'
import pageMenu from './components/page-menu.vue'

Vue.component('page-head',pageHead)
Vue.component('page-menu',pageMenu)
Vue.config.productionTip = false

App.mpType = 'app'

// #ifdef H5  
import wechat from './common/wechat'  
if(wechat.isWechat()){  
    Vue.prototype.$wechat = wechat;  
}  
// #endif

const app = new Vue({
    ...App
})
app.$mount()
