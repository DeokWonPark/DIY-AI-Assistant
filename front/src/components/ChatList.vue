<template>
  <div>
    <ul class="list-group list-group-flush">
      <!-- Message loop -->
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <span class="float-left">{{message}}</span>        
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",  
  props: ["messages"],  
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
</style>
