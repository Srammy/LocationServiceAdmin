<template>
     <div id = 'userdevconnect'> 
         <p style = "font-size:30px;">用户设备绑定<p>
        <br/>
         <div class = "chooseUser">
            <span class="demonstration">选择用户</span>
            <el-select v-model="value1" placeholder="请选择一个用户">
                <el-option
                    v-for="(item,index) in userList"
                    :key = "index"
                    :label="item.userName"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        
        <br/>
        <!--查看该用户的设备按钮-->
        <el-button type="primary" v-on:click = "getUserDevice()">查看该用户的设备</el-button>

        <br/>
        <br/>
        <!--选择设备-->
        <div class = "chooseDevice">
            <span class="demonstration">选择设备</span>
            <el-select v-model="value" placeholder="请选择设备">
                <el-option
                    v-for="item in deviceList"
                    :key = "item.deviceName"
                    :label="item.deviceNumber"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>

        <br/>
        <!--绑定用户设备按钮-->
        <el-button type="primary" v-on:click = "userDeviceConnect()">为上面的用户绑定该设备</el-button>

        <br/>
        <br/>
        <!--显示某用户的所有设备-->
        <div id = 'userDevice'>
            <span class="demonstration" style = "font-size:30px;">选中用户的设备列表</span>
            <el-table
                :data="userDeviceList"
                style="width:55%">
                    <el-table-column
                        prop="id"
                        label="设备ID"
                        align ="center"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="deviceNumber"
                        label="设备号"
                        align ="center"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        prop="deviceName"
                        label="设备名"
                        align ="center"
                        width='170'>
                    </el-table-column>
                    <el-table-column label="用户设备解绑"  align ="center" width='110' v-if = "show">
                        　　　　<template slot-scope="scope">
                        　　　　　　<el-button type="info" @click="userDeviceDeconnect(scope.row.id)">解绑</el-button>
                        　　　　</template>
                    </el-table-column>           
            </el-table>
    
        </div>
     </div>
</template>

<script>
import Axios from 'axios';
//import qs from 'qs';
export default {
    data(){
        return{
            /*选择用户*/
            userList:[], //用户列表
            value1:'', //用户ID
            
            /*选择设备*/
            deviceList:[],
            value:'', //设备ID
            /*某用户所拥有的所有设备*/
            userDeviceList:[],
            /*解绑按钮是否可见 */
            show:false
            
        }
    },
    methods:{
        
        getUserList(){
            //请求用户列表
            var api = '/api/location/getAllUsers';
                   Axios.get(api).then((response)=>{
                       this.userList = response.data.responseBody;
                       this.userList = this.userList.reverse();
                   }).catch((error)=>{
                       alert("从服务器上请求用户列表错误");
                   })
        },
        
        getDeviceList(){
            //请求设备列表
                    var api='/api/location/getDeviceList?userId=ALL'; 
                    Axios.get(api).then((response)=>{
                        this.deviceList = response.data.responseBody
                        this.deviceList = this.deviceList.reverse()
                    }).catch((error)=>{
                        alert("从服务器上请求设备列表错误");
                    })
        },
        getUserDevice(){
            //请求某用户所拥有的设备
                    
                    
                    var api='';
                    if(this.value1 === 1){
                        api='/api/location/getDeviceList?userId=ALL';  //管理员查看所有
                        this.show = false;
                    }else{
                        api='/api/location/getDeviceList?userId='+this.value1;  //普通用户只查看自己的设备
                        this.show = true;
                    }
            
                    Axios.get(api).then((response)=>{
                        this.userDeviceList = response.data.responseBody
                        this.userDeviceList = this.userDeviceList.reverse()

                    }).catch((error)=>{
                        //console.log(error);
                    })
        },
        userDeviceConnect(){
            var api='/api/location/saveUserDevice?userId='+this.value1+"&deviceId="+this.value;
            Axios.post(api)
                .then((response)=>{
                        console.log(response);
                        if(response.data.responseMessage == "0001-处理失败,新增失败，因存在映射关系"){
                            alert('已存在该用户设备关系')
                        }
                        else if(response.data.responseMessage == "0000-处理成功"){
                            alert('新增用户设备关系成功')
                            this.getUserDevice();
                        }
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });
            
        },
        userDeviceDeconnect(deviceId){
            var api='/api/location/deleteUserDevice?userId='+this.value1+"&deviceId="+Number(deviceId);
            Axios.post(api)
                .then((response)=>{
                        this.getUserDevice();
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });      
        }
    },
    mounted(){  /*生命周期函数*/
        this.getUserList();
        this.getDeviceList();
    }
}
</script>