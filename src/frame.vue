<template>
  <div class="bg">
      <div>
          <router-view></router-view>
      </div>
      <div class="foot" v-show="$route.path !== '/goodsdetail'">
        <div class="bo">
          
          <div @click="$router.push({path:'/home'})">
            <div v-show="$route.path !== '/home'">
               <van-icon color="gray" name="wap-home-o" />
               <div style="color:gray;margin-top:-5px;font-size:10px;">首页</div>
            </div>
            
            <div v-show="$route.path === '/home'">
               <van-icon color="rgba(255, 51, 0, 0.884)" name="wap-home-o" />
               <div style="color:rgba(255, 51, 0, 0.884);margin-top:-5px;font-size:10px;">首页</div>
            </div>
          </div>

        <div @click="$router.push({path:'/sort'})">
            <div v-show="$route.path !== '/sort'">
              <van-icon color="gray" name="apps-o" />
               <div style="color:gray;margin-top:-5px;font-size:10px;">分类</div>
            </div>

            <div v-show="$route.path === '/sort'">
             <van-icon color="rgba(255, 51, 0, 0.884)" name="apps-o" />
             <div style="color:rgba(255, 51, 0, 0.884);margin-top:-5px;font-size:10px;">分类</div>
            </div>
        </div>

        <div @click="$router.push({path:'/chatlist'})">
            <div v-show="$route.path !== '/chatlist'">
                <van-icon color="gray" name="chat-o" />
                <div style="color:gray;margin-top:-5px;font-size:10px;">消息</div>
             </div>

            <div v-show="$route.path === '/chatlist'">
                <van-icon color="rgba(255, 51, 0, 0.884)" name="chat-o" />
                <div style="color:rgba(255, 51, 0, 0.884);margin-top:-5px;font-size:10px;">消息</div>
             </div>
        </div>
        
        <div @click="$router.push({path:'/shopcar'})">
            <div v-show="$route.path !== '/shopcar'">
                <van-icon color="gray" name="shopping-cart-o" />
                 <div style="color:gray;margin-top:-5px;font-size:10px;">购物车</div>
            </div>

            <div v-show="$route.path === '/shopcar'">
                <van-icon color="rgba(255, 51, 0, 0.884)" name="shopping-cart-o" />
                 <div style="color:rgba(255, 51, 0, 0.884);margin-top:-5px;font-size:10px;">购物车</div>
            </div>
        </div>

      <div @click="$router.push({path:'/mine'})">
        <div v-show="$route.path !== '/mine'">
          <van-icon color="gray" name="contact" />
          <div style="color:gray;margin-top:-5px;font-size:10px;">我的嗨皮</div>
        </div>

        <div v-show="$route.path === '/mine'">
          <van-icon color="rgba(255, 51, 0, 0.884)" name="contact" />
          <div style="color:rgba(255, 51, 0, 0.884);margin-top:-5px;font-size:10px;">我的嗨皮</div>  
        </div>
      </div>       

        </div>
      </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    value:''
  }
}
}
</script>

<style lang="scss" scoped>
// .bg{
//   background: white;
// }
.foot{
  // z-index:999;
  position: fixed;
  bottom: 0px;
  height: 50px;
  width: 100%;
  background: white;
  .bo{
  margin-top: 3px;
   display: flex;
  font-size: 25px;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  }
}
</style>