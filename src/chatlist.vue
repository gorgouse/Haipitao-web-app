<template>
  <div>
      <div><van-nav-bar
  style="top:0px;position:fixed;width:100%;z-index:5"
  title="消息(58)"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/></div>

    <div>
        <div>
            <div v-for="(item,index) in chatList" :key="index">
                <div class="list" @click="tochat(item)">
                    <div style="margin-left:10px;"><img style="height:20px;width:20px;" :src="item.img" alt=""></div>
                     <div>{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import req from '@/api/chat.js'
export default {
    data(){
        return{
            data:{},
            chatList:[],
            userData:{}
        }
    },
    mounted(){
        this.userChatListMethod()
        this.userDataMethod()
    },
    methods:{
        userDataMethod(){
            this.userData = JSON.parse(sessionStorage.getItem('token'))
            // alert(JSON.stringify(this.userData.id))
        },
        userChatListMethod(){
            req('userChatList',{userId:this.userData.id}).then(data=>{
                this.chatList = data.data
                // alert(JSON.stringify(this.chatList))
            })
        },
        onClickLeft(){},
        onClickRight(){},
        tochat(item){
            // alert(JSON.stringify(item))
            sessionStorage.setItem('msgObject',JSON.stringify(item))
                this.$router.push({path:'/chat'})

        }
    }
}
</script>

<style lang="scss" scoped>
.list{
display: flex;
height: 40px;
}
</style>