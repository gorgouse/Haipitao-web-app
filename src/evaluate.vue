<template>
  <div class="all">
      <van-nav-bar style="top:0px;position:fixed;width:100%;z-index:897" title="发表评价" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
           <van-button style="width:70px;" size="small" round type="warning">发布</van-button>
        </template>
      </van-nav-bar>
      <div class="model">
          <div style="display:flex">
              <van-image style="margin-left:20px" width="50" height="50" :src="goodsImg"/>
              <div>
                  <div style="margin-top:5px;text-align:left;margin-left:10px;color:black;font-size:13px">{{goodsName}}</div>
                  <div style="margin-top:5px;text-align:left;margin-left:10px;color:gray;font-size:13px">{{goodsDesc}}</div>
              </div>
          </div>
          <div style="font-size:13px;margin-top:10px;margin-left:18px;display:flex">
              <div>描述评价</div>
              <div style="margin-left:10px;">
                  <van-rate v-model="value" :size="21" color="orangered" void-icon="star" void-color="#eee"/>
              </div>
          </div>
          <!-- white -->
          <div>
            <textarea v-model="textValue" style="font-size:13px;margin-top:20px;border-color:white" placeholder="从多个角度评价宝贝，可以帮助更多的人" name="" id="" cols="45" rows="10"></textarea>
          </div>
          <div>
            <van-field name="uploader" label="图片发表">
                <template #input>
                    <van-uploader v-model="uploader" />
                </template>
            </van-field>
          </div>
      </div>
      <div class="model1">
          <div></div>
          <div style="display:flex">
              <div style="margin-left:20px;font-size:13px;">物流服务</div>
              <div style="margin-left:10px;">
                  <van-rate v-model="value1" :size="21" color="orangered" void-icon="star" void-color="#eee"/>
              </div> 
         </div>                
          <div style="display:flex">
              <div style="margin-left:20px;font-size:13px;">服务态度</div>
              <div>
                <div style="margin-left:10px;">
                  <van-rate v-model="value2" :size="21" color="orangered" void-icon="star" void-color="#eee"/>
                </div>                    
              </div>
          </div>                 
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import req from '@/api/evaluate.js'
import reqq from '@/api/order'
export default {
    data(){
        return{
            //  uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
            userData:{},
             uploader: [],
            value:0,
            value1:0,
            value2:0,
            goodsId:'',
            goodsName:'',
            goodsImg:'',
            goodsDesc:'',
            orderDetailId:'',
            textValue:'',
            orderId:''
        }
    },
    mounted(){
        this.getToken()        
        this.getGoodsDetail()
    },
    methods:{
    issue(){
    },    
    getToken(){
      this.userData = JSON.parse(sessionStorage.getItem('token'))
    //   console.log(this.userData)
    },    
    getGoodsDetail(){
        this.orderId = JSON.parse(sessionStorage.getItem('orderId'))    
        // alert(JSON.stringify(this.orderId))    
        this.goodsId = JSON.parse(sessionStorage.getItem('goodsId'))
        this.goodsName = JSON.parse(sessionStorage.getItem('goodsName'))
        this.goodsImg = JSON.parse(sessionStorage.getItem('goodsImg'))
        this.goodsDesc = JSON.parse(sessionStorage.getItem('goodsDesc'))
        this.orderDetailId = JSON.parse(sessionStorage.getItem('orderDetailId'))
        // console.log(this.goodsId+this.goodsName+this.goodsImg+this.goodsDesc)
    },    
    onClickLeft() {
      this.$router.push({path:'/order'})
    },
    onClickRight() {
        // console.log(this.userData.id)
        // console.log(this.userData.nickname)
        // console.log(this.userData.img)
        // console.log(this.goodsId)
        // console.log(this.goodsName)
        // console.log(this.goodsImg)
        // console.log(this.goodsDesc)
        // console.log(this.orderDetailId)
        req('addEvaluate',{
            goodsId:this.goodsId,
            userId:this.userData.id,
            userAvatar:this.userData.img,
            userName:this.userData.nickname,
            orderDetailId:this.orderDetailId,
            orderDetailDesc:this.goodsDesc,
            evaluateDesc:this.textValue,
            starLevel:this.value
        }).then(data=>{
            if(data.code == 0){
                //修改订单状态
                reqq('updateOrderState',{id:this.orderId,state:'5'}).then(data=>{
                Toast.loading({
                message: '加载中...',
                forbidClick: true,
                });
                setTimeout(() => {    
                Toast.success("评价成功")  
                this.show = false
                sessionStorage.setItem('currentOrderState',null)
                this.$router.push({path:'/order'})
                }, 2000);
              })                

            }
            else{
                Toast.success('评价失败')
            }
        })
    },
    }
}
</script>

<style lang="less" scoped>
.all{
    margin-top: -13px;
    background: rgba(128, 128, 128, 0.068);
}
.model{
    border-radius: 10px;
    background: white;
    width: 97%;
    margin-left: 1.5%;
}
.model1{
    border-radius: 10px;    
    margin-top: 20px;
    width: 97%;
    margin-left: 1.5%;
    background: white;
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
</style>