exports.run = {
   usage: ['spin'],
   category: 'games',
   async: async (m, {
      client,
      args,
      isPrefix,
      users,
      command,
      env,
      isPrem,
      Func
   }) => {
      const limitation = 500000
      if (!args || !args[0] || args[0].startsWith('0')) return client.reply(m.chat, Func.texted('bold', `🚩 Berikan argumen berupa nominal point untuk dispin.`), m)
      if (isNaN(args[0])) return client.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
      if (args[0] > users.point) return client.reply(m.chat, Func.texted('bold', `🚩 Pointmu tidak cukup untuk melakukan spin sebanyak ${Func.formatNumber(args[0])} point.`), m)
      if (args[0] < 1000) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa melakukan spin dengan nominal dibawah 1000 point.`), m)
      if (!isPrem && users.point >= limitation) return client.reply(m.chat, Func.texted('bold', `🚩 User free di batasi hanya bisa bermain sampai ${Func.h2k(limitation)} saja.`), m)
      users.point -= args[0]
      let reward = Func.randomInt(100, args[0] * 2)
      users.point += reward
      let last = users.point
      let teks = `乂  *S P I N - R E S U L T*\n\n`
      teks += `	*- ${Func.formatNumber(args[0])}*\n`
      teks += `	*+ ${Func.formatNumber(reward)}*\n\n`
      teks += `• *Total* : ${Func.formatNumber(users.point)} Point\n\n`
      teks += `*NB : “Anti-Spam jeda ${env.cooldown} detik untuk eksekusi selanjutnya.”*`
      client.reply(m.chat, teks, m)
   },
   group: true,
   limit: true,
   game: true
}