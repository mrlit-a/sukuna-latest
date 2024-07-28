exports.run = {
   usage: ['delwarn'],
   category: 'group',
   async: async (m, {
      client,
      users,
      Func
   }) => {
      try { 
         let check = (m.isGroup) ? global.db.groups.find(v => v.jid == m.chat).member[m.sender] : user
         let forPoint = ((50 / 100) * users.point).toFixed(0)
         let forLimit = ((50 / 100) * users.limit).toFixed(0)
         if (check.warning == 0) return client.reply(m.chat, Func.texted('bold', `🚩 You have no warning points.`), m)
         if (users.point < forPoint || users.limit < forLimit) return client.reply(m.chat, Func.texted('bold', `🚩 The assets you have are not enough to remove the warning points.`), m)
         users.point -= forPoint
         users.limit -= forLimit
         check.warning -= 1
         let teks = '- ' + Func.h2k(forPoint) + ' Point (-50%)\n'
         teks += '- ' + Func.h2k(forLimit) + ' Limit (-50%)\n'
         teks += '*Successfully removed 1 warning point.*'
         return client.reply(m.chat, teks, m)
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}