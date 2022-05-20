<template>
  <div id="app">
    <div v-for="(poke,index) in pokemons" :key="index">
      <PokemonC :name="poke.name" :url="poke.url" :num="index +1" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import PokemonC from './components/Pokemon.vue';

export default {
  name: 'App',
  data(){
    return {
      pokemons: []
    }
  },
  components: {
    PokemonC
},
  created: function () {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res =>{
        console.log("OK");
        this.pokemons = res.data.results;
        console.log(this.pokemons)
      });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
