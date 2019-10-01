<template>
  <div id="app" class="container">
    <div class="col-lg-6 offset-lg-3">
      <div class="card bg-info">
        <Header />
        <ChatList :messages="messages"/>
        <Input @send="send($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from "./components/ChatList.vue";
import Header from "./components/Header.vue";
import Input from "./components/Input.vue";

export default {
  name: "app",
  components: {
    ChatList,
    Header,
    Input
  },
  data: function() {
    // data
    return {
      messages: [],
      newMessage: null,
      //socket: this.$io("localhost:3000") // socket connection to server
    };
  },

  created() {
    // created callback of vue instance
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
