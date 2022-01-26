<template>
  <div>
    <div class="head">

       <div class="index" style="background:white">
          <div style="margin-top:10px;margin-left:12px;"><van-icon name="search" size="22" /></div>
          <div style="margin-left:80px;font-size:25px;">
            <van-tabs v-model="active" animated> 
              <van-tab v-for="(item,index) in tagList" :key="index" :title="item">
                  <!-- {{ item }} -->
            </van-tab>
            </van-tabs>
          </div>
       </div>
       <div class="shop" style="margin-top:0px;background:white;display:flex">
         <span style="width:10px"></span>
         <div style="margin-top:10px;">
              <div class="shopname" style="left:20px;font-size:15px;">
                    <div style="margin-right:113px;"><span><b>{{storeData.name}}</b></span></div>
              </div>
           <div style="display:flex;margin-top:5px;">
             <div class="tag" style="margin-left:0px;"><van-tag  type="danger">嗨皮</van-tag></div>
             <div class="rank" style="margin-top:2px;margin-left:0px;font-size:5px;color:gray">
                   <b>综合体验</b>
                   <van-rate style="margin-top:1px;margin-left:2px;" :size="11" color="#ffd21e" void-icon="star"
                  void-color="#eee" v-model="storeData.score" /></div>
             <div class="fans" style="margin-top:1px;font-size:10px;margin-left:10px;color:gray"><b>粉丝数{{storeData.fansNumber}}</b></div>
           </div>
         </div>
         <div @click="show = !show">
           <van-tag v-show="show === true" style="margin-top:10px;margin-left:20px;" size="large" round type="warning">关注</van-tag>
           <van-tag v-show="show === false" style="margin-top:10px;margin-left:20px;" size="large" round type="warning">已关注</van-tag>
          </div>
       </div>
    </div>

    <div></div>

    
      <div style="margin-top:120px;">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import req from '@/api/store.js'
export default {
data(){
  return{
    show:false,
    tagList:{recommend:'推荐',baby:'宝贝',new:'新品'},
    active:'',
    storeData:{},
    storeId:'',
    }
  },
  mounted(){
    this.selectStoreMethod()
  },
  methods:{
    selectStoreMethod(){
      this.storeId = JSON.parse(sessionStorage.getItem('storeId'))
      // alert(JSON.parse(this.storeId))
      req('selectStore',{id:this.storeId}).then(data=>{
          this.storeData = data.data
          // alert(JSON.stringify(this.storeData))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head{
  width: 100%;
  z-index: 999;
  height:60px;
  background: white;
  top: 0;
  position: fixed;
}
.index{
display: flex;
}
</style>