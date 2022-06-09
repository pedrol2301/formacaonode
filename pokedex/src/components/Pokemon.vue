<template>
    <div id="pokemon">
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{num}} - {{upper}}</p>
                        <div v-for="(type,index) in pokemon.types" :key="index">
                            <p class="subtitle is-6">{{type}}</p>
                        </div>
                    </div>
                </div>
                <div class="card-image">
                    <figure >
                        <img :src="currentImg" alt="Placeholder image">
                    </figure>
                </div>
                <div class="content">
                    <button @click="rotatePokemon" class="button is-medium">Girar</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    created: function(){
        axios.get(this.url).then(res =>{
            
            this.pokemon.front = res.data.sprites.versions["generation-v"]['black-white']['animated'].front_default;
            this.pokemon.back = res.data.sprites.versions["generation-v"]['black-white']['animated'].back_default;
            this.currentImg = res.data.sprites.versions["generation-v"]['black-white']['animated'].front_default;

            
            for(let i in res.data.types){
                this.pokemon.types.push(res.data.types[i].type.name);
            }
             //= res.data.types[0].type.name;
            //console.log(res.data);
        })
    },
    data(){
        return {
            isFront: true,
            currentImg:'',
            pokemon :{
                types:[],
                front:'',
                back:''
            }
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
    ,methods:{
        rotatePokemon : function(){
            if(this.isFront){
                this.isFront = false;
                this.currentImg = this.pokemon.back
            }else{
                this.isFront = true;
                this.currentImg = this.pokemon.front;
            }
        }
    }
}
</script>

<style>
#pokemon{
    margin-top: 2%;
}
</style>