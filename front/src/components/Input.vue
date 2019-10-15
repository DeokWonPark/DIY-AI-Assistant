<template>
  <div class="card-body" id="sky">
    <form @submit.prevent="$emit('send',newMessage)">
      <!-- Prevent default event for submit, execute send method instead-->
      <div class="form-group">
        <input
          id="form-form"
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
        typing: this.cli_name+" 님이 채팅 중 입니다" // emitting "typing" to the server
        });
      }
    }
  }

};
</script>
<style>
#sky{
  background-image:url('bfall.png');
  opacity:1;
}
</style>