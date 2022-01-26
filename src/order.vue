<template>
  <div class="all">
      <div class="header">
        <div style="background: white;display:flex">
          <van-icon size="23" @click="$router.push({path:'/home'})" style="margin-top:18px;margin-left:14px;" name="arrow-left" />
          <van-search style="width:300px;background: white;" v-model="value" shape="round" placeholder="请输入搜索关键词"/>
        </div>
        <div>
          <!-- <button @click="a"></button> -->
          <van-tabs @click="onClick" style="width:95%;margin-left:2%;color:gray" v-model="active">
            <van-tab title="全部" ></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab style="margin-left:10px" title="待发货"></van-tab>
            <van-tab style="margin-left:10px" title="待收货"></van-tab>
            <van-tab style="margin-left:10px" title="待评价"></van-tab>
          </van-tabs>  
        </div>
      </div>
      <div style="height:10px"></div>

      <div style="margin-top:0px;width:94%;margin-left:3%;">
        <div class="division">
          <div class="child" v-for="(item,index) in orderData" :key="index">
            <div class="child1">
            <div style="margin-top:35px;margin-left:15px;font-size:14px;text-align:left">
              <span style="margin-top:5px;"><van-icon  color="gray" name="shop-o" size="17" /></span>
              <b style="margin-top:5px;">{{item.order.storeName}}</b>
            </div>
            <div v-for="(iItem,index) in item.orderDetailList" :key="index" @click="getDetailId(iItem.orderId)">
              <van-card :num="iItem.goodsCount" :price="iItem.goodsPrice" :desc="iItem.goodsDesc" :title="iItem.goodsName" :thumb="iItem.goodsImg"/>
              <!-- {{item.state}} -->                                    
            </div>
            <div>
              <div v-if="item.order.state === '1'" style="margin-left:120px">
                <van-button style="width:70px" color="#7232dd" size="mini" round>修改地址</van-button>
                <van-button @click="toPay(item)" style="width:70px" size="mini" round color="linear-gradient(to right, #ff6034, #ee0a24)">付款</van-button>
              </div>
              <div v-if="item.order.state === '2'" style="margin-left:120px">
                <van-button style="width:70px" color="gray" size="mini" round>挑选服务</van-button>
                <van-button style="width:70px" size="mini" disabled  round color="linear-gradient(to right, #ff6034, #ee0a24)">待发货</van-button>
              </div>   
              <div v-if="item.order.state === '3'" style="margin-left:120px">
                <!-- <van-button style="width:70px" color="gray" size="mini" round>延长收货</van-button> -->
                <van-button style="width:70px" color="gray" size="mini" round>查看物流</van-button>
                <van-button style="width:70px" @click="ensureReceive(item.order)" size="mini" round color="orangered">确认收货</van-button>
              </div>    
              <div v-if="item.order.state === '4'" style="margin-left:120px">
                <!-- <van-button style="width:70px" color="gray" size="mini" round>加入购物车</van-button> -->
                <van-button style="width:70px" color="gray" size="mini" round>查看物流</van-button>
                <van-button style="width:70px" size="mini" @click="toEvaluate(item.orderDetailList)"  round color="orangered">评价</van-button>
              </div>
              <div v-if="item.order.state === '5'" style="margin-left:120px">
                <!-- <van-button style="width:70px" color="gray" size="mini" round>加入购物车</van-button> -->
                <van-button style="width:70px" color="gray" size="mini" round>已完成</van-button>
                <van-button style="width:70px" type="primary" size="mini"  round>交易成功</van-button>
              </div>                                    
            </div> 

            </div>      
          </div>
        </div>
      </div>
      <!-- 付款 -->
    <div>
         <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
             <div>
                 <div>
                     <!-- 关闭 -->
                     <van-icon @click="close" name="cross" 
                     style="margin-left:-320px;margin-top:10px;" color="gray" size="25" />
                 </div>
                 <div style="margin-left:130px;margin-top:10px;display:flex">
                     <div style="color:black;margin-top:7px;font-size:23px"><b>¥</b></div>
                     <div style="font-size:35px;color:black"><b>{{totalPrice}}</b></div>
                 </div>
                 <div style="margin-top:30px">
                     <div style="display:flex;color:gray">
                         <div style="margin-left:15px">嗨皮账号</div>
                         <div style="margin-left:205px;margin-top:2px;">{{userData.username}}</div>
                     </div>
                     <van-divider />
                     <div style="display:flex;color:gray">
                         <div style="margin-left:15px">付款方式</div>
                         <div style="margin-left:25px;display:flex">
                             <img style="margin-left:175px;height:20px;width:20px" src="./assets/logo.png">
                             <div style="margin-left:5px;">嗨呗</div>
                        </div>
                     </div>
                 </div>
                 <div>
                     <van-button style="height:40px;margin-top:40px;width:340px" @click="payMethod" type="info">立即付款</van-button>
                 </div>
             </div>
         </van-popup>
     </div>   

     <div>

     </div>
     
      <div style="height:60px"></div>
  </div>
</template>

<script>
import req from '@/api/order'
import { Toast } from 'vant';
export default {
data(){
  return{
    orderId:'',
    totalPrice:'',
    show:false,
    state:'',
    userData:'',
    orderData:{},
    value:'',
    active:'',
  }
 },
 mounted(){
   this.getToken()
   this.receiveState()
 },
 
 methods:{
   ensureReceive(item){
    //  alert(JSON.stringify(item))
    if(item.state == '3'){
     req('updateOrderState',{id:item.id,state:'4'}).then(data=>{
        Toast.loading({
        message: '加载中...',
        forbidClick: true,
        });
        setTimeout(() => {    
        Toast.success("确认收货成功") 
        this.orderListMethor()    
        this.show = false
        }, 2000);
     })
    }
   },
   toPay(item){
     this.orderId = item.order.id
     this.totalPrice = item.order.totalPrice
    //  alert(this.totalPrice)
    this.show = true
   },
   payMethod(){
     req('updateOrderState',{id:this.orderId,state:'2'}).then(data=>{
        Toast.loading({
        message: '加载中...',
        forbidClick: true,
        });
        setTimeout(() => {    
        Toast.success("付款成功") 
        this.orderListMethor()    
        this.show = false
        }, 2000);
     })
   },
   close(){
     this.show = false
   },
   toEvaluate(item){
    //  alert(JSON.stringify(item[0].orderId))
    //  alert(JSON.stringify(item[0].id))
     sessionStorage.setItem('orderId',JSON.stringify(item[0].orderId))
     sessionStorage.setItem('goodsId',JSON.stringify(item[0].goodsId))
     sessionStorage.setItem('goodsName',JSON.stringify(item[0].goodsName))
     sessionStorage.setItem('goodsImg',JSON.stringify(item[0].goodsImg))
     sessionStorage.setItem('goodsDesc',JSON.stringify(item[0].goodsDesc))
     sessionStorage.setItem('orderDetailId',JSON.stringify(item[0].id))
    this.$router.push({path:'/evaluate'})
   },
  receiveState(){
    if(JSON.parse(sessionStorage.getItem('currentOrderState'))!=null){
      this.state = JSON.parse(sessionStorage.getItem('currentOrderState'))
      this.active = this.state
      this.sorderListMethor(this.state)
    }
    else{
      this.orderListMethor()
    }
  }, 
  onClick(name, title) {
      if(name === 0){
        this.orderListMethor()
      }
      else{
        this.state = name
        // alert(this.state)
        this.sorderListMethor(this.state)
      }
    },
   getToken(){
      this.userData = JSON.parse(sessionStorage.getItem('token'))
    },
    orderListMethor(){
     req('orderList',{id:this.userData.id}).then(data=>{
       this.orderData = data.data
      //  alert(JSON.stringify(this.orderData[0].order.state))
     })
   },
  sorderListMethor(){
     req('orderList',{id:this.userData.id,state:this.state}).then(data=>{
       this.orderData = data.data
      //  alert(JSON.stringify(this.orderData))
     })
   },        
   getDetailId(id){
    // alert(id)
    sessionStorage.setItem('orderId',JSON.stringify(id))
    this.$router.push({path:'/orderdetail'})
        
    }
 }
}
</script>

<style lang="scss" scoped>
.division{
  margin-top: 0px;
  // background: white;
}
.child{
    background: white;
    // margin-top: 100px;
}
.child1{
  margin-top: 50px;
}
.all{
  // background: rgba(128, 128, 128, 0.185);
}
.header{
  width: 100%;
  background: white;
  top: 0px;
  position: fixed;
  z-index:999;
  // background: orangered;
}
</style>