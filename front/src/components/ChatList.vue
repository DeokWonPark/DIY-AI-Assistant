<template>
  <div>
    <ul class="list-group list-group-flush" id="sky" >
      <!-- Message loop -->
      <li class="list-group-item" id="sky2" v-for="message in messages" :key="message.id">
        <span class="bubble" v-bind:style="{float:r}" v-if=mycheck(message)>{{message}}</span>
        <span class="bubble" v-else>{{message}}</span>
        <!-- <span class="float-left">안녕</span>         -->
      </li>
      <li class="list-group-item" id="sky2" >
        <span class="float-left" id="typing" v-if=jyp> 챗봇 기능 on </span>
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
      typing: [],
      r:"right"
      count:0,
    };
  },

  name: "HelloWorld",  
  props: ["messages","culusers","jyp","cli_name"],

  created() {
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
  },
  methods: {
    mycheck(message){
      var msg=message.split(':');
      if(msg[0]==this.cli_name+"님의 채팅"){
        return true;
      }
      else
        return false;
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
  height: 50vh;
  overflow-y: auto;
}
#typing{
  background-color: rgb(0, 0, 0);
  color: rgb(255, 251, 0);
}

.bubble 
	{
  font-family: 'Arial';
	z-index:100;
	position: relative;
  height: auto;
  width: 45%;
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
	border-width: 0 16px 20px 17.5px;
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
	border-width: 0 16px 20px 17.5px;
	border-color: #7F7F7F transparent;
	display: block;
	width: 0;
  z-index: 0;
  left: 15px;
	top: -20px;
	
	}

#sky{
  background-image:url('fall.png');
  opacity:0.9;
}
#sky2{
  font-weight: bold;
  background-color: rgba( 255, 255, 255, 0.1);
}
</style>
