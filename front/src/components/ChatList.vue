<template>
  <div id="scrollDiv">
    <ul class="list-group list-group-flush" id="sky" >
      <!-- Message loop -->
      <li class="list-group-item" id="sky2" v-for="message in messages" :key="message.id">
        <span class="bubble2" v-bind:style="{float:r}" v-if=mycheck(message)>{{message}}</span>
        <span class="bubble" v-else>{{message}}</span>

      </li>
      
      <li class="list-group-item" id="sky2" >
        <span class="float-left" id="typing" v-if=jyp>
          <b-button-group>
            <b-button v-on:click="fir" id="selbut">{{select1}}</b-button>
            <b-button v-on:click="sec" id="selbut">{{select2}}</b-button>
            <b-button v-on:click="thr" id="selbut">{{select3}}</b-button>
            <b-button v-on:click="four" id="selbut">{{select4}}</b-button>
          </b-button-group>
          
        </span>
      </li>
      <li class="list-group-item" id="sky2" v-for="typing in typings" :key="typing.id">
        <span class="float-left" id="typing"> {{typing}} </span>
      </li>
    </ul>
  </div>

</template>


<script>

export default {
  data: function() {
    return {
      select1:"실시간 멜론차트",
      select2:"히팝!대결",
      select3:"날씨에 맞는 추천곡",
      select4:"도움말",
      typings: [],
      bots: [],
      r:"right",
      count:0,
      us_name:null,
    };
  },

  name: "HelloWorld",  
  props: ["messages","culusers","jyp","cli_name"], // 챗봇 네임 추가

  created() {
    this.$socket.on("chat-message", data => {
      // when "chat-message" comes from the server
      this.messages.push(data.name+":"+data.message);
      ServiceWorkerRegistration.show
    });
    
    this.$socket.on("typing", data => {
    // when "chat-message" comes from the server
    if(data.typing != '') {
    this.typings.push(data.typing);
    }
    else {
      this.count = 0;
      for(var i in this.typings) {
        if(this.typings[i] == data.usr_name+" 님이 채팅 중 입니다") {
          this.typings.splice(this.count,1);
          break;
        }
        this.count = this.count + 1;
      }
    }
  });
    this.$socket.on("chat-messagebot", data => {
    // when "chat-message" comes from the server
    this.bots=data.message.split('/');
    this.select1 = this.bots[1];
    this.select2 = this.bots[2];
    this.select3 = this.bots[3];
    this.messages.push(this.bots[0]);
    });
  },
  
  
  methods: {

    fir: function () {
      this.messages.push(this.cli_name+":"+this.select1)
      this.$socket.emit("chat-messagebot", {
        message: this.select1, // emitting "chat-message" to the server
        name: this.cli_name
      })
    },
    sec: function () {
      this.messages.push(this.cli_name+":"+this.select2)
      this.$socket.emit("chat-messagebot", {      
        message: this.select2, // emitting "chat-message" to the server
        name: this.cli_name
      })
    },
    thr: function () {
        this.messages.push(this.cli_name+":"+this.select3)
        this.$socket.emit("chat-messagebot", {      
        message: this.select3, // emitting "chat-message" to the server
        name: this.cli_name
      })
    },
    four: function () {
        this.messages.push(this.cli_name+":"+this.select4)
        this.$socket.emit("chat-messagebot", {
        message: this.select4, // emitting "chat-message" to the server
        name: this.cli_name
      })
    },
    mycheck(message){
      var msg=message.split(':');
      if(msg[0]==this.cli_name){
        return true;
      }
      else
        return false;
    }
  },
  watch: {
    messages: function() {
        setTimeout(function(){document.getElementById("sky").scrollTop=document.getElementById("sky").scrollHeight;},100)
    }
  }

  
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2,
h4 {
  text-align: left;
}
ul {
  height: 70vh;
  overflow-y: auto;
}
#typing{
  background-color: rgb(99, 192, 192);
  color: rgb(0, 0, 0);
  text-decoration-line: underline;
}
.bubble 
	{
  font-family: 'Arial';
	z-index:100;
	position: relative;
  height: auto;
  width: auto;
  max-width: 45%;
  float: left;
	padding: 10px 10px 10px 10px;
	background: #FFFFFF;
	border-radius: 20px;
	border: #7F7F7F solid 1px;
	position: auto;
	font-size: 16px;
	text-align: left;
	}

	.bubble:after 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 0px 0px 17.5px;
	border-color: #FFFFFF transparent;
	display: block;
	width: 0;
  z-index: 1;
  top:  -18.5px; 
  left: 15px;
	}
	
	.bubble:before 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 0px 0px 17.5px;
	border-color: #7F7F7F transparent;
	display: block;
	width: 0;
  z-index: 0;
  left: 15px;
	top: -20px;
	
	}
.bubble2
	{
  font-family: 'Arial';
	z-index:100;
	position: relative;
  height: auto;
  width: auto;
  max-width: 45%;
  float: left;
	padding: 10px 10px 10px 10px;
	background: rgb(255, 251, 0);
	border-radius: 20px;
	border: #7F7F7F solid 1px;
	position: auto;
	font-size: 16px;
	text-align: left;
	}

	.bubble2:after 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 0px 0px 17.5px;
	border-color: #FFFFFF transparent;
	display: block;
	width: 0;
  z-index: 1;
  top:  -18.5px; 
  left: 15px;
	}
	
	.bubble2:before 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 0px 0px 17.5px;
	border-color: #7F7F7F transparent;
	display: block;
	width: 0;
  z-index: 0;
  left: 15px;
	top: -20px;
	
	}
#sky{
  background-color:rgb(99, 192, 192);
  opacity:0.9;
  border: none;
  height: 61vh;
}
#sky2{
  font-weight: bold;
  background-color: rgba( 255, 255, 255, 0.0);
  border: none;
}
#selbut{
  background-color: rgb(15, 20, 82);
  padding-left: 10dp;
  margin: 7px;
  color:white;
  border-radius: 10px;
  border: rgb(43, 88, 172)
}
#selbut:hover{
  background-color: rgb(0, 45, 128);
}
.dot{
  list-style-type:none;
  height:30px;
}
</style>