 <template>
  <div id="login" align="center">
    <el-row :gutter="20">
      <el-col :span="7" :offset="8">
        <div class="grid-content bg-purple">
          <h1 align="center">位置服务</h1><br>
        </div>
      </el-col>
      <el-col :span="6" :offset="8">
        <div class="grid-content bg-purple">

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="用户名" prop="account">
              <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapMutations } from 'vuex';
import qs from 'qs'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      userToken:"",
      role:'',
      ruleForm2: {
        pass: '',
        account: '',
      },
      rules2: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin','changeRole','changeUserId']),
    submitForm (formName) {
      let _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
      
          
          Axios.post('/api/auth/login',qs.stringify({
            username:this.ruleForm2.account,
            password:this.ruleForm2.pass,
          })

          )
          .then(res => {  //res是返回结果
              if(res.data.responseMessage == '0001-处理失败,用户名或密码错误'){
                  alert('用户名或密码错误');
              }else{
                  
                  _this.userToken=res.data.responseBody.token;
                  _this.role = res.data.responseBody.userDetail.roles[0].name;
                  _this.userId = res.data.responseBody.userDetail.id
                  _this.changeLogin({ Authorization: this.userToken });
                  _this.changeRole({ role: this.role});
                  _this.changeUserId({ userId: this.userId});
                  this.$router.push('/home');
                  alert('登陆成功');
              }
          }).catch(err => { //请求失败就会捕获报错信息
            alert("服务器连接失败");
          })
        } else {
          alert("用户信息错误");
          return false
        }
      })
    },
    
  },
}
</script>
