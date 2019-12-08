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
      count:1,
    };
  },
  name: "typ",
  props: ["cli_name"],
   watch: {
    newMessage: function() {
        
        if(this.newMessage == '')
        {
          this.count = this.count - 1
          this.$socket.emit("typing", {
          typing: "", // emitting "typing" to the server
          usr_name: this.cli_name,
        });
        }
        
        else if(this.count == 1) {
        this.count = this.count + 1
        this.$socket.emit("typing", {
        typing: this.cli_name+" 님이 채팅 중 입니다", // emitting "typing" to the server
        usr_name: this.cli_name,
        });
      }
    }
  }

};
</script>
<style>
#sky{
  background-color:rgb(102, 204, 204);
  opacity:1;
}
</style>