<template>
  <div>
       <div class="search">
          <van-search @cancel="onCancel" show-action @input="search" v-model="value" placeholder="请输入搜索关键词" />
      </div>
      <div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="index">
                    <div @click="getDetailId(item)" style="color:gray">{{item.gName}}</div>
                </van-cell>
          </van-list>
      </div>
  </div>
</template>

<script>
import req from '@/api/search.js'
export default {
data(){
    return{
        list: [],
        loading: false,
        finished: true,
        value:"",
    }
 },
 methods:{
    getDetailId(item){
        // alert(JSON.stringify(item.id))
        sessionStorage.setItem('goodsId',JSON.stringify(item.id))
        this.$router.push({path:'/goodsdetail'})
        
    },     
   search(){
       if(this.value != ''){
           this.finished = !this.finished
           req('searchMethod',{gName:this.value}).then(data=>{
        //    alert(JSON.stringify(data.data))
           this.list = data.data
           this.finished = !this.finished
       })
       }
    },
    onCancel() {
      this.$router.push({path:'/home'})
    },
   onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => { 
    //   }, 1000);
    },
 }
}
</script>

<style lang="scss" scoped>
.search{
    background: white;
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0px;
}
</style>