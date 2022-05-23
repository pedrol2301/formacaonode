<template>
  <div id="vue">
      <input type="text" name="email" placeholder="Email" id="email">
      <input type="text" name="nome" placeholder="Nome" id="nome">
      <button>{{params}}!</button>
  </div>
</template>

<script>
export default {
    created (){
        console.log(this.$route.params.dado)
        this.params = this.$route.params.dado;
    },
    data: function(){
        return {
            params: ""
        }
    }
}
</script>

<style>

</style>