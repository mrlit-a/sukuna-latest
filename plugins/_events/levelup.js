exports.run = {
   async: async (m, {
      client,
      users,
      body,
      setting,
      env,
      Func,
      Scraper
   }) => {
      try {
         const levelAwal = Func.level(users.point, env.multiplier)[0]
         if (users && body) users.point += Func.randomInt(1, 100)
         const levelAkhir = Func.level(users.point, env.multiplier)[0]
         const point = global.db.users.sort((a, b) => b.point - a.point).map(v => v.jid)
         if (setting.levelup && levelAwal != levelAkhir) {
            try {
               const url = await client.profilePictureUrl(m.sender, 'image')
               const result = await Scraper.uploadImageV3(await Func.fetchBuffer(url))
               var pic = result.data.url
            } catch {
               var pic = 'https://telegra.ph/file/8937de46430b0e4141a1c.jpg'
            }
            const json = await Api.neoxr('/leveling', {
               rank: point.indexOf(m.sender) + 1,
               level: Func.level(users.point, env.multiplier)[0],
               picture: pic,
               currentXp: users.point,
               requiredXp: Func.level(users.point, env.multiplier)[1],
               name: encodeURIComponent(m.pushName)
            })
            if (json.status) {
               client.sendFile(m.chat, json.data.url, '', `乂  *L E V E L - U P*\n\nFrom : [ *${levelAwal}* ] ➠ [ *${levelAkhir}* ]\n*Congratulations!*, you have leveled up 🎉🎉🎉`, m)
            }
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}