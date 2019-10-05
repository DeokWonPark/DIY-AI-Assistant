<template>
  <div>
    <ul class="list-group list-group-flush" id="rightgo">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <span class="float-left">{{message}}</span>
        <!-- <span class="float-left">안녕</span>         -->
      </li>
      <!-- <li class="list-group-item" v-for="culuser in culusers" :key="culuser.id">
        <span class="float-left" id="join">{{culuser}}</span>
      </li> -->
    </ul>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",  
  props: ["messages","culusers"],
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
/* #rightgo{
  text-align: right;
  
} */

</style>
