<template>
  <div class="main">
     <div>
       <van-nav-bar  @click-left="onClickLeft" style="background:(128, 128, 128, 0.336);top:0;position:fixed;z-index:5;width:100%;" :title="toUserName" left-arrow/>
        <div class="message" v-for="(item,index) in messageList" :key="index">
          <div v-if="item.fromUserId == thisId" style="text-align: right;margin-right:20px;"> 
            <div>
              <span class="chat-bubble chat-bubble-right">
          <b>{{item.msg}}</b> </span><span><van-image round width="2.2rem" height="2.2rem" :src="thisImg"/></span>
            </div>
          </div>
            <br/>
          <div v-if="item.fromUserId != thisId" style="text-align: left;margin-left:10px;">
            <div style="font-size:10px;color:gray">{{item.name}}</div>
            <div style="height:5px"></div>
            <span><van-image round width="2.2rem" height="2.2rem" :src="toUserImg"/></span>
            <span class="chat chat-left">{{item.msg}}</span>
          </div>
          <br/> 
        </div>
        <div style="height:100px"></div>

       <div style="bottom:0;position:fixed;width:100%;z-index:10;">
         <van-cell-group style="height:50px;margin-left:0px;background:white;display:flex">
           <!-- <van-icon style="margin-left:" size="29" name="stop-circle-o" /> -->
          <van-field style="background:white;margin-left:0px;margin-top:5px;height:40px;width:80%" round v-model="messageValue" label="" placeholder="请输入需要发送的信息...." />
          <van-button  size="normal" style="margin-top:2.5px;margin-left:5px;" @click="sendMessage" type="primary">发送</van-button>
        </van-cell-group>
       </div>
     </div>
  </div>
</template>
 
<script>
import req from '@/api/chat.js'
export default {
  data() {
    return {
      thisId:'',
      thisName:'',
      thisImg:'',
      toUserId:'',
      toUserName:'',
      toUserImg:'',
      thisSessionId:'',
      shopManageData:{},
      message:'',
      userName:'店家',
      name: "", // 昵称
      websocket: null, // WebSocket对象
      sessionId: "", //对方的sessionId
      messageList:[], // 消息列表
      messageValue: "", // 消息内容
      chatRecordList:[],
    };
  },
  mounted(){
    this.chatStore()
    this.buildWebSocket()
    this.selectChatRecordMethod()
  },
  methods: {
    selectChatRecordMethod(){
      req('selectChatRecord',{fromUserId:JSON.parse(sessionStorage.getItem('token')).id,toUserId:this.toUserId}).then(data=>{
        this.messageList = data.data
        // alert(JSON.stringify(this.messageList))
      })
    },
    chatStore(){
      this.shopManageData = JSON.parse(sessionStorage.getItem('msgObject'))
      this.toUserImg = this.shopManageData.img
      // alert(JSON.stringify(this.shopManageData))
      this.toUserId = JSON.parse(sessionStorage.getItem('msgObject')).userId

      this.toUserName = this.shopManageData.name
      // alert(JSON.stringify(this.shopManageData))
      // alert(JSON.parse(sessionStorage.getItem('token')).img)
      this.thisImg = JSON.parse(sessionStorage.getItem('token')).img
      this.thisId = JSON.parse(sessionStorage.getItem('token')).id//当前登陆用户id
      // alert(this.thisId)
      this.thisName = JSON.parse(sessionStorage.getItem('token')).nickname//当前登陆用户名称
      // alert(JSON.stringify(this.thisName))
    },
    buildWebSocket(){//getBasicRemote
      this.websocket = new WebSocket("ws://47.107.123.144:9999/personalChat/"+this.thisName +'/'+this.thisId)
      // this.websocket = new WebSocket("ws://localhost:9999/personalChat/"+this.thisName +'/'+this.thisId)
      this.websocket.onerror = function(){}
      this.websocket.onopen = function(){}
      var that = this
      this.websocket.onmessage = function(event){
        var object = eval("(" + event.data + ")");
        //  alert(object)
        if(object.type == 0){
          // alert('连接成功,type：'+ object.type+ ' ,人数: ' + object.people + ' ,sessionId: ' + object.sessionId)//aisle
          that.thisSessionId = object.sessionId
        }
        if(object.type == 1){
          // alert("接受消息")
          // alert(JSON.stringify(object))
          that.messageList.push(object)
          // alert(JSON.parse(sessionStorage.getItem('token')).id)
        }
      }
      this.websocket.onclose = function(){}
      window.onbeforeunload = function(){
        this.websocket.close() 
      }
    },
    sendMessage:function(){
      req('addChat',{
            fromUserId:JSON.parse(sessionStorage.getItem('token')).id,
            toUserId:this.toUserId,
            msg:this.messageValue}).then(data=>{
            if(data.code === 0){
              // alert("success")
            }
          })      
      var socketMsg = { 
      toUserId:this.toUserId,msg:this.messageValue,
      fromUserName:this.thisName,toUserName:this.toUserName
      }
      socketMsg.type = 1
      // alert(socketMsg)//对象
      // alert(JSON.stringify(socketMsg))//json 对象
      this.websocket.send(JSON.stringify(socketMsg))//发送json对象
      this.messageValue = ''
    },
    onClickLeft(){
      this.$router.push({path:'/chatlist'})
    },
  }
};
</script>
 
<style lang="less" scoped>
.main {
  background:white;
  position: relative;
  top: 20px;
}


.chat-bubble{
  font-size: 10px;
  color: white;
  position: relative;
  margin:12px;
  padding:5px 8px;
  word-break: break-all;
  background:#04BE02;
  border: 1px solid#04BE02;
  border-radius: 5px;
  max-width:180px;
}
 
 
.chat-bubble-right:before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top:5px;
  border: 10px solid ;
  border-color:transparent transparent transparent#04BE02;
}
.chat-bubble-right:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 right:-16px;
 top:7px;
 border: 8px solid;
 border-color:transparent transparent transparent #04BE02 ;
}

.chat{
  font-size: 10px;
  color: white;
  position: relative;
  margin:12px;
  padding:5px 8px;
  word-break: break-all;
  background:rgb(231, 77, 5);
  border: 1px soli rgb(231, 77, 5);
  border-radius: 5px;
  max-width:180px;
}

.chat-left:before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top:5px;
  border: 10px solid;
  border-color:transparent rgb(231, 77, 5) transparent  transparent ;
}
.chat-left:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 left:-16px;
 top:7px;
 border: 8px solid;
 border-color:transparentp rgb(231, 77, 5) transparent  transparent ;
}
 

.message {
// width: 100%;
}
</style>
