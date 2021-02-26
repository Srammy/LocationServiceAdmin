# 工程介绍

该工程为位置服务项目的前端部分。一方面为了方便普通用户可以通过浏览器来查看位置信息，另一方面管理员可以对用户、设备进行管理，还可以查看位置信息。

功能介绍：

- 登录系统&退出系统
- 管理员
  - 设备管理
    - 设备信息：查看设备信息列表（所有设备）、删除设备、新增设备。
    - 位置信息：查看某设备在某一时间段内的位置信息。
    - 轨迹显示：在地图上显示某设备在某一时间段内的移动轨迹；点击显示轨迹中某一位置点的经纬度信息。
  - 用户管理
    - 用户信息：查看用户信息列表、新增用户
    - 用户设备关联：查看某用户所拥有的设备；为某个用户添加设备
- 普通用户
  - 设备管理
    - 设备信息：查看设备信息列表（该用户所拥有的设备）
    - 位置信息：查看某设备在某一时间段内的位置信息。
    - 轨迹显示：在地图上显示某设备在某一时间段内的移动轨迹；点击显示轨迹中某一位置点的经纬度信息。

# 技术选型

- `vue-cli`
- `vue`
- `vue-router`
- `vuex`
- `vue-baidu-map`
- `axios`
- `element-ui`

# 本地运行

1. ```bash
   git clone 
   ```

2. 安装`node.js`

3. 安装`cnpm`

4. 切换到项目根路径下

5. 安装依赖

   ```bash
   cnpm install
   ```

6. 运行

   ```bash
   cnpm run dev
   ```

# 用户页面

1. **用户登录**

   ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E7%99%BB%E5%BD%95.jpg)

   登录成功提示
   
   ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E7%99%BB%E5%BD%95%E6%88%90%E5%8A%9F.jpg)

2. **设备管理**

   - 设备信息

     ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E6%9F%A5%E7%9C%8B%E8%AE%BE%E5%A4%87.jpg)

   - 位置信息

     ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF.jpg)

   - 轨迹显示

     ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E5%9C%B0%E5%9B%BE%E6%98%BE%E7%A4%BA.jpg)

3. **用户管理**

   - 用户信息

     ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF1.jpg)

   - 用户设备关联

     ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E7%94%A8%E6%88%B7%E8%AE%BE%E5%A4%87%E5%85%B3%E7%B3%BB.jpg)

4. 普通用户

   无访问”用户管理“模块的权限

   ![](https://raw.githubusercontent.com/Srammy/srammyPic/master/img/LocationServiceAdmin/%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7.jpg)