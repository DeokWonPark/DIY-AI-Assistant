<template>


  <div class="card-header text-black" id="star">

    <h3>Beatles</h3>
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
export default {
    components:{
        Modal
    },
    data: function(){
        return{
            showModal:false
        }
    },

    
}
</script>

<style scoped>
#star{
  width: 100%;
  text-align: center;
  background-color: rgb(102,204,204);
  opacity:0.9;
}
#star2{
  width: 5%;
  text-align: center;
  background-color: rgb(102,204,204);
  opacity:0.9;
}
h3 {
  color:rgb(0, 0, 0);

}

.card-header h3,
.card-header div
{
  display: inline;
}

</style>