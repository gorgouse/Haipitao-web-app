<template>
  <div class="all">

    <div>

      <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"/>

      <!-- z-index:999 -->
      <!-- z-index:0 -->
      <div class="head" style="z-index:999">
       <div class="top">
          <div @click="$router.push({path:'/home'})" class="back">
            <van-icon size="22" name="arrow-left" />
          </div>
          <div class="search">
             <van-search style="width:280px" v-model="value" shape="round" background="white" placeholder="请输入搜索关键词"/>
          </div>
          <div class="shopcar" style="margin-left:0px">
            <van-icon @click="$router.push({path:'/shopcar'})" name="shopping-cart-o" />
          </div>
          <div class="share">
            <van-icon style="margin-left:10px" color="gray"  @click="showShare = true" name="share-o" />
          </div>
       </div>
</div>
</div>
  <!-- <div style="height:50px"></div> -->
  <!-- 标签栏跳转 -->
    <div style="margin-top:0px" class="tag">
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab :title="indexs.baby">
          <!-- 宝贝部分 -->
          <div>
            <div class="slideshow">
              <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                  <van-image style="height:260px;width:100%" :src="goodData.gImg" alt=""/>
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="desc">
              <div class="price1">
                <div class="price2"><b>¥</b></div>
                <div class="price3">{{goodData.gPrice}}</div>
                <div class="price4">价格¥{{goodData.gPrice}}</div>
              </div>
              <div class="intrd">
                <div style="text-align:left;margin-left:20px"><van-tag round color="orangered">嗨皮</van-tag></div>
                <div style="margin-left:20px;text-align: left;margin-top:10px;font-size:13px;"><b>{{goodData.gDesc}}</b></div>
                <div style="text-align:left;margin-top:10px;margin-left:20px"><van-tag color="#7232dd">新品促销</van-tag></div>          
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab :title="indexs.rank">
       <!-- 评价部分 -->
          <div>
            <div class="appraise">
              <div style="height:10px"></div>
                <div style="margin-top:0px;text-align:left;margin-left:10px;font-size:15px">宝贝评价({{count}})</div>
                 <div style="margin-top:30px;height:80px" v-if="evaluateData == null || evaluateData == ''">暂无评价</div>
                  <div v-for="(item,index) in evaluateData" :key="index">
                    <div style="margin-left:10px;margin-top:20px">
                      <div style="display:flex">
                        <van-image round width="2rem" height="2rem" :src="item.userAvatar"/></div>
                          <div style="margin-top:-25px;text-align:left;margin-left:40px;font-size:12px">{{item.userName}}</div>
                    </div>
                    <div>
                      <div style="text-align:left;margin-left:10px;margin-right:5px;margin-top:15px;font-size:12px">{{item.evaluateDesc}}</div>
                    </div>
                  </div>
            </div>
          </div>
        </van-tab>
        <div style="height:140px"></div>

        <van-tab :title="indexs.detail">
            <div style="height:30px"></div>
           <div class="detail">
              <div style="" class="detailTitle">宝贝详情</div>
              <div v-for="(item,index) in detailImageData" :key="index">
                  <van-image style="width:100%" :src="item.image"/>
              </div>
          </div>         
        </van-tab>

        <van-tab :title="indexs.recom">
          <div class="recom">
            <div style="color:gray">敬请开放 </div>  
          </div>  
        </van-tab>

        </van-tabs>
  </div>

      




      <div style="height:60px"></div>

      <div>
        <van-goods-action>
          <!-- color="#ee0a24" -->
          <van-goods-action-icon icon="shop-o" @click="tostore()" text="店铺" />          
           <van-goods-action-icon @click="addChat" icon="service-o" text="客服" />
           <van-goods-action-icon icon="cart-o" @click="$router.push({path:'/shopcar'})" text="购物车" />
           <van-goods-action-button style="height:36px" @click.native="showtype1 = true" type="warning" text="加入购物车" />
           <van-goods-action-button style="height:36px" type="danger" @click="instantBuyMethod" text="立即购买" />
        </van-goods-action>
      </div>

      <div style="height:60px:width:100%"></div>
<!-- 商品属性、类型 -->
      <div>
          <van-popup v-model="showtype1" closeable close-icon="close" position="bottom" :style="{ height: '90%' }">
            <div style="margin-top:30px">
              <div>{{goodData.gType}}</div>
              
              <div class="tyll" style="width:95%;margin-left: 2.5%;display:flex;justify-content: space-between;flex-wrap: wrap;">
               <div v-for="(item,index) in typeData" :key="index" style="margin-top:10px;" class="sortlist">
                 <!-- style="border-radius:5px;border:1.9px solid rgba(255, 60, 0, 0.801);" -->
                 
                 <div @click="inputChange(item)" v-show="item.checked == false" class="aa1">
                 <div>
                   <img style="border-radius:3px;height:80px;width:92px;" :src="item.tImg" alt="">
                 </div>
                 <div style="background:whitesmoke;color:gray;font-size:13px">
                   {{item.tName}}
                 </div>
               </div>

                 <div @click="inputChange(item)" style="border:2px solid rgba(255, 68, 0, 0.623)" v-show="item.checked == true" class="aa2" >
                 <div>
                   <img style="border-radius:3px;height:80px;width:92px;" :src="item.tImg" alt="">
                 </div>
                 <div style="background:whitesmoke;color:gray;font-size:13px">
                   {{item.tName}}
                 </div>
               </div>
              </div>
                <div style="height:0px;width:92px"></div>
                <div style="height:0px;width:92px"></div>
            </div>
            </div>
              <!-- 商品属性 -->
            <div>
              <div style="margin-top:10px;">{{goodData.gProp}}</div>

              <div class="package">
                <div v-for="(item,index) in propData" :key="index">

              <div>
                  <div style="width:60px;margin-top:10px;"></div>
                   <div v-show="item.selected == false" @click="changeProp(item)" >
                      <van-tag size="large" color="gray">{{item.pName}}</van-tag>
                    </div>

                    <div  v-show="item.selected == true" @click="changeProp(item)">
                      <van-tag size="large" type="warning">{{item.pName}}</van-tag>
                    </div>                    
              </div>

              </div>
              <div style="height:0px;width:100px"></div>
              <div style="height:0px;width:100px"></div>
              <div style="height:0px;width:100px"></div>
              <div style="height:0px;width:100px"></div>
              <div style="height:0px;width:100px"></div>
              <div style="height:0px;width:100px"></div>
              </div>

              <div class="count" style="display:flex;margin-top:15px;">
                <div style="margin-left:10px;">购买数量</div>
                <div style="margin-left:120px;">
                  <van-stepper v-model="shopcarcount" />
                </div>
              </div>
            </div>

             <div style="width:100%;bottom:0px;position:fixed;height:60px;background:white">
               <van-button style="margin-top:10px;" @click="addShopCarAndOrderMethod" round type="warning" block>确认</van-button>
             </div>
          </van-popup>
      </div>

  </div>
</template>

<script>
import req from '@/api/goods.js'
import reqq from '@/api/shopcar.js'
import reqqq from '@/api/evaluate.js'
import request from '@/api/chat.js'
import { Toast } from 'vant';
export default {
 data(){  
      return{
        shopData:[
          {total:'',gPrice:'',sDesc:'',gName:'',gImg:''}
        ],
        isPay:0,
        intstantBuy:false,
         showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
        count:'',
        sDesc:'',
        typeName:'',
        propName:'',
        shopcarcount:'',
        getSelect:'',
        showtype1: false,
        count:'',
        userData:{},
        goodData:{},
        typeData:[],
        propData:{},
        evaluateData:[],
        value:'',
        active:'',
       indexs:{baby:'宝贝',rank:'评价',detail:'详情',recom:'推荐'},
       detailImageData:[],
       currentUserId:'',
       getData:{},
      }
  },
  mounted(){
    this.getToken()
    this.selectGoodsByIdMethod()
    this.selectTypeOfGoodsMethod()
    this.selectPropOfGoodsMethod()
    this.selectGoodsDetailEvaluateMethod()
    this.countGoodsDetailEvaluateTotalMethod()
    this.detailImageMethod()
    this.addChatByClickClientServiceMethod()
  },
  methods:{
    addChatByClickClientServiceMethod(){
      req('addChatByClickClientService',{goodsId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.getData = data.data
        // alert(JSON.stringify(this.getData))
        sessionStorage.setItem('msgObject',JSON.stringify(this.getData))
      })
    },
    addChat(){
      request('addChat',{
            fromUserId:this.getData.userId,
            toUserId:JSON.parse(sessionStorage.getItem('token')).id,
            msg:'你好，欢迎光临本店!'}).then(data =>{
              this.$router.push({path:'chat'})
            })
    },
    detailImageMethod(){
      req('detailImage',{goodsId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.detailImageData = data.data
        // alert(JSON.stringify(this.detailImageData))
      })
    },
    instantBuyMethod(){//立即购买
      this.intstantBuy = true
      this.showtype1 = true
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    countGoodsDetailEvaluateTotalMethod(){
      reqqq('countGoodsDetailEvaluateTotal',{goodsId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.count = data.data
        // alert(JSON.stringify(this.count))
      })
    },
    selectGoodsDetailEvaluateMethod(){
      reqqq('selectGoodsDetailEvaluate',{goodsId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.evaluateData = data.data
        // alert(JSON.stringify(this.evaluateData))
      })
    },
    getToken(){
      this.userData = JSON.parse(sessionStorage.getItem('token'))
    },
    selectGoodsByIdMethod(){
      // alert(this.goodsId)
      req('selectGoodsById',{goodId: JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.goodData = data.data
        // alert(JSON.stringify(this.goodData))
      })
    },
    selectTypeOfGoodsMethod(){
      req('selectTypeOfGoods',{gId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.typeData = data.data.map(item =>{
          return Object.assign({},item,{checked:false})
        })
        // alert(JSON.stringify(this.typeData))
      })
    },
    selectPropOfGoodsMethod(){
      req('selectPropOfGoods',{gId:JSON.parse(sessionStorage.getItem('goodsId'))}).then(data=>{
        this.propData = data.data.map(item =>{
          return Object.assign({},item,{selected:false})
        })
        // alert(JSON.stringify(this.propData))
      })
    },
    addShopCarAndOrderMethod(){
      //校验选择类型
      let verify = this.typeData.filter(item=>{
        return item.checked === true
      })

      if(verify.length === 0){
        Toast.fail('请先选择'+this.goodData.gType);
        return
      }
      //校验选择属性
      let testify = this.propData.filter(item=>{
        return item.selected === true
      })

      if(testify.length === 0){
        Toast.fail('请先选择'+this.goodData.gProp);
        return
      }
      this.sDesc = this.tName+';'+this.propName
      this.goodsId = JSON.parse(sessionStorage.getItem('goodsId'))
      //立即购买
  if(this.intstantBuy === true){
        sessionStorage.setItem('goodsIds',JSON.stringify(this.goodsId))
        sessionStorage.setItem('goodsNames',JSON.stringify(this.goodData.gName))
        sessionStorage.setItem('goodsImg',JSON.stringify(this.goodData.gImg))
        sessionStorage.setItem('goodsDescs',JSON.stringify(this.goodData.gDesc))
        // alert(this.shopcarcount)
        sessionStorage.setItem('goodscounts',JSON.stringify(this.shopcarcount))
        sessionStorage.setItem('goodsPrices',JSON.stringify(this.goodData.gPrice))
        sessionStorage.setItem('totalCount',JSON.stringify(this.shopcarcount))
        let instantIndex = 1
        sessionStorage.setItem('instantIndex',JSON.stringify(instantIndex))
        let totalPrice = parseFloat(this.goodData.gPrice).toFixed(2)*parseFloat(this.shopcarcount).toFixed(2)
        totalPrice = totalPrice.toFixed(2)
        // alert(totalPrice)
        sessionStorage.setItem('totalPrice',JSON.stringify(totalPrice))
        this.shopData[0].total = this.shopcarcount
        this.shopData[0].gPrice = this.goodData.gPrice
        this.shopData[0].sDesc = this.goodData.gDesc
        this.shopData[0].gName = this.goodData.gName
        this.shopData[0].gImg = this.goodData.gImg
        // alert(JSON.stringify(this.shopData))
        sessionStorage.setItem('shoplist',JSON.stringify(this.shopData))
        this.$router.push({path:'/ensure'})
  }
      //加入购物车
  else{
      // alert(this.userData.id)
      // alert(this.goodsId)
      // alert(this.shopcarcount)
      // alert(this.sDesc)
      reqq('addShopCar',{
        goodsId:this.goodsId,
        userId:this.userData.id,
        total:this.shopcarcount,
        sDesc:this.sDesc
      }).then(data=>{
        if(data.code == 0){
          Toast.success('添加成功，在购物车等亲~');
        }
        else{
          Toast.fail('加入购物车失败，重新尝试哦');
        }
      })
       this.showtype1 = false
       //重置数据
       for(let i = 0; i<this.typeData.length ;i++){
         this.typeData[i].checked = false
       }
       for(let j =0; j<this.propData.length;j++){
         this.propData[j].selected = false
       }
    }

    },
    inputChange(item){
      for(let i = 0; i< this.typeData.length; i++){
        this.typeData[i].checked = false
      }
      item.checked = true
      this.tName = item.tName
      // alert(this.tName)
      // alert(JSON.stringify(this.typeData))
    },
    changeProp(item){
      for(let j = 0;j<this.propData.length; j++){
        this.propData[j].selected = false
      }
      item.selected = true
      this.propName = item.pName
      // alert(this.propName)
    },
    tostore(){
      sessionStorage.setItem('storeId',JSON.stringify(this.goodData.storeId))
      this.$router.push({path:'/shop'})
    }

  }
}
</script>

<style lang="scss" scoped>
.package{

margin-top:10px;
width:90%;
margin-left:3%;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
}
.all{
  background:#c9cec84d;
}
.top{
  background: white;
  width: 100%;
  display: flex;
  .back{
    margin-top:20px;
    margin-left: 15px;
    width: 20px;
  }
  .aa:focus{
    background: green;
    border-style:solid;
    border-color: #03a9f4;
	box-shadow: 0 0 15px #03a9f4
  }
 .action{
   border-radius:5px;
   border:1.9px solid rgba(255, 60, 0, 0.801);
   display: none;
  //  background: rgba(255, 68, 0, 0.623);
 }
  // .search{}
  .shopcar{
    margin-left: 3px;
    font-size: 20px;
    margin-top: 15px;
  }
  .share{
    margin-left: 10px;
    font-size: 20px;
    margin-top: 16px;
  }
}
.head{
  background: white;
  width: 100%;
  height: 50px;
  position: fixed;
  top:0px;
}
.detail{
  margin-left: 1.5%;
  margin-top: 10px;
  width: 97%;
  border-radius: 12px;
  background: white;
  // height: 130px;
}
.recom{
  margin-left: 1.5%;
  margin-top: 10px;
  width: 97%;
  border-radius: 12px;
  background: white;
  height: 130px;
}

.appraise{
   margin-left: 1.5%;
  margin-top: 5px;
  width: 97%;
  border-radius: 12px;
  background: white;
  // height: 130px;
}

.info{
   margin-left: 2.5%;
  margin-top: 10px;
  width: 95%;
  border-radius: 12px;
  background: white;
  height: 130px;
}
.desc{
  margin-left: 1.5%;
  margin-top: -62px;
  width: 97%;
  border-radius: 12px;
  background: white;
  height: 130px;
  // .intrd{}
  .price1{
    // background: forestgreen;
    text-align: left;
    height: 40px;
    display: flex;
    .price2{
      font-size: 15px;
      margin-top: 16px;
      margin-left: 20px;
      color: rgb(255, 94, 0);
    }
    .price3{
      margin-left: 3px;
       margin-top: 14px;
      font-size: 20px;
      color:rgb(255, 94, 0);
    }
    .price4{
      margin-left: 8px;
      margin-top: 16px;
      color: gray;
      font-size: 12px;
    }
  }
}
 .my-swipe .van-swipe-item {
   margin-top: 4px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    // background-color: white;
  }
</style>