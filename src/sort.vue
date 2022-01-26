<template>
  <div>
      <div>
          <van-nav-bar @click-left="onClickLeft" title="商品分类" left-text="返回" left-arrow>
          <template #right>
          <van-icon name="weapp-nav" />
          </template>
          </van-nav-bar>
      </div>
           <!-- {{activeId}}              -->
      <div class="list" style="display:flex;width:30%">
        <div>
           <van-sidebar v-model="activeId" style="">
             <ul style="list1">
              <li v-for="(item,index) in firstlist"  :key="index" @click="getSecond(item.id)">
                <van-sidebar-item :title="item.text" />
              </li>
              </ul>  
            </van-sidebar>
        </div>  

        <!-- {{activeId}} -->
          

      <div class="div">
        <ul class="list2">
          <li class="list2-item" v-for="(item,index) in datalist" :key="index">
             <div class="list2-title"><b>{{item.classifySecondName}}</b></div>
             <div class="goodslist">
                <li v-for="(childItem,childIndex) in item.goodsList" :key="childIndex">
                    <div class="goods" @click="getDetailId(childItem.id)">
                      <van-image width="90" height="90" :src="childItem.gImg"/>
                      <div style="font-size:10px;color:gray"><b>{{childItem.gName}}</b></div>                      
                    </div>
                </li>
             </div>
          </li>
        </ul>          
    </div>
  </div>

      <div style="height:100px"></div>

  </div>
</template>

<script>
import req from'@/api/goods.js'
export default {
  data(){
    return{
      currentClassify:'',
      activeIndex: 0,
      activeId:0,
      firstlist:[],
      datalist:[],
    }
  },
  mounted(){
    this.getFist()
  },
  methods:{
    getFist(){
      req('firstClassify',{}).then(data=>{
        this.firstlist = data.data
        this.currentClassify = this.firstlist[0].id
        // alert(JSON.stringify(this.firstlist))
        this.getSecond(this.currentClassify)
      })
    },
    getSecond(item){
      // alert(item)
      this.firstId = item
      req('getGoodsBySort',{classifyId:item}).then(data=>{
        this.datalist = data.data
        // alert(JSON.stringify(this.datalist))
      })
    },
    onClickLeft(){
      this.$router.push({path:'/home'})
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
  
.div {
// background: greenyellow;
width: 70%;
.list2-title{
  // margin-left: -145px;
  font-size: 15px;
  // color: rgba(255, 68, 0, 0.719);
  color:pink,
}
    }
.list2-item{
  margin-top: 8px;
  margin-left: 10px;
  flex-wrap: wrap;
  // background: hotpink;
  .goodslist{
    margin-top: 10px;
    position: relative;
    box-sizing: border-box;    
    justify-content: space-between;
    display: flex;
    .goods{
      margin-left: 5px;
      // background: hotpink;
      // margin-left: -30px;
      .gName{
        font-size: 10px;
      }
    }
  }
}    

</style>