<template>
  <div>
      <div>
          <img src="./assets/logo.png" alt="">
      </div>
      <div class="tag">
        嗨皮涛
      </div>
      <div>
        <van-form>
  <van-field
    v-model="username"
    name="账号"
    label="账号"
    placeholder="请输入账号 "
    :rules="[{pattern,required: true, message: '账号至少6位数字/字母以上' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="请输入密码"
    :rules="[{pattern,required: true, message: '密码不能少于6位' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" @click="onSubmit" native-type="submit">提交</van-button>
  </div>

  <div @click="$router.push({path:'/register'})" style="font-size:10px;margin-left:180px;color:#1989fa">
    <van-icon color="#1989fa"  size="25" name="smile-o" />
    <div>注册中心</div>
  </div>

</van-form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/login.js'
import { Toast } from 'vant';
import { Dialog } from 'vant';

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import JSEncrypt from 'jsencrypt';
const qs = require('qs')
const encrypt = new JSEncrypt();

export default {

  data(){    
      return{
        //数字
        pattern: /\d{6}/,
        pattern2:/\[0-9A-Za-z]{6}$/,
        token:{},
        Dialog:'',
         username: '',
        password: '',
          param:'',
      }
  },
   mounted(){
    },
    methods:{
      onSubmit() {
        // var AES = require("crypto-js/aes");
        // var SHA256 = require("crypto-js/sha256");
        
        encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCH6+puCfJfAWLwIeAqvffe4Hpdr+2W7CI9p5dgsLhtXKvPx+LWAuyTGspwNlQ9DpBTvQEpgnFXkiUGO9DwElJgekAG7Eb3RGN92WQX2BpzvbnZrDYVZT9bTxkNfUABc2zkSG278ndC6e1/gyrkx7rGkLvlHvZwKxy9YPYJL44sBwIDAQAB")
        console.log(this.password)
        
      req('loginmethod',{username:this.username,password:encrypt.encrypt(this.password)}).then(data=>{
        if(data.code == 0){
          // alert(JSON.stringify(data.data))
          sessionStorage.setItem("token",JSON.stringify(data.data))
          Toast.loading({
          message: '加载中...',
          forbidClick: true,
          });
           setTimeout(() => {
            this.$router.push({path:'/frame'})             
           }, 2000);
       }
       else{
         Dialog.alert({
         title: '提示信息',
         message: '输入账号或密码有误',
        }).then(() => {
          return ''
  // on close
}).catch(()=>{});
        }
      })

    },
    }
}
</script>

<style lang="scss" scoped>
img{
  height: 100px;
  width: 100px;
}
.tag{
  color: rgb(10, 241, 172);
}
</style>


