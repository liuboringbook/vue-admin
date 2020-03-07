import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Welcome from '@/components/welcome'
import Users from '@/components/user/users'
import Rights from '@/components/rights/rights'
import Roles from '@/components/rights/roles'
import Goods from '@/components/goods/goods'
import Params from '@/components/goods/params'
import Categories from '@/components/goods/categories'
import Orders from '@/components/orders/orders'
import Reports from '@/components/reports/reports'
import Add from '@/components/goods/add'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome',component:Welcome},
        {path:'/users',component:Users},
        {path:'/rights',component:Rights},
        {path:'/roles',component:Roles},
        {path:'/goods',component:Goods},
        {path:'/goods/add',component:Add},
        {path:'/params',component:Params},
        {path:'/categories',component:Categories},
        {path:'/orders',component:Orders},
        {path:'/reports',component:Reports}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
});

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //form 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  if(to.path =='/login') return next();
  //获取token
 const tokenStr = window.sessionStorage.getItem('token');
 if(!tokenStr) return next('/login');
  next();
})
export default router
