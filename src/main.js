import Vue from 'vue';
import App from './App.vue';

//引入公共的scss   注意：创建项目的时候必须用scss
import './assets/css/basic.scss';   
//引入路由
import router from './router/router.js';
//引入store
import store from './vuex/store.js';
//引入axios
import axios from 'axios';
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入数据导出工具
import Blob from './excel/Blob.js';
import Export2Excel from './excel/Export2Excel.js';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router, //挂载路由
  store,
  render: h => h(App)
})


//异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    if(config.url==='/api/auth/login'){  //如果是登录操作，则不需要携带header里面的token
    }else{
      if (localStorage.getItem('Authorization')) {
          config.headers = {Authorization:localStorage.getItem('Authorization')};//Authorization是在后台有要求
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});


//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    if(response.data.responseMessage == "0001-处理失败,toekn超过有效期，请重新登"){
        localStorage.removeItem('Authorization');
        this.$router.push('/login');
    }
    return response;
  },
)

//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    let role = localStorage.getItem('role');
    if (token === null || token === 'null' || token === '') {       
        next('/login');
    } 
    else 
    {
        if (to.meta.role.includes(role)) {
            next();
        }
        else{
            alert('当前用户无访问权限');
        }
    }
  }
});

