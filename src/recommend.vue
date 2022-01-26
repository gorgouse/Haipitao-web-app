<template> 
<div>
  <div style="background:wheat;height:1000px">
      <div style="margin-left:3.5%;width:93%;display:flex;margin-top: 15px;flex-wrap: wrap;justify-content:space-between">
          <div v-for="(item,index) in goodsList" :key="index">
              <div @click="getDetailId(item)" style="margin-top:15px;background:white;border-radius:5px;">
                 <div><img style="width:150px;height:130px;border-top-left-radius:5px;border-top-right-radius:5px;" :src="item.gImg"></div>
                 <div style="font-size:10px;"><b>{{item.gName}}</b></div>
                 <div style="font-size:15px;">
                   <div style="color:orange"><b>¥{{item.gPrice}}</b></div>
                   <div></div>
                 </div>
              </div>
          </div>
      </div>
  </div>

  </div>
</template>

<script>
import req from '@/api/store.js'
export default {
  data(){
    return{
      goodsList:[],
      storeId:'',
    }
  },
  mounted(){
    this.selectStoreGoodsMethod()
  },
  methods:{
    getDetailId(item){
      // alert(JSON.stringify(item.id))
      sessionStorage.setItem('goodsId',JSON.stringify(item.id))
      this.$router.push({path:'/goodsdetail'})
        
    },
    selectStoreGoodsMethod(){
      this.storeId = JSON.parse(sessionStorage.getItem('storeId'))
      req('selectStoreGoods',{storeId:this.storeId}).then(data=>{
        this.goodsList = data.data
        // alert(JSON.stringify(this.goodsList))
      })
    }
  }
}
</script>

<style>

</style>