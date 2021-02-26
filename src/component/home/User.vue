<template>
     <div id = 'user'>
         <div class = 'user'>
             <div class = 'left'>
                 <el-col :span="12">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#ffffff"
                        text-color="#000"
                        active-text-color="#ffd04b">
                            <el-menu-item index="1">
                                <span slot="title"><router-link to="/home/user/userinfo">用户信息</router-link></span>
                            </el-menu-item>
                            <el-menu-item index="2" >
                                <span slot="title"><router-link to="/home/user/userdevconnect">用户设备</router-link></span>
                            </el-menu-item>
                            
                    </el-menu>
                </el-col>

             </div>

             <div class = 'right'>
                 <router-view></router-view>
             </div>
         </div>
     </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>


    .user{

        display:flex;

        .left{

            width:200px;

            min-height:400px;
            border-right:1px solid #eee;
      
            li{

                line-height:2;
            }
        }

        .right{
            flex:1;
        }

    }
    a {
        text-decoration: none;
    }
 
    .router-link-active {
        text-decoration: none;
    }
</style>