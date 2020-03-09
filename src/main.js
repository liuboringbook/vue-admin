// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button,Input,Form,FormItem,Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,BreadcrumbItem,Card
,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,Tag,Tree,Select,Option,Cascader,Alert,Tabs,TabPane,Steps,Step,CheckboxGroup,Checkbox,
Upload,Timeline,TimelineItem} from 'element-ui';
import {Message,MessageBox} from 'element-ui'
//的导入字体图标
import './assets/fonts/iconfont.css'
//引入全局样式
import  './assets/css/global.css'

import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

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

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//导入表格树形
Vue.component('tree-table',TreeTable);

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
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Alert);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Steps);
Vue.use(Step);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Timeline);
Vue.use(TimelineItem);
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;


Vue.filter('dataFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear();
  const m =(dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,'0');
  const hh =(dt.getHours()+'').padStart(2,'0');
  const mm =(dt.getMinutes()+'').padStart(2,'0');
  const ss =(dt.getSeconds()+'').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
