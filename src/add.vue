<template>
  <div>
    <div>
          <van-nav-bar class="myaddress" title="添加收货地址" left-arrow @click-left="onClickLeft"/>
     </div>
      <div>
          <van-address-edit :area-list="areaData" 
                            show-delete show-set-default 
                            show-search-result 
                            :search-result="searchResult" 
                            :area-columns-placeholder="['请选择', '请选择', '请选择']"
                            @save="onSave" 
                            save-button-text
                            @delete="onDelete"/>
      </div>
  </div>
</template>

<script>
import req from '@/api/address.js'
import reqq from '@/api/area.js'
import { Toast } from 'vant';
export default {
data(){
    return{
        userId:'',
        addressData:{},
        areaData:{},
        searchResult: [],
    }
 },
 mounted(){
    this.getToken() 
    this.getAreaListMethod()
    this.getAddrsssInit()
 },
 methods:{
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
    }, 
    getAreaListMethod(){
        reqq('getAreaList',{}).then(data=>{
            this.areaData = data.data
            // alert(JSON.stringify(this.areaData))
        })
    },
    getAddrsssInit(){
        this.addressData = JSON.parse(sessionStorage.getItem('AddressInfo'))
        // alert(JSON.stringify(this.addressData))
    },
    onClickLeft() {
        this.$router.push({path:'/address'})
    },
    onSave(val) {
        // alert(JSON.stringify(val))
        req('addAddress',{
            name:val.name,
            userId:this.userData.id,
            tel:val.tel,
            province:val.province,
            city:val.city,
            county:val.county,
            addressDetail:val.addressDetail,
            isDefault:val.isDefault
            }).then(data=>{
            if(data.code === 0){
                Toast.success('添加成功');
                this.$router.push({path:'/address'})
            }
            else{
                Toast.fail('保存失败');
            }
        })
    },
    onDelete() {
        Toast.success('删除成功');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
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