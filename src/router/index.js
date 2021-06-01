import Vue from 'vue'
import Router from 'vue-router'
import Home from '../TabView/home/Home.vue'
import search from '../TabView/search/Search.vue'
import order from '../TabView/order/Order.vue'
import own from '../TabView/own/Owncenter.vue'
import login from '../TabView/login/Login.vue'
import shop from '../components/shop/shop.vue'
import shopfood from '../components/shop/shopfood.vue'
import shopcomment from '../components/shop/shopComment.vue'
import shopinfo from '../components/shop/shopInfo.vue'
Vue.use(Router) //挂载路由对象到Vue

export default new Router({
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                showfooter: true,
            }
        },
        {
            path: '/search',
            component: search,
            meta: {
                showfooter: true,
            }
        },
        {
            path: '/order',
            component: order,
            meta: {
                showfooter: true,
            }
        },
        {
            path: '/profile',
            component: own,
            meta: {
                showfooter: true,
            }
        },
        {
            path: '/',
            redirect: './home',
        },
        {
            path: '/login',
            component: login
        },
        {
          path: '/shop',
          component: shop,
          children: [
            { 
              path: '/shop/shopfood',
              component: shopfood
            },
            { 
              path: '/shop/shopcomment',
              component: shopcomment
            },
            { 
              path: '/shop/shopinfo',
              component: shopinfo
            }
          ]
      }
    ]
})