// const { client } = require('../kingmansv1');

// client.on('messageReactionAdd', async (reaction, user) => {
//     //! ———————————————[Role Setup]———————————————
//     var km = reaction.message.guild.roles.cache.find(r => r.id === '1024657245662879766')
//     var eq = reaction.message.guild.roles.cache.find(r => r.id === '1024907533925765200')
//     var tl = reaction.message.guild.roles.cache.find(r => r.id === '1024907348814352384')
//     var mn = reaction.message.guild.roles.cache.find(r => r.id === '1024907386101706805')
//     var sq = reaction.message.guild.roles.cache.find(r => r.id === '1024907478967779338')
//     var kg = reaction.message.guild.roles.cache.find(r => r.id === '1024907568209997855')
//     var ca = reaction.message.guild.roles.cache.find(r => r.id === '1024472299530883073')
//     var ch = reaction.message.guild.roles.cache.find(r => r.id === '1024657255540473867')
//     var med = reaction.message.guild.roles.cache.find(r => r.id === '1024509238493581374')
//     var hl = reaction.message.guild.roles.cache.find(r => r.id === '1024909701563039784')
//     var users = reaction.message.guild.members.cache.find(u => u.id === user.id)
//     //!——————————————————————————————————————————
//     if (reaction.partial) {
//         // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
//         try {
//             await reaction.fetch();
//         } catch (error) {
//             console.error('Something went wrong when fetching the message:', error);
//             // Return as `reaction.message.author` may be undefined/null
//             return;
//         }
//     }
//     if (reaction.message.id === '1024952468255293540') {
//         if (reaction.emoji.name === '🤍') {
//             await users.roles.add(km)
//         } else if (reaction.emoji.name === '🧡') {
//             await users.roles.add(eq)
//         } else if (reaction.emoji.name === '💜') {
//             await users.roles.add(tl)
//         } else if (reaction.emoji.name === '🖤') {
//             await users.roles.add(mn)
//         } else if (reaction.emoji.name === '💛') {
//             await users.roles.add(sq)
//         } else if (reaction.emoji.name === '💙') {
//             await users.roles.add(kg)
//         } else if (reaction.emoji.name === 'blue_siren') {
//             await users.roles.add(ca)
//         } else if (reaction.emoji.name === 'red_siren') {
//             await users.roles.add(ch)
//         } else if (reaction.emoji.name === 'medic') {
//             await users.roles.add(med)
//         } else if (reaction.emoji.name === '❤') {
//             await users.roles.add(hl)
//         }
//     }
// })

// client.on('messageReactionRemove', async (reaction, user) => {
//     //! ———————————————[Role Setup]———————————————
//     var km = reaction.message.guild.roles.cache.find(r => r.id === '1024657245662879766')
//     var eq = reaction.message.guild.roles.cache.find(r => r.id === '1024907533925765200')
//     var tl = reaction.message.guild.roles.cache.find(r => r.id === '1024907348814352384')
//     var mn = reaction.message.guild.roles.cache.find(r => r.id === '1024907386101706805')
//     var sq = reaction.message.guild.roles.cache.find(r => r.id === '1024907478967779338')
//     var kg = reaction.message.guild.roles.cache.find(r => r.id === '1024907568209997855')
//     var ca = reaction.message.guild.roles.cache.find(r => r.id === '1024472299530883073')
//     var ch = reaction.message.guild.roles.cache.find(r => r.id === '1024657255540473867')
//     var med = reaction.message.guild.roles.cache.find(r => r.id === '1024509238493581374')
//     var hl = reaction.message.guild.roles.cache.find(r => r.id === '1024909701563039784')
//     var users = reaction.message.guild.members.cache.find(u => u.id === user.id)
//     //!——————————————————————————————————————————
//     if (reaction.partial) {
//         // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
//         try {
//             await reaction.fetch();
//         } catch (error) {
//             console.error('Something went wrong when fetching the message:', error);
//             // Return as `reaction.message.author` may be undefined/null
//             return;
//         }
//     }
//     if (reaction.message.id === '1024952468255293540') {
//         if (reaction.emoji.name === '🤍') {
//             await users.roles.remove(km)
//         } else if (reaction.emoji.name === '🧡') {
//             await users.roles.remove(eq)
//         } else if (reaction.emoji.name === '💜') {
//             await users.roles.remove(tl)
//         } else if (reaction.emoji.name === '🖤') {
//             await users.roles.remove(mn)
//         } else if (reaction.emoji.name === '💛') {
//             await users.roles.remove(sq)
//         } else if (reaction.emoji.name === '💙') {
//             await users.roles.remove(kg)
//         } else if (reaction.emoji.name === 'blue_siren') {
//             await users.roles.remove(ca)
//         } else if (reaction.emoji.name === 'red_siren') {
//             await users.roles.remove(ch)
//         } else if (reaction.emoji.name === '⚕') {
//             await users.roles.remove(med)
//         } else if (reaction.emoji.name === '❤') {
//             await users.roles.remove(hl)
//         }
//     }
// })

// client.on('guildMemberAdd', async (member) => {
//     var khach = member.guild.roles.cache.get('1024412711406293032');
//     member.roles.add(khach);
// })