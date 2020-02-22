// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Input,Form,FormItem} from 'element-ui'
//的导入字体图标
import './assets/fonts/iconfont.css'
//引入全局样式
import  './assets/css/global.css'


Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
