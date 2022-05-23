<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <div>
        <h4 class="is-size-5">
          Pokedex
        </h4>
        <input type="text" class="input is-rounded" placeholder="Buscar pokemon" v-model="busca">
        <button id="buscaB" @click="buscar" class="button is-success is-light">Buscar</button>
      </div>
      <div v-for="(poke,index) in filteredPoke" :key="poke.url">
        <PokemonC :name="poke.name" :url="poke.url" :num="index +1" />
      </div>
    </div>
    <footer>By Pedro, @pedrol2301</footer>
  </div>
</template>

<script>

import axios from 'axios';
import PokemonC from './components/Pokemon.vue';

export default {
  name: 'App',
  data(){
    return {
      pokemons: [],
      filteredPoke:[],
      busca: ''
    }
  },
  components: {
    PokemonC
},
  created: function () {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res =>{
        console.log("OK");
        this.pokemons = res.data.results;
        this.filteredPoke = res.data.results;
        console.log(this.pokemons)
      });
  },methods:{
    buscar: function(){
      this.filteredPoke = this.pokemons;
      if(this.busca == '' || this.busca == ' '){
        this.filteredPoke = this.pokemons
      }else{
        this.filteredPoke = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.busca.toLowerCase()) == true);
      }
    }
  }
  ,computed:{

        // buscaP : function(){
          
        //   if(this.busca == '' || this.busca == ' '){
        //     return this.pokemons
        //   }else{
            
        //     return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.busca.toLowerCase()) == true);
        //   }
        // }
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
#buscaB{
  margin-top: 2%;
}
</style>
