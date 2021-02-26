<template>
    <div>
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

        <br/>

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

        <br/>

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

        <!--按日期获取数据按钮-->
        <el-button type="primary" v-on:click = "getLocationInfo()">地图显示轨迹</el-button>
    
        <br/>
        <br/>

        <br/>
        <!--地图显示-->
        <div>
            <baidu-map
                class="map"
                ak='u3G7YoRKcsZ2lygh3rxTzA4CRqCKn3bp'
                :center="{lng: 116.404, lat: 39.915}" 
                :zoom="15"
                :scroll-wheel-zoom="true" 
            >
                
                <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false"></bm-polyline>
                <bm-marker v-for = '(item,index) in markerPoint' :key= 'index' :position="item" :dragging="false" @click="showLocation(index)">
                </bm-marker>
                
            </baidu-map>
        </div>

        <br/>
        <br/>

        <!--位置信息显示-->
        <div>
            <span class="demonstration">位置信息</span>
            <el-table
                :data="markerMessage"
                style="width:60%">
                    <el-table-column
                        prop="lng"
                        label="经度"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="lat"
                        label="纬度"
                        width='180'>
                    </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import store from '../../../vuex/store.js'; 
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue';
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline.vue';
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
import {GpsToBaiduPoint} from '../../../Utils/GPS2Baidu.js';
export default {
    components: {
　　　　 BaiduMap, 
        BmPolyline,
        BmMarker,
    }, 
    data () {
        return {
            /*地图*/
            polylinePath:[],//轨迹
            markerPoint:[],         //位置点用
            markerPointMessage:[], //显示位置信息用。定位需要转换为百度坐标，但显示是要显示原来的GPS坐标
            markerMessage:[{lng:null, lat: null}], //位置信息
            //center: { lng: 0, lat: 0 },  //经纬度
            //zoom: 3,　 //地图展示级别
             /*选择设备*/
            deviceList:[], //设备列表，select表单用
            value:'',   //选择设备用
            /*选择日期 */
            pickerOptions: {    
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
    methods: {
        showLocation (index) {
            this.markerMessage.pop();
            this.markerMessage.push(this.markerPointMessage[index])
        },
        getDeviceList(){
            //请求设备列表
                    var api='';
                    if(this.$store.state.role === 'ROLE_ADMIN'){
                        api='/api/location/getDeviceList?userId=ALL'
                    }else{
                        api='/api/location/getDeviceList?userId='+this.$store.state.userId;
                    }
                    Axios.get(api).then((response)=>{;
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
                        this.locationInfoList = response.data.responseBody;
                        this.locationInfoList = this.locationInfoList.reverse()
                        this.markerPointMessage.length=0;//清空，为了画别的轨迹，防止轨迹覆盖
                        this.polylinePath.length=0;//清空，为了画别的轨迹，防止轨迹覆盖
                        this.markerPoint.length=0;//清空，为了画别的轨迹，防止轨迹覆盖
                        for (var i=0,len=this.locationInfoList.length; i<len; i++)
                        {
                            var loc = {lng:0,lat:0};
                            loc.lng = Number(this.locationInfoList[i].locationInfo1Longitude); //GPS
                            loc.lat = Number(this.locationInfoList[i].locationInfo1Latitude);  //GPS
                            this.markerPointMessage.push(loc) //显示时需要原来的坐标
                            loc = GpsToBaiduPoint(loc);  //GPS转换为baidu坐标
                            this.polylinePath.push(loc);
                        }
                        this.markerPoint = this.polylinePath;
                    }).catch((error)=>{
                        alert("与服务器通信错误，无法获取位置信息");
                    })
        },
        
    },
    mounted(){  /*生命周期函数*/
         this.getDeviceList();
    }
}
</script>
<style>
.map {
  width: 100%;
  height: 500px;
}
</style>