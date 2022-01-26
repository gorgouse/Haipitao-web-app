<template>
  <div>
      <div>
          <van-nav-bar class="myaddress" title="我的收货地址" left-arrow @click-left="onClickLeft"/>
     </div>
      <div>
          <van-address-list v-model="chosenAddressId" :list="addressData"
            disabled-text="以下地址超出配送范围" @add="onAdd" @edit="onEdit"/>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import reqq from '@/api/area.js'
import req from '@/api/address.js'
export default {
data(){
    return{
         addressDefault:'',
         areaData:{},
         userData:{},
         addressData:[],
         chosenAddressId: '',
         selectData:{},
    }
},
mounted(){
    this.getToken()    
    this.addressListMethod()
},
methods:{
    onClickLeft() {
     sessionStorage.setItem('addressId',JSON.stringify(this.chosenAddressId))
     this.$router.push({path:'/ensure'})
    },
     onAdd() {
      this.$router.push({path:'/add'})
    },
    onEdit(item, index) {
      sessionStorage.setItem('AddressInfo',JSON.stringify(item))
      this.$router.push({path:'/edit'})
    },
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
    },
    addressListMethod(){
        req('addressList',{userId:this.userData.id}).then(data=>{
        this.addressData = data.data
        //  alert(JSON.stringify(this.addressData))
        })
    },
}

}
</script>

<style lang="scss" scoped>
.myaddress{
top: 0px;
width: 100%;
position: fixed;
}
</style>