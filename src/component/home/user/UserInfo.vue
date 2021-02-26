<template>
    <div id = 'userinfo'>
        <!--用户列表-->

        <div class = 'userList'>
            <span class="demonstration" style = "font-size:30px;">用户列表</span>
            <el-table
                :data="userList"
                style="width: 60%">
                <!--
                    <el-table-column
                        prop="id"
                        label="序号"
                        width="180">
                    </el-table-column>
                -->
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="password"
                        label="加密密码">
                    </el-table-column>
                    <el-table-column
                        prop="rawPassword"
                        label="未加密密码">
                    </el-table-column>
                    <!--
                    <el-table-column label="删除用户"  align ="center" width='110'>
                        　　　　<template slot-scope="scope">
                        　　　　　　<el-button type="info"  @click="deleteUser(scope.row.userName, scope.row.password)">删除</el-button>
                        　　　　</template>
                    </el-table-column> 
                    -->
            </el-table>
        </div>
         
        <br/>
        <!--增加用户-->
        <div class = 'addUser'>
            <span class="demonstration" style = "font-size:30px;">增加用户</span>
            <br/>
            <span class="demonstration">用户名</span>
            <el-input v-model="userName" placeholder="数字和字母的任意组合，无特殊字符" style="width:500px"></el-input>
            <br/>
            <span class="demonstration">密码</span>
            <el-input v-model="rawpassword" placeholder="必须包含大小写字母和数字的组合，无特殊字符，8-10位" style="width:500px"></el-input>
            <br/>
            <el-button type="success" v-on:click = "addUser()">增加该用户</el-button>

        </div>

    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return{
            
            userList:[], //用户列表
            userName:'',
            rawpassword:''
        }
    },
    methods:{
        getUserList(){
            //请求所有用户

                   var api = '/api/location/getAllUsers';
                   
                    Axios.get(api).then((response)=>{
                        this.userList = response.data.responseBody;
                        this.userList = this.userList.reverse()
                    }).catch((error)=>{
                        alert("从服务器上请求用户列表错误");
                    })

        },

        addUser(){
            var api='/api/location/addUser?userName='+this.userName+"&rawPassword="+this.rawpassword;
            Axios.post(api)
                .then((response)=>{
                        this.getUserList();
                        if(response.data.responseMessage == "0001-处理失败,用户名不能为空"){
                            alert('用户名不能为空');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,密码不能为空"){
                            alert('密码不为空');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,用户名不符合要求"){
                             alert('用户名内容不符合要求');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,密码不符合要求"){
                             alert('密码内容不符合要求');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,输入密码的位数为8-10"){
                             alert('密码的位数为8-10位');
                        }
                        else if(response.data.responseMessage == "0000-处理成功"){
                             alert('添加用户成功');
                        }
                        else if(response.data.responseMessage == "0001-处理失败,新增失败，因存在该用户"){
                             alert('该用户已存在');
                        }
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });

        },
        deleteUser(userName, password){
            var api='/api/location/deleteUser?userName='+userName+"&password="+password;
            Axios.post(api)
                .then((response)=>{
                        this.getUserList();
                    })
                .catch((error)=>{
                        alert('通信错误，无法连接到服务器');
                    });

        }

    },
    mounted(){  /*生命周期函数*/
        this.getUserList();
    }
}
</script>