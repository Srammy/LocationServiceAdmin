<template>
    <div id="home">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/home/device">设备</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/home/user">用户</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/logout">退出系统</router-link></el-menu-item>
    </el-menu>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
      return {
        activeIndex2: '1'  
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>

a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>
