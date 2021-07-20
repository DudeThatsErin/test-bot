// at the top of your file
const Discord = require('discord.js');
 
module.exports = {
    name: 'partners',
    description: 'Displays all the information on the #announcements channel.\n**Note:** Only the Mod Team can run this command.',
    aliases: ['affies', 'affiliates', 'partner'],
    usage: '++about',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
    modOnly: 'yes',
    execute(message, args) {   
        
            const aboutPartner = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('What is a Discord Partner?')
            .setDescription('That is someone that has partnered with our server as they believe in it as much as the staff team does.')
            .addFields (
                { name: 'How do I become a Discord Partner?', value: 'All you need to do is message the mods and ask. To message the mods you will want to use our Modmail bot: <@575252669443211264> Be sure to include the invite link to your server.\nAlternatively, you can [visit our website](https://codinghelp.site/partner-app/) to fill out our application and we will get back to you.\nNote: Small servers will not be accepted. Your server will need to be established with at least 1,500 members. This doesn\'t mean you will be accepted with that minimum, just that we will consider you with at least that many members.' },
            )
 
            const smartWatch = new Discord.MessageEmbed()
            .setColor('TAN')
            .setTitle('Smart Watch')
            .setImage('https://media.discordapp.net/attachments/792764567649517582/793749473959346186/Banner.png')
            .setDescription('The server for the intellectual watch wearer. Smartwatch is a place to talk with other watch wearers and get help on making your smartwatch part of your daily life, with Support teams for the major wearable brands. We offer community & brand events, as well as up to date news about your favorite brands.')
            .addFields (
                { name: 'Representative', value: '<@521656100924293141>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/nPEHdsyjDg', inline: true },
            )
 
            const alphaBet = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('AlphaBet')
            .setImage('https://images-ext-2.discordapp.net/external/VK5lVCOz1EndZMQ1Lf_uOLlBHeOUjT2k5wh1B6hlbaE/https/media.discordapp.net/attachments/746035174160203789/786949644285509642/alphabet_logo_small.png')
            .setDescription('Welcome to AlphaBet Community. AlphaBet is a coding community for learning programming, like- Python, Java, C, C++, C#, Go, Rust, Haskell, Lisp, Rust, Scala, Clojure, Swift, Kotlin, Web-Development, JavaScript, Typescript, Ruby, Crystal, Lua, PHP, SQL-Database ....\n:bookmark: Daily coding tasks for members regularly.\n:bookmark: Exclusive Polling Contest with our bot.\n:bookmark: For Job Hunters: Interview questions & discussion.\n:bookmark: Different coding events, competitions and group projects.\n:bookmark: We are active 24/7.')
            .addFields (
                { name: 'Representative', value: '<@561178341978144799>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/PCkrwRXQJ9', inline: true }
            );

            const world = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('World of Coding')
            .setImage('https://media.discordapp.net/attachments/738486780029960294/743142019161129420/Animated_GIF-downsized_4.gif')
            .setDescription(':wave_tone1: Hey we are World of coding one of the biggest coding servers over discord!\n\nFor new and old coders alike!\n**》We try to bring the coding community closer!**\nWith this you can post and show off some of your cool stuff that you are working on/made!\n\n**Search for Devs!**\nWe have channels where you can show off your Creations\nWell, what if I am looking for a dev? We have for that too! If you are looking for a dev we have channels to search for some!\n\n━━━━━━\n**》Helping**\nWe try and make it so you get help ASAP\nWith a big community we can do this where you can find coders just like you newer or old. So if you need a dev feel free to join an look!\nWith multi communities together help can sooner or later be even faster\n\n━━━━━━\n\n**》 What do we have?**\nOur goal is to provide as much as we can for our devs!\n\n:globe_with_meridians:CSS\n:globe_with_meridians: C Family (C++,C,C#)\n:globe_with_meridians: HTML\n:globe_with_meridians: Java\n:globe_with_meridians: JavaScript\n:globe_with_meridians: Lua\n:globe_with_meridians: Python\n:globe_with_meridians: Ruby\n:globe_with_meridians: TypeScript\n:globe_with_meridians: Golang\n:globe_with_meridians: Rust\n:globe_with_meridians: SQL\nAnd more!\n\nWe as well support Discord.JS,Discord.py etc...\n\n━━━━━━\n**Feel free to stop by and chill!**\n》 Always welcoming new active members to talk about the things we love/help others!\n\n━━━━━━\n**Tech channels**\n- :computer: OS systems, Networking, Databases, Hosting and more!\n- :moneybag: Cryptocurrency talk\n- :floppy_disk: Channel for compiling your code!\n- :key: Cryptography\n- :lock: Cyber Security\n\n━━━━━━\n➥Website: https://www.worldofcoding.tech/\nWe are always looking for staff you can apply here ^')
            .addFields(
                { name: 'Representative', value: '<@604362857756491779>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/XTsCQNd', inline: true }
            );

            const tca = new Discord.MessageEmbed()
            .setColor('#61b1f8')
            .setTitle('The Coding Academy')
            .setDescription('**Wanna learn how to make your own Discord Bot?**🤖\n🔗 We are a community of coders that will help you to make Discord Bots.\n\n**We also have experienced coders**\n🔗 We can help you if you have doubts!\n\nWe have:-\n🏕️  **Level 2** Server Boost!\n🙇  **4000+** Members!\n💻 **Experienced** Coders!\n🎉 **Nitro** Giveaways \n🥇 **Fun Events** eg. Hunger Games\n\nCome on! What are you waiting for? Join the community and have fun with everyone! ')
            .addFields(
                { name: 'Representative', value: '<@698225613617496094>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/fT9V379aAc', inline: true }
            );
            
           
                message.channel.bulkDelete(1);
                //message.channel.send(aboutPartner);
                //message.channel.send(smartWatch);
                //message.channel.send(alphaBet);
                //message.channel.send(world);
                message.channel.send(tca);
           
 
    },
    
  };