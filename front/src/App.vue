<template>
  <div id="app" class="container">
    <div  style="margin:auto;width:50%">
      <div>
        <!-- class="card bg-info" -->
        <Header />
        <userlist :culusers="culusers" />
        <ChatList :messages="messages" :jyp="jyp" :cli_name="cli_name"/>
        <!-- <ChatList :culusers="culusers" /> -->
        <Input @send="send($event)" :cli_name="cli_name"/>
        <!-- props 등록 -->
        <audio src="music.mp3" autoplay controls loop></audio>
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
      jyp: false,
      path:null,
     // socket: io("https://838beac0.ngrok.io") // socket connection to server
    };
  },

  created() {
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
      console.log("msg received from server");
      this.messages.push(data.name+"님의 채팅: "+data.message);
    });

    this.$socket.on("chat-messagebot", data => {
      console.log("msg received from server");
      this.messages.push(data.message);
    });


    this.$socket.on("song-chat",data =>{
      var newDivHtml;
      if(data.length<=1){
        newDivHtml = "<li> ---- 멜론차트 TOP 1 ---- </li>";
        var newImgHtml = '<img src={{path}} id="sad" width="80dp" height="80dp">';
        newDivHtml = newDivHtml+ newImgHtml+(data[0].ranking+"등. 노래:"+data[0].title+"ㅡ  "+data[0].artist)+"</br>";
      }
      else{
        newDivHtml = "<li> ---- 멜론차트 TOP 50 ---- </li>";
        for(var c in data){
        newDivHtml = newDivHtml+ (data[c].ranking+"등. 노래:"+data[c].title+"ㅡ  "+data[c].artist)+"</br>";
        }
      }
  
      this.chartdiv = parent.document.createElement("ul");
      this.chartdiv.id = "songchart";
      this.chartdiv.innerHTML = newDivHtml;
      var iBlock = document.getElementById("sky");
      var liBlock = iBlock.getElementsByTagName("li");

      parent.document.getElementById("sky").insertBefore(this.chartdiv,liBlock[this.messages.length]);

      
      document.getElementById("sad").src=data[0].imagepath;

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
      document.getElementById("form-form").value='';
      // implementation of send method for vue instance
      this.messages.push(this.cli_name+"님의 채팅: "+data) //내가보낸 채팅 그냥 append

      if(data=='비틀즈 on'){
        this.jyp=true;
        data.message="";
      }
      else if(data=='비틀즈 off'){
        this.jyp=false;
      }
      if(this.jyp==true){
        this.$socket.emit("chat-messagebot", {
        message: data, // emitting "chat-message" to the server
        name: this.cli_name
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
  #songchart{
  color: #FFFFFF;
  border: 5px solid navy;
}

</style>
