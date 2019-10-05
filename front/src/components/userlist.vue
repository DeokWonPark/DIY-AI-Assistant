<template>
  <div id="listyle">
    <button @click="showulist_modal=true"> 채팅방 인원 확인</button>
    <ulist_modal v-if=showulist_modal>
      <span slot="header" @click="showulist_modal = false">
        <h3>채팅 참여 List <i class="closeModalBtn fas fa-times" aria-hidden="true"></i> </h3>
      
      <ul>
          <li v-for="culuser in culusers" :key="culuser.id" >
            <span>{{culuser.name}}</span> 
          </li>
      </ul>
      </span>
    </ulist_modal>
  </div>
</template>


<script>
import ulist_modal from "./ulist_modal.vue";
export default {
    name : "user",
    props: ["culusers"],
    components:{
        ulist_modal
    },
  data: function() {
    return {
        showulist_modal:false
    };
  }
};
</script>
<style>
#listyle{
background-color: rgb(186, 221, 223);
}
button{
    width: 100%;
    background-color: rgb(186, 221, 223);
}

</style>