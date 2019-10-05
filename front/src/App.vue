<template>
  <div id="app" class="container">
    <div class="col-lg-6 offset-lg-3">
      <div class="card bg-info">
        <Header />
        <userlist :culusers="culusers" />
        <ChatList :messages="messages" />
        <!-- <ChatList :culusers="culusers" /> -->
        <Input @send="send($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from "./components/ChatList.vue";
import Header from "./components/Header.vue";
import Input from "./components/Input.vue";
import userlist from "./components/userlist.vue"; //채팅인원 보여주는 리스트 .vue

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
      messages: [],
      newMessage: null,
      culusers: [],  //채팅참여인원[]
      // cli_name: null,
      //socket: this.$io("localhost:3000") // socket connection to server
    };
  },

  created() {
    // created callback of vue instance
    var name=prompt("채팅에 사용 할 이름을 설정해 주세요");
    this.$socket.emit("userdata",name);

    this.$socket.on("joinroom",(culname) => {
    alert(culname+" 님이 입장하였습니다.");
    this.messages.push(culname+" 님이 입장하였습니다.");
    // this.culusers.push(culname);
    });

    this.$socket.on("outroom",(culname) => {
    alert(culname+" 님이 퇴장하였습니다.");
    this.messages.push(culname+" 님이 퇴장하였습니다.");
    this.culusers.pop(culname);
    });

    this.$socket.on("dbuser",(rows)=>{ //디비에서 유저정보 가져옴
      this.culusers=rows;
    });

    this.$socket.on("chat-message", data => {
      // when "chat-message" comes from the server
      console.log("msg received from server");
      this.messages.push(data.message);
    });
  },

  methods: {

    send(data) {
      // implementation of send method for vue instance
      this.$socket.emit("chat-message", {
        message: data // emitting "chat-message" to the server
      });
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
