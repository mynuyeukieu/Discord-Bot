// //! ———————————————[Library]———————————————
// const { client } = require('../kingmansv1');
// const { ytb_channelid } = require('../botconfig/main.json');
// const parSer = require('rss-parser')
// const req = new parSer();
// var videos = new Map();
// let log = console.log
// videos.set(`videos_old`)
// //!——————————————————————————————————————————
// client.on('ready', async () => {
//     var guild = client.guilds.cache.get('922754118202818560')
//     var channel = guild.channels.cache.get('1026402829482598420')
//     async function notifycation1() {
//         if (videos.get(`videos_old`) === undefined) {
//             await req.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${ytb_channelid}`)
//                 .then(data => {
//                     videos.set(`videos_old`, data.items[0])
//                     log(videos.get(`videos_old`))
//                 })
//         }
//         await req.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${ytb_channelid}`)
//             .then(data => {
//                 var pubDateOld = new Date(videos.get(`videos_old`).pubDate).getTime()
//                 var pubDateNew = new Date(data.items[0].pubDate).getTime()
//                 if (pubDateNew > pubDateOld) {
//                     videos.set(`videos_old`, data.items[0])
//                     log('Yes:', { link: data.items[0].link, title: data.items[0].title })
//                     channel.send(
//                         `${guild.name} - <a:Nezuko_Running_pause:968997069010391080>  Youtube Notification <a:Nezuko_Running_pause:968997069010391080> \n\n\n` +
//                         `Hello, **${data.items[0].author}** đã đăng một Video mới.\n` +
//                         `**${data.items[0].title}** vừa được up vào lúc <t:${Math.floor(new Date(data.items[0].pubDate).getTime() / 1000.0)}:F>,\n${data.items[0].link}\n\n\n` +
//                         '-----------------------------------\n' +
//                         `© Created By ${guild.name} ft Rin\n` +
//                         `©️ Bản Quyền Thuộc Về ${guild.name}\n` +
//                         `<@&971296607393943572><@&971113672468488283>`
//                     )
//                 }
//             })

//         if (videos.get(`videos_old1`) === undefined) {
//             await req.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=UCzVSkiGAYFmqqGYIzHCGwSw`)
//                 .then(data => {
//                     videos.set(`videos_old1`, data.items[0])
//                     log(videos.get(`videos_old1`))
//                 })
//         }
//         await req.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=UCzVSkiGAYFmqqGYIzHCGwSw`)
//             .then(data => {
//                 var pubDateOld = new Date(videos.get(`videos_old1`).pubDate).getTime()
//                 var pubDateNew = new Date(data.items[0].pubDate).getTime()
//                 if (pubDateNew > pubDateOld) {
//                     videos.set(`videos_old1`, data.items[0])
//                     log('Yes:', { link: data.items[0].link, title: data.items[0].title })
//                     channel.send(
//                         `${guild.name} - <a:Nezuko_Running_pause:968997069010391080>  Youtube Notification <a:Nezuko_Running_pause:968997069010391080> \n\n\n` +
//                         `Hello, **${data.items[0].author}** đã đăng một Video mới.\n` +
//                         `**${data.items[0].title}** vừa được up vào lúc <t:${Math.floor(new Date(data.items[0].pubDate).getTime() / 1000.0)}:F>,\n${data.items[0].link}\n\n\n` +
//                         '-----------------------------------\n' +
//                         `© Created By ${guild.name} ft Rin\n` +
//                         `©️ Bản Quyền Thuộc Về ${guild.name}\n` +
//                         `<@&971296607393943572><@&971113672468488283>`
//                     )
//                 }
//             })
//     }
//     setInterval(notifycation1, 1e3 * 10)
// })