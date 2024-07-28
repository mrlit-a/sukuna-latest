exports.run = {
   usage: ['setcover'],
   hidden: ['cover'],
   use: 'reply foto',
   category: 'owner',
   async: async (m, {
      client,
      setting,
      Func,
      Scraper
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (setting.style === 5) {
            if (!/video/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Video not found.`), m)
            let filesize = typeof q.fileLength == 'undefined' ? q.msg.fileLength.low : q.fileLength.low
            let chSize = Func.sizeLimit(await Func.getSize(filesize), 1)
            if (chSize.oversize) return client.reply(m.chat, Func.texted('bold', `🚩 File size cannot be more than 1 MB.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let buffer = await q.download()
            if (!buffer) return client.reply(m.chat, global.status.wrong, m)
            let link = await Scraper.uploadVideo(buffer)
            if (!link.status) return m.reply(Func.jsonFormat(link))
            setting.covergif = link.data.url
            client.reply(m.chat, Func.texted('bold', `🚩 Cover successfully set.`), m)
         } else {
            if (!/image/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Image not found.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let buffer = await q.download()
            if (!buffer) return client.reply(m.chat, global.status.wrong, m)
            let link = await Scraper.uploadImage(buffer)
            if (!link.status) return m.reply(Func.jsonFormat(link))
            setting.cover = link.data.url
            client.reply(m.chat, Func.texted('bold', `🚩 Cover successfully set.`), m)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}