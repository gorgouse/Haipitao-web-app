<template>
  <div class="all">
      <div>
          <van-nav-bar class="header" title="确认订单">
              <template #left>
                  <van-icon color="gray" @click="$router.push({path:'/home'})" name="arrow-left" />
              </template>
          </van-nav-bar>
      </div>
      
      <div class="info" @click="$router.push({path:'/address'})">
          <div v-if="addressInit!= null && addressInit!== {}" style="margin-top:20px;margin-left:10px;">
              <van-icon name="location" size="30" color="red" />
          </div>
          <div v-if="addressInit== null || addressInit=== {}">
              <div style="color:orange;margin-top:20px;margin-left:110px;">点击此处填写信息</div>
          </div>
          <div v-if="addressInit!= null &&addressInit!== {}" style="margin-left:10px;margin-top:10px;">
              <div style="display:flex">
                  <div class="name" style="font-size:15px">
                      {{addressInit.name}}
                  </div>
                  <div class="phone" style="margin-top:3px;margin-left:10px;color:gray;font-size:1px;">
                      {{addressInit.tel}}
                  </div>
              </div>
              <div class="address" style="margin-top:5px;margin-left:0px;font-size:13px">
                  {{addressInit.address}}
              </div>
          </div>
      </div>

      <div>
          <div v-for="(item,index) in shopData" :key="index">
          <van-card :num="item.total" :price="item.gPrice" :desc="item.sDesc" :title="item.gName" :thumb="item.gImg"/>
         </div>
      </div>

      <div>
       <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="showPopup" />
      </div>
     <div>
         <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
             <div>
                 <div>
                     <!-- 关闭 -->
                     <van-icon @click="onSubmit" name="cross" 
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

  </div>
</template>

<script>
import req from '@/api/address.js'
import reqq from '@/api/order.js'
import { Toast } from 'vant'
export default {
data(){
    return{
         show: false,
        isPay:0,
        shopData:{},
        userData:{},
        addressInit:{},
        totalPrice:'',
        totalCount:'',
        shopcarIds:'',
        goodsIds:'',
        goodsNames:'',
        goodsImg:'',
        goodsDesc:'',
        goodscounts:'',
        goodsPrices:'',
        instantIndex:0,//立即购买标记
    }
 },
 mounted(){
     this.getToken()
     this.addressListMethod()
     this.getShopCar()
 },
 methods:{
     showPopup() {
      if(this.addressInit === null || this.addressInit=== ''){
        Toast.fail('请先填写地址信息');
        return
      }
      else{
          this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
          this.show = true;
      }
    },
     getToken(){
         this.userData = JSON.parse(sessionStorage.getItem('token'))
        //  alert(JSON.stringify(this.userData))
     },
     addressListMethod(){
        //  alert(JSON.parse(sessionStorage.getItem('addressId')))
        if(JSON.parse(sessionStorage.getItem('addressId')) != null && JSON.parse(sessionStorage.getItem('addressId')) != ''){
           req('selectAddressById',{id:JSON.parse(sessionStorage.getItem('addressId'))}).then(data=>{
            // alert(JSON.parse(sessionStorage.getItem('addressId')))
            this.addressInit = data.data
           })
        }
        else{
            // alert(this.userData.id)
            req('selectDefault',{userId:this.userData.id}).then(data=>{
             this.addressInit = data.data
            //  alert(JSON.stringify(this.addressInit))
         })
        } 
     },
     getShopCar(){
         this.instantIndex = JSON.parse(sessionStorage.getItem('instantIndex'))
         this.shopcarIds = JSON.parse(sessionStorage.getItem('shopcarIds'))
         this.goodsIds = JSON.parse(sessionStorage.getItem('goodsIds'))
        this.goodsNames = JSON.parse(sessionStorage.getItem('goodsNames'))
        this.goodsImg = JSON.parse(sessionStorage.getItem('goodsImg'))
        this.goodsDesc = JSON.parse(sessionStorage.getItem('goodsDescs'))
          this.goodscounts = JSON.parse(sessionStorage.getItem('goodscounts'))
        //   alert(this.goodscounts)
           this.goodsPrices = JSON.parse(sessionStorage.getItem('goodsPrices'))
         this.shopData = JSON.parse(sessionStorage.getItem('shoplist'))
        //  alert(JSON.stringify(this.shopData))
         this.totalPrice = JSON.parse(sessionStorage.getItem('totalPrice'))
         this.totalCount = JSON.parse(sessionStorage.getItem('totalCount'))
        //  alert(this.totalCount)
        //  alert(JSON.stringify(this.totalPrice))
     },
     onSubmit(){
        //  alert(this.goodscounts)
        //  订单
        //  alert(this.addressInit.id)
        // alert(this.userData.id)
        // alert(this.totalPrice)
        // alert(this.totalCount)
        // 订单详情
        // alert(this.goodsIds)
        // alert(this.goodsNames)
        // alert(this.goodsDesc)
        // alert(this.goodscounts)
        // alert(this.goodsPrices)
         this.goodscounts = this.goodscounts.toString()

        reqq('orderAdd',{
            shopCarIds:this.shopcarIds,
            isPay:this.isPay,           
            userId:this.userData.id,
            addressId:this.addressInit.id,
            totalPrice:this.totalPrice,
            allCount:this.totalCount,
            goodsIds:this.goodsIds,
            goodsNames:this.goodsNames.toString(),
            goodsImg:this.goodsImg.toString(),
            goodsDesc:this.goodsDesc.toString(),
            goodsCounts:this.goodscounts,
            goodsPrices:this.goodsPrices,
            instantIndex:this.instantIndex
        }).then(data=>{
            if(data.code === 0){
                // alert(JSON.stringify(data))
                this.show = false
                if(this.isPay == 1){
                    Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    });
                    setTimeout(() => {    
                    Toast.success("付款成功")
                    this.$router.push({path:'/order'})        
                    }, 2000);
                }
                else{
                   Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    });
                    setTimeout(() => {    
                    Toast.success("提交成功")   
                    this.isPay = 0
                    this.$router.push({path:'/order'})       
                    }, 2000);                    
                }
            }
            else{
                Toast.fail("提交失败")
            }
        })
     },
     payMethod(){
         this.isPay = 1
         this.onSubmit()
     }
 }
}
</script>

<style lang="scss" scoped>
.info{
    height: 70px;
    display:flex;
    width:95%;
    margin-left:2.5%;
    background: white;
    border-radius: 10px;
    margin-top: 10px;
}
.all{
    background:rgba(245, 245, 245, 0.993);
}
.header{
    top: 0px;
    position: fixed;
    width: 100%;
}
</style>