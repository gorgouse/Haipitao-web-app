import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "login" */ '@/register.vue')
    },
    {
      path: '/chattest',
      name: 'chattest',
      component: () => import(/* webpackChunkName: "myorder" */ '@/chattest.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "myorder" */ '@/chat.vue')
    },
    {
      path: '/pratice',
      name: 'pratice',
      component: () => import(/* webpackChunkName: "myorder" */ '@/pratice.vue')
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import(/* webpackChunkName: "myorder" */ '@/evaluate.vue')
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import(/* webpackChunkName: "myorder" */ '@/changePassword.vue')
    },
    {
      path: '/frame',
      redirect:'/home',
      component: () => import(/* webpackChunkName: "frame" */ '@/frame.vue'),
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/home.vue')
        },
        {
          path: '/sort',
          name: 'sort',
          component: () => import(/* webpackChunkName: "myorder" */ '@/sort.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "myorder" */ '@/mine.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import(/* webpackChunkName: "home" */ '@/search.vue')
        },
        {
          path: '/goodsdetail',
          name: 'goodsdetail',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/goodsdetail.vue')
        },
        {
          path: '/slide',
          name: 'slide',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/slide.vue')
        },
        {
          path: '/shopcar',
          name: 'shopcar',
          component: () => import(/* webpackChunkName: "shopcar" */ '@/shopcar.vue')
        },
        {
          path: '/ensure',
          name: 'ensure',
          component: () => import(/* webpackChunkName: "myorder" */ '@/ensure.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import(/* webpackChunkName: "myorder" */ '@/address.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import(/* webpackChunkName: "myorder" */ '@/order.vue')
        },
        {
          path: '/orderdetail',
          name: 'orderdetail',
          component: () => import(/* webpackChunkName: "myorder" */ '@/orderdetail.vue')
        },
        {
          path: '/edit',
          name: 'edit',
          component: () => import(/* webpackChunkName: "myorder" */ '@/edit.vue')
        },
        {
          path: '/add',
          name: 'add',
          component: () => import(/* webpackChunkName: "myorder" */ '@/add.vue')
        },
        {
          path: '/chatlist',
          name: 'chatlist',
          component: () => import(/* webpackChunkName: "myorder" */ '@/chatlist.vue')
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import(/* webpackChunkName: "home" */ '@/shop.vue'),
          redirect:'/recommend',
          children:[
            {
              path: '/recommend',
              name: 'recommend',
              component: () => import(/* webpackChunkName: "myorder" */ '@/recommend.vue')
            },
            {
              path: '/baby',
              name: 'baby',
              component: () => import(/* webpackChunkName: "myorder" */ '@/baby.vue')
            },
          ]
        },
      ]
    },
  ],
  scrollBehavior (to, from, savedPosition) {//解决拖动时多个页面互相影响的问题，当切换到新路由时，想要页面滚到顶部
    return { x: 0, y: 0 }
  }
})
