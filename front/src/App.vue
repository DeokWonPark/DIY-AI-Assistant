<template>
  <div id="app" class="container">
    <div class="col-lg-6 offset-lg-3">
      <div class="suze">
        <!-- class="card bg-info" -->
        <Header />
        <userlist :culusers="culusers" />
        <ChatList :messages="messages"/>
        <!-- <ChatList :culusers="culusers" /> -->
        <Input @send="send($event)" :cli_name="cli_name"/>
        <!-- props 등록 -->
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
      cli_name: null,
      //socket: this.$io("localhost:3000") // socket connection to server
    };
  },

  created() {
    // created callback of vue instance
    var name=prompt("채팅에 사용 할 이름을 설정해 주세요");
    this.$socket.emit("userdata",name);
    this.cli_name=name;

    this.$socket.on("joinroom",(culname) => {
    this.messages.push(culname+" 님이 입장하였습니다.");
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
      console.log("msg received from server");
      this.messages.push(data.name+"님의 채팅: "+data.message);
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

    send(data) {
      // implementation of send method for vue instance
      this.messages.push(this.cli_name+"님의 채팅: "+data) //내가보낸 채팅 그냥 append


      if(data=='안녕'){
        var d=new Date();
        var cultime=d.getHours();
        if(cultime<12 && cultime>1){
          this.messages.push("JYP : "+this.cli_name+"님 즐거운 아침이에요");
        }
        else if(cultime>=12 && cultime<18){
          this.messages.push("JYP : "+this.cli_name+"님 점심식사는 하셨나요 ^ㅡ^");
        }
        else if(cultime>=18){
          this.messages.push("JYP : "+this.cli_name+"님 굿나잇 @n@ ");
        }
        else{
          this.messages.push("JYP : "+this.cli_name+"님 새벽이네요");
        }
      }
      else if(data=='이름이 뭐야'){
        this.messages.push("JYP : "+this.cli_name+"님의 챗봇(JYP)입니다.");
      }
      else if(data=='채팅참여인원'){
        var str="JYP : ";
        for(var user in this.culusers){
          str=str+this.culusers[user].name+"님,";
        }
        this.messages.push(str+"이 현재 참여중입니다.");
      }


      this.$socket.emit("chat-message", {
        message: data, // emitting "chat-message" to the server
        name: this.cli_name
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
.suze{
  background-color:rgb(205, 255, 195);
}

</style>
