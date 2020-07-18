import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'          //在路由在引用注册页面
import Login from '@/components/pages/Login'                //在路由在引用登录页面
import Goods from '@/components/pages/Goods'                //在路由在引用Goods
import CategoryList from '@/components/pages/CategoryList'  //在路由在引用CategoryList
import Cart from '@/components/pages/Cart'                  //在路由在引用Cart
import Main from '@/components/pages/Main'                  //在路由在引用Main
import Member from '@/components/pages/Member'                  //在路由在引用Member


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main,
      children:[
        { path: '/',name: 'ShoppingMall',component: ShoppingMall },
        { path:'/CategoryList',name: 'CategoryList',component: CategoryList },
        { path:'/Cart', name: 'Cart', component: Cart },
        { path:'/Member', name: 'Member', component: Member },
      ]
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/Goods',
      name: 'Goods',
      component: Goods
    },

  ]
})
