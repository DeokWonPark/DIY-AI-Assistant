<template>
  <div>
    <ul class="list-group list-group-flush" id="rightgo">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <span class="bubble">{{message}}</span>
        <!-- <span class="float-left">안녕</span>         -->
      </li>
      <li class="list-group-item" >
        <span class="float-left" id="typing"> {{typing}} </span>
      </li>
      <!-- <li class="list-group-item" v-for="culuser in culusers" :key="culuser.id">
        <span class="float-left" id="join">{{culuser}}</span>
      </li> -->
    </ul>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      typing: '',
    };
  },

  name: "HelloWorld",  
  props: ["messages","culusers"],

  created() {
    this.$socket.on("typing", data => {
    // when "chat-message" comes from the server
    this.typing = data.typing
  });
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
  max-height: 50vh;
  overflow-y: auto;
}
#typing{
  background-color: rgb(125, 240, 125);
}


.bubble 
	{
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
/* #rightgo{
  text-align: right;
  
} */

</style>
