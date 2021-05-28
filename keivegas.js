const discord = require('discord.js');
const client = new discord.Client();
const disbut = require('discord-buttons')(client);
const cfg = require("./config.json");

client.on("message", async (msg) => {
let prefix = cfg.Bot.Prefix.find((x) => msg.content.toLowerCase().startsWith(x));
if (msg.content !== ""+prefix+"button" && msg.content !== ""+prefix+"buttons") return; 
if(!cfg.Bot.Owners.includes(msg.author.id) && !msg.guild.owner.user.id.includes(msg.author.id)) return

let VK = new disbut.MessageButton()
     .setStyle('red')
     .setLabel('Vampir Köylü')
     .setID('VK')
let DC = new disbut.MessageButton()
    .setStyle('gray')
    .setLabel('Doğruluk Cesaret')
    .setID('DC')

let GoLive = new disbut.MessageButton()
    .setStyle("green")
    .setLabel('Go Live')
    .setID('GoLive')

msg.channel.send(`
Selam sunucumuzda eğlence rolleri bulunmaktadır. Aşağıda ki tepkilere basarak ilgilendiğiniz eğlence rolünüzü alabilirsiniz. **İyi Eğlenceler.**
    
\`Eğlence rolleri;\`
    
\`>\` <@&${cfg.Roles.VK}>  

\`>\` <@&${cfg.Roles.DC}>  

\`>\` <@&${cfg.Roles.GoLive}>  

Sunucumuzda her akşam çeşitli etkinlikler olucağı için rolünüzü almayı unutmayınız.
`, {
        buttons: [DC, VK, GoLive]
    })

})
client.on('clickButton', async (button) => {

    if (button.id === 'VK') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.VK)) {
            await button.clicker.member.roles.remove(cfg.Roles.VK)
            await button.think(true);
            await button.reply.edit("Vampir Köylü rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.VK)
            await button.think(true);
            await button.reply.edit("Vampir Köylü rolü üzerinize verildi.")
        }
    }
    if (button.id === 'DC') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.DC)) {
            await button.clicker.member.roles.remove(cfg.Roles.DC)
            await button.think(true);
            await button.reply.edit("Doğruluk Cesaret rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.DC)
            await button.think(true);
            await button.reply.edit("Doğruluk Cesaret rolü üzerinize verildi.")
        }}
    if (button.id === 'GoLive') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.GoLive)) {
            await button.clicker.member.roles.remove(cfg.Roles.GoLive)
            await button.think(true);
            await button.reply.edit("GoLive rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.GoLive)
            await button.think(true);
            await button.reply.edit("GoLive rolü üzerinize verildi.")
        }

    }

})



client.on('ready', async () => {

client.user.setPresence({ activity: { name: cfg.Bot.Durum }, status: cfg.Bot.Status })
let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID)
if (VoiceChannelID) VoiceChannelID.join().catch(() => { })
console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı. ✔`)

});

client.login(cfg.Bot.Token).catch(() => console.error("Bota giriş yapılırken başarısız olundu!"));