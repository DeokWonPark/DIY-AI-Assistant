<template>
  <div>
    <ul class="list-group list-group-flush" id="rightgo">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <span class="float-left">{{message}}</span>
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
  background-color: rgb(169, 236, 233);
}
/* #rightgo{
  text-align: right;
  
} */

</style>
