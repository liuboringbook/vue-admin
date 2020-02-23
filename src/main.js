// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Input,Form,FormItem} from 'element-ui';
import {Message} from 'element-ui'
//的导入字体图标
import './assets/fonts/iconfont.css'
//引入全局样式
import  './assets/css/global.css'

import axios from 'axios'

//配置请求的根路径
Vue.prototype.$http =axios;
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

//导入element-ui中的message组件
Vue.prototype.$message =Message;

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
