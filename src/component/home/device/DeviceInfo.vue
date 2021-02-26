<template>
    <div id = 'deviceinfo'>
        <span class="demonstration" style = "font-size:30px;">设备列表</span>
        <br/>
        <el-table
            :data="deviceList"
            style="width:60%">
                <el-table-column
                    prop="deviceNumber"
                    label="设备号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="deviceName"
                    label="设备名"
                    width='180'>
                </el-table-column>
                <el-table-column label="删除设备"  v-if = 'isshow' align ="center" width='110' >
                        　　　　<template slot-scope="scope">
                        　　　　　　<el-button type="info"  @click="deleteDevice(scope.row.deviceNumber)">删除</el-button>
                        　　　　</template>
                </el-table-column> 
                
        </el-table>
          
        <br/>

        <!--增加设备-->
        <div class = 'addDevice' v-show = 'isshow'>
            <span class="demonstration" style = "font-size:30px;">增加设备</span>
            <br/>
            <span class="demonstration">设备号</span>
            <el-input v-model="deviceNumber" placeholder="由数字组成" style="width:500px"></el-input>
            <br/>
            <span class="demonstration">设备名</span>
            <el-input v-model="deviceName" placeholder="由字母和数字组成" style="width:500px"></el-input>
            <br/>
            <el-button type="success"  v-on:click = "addDevice()">增加该设备</el-button>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import store from '../../../vuex/store.js';
export default {
    data(){
        return{
            deviceList:[],
            deviceNumber:'',
            deviceName:'',
            isshow:false,
        }
    },
    methods:{
        getData(){
            //请求设备列表
                    var api='';
                    if(this.$store.state.role === 'ROLE_ADMIN'){
                        api='/api/location/getDeviceList?userId=ALL'
                    }else{
                        api='/api/location/getDeviceList?userId='+this.$store.state.userId;
                    }
                    Axios.get(api).then((response)=>{
                        this.deviceList = response.data.responseBody
                        this.deviceList = this.deviceList.reverse()
                    }).catch((error)=>{
                        alert("从服务器上请求设备列表错误");
                    })

        },
        addDevice(){
            var api='/api/location/addDevice?deviceNumber='+this.deviceNumber+"&deviceName="+this.deviceName;
            Axios.post(api)
                .then((response)=>{
                        this.getData();
                        if(response.data.responseMessage == "0001-处理失败,设备号不能为空"){
                            alert('设备号不能为空');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,设备名不能为空"){
                            alert('设备名不能为空');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,设备名不符合要求"){
                            alert('设备名内容不符合要求');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,设备号不符合要求"){
                            alert('设备号内容不符合要求');
                        }
                        else if(response.data.responseMessage == "0000-处理成功"){
                            alert('添加设备成功');
                            this.getData();
                        }
                        else{
                            alert('该设备已存在');
                        }
                        
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });

        },
        deleteDevice(deviceNumber){
            var api='/api/location/deleteDevice?deviceNumber='+deviceNumber;
            Axios.post(api)
                .then((response)=>{
                        this.getData();
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });

        },
        checkRole(role){
            if(role === 'ROLE_ADMIN')
            {
                this.isshow = true;
            }
            else{
                this.isshow = false;
            }
        }

    },
    mounted(){  /*生命周期函数*/
        this.getData();
        this.checkRole(this.$store.state.role);
    }
}
</script>

<style>
    
</style>
