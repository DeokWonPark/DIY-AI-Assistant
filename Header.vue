<template>
  <div class="card-header text-white">
    <h4 @click="showModal=true">My Chat App</h4>
    <modal v-if=showModal>
      <h3 slot="header">My Chat App</h3>
      <span slot="footer" @click="showModal = false">
        Version 0.1.1. <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    components:{
        Modal
    },
    data: function(){
        return{
            showModal:false
        }
    }
}
</script>

<style scoped>
h4 {
  text-align: left;
}
</style>