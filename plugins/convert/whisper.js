const Replicate = require('replicate')
exports.run = {
   usage: ['whisper'],
   use: 'reply audio',
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
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         if (!/audio/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 This feature only for audio.`), m)
         let filesize = typeof q.fileLength == 'undefined' ? q.msg.fileLength.low : q.fileLength.low
         let chSize = Func.sizeLimit(await Func.getSize(filesize), 1) // to avoid error don't change this size
         if (chSize.oversize) return client.reply(m.chat, Func.texted('bold', `🚩 File size cannot be more than 1MB.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
         })
         const temp = await Scraper.uploadImageV2(await q.download())
         if (!temp) return m.reply(Func.jsonFormat(temp))
         const json = await replicate.run('openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2', {
            input: {
               audio: temp.data.url,
               model: 'large-v3',
               translate: false,
               temperature: 0,
               transcription: 'plain text',
               suppress_tokens: '-1',
               logprob_threshold: -1,
               no_speech_threshold: 0.6,
               condition_on_previous_text: true,
               compression_ratio_threshold: 2.4,
               temperature_increment_on_fallback: 0.2
            }
         })
         if (!json.transcription) return m.reply(global.status.error)
         m.reply(json.transcription.trim())
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}