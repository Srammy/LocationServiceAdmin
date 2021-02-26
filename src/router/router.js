import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);


//1.创建组件
import Device from '../component/home/Device.vue';
import DeviceInfo from '../component/home/device/DeviceInfo.vue';
import DeviceData from '../component/home/device/DeviceData.vue';
import BaiduMap from '../component/home/device/BaiduMap.vue';

import User from '../component/home/User.vue';
import UserInfo from '../component/home/user/UserInfo.vue';
import UserDevConnect from '../component/home/user/UserDevConnect.vue';

import Login from '../component/Login.vue';
import Home from '../component/Home.vue';
import Logout from '../component/Logout.vue';
//2.配置路由
const routes = [
    {
        path:'/login',
        component:Login
    },
    
    {
        path:'/home',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          role:['ROLE_ADMIN','ROLE_USER']
        },
        component:Home,
        children:[
            {
                path:'/home/device', 
                meta: {
                  requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                  role:['ROLE_ADMIN','ROLE_USER']
                },
                component:Device,
                children:[
                    {
                        path:'/home/device/deviceinfo',
                        meta: {
                          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          role:['ROLE_ADMIN','ROLE_USER']
                        },
                        component:DeviceInfo
                    },        
                    {
                        path:'/home/device/devicedata', 
                        meta: {
                          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          role:['ROLE_ADMIN','ROLE_USER']
                        },
                        component:DeviceData
                    },
                    {
                        path:'/home/device/baidumap', 
                        meta: {
                          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          role:['ROLE_ADMIN','ROLE_USER']
                        },
                        component:BaiduMap
                    }
                ]
            },
        
            {
                path:'/home/user',
                meta: {
                  requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                  role:['ROLE_ADMIN']
                },
                component:User,
                children:[
                    {
                        path:'/home/user/userinfo',
                        meta: {
                          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          role:['ROLE_ADMIN','ROLE_USER']
                        },
                        component:UserInfo
                    },
                    {
                        path:'/home/user/userdevconnect', 
                        meta: {
                          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          role:['ROLE_ADMIN','ROLE_USER']
                        },
                        component:UserDevConnect
                    }
                ]
            },
        ]

    },
    {
        path:'/logout',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          role:['ROLE_ADMIN','ROLE_USER']
        },
        component:Logout
    },

    { path: '*', redirect: '/login' }   /*默认跳转路由*/
    //{path: '*', redirect: '/404', hidden: true}

]
//3.实例化VueRouter 
const router = new VueRouter({
  
    routes // （缩写）相当于 routes: routes
})

/*
//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
      console.log("我是浏览器本地缓存的token: "+token);
      //if (token === 'null' || token === '') {
      if (token === null || token === 'null' || token === '') {  
      //if (token == null && to.path != '/login') {     
        next('/login');
      } else {
        next();
      }
    }
  });
  */

export default router