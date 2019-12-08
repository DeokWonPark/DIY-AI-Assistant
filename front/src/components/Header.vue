<template>
  <div class="card-header text-black" id="star">
    <h3 id="title" @click="showModal=true">Beatles</h3>
    <h6 id="map">  제주시 애월읍</h6>
    <button id="mbt" @click="getGeo" ><img src="gps.jpg"  height="20px" width="20px"> - </button>
  
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
export default {
    components:{
        Modal
    },
    data: function(){
        return{
            showModal:false
        }
    },

    props: ["city"],

    methods: {
    send_keyword(data) {
      // implementation of send method for vue instance
      this.$socket.emit("search", {
        keyword: data // emitting "chat-message" to the server
      });
    },
    getGeo() {
      navigator.geolocation.getCurrentPosition(location => {
        this.$socket.emit("map", {
        longitude: location.coords.longitude, // emitting "chat-message" to the server
        latitude: location.coords.latitude
      });
      });
    },
  }
}
</script>

<style scoped>
#star{
  width: 100%;
  /* text-align: center; */
  background-color: rgb(102,204,204);
  opacity:0.9;
}
#star2{
  width: 5%;
  text-align: center;
  background-color: rgb(102,204,204);
  opacity:0.9;
}
#map{
  display: inline;
  padding: 10px;
  text-align: left;
}
#title{
  text-align: center;
  display: block;
}
h3 {
  color:rgb(0, 0, 0);

}
#mbt{
  display: block;
  float: left;
  padding: 0;
  border: none;
  background: none;
  /* background-image: url("gps.jpg") */
}

.card-header h3,
.card-header div
{
  display: inline;
}

</style>