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


    const guildId = "312709484705349632";
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if(guild){
        commands = guild.commands;
    }else{
        commands = client.application?.commands;
    }

    commands?.create({
        name: "novoxingamento"
        ,description: "Ensina o menino bot um novo xingamento"
        ,options : [
            {
                name:"xingamento"
                ,description: "Novo xingamento pro bot"
                ,required : true
                ,type: DiscordJs.Constants.ApplicationCommandOptionTypes.STRING 
            }
        ]
    });
    commands?.create({
        name: "xingaalguem"
        ,description: "Ensina o menino bot um novo xingamento"
        ,options : [
            {
                name:"xingado"
                ,description: "Quem será xingado"
                ,required : true
                ,type: DiscordJs.Constants.ApplicationCommandOptionTypes.USER 
            }
        ]
    });
});

client.on("interactionCreate", async (interaction) =>{

    if(!interaction.isCommand()){
        return;
    }

    const { commandName, options} = interaction;

    if (commandName == "novoxingamento") {
        const x = options.getString("xingamento");
        xingamento.push(x);
        interaction.reply({
            content:`Agora eu sei falar ${x}`
        })
        
    }else if(commandName == "xingaalguem"){
        let random = Math.floor(Math.random() * xingamento.length);
        interaction.reply({
            content:`${xingamento[random]} ${options.getMember("xingado")}`
        })
    }
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