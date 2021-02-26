<template>
     <div id = 'device'>
         <div class = 'device'>
             <div class = 'left'>
                <el-col :span="123">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#ffffff"
                        text-color="#000"
                        active-text-color="#ffd04b">
                            <el-menu-item index="1">
                                <span slot="title"><router-link to="/home/device/deviceinfo">设备信息</router-link></span>
                            </el-menu-item>
                            <el-menu-item index="2" >
                                <span slot="title"><router-link to="/home/device/devicedata">位置信息</router-link></span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <span slot="title"><router-link to="/home/device/baidumap">地图显示</router-link></span>
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


    .device{

        display:flex;

        .left{

            width:200px;

            min-height:400px;
            
            border-right:1px solid #eee;
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