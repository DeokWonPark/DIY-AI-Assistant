<template>
  <div>
    <ul class="list-group list-group-flush" id="rightgo">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <span v-bind:style="{float:r}" v-if=mycheck(message)>{{message}}</span>
        <span class="float-left" v-else>{{message}}</span>
        <!-- <span class="float-left">안녕</span>         -->
      </li>
      <li class="list-group-item" >
        <span class="float-left" id="typing2" v-if=jyp> 챗봇 기능 on </span>
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
      r:"right"
    };
  },

  name: "HelloWorld",  
  props: ["messages","culusers","jyp","cli_name"],

  created() {
    this.$socket.on("typing", data => {
    // when "chat-message" comes from the server
    this.typing = data.typing
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
  max-height: 50vh;
  overflow-y: auto;
}
#typing{
  background-color: rgb(125, 240, 125);
}
#typing2{
  background-color: rgb(238, 255, 81);
}
#cli_name{
    background-color: rgb(159, 125, 240);
}
/* #rightgo{
  text-align: right;
  
} */

</style>
