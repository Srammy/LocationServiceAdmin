<template>
    <div id = 'devicedata'>
        <!--选择设备-->
        <div class = "chooseDevice">
            <span class="demonstration">选择设备</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in deviceList"
                    :key = "item.deviceName"
                    :label="item.deviceNumber"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <!--开始日期-->
        <div class="block">
            <span class="demonstration">开始日期</span>
             <el-date-picker
                v-model="startDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <!--结束日期-->
        <div class="block">
            <span class="demonstration">结束日期</span>
             <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>

        <br/>
        <br/>

        <!--按日期获取数据-->
        <el-button type="primary" v-on:click = "getLocationInfo()">显示数据</el-button>
        <!--导出数据到excel-->
        <el-button type="success" v-on:click = "export2Excel()">导出数据</el-button>

        <br/>

        <!--显示位置信息-->
        <div class="locationInfo"> 
            <el-table
                :data="locationInfoList"
                style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="id"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="programNumber"
                        label="programNumber"
                         width="140">
                    </el-table-column>
                    <el-table-column
                        prop="platformNumber"
                        label="platformNumber"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="compressionIndex"
                        label="compressionIndex">
                    </el-table-column>
                    <el-table-column
                        prop="mostRecentLocation"
                        label="mostRecentLocation">
                    </el-table-column>
                    <el-table-column
                        prop="mostRecentDataCollection"
                        label="mostRecentDataCollection">
                    </el-table-column>
                    <el-table-column
                        prop="locationClass"
                        label="locationClass">
                    </el-table-column>
                    <el-table-column
                        prop="latitude"
                        label="latitude">
                    </el-table-column>
                    <el-table-column
                        prop="longitude"
                        label="longitude">
                    </el-table-column>
                    <el-table-column
                        prop="locationInfo1"
                        label="locationInfo1">
                    </el-table-column>
                    <el-table-column
                        prop="locationInfo2"
                        label="locationInfo2">
                    </el-table-column>
                    <el-table-column
                        prop="checkInfo"
                        label="checkInfo">
                    </el-table-column>
                    <el-table-column
                        prop="speed"
                        label="speed"
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop="angle"
                        label="angle"
                        width='100'>
                    </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import store from '../../../vuex/store.js';
export default {
    data(){
        return{
            /*选择设备*/
            deviceList:[], //设备列表，select表单用
            value:'',   //选择设备用
            /*选择日期 */
            pickerOptions: {    //
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            
            },
            startDate: '', //位置信息显示开始日期
            endDate:'',    //位置信息显示结束日期
            /*位置信息*/
            locationInfoList: [],
        }
    },
    methods:{
        getDeviceList(){
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
        
        getLocationInfo(){
            //请求位置信息数据
            var api='/api/location/getLocationByTime?deviceId='+this.value +'&startDate='+this.startDate+'&endDate='+this.endDate;
                    Axios.get(api).then((response)=>{
                        console.log(response.data.responseBody);
                        this.locationInfoList = response.data.responseBody
                    }).catch((error)=>{
                        alert("与服务器通信错误，无法获取位置信息");
                    })
        },

        export2Excel() {
　          require.ensure([], () => {
　　　              const { export_json_to_excel } = require('../../../excel/Export2Excel');
　　　      const tHeader = ['id', 'programNumber', 'platformNumber','compressionIndex','mostRecentLocation','mostRecentDataCollection','locationClass','latitude','longitude','locationInfo1','locationInfo2','checkInfo','speed','angle'];
　　　      // 上面设置Excel的表格第一行的标题
　　　      const filterVal = ['id', 'programNumber', 'platformNumber','compressionIndex','mostRecentLocation','mostRecentDataCollection','locationClass','latitude','longitude','locationInfo1','locationInfo2','checkInfo','speed','angle'];
　　　      // 上面的index、phone_Num、school_Name是tableData里对象的属性
　　　      const list = this.locationInfoList;  //把data里的tableData存到list
　　　      const data = this.formatJson(filterVal, list);
　　　      export_json_to_excel(tHeader, data, '列表excel');
　　        })
　　     },
　　     formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
        
    },
    mounted(){  /*生命周期函数*/
         this.getDeviceList();
    }
}
</script>