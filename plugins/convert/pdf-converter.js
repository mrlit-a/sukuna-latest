exports.run = {
   usage: ['pdf2docx', 'pdf2xslx', 'pdf2pptx', 'pdf2jpg', 'pdf2png', 'pdf2psd'],
   use: 'reply pdf',
   category: 'converter',
   async: async (m, {
      client,
      isPrefix,
      command,
      Func,
      Scraper
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply PDF file.`), m)
         if (!/application\/(pdf)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for PDF.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let img = await q.download()
         let file = await Scraper.uploadImageV2(img)
         const json = await Api.neoxr('/pdf-converter', {
            url: file.data.url,
            filename: q.fileName.replace('.pdf', ''),
            to: command.replace('pdf2', '')
         })
         if (!json.status) return m.reply(Func.jsonFormat(json))
         client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
            document: true
         })
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   premium: true,
   limit: true,
   cache: true,
   location: __filename
}