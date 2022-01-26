<template>
  <div>
      <div>
          <van-nav-bar  title="我的购物车" @click-left="onClickLeft" left-text="返回" left-arrow>
        <template #left>
           <van-icon name="arrow-left" />
        </template>
          </van-nav-bar>
      </div>
       <div style="color:gray;margin-top:200px;" v-if="shopcarData == ''">
         亲，购物车是空的呢，赶快去添加商品吧
         </div>
       <div class="content">
         <div v-for="(item,index) in shopcarData" :key="index">
              <div style="display:flex">
                 <van-checkbox @change="getSingleChecked" style="margin-top:-10px;margin-left:13px;" v-model="item.checked"></van-checkbox>
                <van-card style="width:88%;margin-left:1%" :num="item.total" :price="item.gPrice" :desc="item.sDesc" :title="item.gName" :thumb="item.gImg">
              <template #tags>
                <div>
                  <van-tag type="danger">特价</van-tag>
                  <van-tag type="success">专区</van-tag>     
                  <van-tag type="warning">嗨皮</van-tag>
                  <van-tag type="primary">专属</van-tag>                                    
                </div>
                <div>
                  <!-- <van-tag type="warning">嗨皮</van-tag>
                  <van-tag type="primary">专属</van-tag>                   -->
                </div>
              </template>

            </van-card>
              </div>
            <!-- </div> -->
       </div>
       </div>
       <div style="height:80px;"></div>
     
       <div class="footer">
          <van-submit-bar :price="this.totalPrice*100" button-text="结算" @submit="onSubmit">
              <van-checkbox v-model="allChecked" @click="getAllChecked">全选</van-checkbox>

              </van-submit-bar>
       </div>
  </div>
</template>

<script>
import req from '@/api/shopcar.js'
import { Toast } from 'vant';
export default {
data(){
    return{
    totalPrice:0,
    totalCount:0,
    allChecked:false,
    shopcarData:[],
    userData:'',
    }
 },
 mounted(){
   this.getToken()
   this.listUserShopCarMethod()
 },
 methods:{
   getToken(){
     this.userData = this.userData = JSON.parse(sessionStorage.getItem('token'))
    //  alert(JSON.stringify(this.userData))
   },
   listUserShopCarMethod(){
     req('listUserShopCar',{userId:this.userData.id}).then(data=>{
       this.shopcarData = data.data.map(item=>{
         return Object.assign({},item,{checked:false})
       })
      //  alert(JSON.stringify(this.shopcarData))
     })
   },
   getSingleChecked(){
     this.getTotal()
     for(let i=0;i<this.shopcarData.length; i++){
        if(this.shopcarData[i].checked === false){
         this.allChecked = false
         return
       }
     }
     this.allChecked = true
   },
   getAllChecked(){
    //  alert(this.allChecked)
       if(this.allChecked === true){
         for(let i = 0; i<this.shopcarData.length ;i++){
         if(this.shopcarData[i].checked === false){
           this.shopcarData[i].checked = !this.shopcarData[i].checked
         }
       }
      }
      if(this.allChecked === false){
        for(let i = 0; i<this.shopcarData.length ;i++){
         if(this.shopcarData[i].checked === true){
           this.shopcarData[i].checked = !this.shopcarData[i].checked
         }
       }
     }
     
    //  alert(JSON.stringify(this.shopcarData))
   },
   getTotal(){
     this.totalPrice = 0
     this.totalCount = 0
     for(let i = 0; i<this.shopcarData.length; i++){
       if(this.shopcarData[i].checked == true){
         this.totalPrice = parseFloat(this.totalPrice) + parseFloat(this.shopcarData[i].gPrice)*this.shopcarData[i].total
         this.totalCount = parseInt(this.totalCount) + parseInt(this.shopcarData[i].total)
        //  alert(parseFloat(this.totalPrice))
       }
     }
    //  alert(this.totalPrice)
   },
    onClickLeft(){
      this.$router.push({path:'/home'})
    },
   onSubmit(){
     //选中的购物车
    let shoplist = this.shopcarData.filter(item=>{
       return item.checked === true
    })

    if(shoplist.length === 0){
      Toast.fail('请先选择购物车');
      return
    }
    let shopcarIds = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.id
    }).toString()
    // alert(shopcarIds)

// filter匹配字段内容，map匹配字段
    let goodsIds = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.gId
    }).toString()
    // alert(goodsIds)

    let goodsNames = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.gName
    })
    // alert(goodsNames)

    let goodsImg = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.gImg
    })
    // alert(goodsImg)
    
    let goodsDescs = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.sDesc
    })
    // alert(goodsDescs)

    let goodscounts = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.total
    })
    // alert(goodscounts)

    let goodsPrices = this.shopcarData.filter(item=>{
      return item.checked === true
    }).map(item=>{
      return item.gPrice
    }).toString()

    // alert(goodsPrices)
    sessionStorage.setItem('shopcarIds',JSON.stringify(shopcarIds))
    sessionStorage.setItem('goodsIds',JSON.stringify(goodsIds))
    sessionStorage.setItem('goodsNames',JSON.stringify(goodsNames))
    sessionStorage.setItem('goodsImg',JSON.stringify(goodsImg))
    sessionStorage.setItem('goodsDescs',JSON.stringify(goodsDescs))
    sessionStorage.setItem('goodscounts',JSON.stringify(goodscounts))
    sessionStorage.setItem('goodsPrices',JSON.stringify(goodsPrices))
    sessionStorage.setItem('shoplist',JSON.stringify(shoplist))

    sessionStorage.setItem('totalCount',JSON.stringify(this.totalCount))
    sessionStorage.setItem('totalPrice',JSON.stringify(this.totalPrice))
    sessionStorage.setItem('instantIndex',JSON.stringify('0'))

     this.$router.push({path:'/ensure'})
   }
 }
}
</script>

<style lang="less" scoped>
	/deep/ .van-ellipsis {
		color: gray;
	 } 
 
	/deep/ .van-nav-bar .van-icon {
		color: gray;
	}
	/deep/ .van-nav-bar__text {
		color: gray;
  }
  .content{
    background: white;
  }
.van-nav-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  // background: forestgreen;
}
</style>