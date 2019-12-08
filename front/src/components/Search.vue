<template>


    <div  class="searchcss">  
      <form @submit.prevent="$emit('send_keyword',keyword)" >
      
        <input
        type="text"
        placeholder="검색어 입력"
        v-model="keyword"
        />
        <button type="submit"></button>
      </form>
    </div>

</template>

<script>
export default {
  data: function() {
    return {
      keyword: "",
    };
  },
//   name: "typ",
//   props: ["cli_name"],
  

};
</script>

<style scoped>
.searchcss {background: rgb(102,204,204);}
.searchcss:after {content:""; clear:both; display:table}
.searchcss form {
  width: auto;
  float: right;
  margin-right: -10px;
}
.searchcss input {
  width: 150px;
  height: 42px;
  padding-left: 15px;
  border-radius: 42px;
  border: 2px solid #eeff55;
  background: rgb(255, 255, 255);
  outline: none;
  position: relative;
  transition: .3s linear;
}
.searchcss input:focus {
  width: 200px;
}
.searchcss button {
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  position: absolute;
  top: 83px;
  right: 13px;
}
.searchcss button:before{
  content: "\f002";
  font-family: FontAwesome;
  color: #324b4e;
}
.searchcss2{
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  position: fixed;
  z-index: 1;
  top: 57px;
  left: 0px;
}
.searchcss2:before{
  content: "\f009";
  font-family: FontAwesome;
  color: #324b4e;
}
.searchcss div,
.searchcss form,
.searchcss input,
.searchcss button{
  display: inline;
}
</style>