<template>
  <div>
      <div></div>
  </div>
</template>

<script>
import req from '@/api/slide.js'
export default {
data(){
    return{
      slidelist:{},
    }
 },
 mounted(){
     this.getslideList()
 },
 methods:{

 }
}
</script>

<style>

</style>