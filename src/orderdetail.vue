<template>
  <div>
      <div class="header">
        <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft"/>
      </div>

      <div class="a">
         <div class="msg" style="display:flex">
              <div class="img" style="margin-left:4%"><van-icon color="#ee0a24" size="40" name="location" /></div>
              <div style="margin-left:5%;width:60%;margin">
                  <div style="display:flex">
                      <div class="name"><b>{{nickname}}</b></div>
                      <div class="phone" style="margin-left:10px;margin-top:2px;">{{phone}}</div>
                  </div>
                  <div class="address" style="margin-top:5px;margin-left:-15px;font-size:12px;">{{address}}</div>
              </div>
         </div>
      </div>

      <div class="content" style="marign-top:20px;">
        <div v-for="(item,index) in orderDetail.orderDetailList" :key="index">
              <div>
             <van-card :num="item.goodsCount" :price="item.goodsPrice"
                       :desc="item.goodsDesc" :title="item.goodsName" :thumb="item.goodsImg"/>
             </div>

        </div>
      </div>
    </div>
</template>

<script>
import req from '@/api/order.js'
export default {
data(){
    return{
      userData:{},
      orderDetail:[],
      nickname:'',
      phone:'',
      address:'',
      total:0,
    }
 },
 mounted(){
   this.getDetail()
 },
 methods:{
   getDetail(){
     this.userData = JSON.parse(sessionStorage.getItem('token'))
    //  alert(JSON.stringify(this.userData.id))
    let orderId = JSON.parse(sessionStorage.getItem('orderId'))
    // alert(JSON.stringify(orderId))
     req('getOrderById',{id:orderId}).then(data=>{
       this.orderDetail = data.data
      //  alert(JSON.stringify(this.orderDetail))
      this.nickname = this.orderDetail.order.nickname
      this.phone = this.orderDetail.order.phone
      this.address =this.orderDetail.order.address
     })
   },
   onClickLeft(){
     this.$router.push({path:'/order'})
   }
 }
}
</script>

<style lang="less" scpoed>
.header{
  // background: goldenrod;
  top: 0;
  width: 100%;
  position: fixed;
  z-index: 99;
}
</style>