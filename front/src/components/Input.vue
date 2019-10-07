<template>
  <div class="card-body">
    <form @submit.prevent="$emit('send',cli_name+strtok+newMessage)">
      <!-- Prevent default event for submit, execute send method instead-->
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter message here"
          v-model="newMessage"
        />
        <!-- binding with newMessage variable v-model="newMessage"-->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newMessage: "",
      typing: "",
      strtok: "님의 채팅:",
    };
  },
  name: "typ",
  props: ["cli_name"],
   watch: {
    newMessage: function() {
      
        if(this.newMessage == '')
        {
          this.$socket.emit("typing", {
          typing: "" // emitting "typing" to the server
        });
        }
        
        else {
        this.$socket.emit("typing", {
        typing: this.cli_name+" is typing" // emitting "typing" to the server
        });
      }
    }
  }

};
</script>