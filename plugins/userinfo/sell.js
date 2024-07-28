exports.run = {
   usage: ['sell'],
   use: 'item',
   category: 'user info',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      users,
      Func
   }) => {
      try {
         const fishingItems = [{
            emoji: '🦐',
            name: 'udang',
            price: Func.randomInt(1, 10)
         }, {
            emoji: '🦀',
            name: 'kepiting',
            price: Func.randomInt(1, 20)
         }, {
            emoji: '🦈',
            name: 'hiu',
            price: Func.randomInt(5, 50)
         }, {
            emoji: '🐬',
            name: 'lumba lumba',
            price: Func.randomInt(4, 45)
         }, {
            emoji: '🐡',
            name: 'ikan buntal',
            price: Func.randomInt(1, 15)
         }, {
            emoji: '🐙',
            name: 'gurita',
            price: Func.randomInt(2, 20)
         }, {
            emoji: '🐟',
            name: 'gurame',
            price: Func.randomInt(1, 10)
         }, {
            emoji: '🐠',
            name: 'gabus',
            price: Func.randomInt(1, 10)
         }, {
            emoji: '🦑',
            name: 'cumi cumi',
            price: Func.randomInt(1, 10)
         }]
         const farmingItems = [{
            emoji: '🍇',
            name: 'anggur',
            price: Func.randomInt(1, 30)
         }, {
            emoji: '🍉',
            name: 'semangka',
            price: Func.randomInt(1, 20)
         }, {
            emoji: '🍊',
            name: 'jeruk',
            price: Func.randomInt(1, 7)
         }, {
            emoji: '🍒',
            name: 'ceri',
            price: Func.randomInt(1, 15)
         }, {
            emoji: '🌽',
            name: 'jagung',
            price: Func.randomInt(1, 7)
         }, {
            emoji: '🥕',
            name: 'wortel',
            price: Func.randomInt(1, 20)
         }, {
            emoji: '🍆',
            name: 'terong',
            price: Func.randomInt(1, 5)
         }, {
            emoji: '🍅',
            name: 'tomat',
            price: Func.randomInt(1, 10)
         }, {
            emoji: '🥒',
            name: 'ketimun',
            price: Func.randomInt(1, 10)
         }, {
            emoji: '🍎',
            name: 'apel',
            price: Func.randomInt(1, 20)
         }, {
            emoji: '🥭',
            name: 'mangga',
            price: Func.randomInt(1, 30)
         }, {
            emoji: '🍓',
            name: 'stoberi',
            price: Func.randomInt(1, 30)
         }, {
            emoji: '🥑',
            name: 'alpukat',
            price: Func.randomInt(1, 15)
         }, {
            emoji: '🪴',
            name: 'ganja',
            price: Func.randomInt(1, 70)
         }]
         const USD = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
         })
         users.inventory.fishing = users.inventory.fishing ? users.inventory.fishing : []
         users.inventory.farming = users.inventory.farming ? users.inventory.farming : []
         if (users.inventory.fishing.length < 1 && users.inventory.farming.length < 1) return m.reply(Func.texted('bold', `🚩 Maaf, kamu tidak mempunyai item apapun di dalam inventory.`))
         if (!text) return m.reply(Func.example(isPrefix, command, 'kepiting'))
         const item = users.inventory.fishing.concat(users.inventory.farming).find(v => v.name == text.toLowerCase())
         if (!item) return m.reply(Func.texted('bold', `🚩 Item tidak ada.`))
         if (item.count < 1) return m.reply(Func.texted('italic', `🚩 Maaf, kamu tidak mempunyai ${Func.ucword(item.name)} di dalam inventory.`))
         const fromItems = fishingItems.concat(farmingItems).find(v => v.name == text.toLowerCase())
         m.reply(`✅ Berhasil menjual *${Func.formatter(item.count)} ${Func.ucword(item.name)}* (${item.emoji}) dengan total : ${USD.format(Number(item.count * fromItems.price))}`).then(() => {
            users.pocket += Number(item.count * fromItems.price)
            item.count = 0
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true
}