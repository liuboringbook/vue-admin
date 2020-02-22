<template>
  <div class="login_container">
    <div class="login_box">
      <!--这是头像区-->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
      <!--登录表单区域-->
        <el-form label-width="0px" class="login_form" :model="loginForm">
          <!-- 用户名-->
          <el-form-item>
            <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username">

            </el-input>
          </el-form-item>
          <!--密码 -->
          <el-form-item>
            <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password">

            </el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
            //这是登录表单的数据绑定对象
          loginForm:{
             username:'za',
             password:'123'
          }
        }
    }
}
</script>
<style lang="less" scoped>
 .login_container{
   background-color: #2b4b6b;
   height:100%;
   position: relative;
 }
  .login_box{
    width:450px;
    height:300px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box{
    height:130px;
    width:130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding:10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width:100%;
      height:100%;
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
      background-color: #eee;
    }
  }
  .login_form{
    position: absolute;
    bottom:0;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>
