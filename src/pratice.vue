<template>
  <div>
 商户订单<input v-model="out_trade_no"><br>
    订单名称<input v-model="subject"><br>
    付款金额<input v-model="total_amount"><br>
    商品描述<input v-model="body"><br>
    <el-button v-on:click="pay" type="success" round>支付宝支付</el-button>

  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import req from '@/api/payment.js'
export default {
    data(){
        return{
        out_trade_no:'',
        subject:'',
        total_amount:'',
        body:''
        }
    },
    methods:{
      pay(){
        req('payment',{
         out_trade_no:this.out_trade_no,
         subject:this.subject,
         total_amount:this.total_amount,
         body:this.body
        }).then(data=>{
          if(data.code == 0){
            alert(JSON.stringify(data))
            document.querySelector('body').innerHTML = data.data;
            document.forms[0].submit();
          }
        })
      }
    }
}
</script>

<style>

</style>