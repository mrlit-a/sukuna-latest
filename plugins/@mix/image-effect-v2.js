exports.run = {
   usage: ['blisa', 'sepia', 'eva', 'pencan', 'blackpen', 'solorize', 'warhol', 'gtas', 'scrable', 'glitch', 'dupl', 'messi', 'hell', 'ronaldo', 'fireline', 'bmolly', 'bmilk'],
   use: 'reply foto',
   category: 'effects',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func,
      Scraper
   }) => {
      try {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            const type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            const q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
               client.sendReact(m.chat, '🕒', m.key)
               const old = new Date()
               const img = await client.downloadMediaMessage(q)
               const image = await Scraper.uploadImageV2(img)
               const result = await Api.neoxr('/effect2', {
                  image: image.data.url,
                  style: command
               }, {
                  buffer: true
               })
               if (!result || result.constructor.name != 'String') return client.reply(m.chat, global.status.fail, m)
               client.sendFile(m.chat, result, `image.jpg`, `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
            } else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
         } else {
            const q = m.quoted ? m.quoted : m
            const mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            const old = new Date()
            const img = await q.download()
            const image = await Scraper.uploadImageV2(img)
            const result = await Api.neoxr('/effect2', {
               image: image.data.url,
               style: command
            }, {
               buffer: true
            })
            if (!result || result.constructor.name != 'String') return client.reply(m.chat, global.status.fail, m)
            client.sendFile(m.chat, result, ``, `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true
}