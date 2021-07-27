require('dotenv').config();

const { Client, MessageFlags }=require('discord.js')

const client =new  Client();

const PREFIX="$"



client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`)
});

// BOT ACTIVITIES( MESSAGE REPLY)
client.on('message', async(message)=>{

    if(message.author.bot) return;//if bot return same message then 
    console.log(`[${message.author.tag}]: ${message.content}`)

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME,...args] =message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)

        if(CMD_NAME==='depressed'){
            message.channel.send(" hang in there")
        }
        //KICKING USERS
        if( CMD_NAME==='kick'){
            if(!message.member.hasPermission('KICK_MEMBERS')){
                return message.reply("you don't have the permission to use that command")
            }


            if(args.length===0) return message.reply("please provide an id")

           const member = message.guild.members.cache.get(args[0])

           if(member){
               member
               .kick()
               .then((member)=>message.channel.send(`${member} was kicked`))
               .catch((err)=>message.channel.send( "i cant kick the user:(')"))
           } 
           else {
               message.channel.send(" that member is not found")
           }
        } else if (CMD_NAME==='ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')){
                return message.reply("you don't have the permission to use that command")
            }
            if(args.length===0) return message.reply("please provide an id")

            
            try{
                const user = await message.guild.members.ban(args[0])
                message.channel.send("user banned successfully")


            } catch(err){
                console.log(err)
                message.channel.send("an error occured")
            }


        }  

    } 

   
    
})

client.login("ODY5NjA1MDcxMDgyNjQzNTE2.YQAo1Q.0caZRaUXdjp9Ahtx9n0cF6_4VpA");
