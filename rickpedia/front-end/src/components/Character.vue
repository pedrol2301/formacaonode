<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="pokemon">
        <div class="column card">
            <header class="card-header is-info">
                <p class="card-header-title is-4">{{num}} - {{upper}}</p>
            </header>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <div v-for="(type,index) in character.info" :key="index">
                            <p class="subtitle is-6">{{(index)}}:{{type}}</p>
                        </div>
                    </div>
                </div>
                <div class="card-image">
                    <figure >
                        <img :src="currentImg" alt="Placeholder image">
                        <router-view/>
                    </figure>
                </div>
                <div class="content">
                    <!-- <button @click="rotatePokemon" class="button is-medium">Girar</button> -->
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
            
            this.currentImg = res.data.image;

             for(let i in res.data){
                this.character.info[i] = res.data[i];
                console.log(i)
                console.log(res.data[i])
             }
        })
    },
    data(){
        return {
            currentImg:'',
            character :{
                info:{},
                image: ''
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
        // rotatePokemon : function(){
        //     if(this.isFront){
        //         this.isFront = false;
        //         this.currentImg = this.pokemon.back
        //     }else{
        //         this.isFront = true;
        //         this.currentImg = this.pokemon.front;
        //     }
        // }
    }
}
</script>

<style>
#pokemon{
    margin-top: 2%;
}
</style>