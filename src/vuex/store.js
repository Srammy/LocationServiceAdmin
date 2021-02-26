import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({

    state: {

        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        role:localStorage.getItem('role') ? localStorage.getItem('role') : '',
        userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
    },
     
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state,user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        },
        changeRole(state,user){
            state.role = user.role;
            localStorage.setItem('role', user.role);
        },
        changeUserId(state,user){
            state.userId = user.userId;
            localStorage.setItem('userId', user.userId);
        }

    }
  });
  