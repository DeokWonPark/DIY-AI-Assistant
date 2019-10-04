<template>
  <div>
    <ul class="list-group list-group-flush">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id" >
        <span class="float-left">{{message}}</span>        
      </li>
      <!-- <li class="list-group-item" v-for="user in users" :key="user.id">
        <span class="float-left" id="join">{{user}}님이 입장하셨습니다</span>
      </li> -->
    </ul>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",  
  props: ["messages","users"],
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
/* #join{
  background-color: greenyellow
} */
</style>
