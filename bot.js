require('dotenv').config();

const { Client, MessageFlags }=require('discord.js')

const client =new  Client();

const PREFIX="$"



client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`)
});

// BOT ACTIVITIES( MESSAGE REPLY)
client.on('message', async(message)=>{

//if bot return same message then 
    if(message.author.bot) return;
    console.log(`[${message.author.tag}]: ${message.content}`)

//to check the prefx
    if(message.content.startsWith(PREFIX)){ 
        const [CMD_NAME,...args] =message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)

// normal check for a command
        if(CMD_NAME==='depressed'){
            message.channel.send(" hang in there")
        }

//  bot sending back a remote file to server 
        if(CMD_NAME==='isaak'){
            message.channel.send({
                files: ['https://deadspace.fandom.com/wiki/Isaac_Clarke']
              })
                .then(console.log)
                .catch(console.error);

            }    

// bot sending back a local file to server  
        if(CMD_NAME==='sadman'){
            message.channel.send({
                files: [{
                  attachment: 'E:/exercise_lab_online/sadman-donkey.jpg',
                  name: 'sadman-donkey.jpg'
                }]
              })
                .then(console.log)
                .catch(console.error);

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

client.login("ODY5NjA1MDcxMDgyNjQzNTE2.YQAo1Q.JXHoA0sOxSJT8uHoj_iY4JyTGP8");
