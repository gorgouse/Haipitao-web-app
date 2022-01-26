<template>
  <div>
      <div></div>
      <van-nav-bar style="top:0;position:fixed;z-index:99;width:100%"
  title="注册中心"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
      <div style="margin-top:20px;">
          <van-form @submit="onSubmit">

    <van-field
    v-model="nickname"
    name="nickname"
    label="昵称"
    placeholder="昵称"
  />

<van-field
  readonly
  clickable
  name="picker"
  :value="value"
  label="选择性别"
  placeholder="选择性别"
  @click="showPicker = true"
/>
<van-popup v-model="showPicker" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="showPicker = false"
  />
</van-popup>

  <van-field
    v-model="username"
    name="username"
    label="账号"
    placeholder="账号"
    :rules="[{pattern,required: true, message: '账号不能少于6位' }]"
  />
   <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{pattern,required: true, message: '密码不能少于6位' }]"
  />
    <van-field
    v-model="ensure"
    type="password"
    name="ensure"
    label="确认密码"
    placeholder="确认密码"
    :rules="[{required: true, message: '确认密码不能为空' }]"
  />
  <van-field
    v-model="phone"
    name="phone"
    label="手机号"
    placeholder="手机号"
    :rules="[{required: true, message: '手机号不能为空' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">注册</van-button>
  </div>
</van-form></div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
import req from '@/api/register.js'
export default {
data(){
    return{
      value: '',
      columns: ['男', '女', '介于男和女之间'],
      showPicker: false,
      nickname:'',
      pattern: /\d{6}/,
      username: '',
      password: '',
      img:'',
      ensure:'',
      phone:'',
      sex:'3',
    }
 },
 mounted(){},
 methods:{
    onConfirm(value) {
      if(value=== '男'){
        this.sex = 1
        this.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210515121602220426.jpg'
      }
      if(value=== '女'){
        this.sex = 2
        this.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210515122237062847.jpg'
      }
      if(value=== '介于男和女之间'){
        this.sex = 3
        this.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210515123201624442.jpg'
      }
      this.value = value;
      this.showPicker = false;
    },   
     onClickLeft() {
     this.$router.push({path:'/login'})
    },
    onSubmit(values) {
    if(this.password !== this.ensure){
       Dialog.alert({
       title: '输入有误',
       message: '您两次输入的密码不一致',
        }).then(() => {});
     }
     else{
         sessionStorage.setItem('token',JSON.stringify(''))
         req('register',{
             nickname:this.nickname,
             username:this.username,
             password:this.password,
             phone:this.phone,
             sex:this.sex,
             img:this.img
             }).then(data=>{
            //  alert(JSON.stringify(data))
            
             if(data.code === 0){
                 Toast.loading({
                 message: '加载中...',
                forbidClick: true,
                });
                setTimeout(function(){
                Toast.success('注册成功');
                },2000)
                this.username = ''
                this.password = ''
                this.ensure = ''
                this.phone = ''
                setTimeout(()=>{
                    this.$router.push({path:'/login'})
                },3000)
  
             }
             else{
               Toast.fail(data.msg);
             }
         })
     }
    },
 }
}
</script>

<style>

</style>