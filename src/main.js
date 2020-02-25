// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button,Input,Form,FormItem,Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,BreadcrumbItem,Card
,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog} from 'element-ui';
import {Message,MessageBox} from 'element-ui'
//的导入字体图标
import './assets/fonts/iconfont.css'
//引入全局样式
import  './assets/css/global.css'

import axios from 'axios'

//配置请求的根路径

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
});
Vue.prototype.$http =axios;

//导入element-ui中的message组件
Vue.prototype.$message =Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
