import DiscordJs, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new DiscordJs.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on("ready",()=>{
    console.log("ready");
});

client.on('messageCreate',(message)=>{
    if(message.content === 'teste'){
        message.reply({
            content:"Testado patrão"
        })
    }
})

client.login(process.env.TOKEN);