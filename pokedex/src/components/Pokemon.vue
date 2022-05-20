<template>
    <div>
        <h1>{{num}} - {{upper}}</h1>
        <small>{{url}}</small>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    created: function(){
        axios.get(this.url).then(res =>{
            this.pokemon.type = res.data.types[0].name;
            this.pokemon.front = res.data.sprites.front_default;
            this.pokemon.back = res.data.sprites.back_default;
            console.log(this.pokemon);
        })
    },
    data(){
        return {
            pokemon :{}
        }
    },
    props:{
        num:Number,
        name: String,
        url : String
    }
    ,computed:{
        upper : function(){
            var val = this.name[0].toUpperCase() + this.name.slice(1);
            
            return val;
        }
    }
}
</script>

<style>

</style>