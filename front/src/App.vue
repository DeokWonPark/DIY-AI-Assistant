<template>
      <div>
        <button type="button" @click="notify">Show notification</button>
        <!-- class="card bg-info" -->
        <Header />
        <userlist :culusers="culusers" />
        <ChatList :messages="messages" :jyp="jyp" :cli_name="cli_name"/>
        <!-- <ChatList :culusers="culusers" /> -->
        
        <Input @send="send($event)" :cli_name="cli_name"/>
        <!-- props 등록 -->

      </div>
      
</template>


<script>
import ChatList from "./components/ChatList.vue";
import Header from "./components/Header.vue";
import Input from "./components/Input.vue";
import userlist from "./components/userlist.vue"; //채팅인원 보여주는 리스트 .vue
import Vue from 'vue'
import VueNativeNotification from 'vue-native-notification'
export default {
  
  name: "app",
  components: {
    ChatList,
    Header,
    Input,
    userlist
  },
  data: function() {
    // data
    return {
      start: 0,
      messages: [],
      newMessage: null,
      culusers: [],  //채팅참여인원[]
      cli_name: null,
      jyp: false,
    };
  },

  created() {
    Vue.use(VueNativeNotification, {
    // Automatic permission request before
    // showing notification (default: true)
    requestOnNotify: true
    });
    this.$notification.requestPermission()
  .then(console.log)
    // created callback of vue instance
    var name=prompt("채팅에 사용 할 이름을 설정해 주세요");
    this.$socket.emit("userdata",name);
    this.cli_name=name;

    this.$socket.on("joinroom",(culname) => {
    this.messages.push(culname+" 님이 입장하였습니다.\n");
    // this.culusers.push(culname);
    });

    this.$socket.on("outroom",(culname) => {
    this.messages.push(culname+" 님이 퇴장하였습니다.");
    this.culusers.pop(culname);
    });

    this.$socket.on("dbuser",(rows)=>{ //디비에서 유저정보 가져옴
      this.culusers=rows;
    });

    this.$socket.on("chat-message", data => {
      // when "chat-message" comes from the server
      this.messages.push(data.name+"님의 채팅: "+data.message);
      ServiceWorkerRegistration.show

    });



    this.$socket.on("search",data =>{
      this.messages.push("@@@@   키워드 검색 결과 -start @@@@");
      for(var c in data){
        this.messages.push(data[c].msg+"ㅡ  "+data[c].name+"님이 했던 대화");
      }
      this.messages.push("@@@@   키워드 검색 결과 -end @@@@")
    });
  },

  methods: {
    notify () {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      this.$notification.show('Hello World', {
        body: 'This is an example!'
      }, {})
    },
    send(data) {
      document.getElementById("form-form").value='';
      // implementation of send method for vue instance
      this.messages.push(this.cli_name+"님의 채팅: "+data) //내가보낸 채팅 그냥 append
      
        if(data=='비틀즈 on'){
        this.jyp=true;
          if(this.start<1) {
            this.messages.push("안녕하세요. 뮤직봇 비틀즈 입니다. 당신과 친구가 되어서 기뻐요! ^^ 저는 이런것들을 도와드릴 수 있어요.") //내가보낸 채팅 그냥 append
            this.start = this.start + 1;
        }
        data.message="";
      }
      else if(data=='비틀즈 off'){
        this.jyp=false;
        this.start = 0;
      }
      if(this.jyp==true){

        this.$socket.emit("chat-messagebot", {      
        message: data, // emitting "chat-message" to the server
        name: this.cli_name
        // 챗봇 네임 선언
      });
      }

      if(this.jyp==false){
        this.$socket.emit("chat-message", {
        message: data, // emitting "chat-message" to the server
        name: this.cli_name
      });
      }
    }
  }
};
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>