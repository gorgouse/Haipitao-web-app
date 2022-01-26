<template>
  <div class="all">
      <div>
          <van-nav-bar  title="首页" @click-left="onClickLeft" left-text="返回" left-arrow>
          <template #right>
          <van-icon color="yellow" name="star-o" />
          </template>
          </van-nav-bar>
      </div>
      <div class="search">
        <div style="width:100%;margin-top:-10px">
            <van-search @click="$router.push({path:'/search'})" placeholder="请输入搜索关键词" />
        </div>
      </div>

      <div class="icons">
          <div class="icon1">
              <div @click="tip">
                  <img src=".\assets\logo.png" alt="">
                  <div>嗨皮新品</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\hot1.png" alt="">
                  <div>热门爆款</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\sign1.png" alt="">
                  <div>每日签到</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\tree.png" alt="">
                  <div>绿化自然</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\market.png" alt="">
                  <div>每日超市</div>
              </div>
          </div>

          <div class="icon2">
              <div @click="tip">
                  <img src=".\assets\recharge.png" alt="">
                  <div>充值中心</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\coin.png" alt="">
                  <div>领嗨金币</div>
              </div>
              <div @click="tip">
                  <img src=".\assets\store.png" alt="">
                  <div>门店精选</div>
              </div>
              <div @click="$router.push({path:'/shopcar'})">
                  <img src=".\assets\shopcar.png" alt="">
                  <div>小购物车</div>
              </div>
              <div @click="$router.push({path:'/sort'})">
                  <img src=".\assets\sort.png" alt="">
                  <div>全部分类</div>
              </div>
          </div>
      </div>

      <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in slidelist" :key="index">
                <van-image @click="getDetailId(item.gId)" :src="item.img"/>
            </van-swipe-item>
        </van-swipe>
        <span>          
            <!-- <img width="100" height="50" src=".\assets\a.jpg"/> -->
        </span>
      </div>

      <div class="division">
          <!-- marginTop: (index + 1) % 2 ==0 ? '150px':'20px' -->
                   <!-- :style="{marginTop: (index + 1) % 2 ==0 ? '0px':'0px',height:(index + 1) % 2 ==0 ? '220px':'250px'}" -->
          <div class="goodsList" v-for="(item,index) in goodslist" :key="index" >
            <div>
                <div><van-image @click="getDetailId(item.id)" :src="item.gImg"/></div>
                <div class="gName">{{item.gName}}</div>
                <div class="gPrice">¥<b>{{item.gPrice}}</b></div>
        
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import req from '@/api/slide.js'
import reqq from '@/api/goods.js'
import { Toast } from 'vant';
export default {
data(){
    return{
        container: null,
        value:'',
        slidelist:{},
        goodslist:{}
    }
 },
 mounted(){
    this.container = this.$refs.container;
    this.getslideList()
    this.getGoodsList()
 },
 methods:{
     tip(){
         Toast.fail('该功能未开放  敬请期待！');
     },
    onClickLeft() {
      this.$router.push({path:'/login'})
    },
   getGoodsList(){
      reqq('goodslistmethod',{}).then(data=>{
        //   alert(JSON.stringify(data.data))
          this.goodslist = data.data
      })
   },
   getslideList(){
       req('slideMethod',{}).then(data=>{
        this.slidelist = data.data
        // alert(JSON.stringify(data.data))
       })
    },
    getDetailId(id){
        // alert(id)
        sessionStorage.setItem('goodsId',JSON.stringify(id))
        this.$router.push({path:'/goodsdetail'})
        
    }
 }
}
</script>

<style lang="less" scoped>
.goodsList{
    background: white;
    .van-image{
        margin-left: 10px;
    }
    .gName{
        color: gray;
        font-size: 12px;
    }
    .gPrice{
        // margin-left: -50px;
        margin-top: 5px;
        font-size: 13px;
        color: rgba(255, 68, 0, 0.781);
    }
}
.all{
    background: rgba(128, 128, 128, 0.096);
}
.van-nav-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  // background: forestgreen;
}
	/deep/ .van-ellipsis {
		color: gray;
	 } 
 
	/deep/ .van-nav-bar .van-icon {
		color: gray;
	}
	/deep/ .van-nav-bar__text {
		color: gray;
	}
.header{
    width: 100%;
    position: fixed;
    top: 0px;
}

.division{
    width: 95%;
    margin-top: 15px;
    flex-wrap: wrap;
   margin-left: 2.5%;
   display: flex;
    .goodsList{
        height: 250px;
    display: flex;
    position: relative;
    width: 47%;
    background:rgba(255, 255, 255, 0.541);
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 1%;
        .van-image{
            height: 150px;
            width: 130px;
        }
    }
    
}


.icons{
    width: 95%;
    margin-left: 2.5%;
    font-weight:500;
    color: gray;
    font-size: 13px;
    margin-top: 10px;
   .icon1{
       width: 90%;
       margin-left: 5%;
        justify-content: space-between;
       display: flex;
        font-size: 12px;
      img{
      height:30px;
      width: 30px;
  }
 }
 .icon2{
     margin-top: 10px;
        width: 90%;
       margin-left: 5%;
      justify-content: space-between;
       display: flex;
        font-size: 12px;
        color: gray;
      img{
      height:30px;
      width: 30px;
  }
 }
}

 .my-swipe {
    //  background: violet;
     border-radius: 10px;
     margin-top: 20px;
    //  margin-left: 30px;
     height: 200px;
    //  width: 140px;
    width: 90%;
    margin-left: 5%;
   .van-swipe-item {
    border-radius: 10px;
     height: 200px;
     width: 100%;
    //  margin-top: -5px;
    .van-image{
    border-radius: 10px;
    height: 200px;
    width: 100%;
    }
   }
  }
</style>