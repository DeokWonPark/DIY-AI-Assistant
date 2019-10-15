<template>
  <div class="card-header text-white" id="star">
    <h3 @click="showModal=true">Beatles</h3>
    <Search @send_keyword="send_keyword($event)"/>
    <modal v-if=showModal>
      <h3 slot="header">Beatles</h3>
      <span slot="footer" @click="showModal = false">
        Version 0.1.1. <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import Search from "./Search.vue";
export default {
    components:{
        Modal,
        Search
    },
    data: function(){
        return{
            showModal:false
        }
    },

    methods: {
    send_keyword(data) {
      // implementation of send method for vue instance
      this.$socket.emit("search", {
        keyword: data // emitting "chat-message" to the server
      });
    }
  }
}
</script>

<style scoped>
#star{
  background-image:url('star.png');
  opacity:0.9;
}
h3 {
  text-align: left;
  color:rgb(255, 255, 0);
  text-align: center;
  margin-left: 150px;
}

.card-header h3,
.card-header div
{
  display: inline;
}
</style>