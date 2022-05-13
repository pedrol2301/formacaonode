import DiscordJs, { Intents, User } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

var xingamento = [
                    "Vai tomar no cu maluco",
                    "🖕🏾",
                    "Vai po caralho",
                    "Bota dentadura no cu e ri pro caralho"
                ];



const client = new DiscordJs.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    
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
    let random = Math.floor(Math.random() * xingamento.length);

    if (message.mentions.has(client.user.id)) {
        message.reply(`${xingamento[random]}`);
    }
});

client.login(process.env.TOKEN);