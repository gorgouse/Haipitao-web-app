<template>
  <div class="frame">
      <div>
          <van-nav-bar  title="我的主页" @click-left="onClickLeft" left-text="返回" left-arrow>
          <template #right>
          <van-icon color="gray" name="setting-o" />
          </template>
          </van-nav-bar>
      </div>
      <!-- <div style="height:10px"></div>     -->
      <div class="head" >
          <div class="avatar"><van-image style="margin-top:20px;" round width="4rem" height="4rem" :src="userData.img"/></div>
          <div>
             <div class="name" style="margin-left:15px;margin-top:25px;"><b>{{userData.nickname}}</b></div>
            <div class="attention">
              <div class="care">2关注</div>
              <div class="fans">0粉丝</div>
            </div>
          </div>
      </div>

      <div class="msg">
        <div class="b"></div>
        <div class="myorder" @click="$router.push({path:'/order'})"><b>我的订单</b></div>
        <div class="icon">
            <div class="unpay"  @click="selectOrderState(1)">
          <div><van-icon size="30" name="pending-payment" /></div>
          <div>待付款</div>
        </div>
        <div class="undeliver"  @click="selectOrderState(2)">
          <div><van-icon size="30" name="send-gift-o" /></div>
          <div>待发货</div>
        </div>
        <div class="unreceive" @click="selectOrderState(3)">
          <div><van-icon size="30" name="logistics" /></div>
          <div>待收货</div>          
        </div>
        <div class="unmark" @click="selectOrderState(4)">
          <div><van-icon size="30" name="smile-comment-o" /></div>
          <div>待评价</div>          
        </div>
        <div class="retreive" @click="retreive">
          <div><van-icon size="30" name="cash-back-record" /></div>
          <div>退款/售后</div>        
        </div>  
        </div>
      </div>

      <div class="logo">
        <div class="a"></div>
        <div class="first">
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/hb.png">
            <div>红包卡劵</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/nc.png">
            <div>绿色农场</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/jb.png">
            <div>狂热金币</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/awards.png">
            <div>成就奖励</div>            
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/save.png">
            <div>省钱作战</div>            
          </div>
        </div>

        <div class="sec">
           <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/tb.png">
            <div>超前购物</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/kf.png">
            <div>客户小艾</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/set.png">
            <div>我的设置</div>
          </div>
          <div @click="tip">
            <img style="height:30px;width:30px;" src="./assets/cp.png">
            <div>修改密码</div>            
          </div>
          <div @click="$router.push({path:'/login'})">
            <img style="height:30px;width:30px;" src="./assets/exit.png">
            <div>退出应用</div>            
          </div>
        </div>
      </div>

      <div class="last" style="height:80px"></div>

  </div>
</template>

<script>
import req from '@/api/user.js'
import { Toast } from 'vant';
export default {
  data(){
    return{
      userId:{},
      userData:{}
    }
  },
  mounted(){
    this.getUserDetail()
  },
  methods:{
  tip(){
         Toast.fail('此功能未开放 敬请期待！');
     },    
   retreive(){
     Toast({
    message: '你很机车哎',
    icon: 'smile-o',
});
   }, 
   selectOrderState(currentOrderState){
    //  alert(currentOrderState)
    sessionStorage.setItem('currentOrderState',JSON.stringify(currentOrderState))
    this.$router.push({path:'/order'})
   },    
    getUserDetail(){
      this.userId = JSON.parse(sessionStorage.getItem('token')).id
      // alert(JSON.stringify(this.userId))
      req('getDetail',{id:this.userId}).then(data=>{
        this.userData = data.data
        // alert(JSON.stringify(this.userData))
      })
    },
    onClickLeft(){
      this.$router.push({path:'/home'})
    }
  }
}
</script>

<style lang="less" scoped>
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
.frame{
  background: rgba(128, 128, 128, 0.13);
}
.logo{
  border-radius: 10px;
  height: 130px;
  background: white;
  width: 94%;
  margin-left: 3%;
  margin-top: 20px;
  font-size: 11px;
  color:gray;
  .a{
    height:15px
  }
  .first{
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  display: flex;
  }
  .sec{
  margin-top: 10px;
  width: 90%;
  margin-left: 5%;    
  justify-content: space-between;
  display: flex;
  }
}

.msg{
  height: 100px;
  border-radius: 8px;
  background: white;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  color:gray;
  font-size: 10px;
  .b{
    height: 13px;
  }
  .myorder{
    text-align:left;
    margin-top: -5px;
    font-size: 14px;
  margin-left: 20px;
  }
  .icon{
  margin-top: 10px;
  width: 90%;
  margin-left: 5%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  }
}
.last{
  height: 100px;
}
.head{
  margin-top: -14px;
  width: 90%;
  margin-left: 5%;
  display: flex;
}
.attention{
  font-size: 13px;
  display: flex;
  margin-top: 10px;
  margin-left: 15px;;
  // .care{}
  .fans{margin-left: 10px;}
}
</style>