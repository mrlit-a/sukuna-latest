module.exports = (m, env) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid === m.sender)
   if (user) {
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('afkObj' in user)) user.afkObj = {}
      if (!('name' in user)) user.name = m.pushName
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.ban_temporary)) user.ban_temporary = 0
      if (!isNumber(user.ban_times)) user.ban_times = 0
      if (!isNumber(user.point)) user.point = 0
      if (!isNumber(user.limit)) user.limit = env.limit
      if (!isNumber(user.limit_game)) user.limit_game = env.limit_game
      if (!isNumber(user.balance)) user.balance = 0
      if (!isNumber(user.pocket)) user.pocket = 0
      if (!isNumber(user.deposito)) user.deposito = 0
      if (!isNumber(user.guard)) user.guard = 0
      if (!isNumber(user.lastclaim)) user.lastclaim = 0
      if (!isNumber(user.lastrob)) user.lastrob = 0
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.warning)) user.warning = 0
      if (!('inventory' in user)) user.inventory = {}
      if (!isNumber(user.warning)) user.warning = 0
      if (!isNumber(user.attempt)) user.attempt = 0
      if (!('code' in user)) user.code = ''
      if (!isNumber(user.codeExpire)) user.codeExpire = 0
      if (!('email' in user)) user.email = ''
      if (!('verified' in user)) user.verified = false
      if (!('partner' in user)) user.partner = ''
      if (!('taken' in user)) user.taken = false
   } else {
      global.db.users.push({
         jid: m.sender,
         afk: -1,
         afkReason: '',
         afkObj: {},
         name: m.pushName,
         banned: false,
         ban_temporary: 0,
         ban_times: 0,
         point: 0,
         limit: env.limit,
         limit_game: env.limit_game,
         balance: 0,
         pocket: 0,
         deposito: 0,
         guard: 0,
         lastclaim: 0,
         lastrob: 0,
         premium: false,
         expired: 0,
         lastseen: 0,
         hit: 0,
         warning: 0,
         inventory: {},
         attempt: 0,
         code: '',
         codeExpire: 0,
         email: '',
         verified: false,
         taken: false,
         partner: '',
      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid === m.chat)
      if (group) {
         if (!isNumber(group.activity)) group.activity = new Date * 1
         if (!('antibot' in group)) group.antibot = true
         if (!('antiporn' in group)) group.antiporn = true
         if (!('antidelete' in group)) group.antidelete = true
         if (!('antilink' in group)) group.antilink = true
         if (!('antivirtex' in group)) group.antivirtex = true
         if (!('autoreply' in group)) group.autoreply = false
         if (!('captcha' in group)) group.captcha = false
         if (!('filter' in group)) group.filter = false
         if (!('game' in group)) group.game = true
         if (!('left' in group)) group.left = false
         if (!('localonly' in group)) group.localonly = false
         if (!('mute' in group)) group.mute = false
         if (!('viewonce' in group)) group.viewonce = false
         if (!('autosticker' in group)) group.autosticker = true
         if (!('member' in group)) group.member = {}
         if (!('text_left' in group)) group.text_left = ''
         if (!('text_welcome' in group)) group.text_welcome = ''
         if (!('welcome' in group)) group.welcome = true
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
      } else {
         global.db.groups.push({
            jid: m.chat,
            activity: new Date * 1,
            antibot: true,
            antiporn: true,
            antidelete: true,
            antilink: false,
            antivirtex: false,
            autoreply: false,
            captcha: false,
            filter: false,
            game: true,
            left: false,
            localonly: false,
            mute: false,
            viewonce: false,
            autosticker: true,
            member: {},
            text_left: '',
            text_welcome: '',
            welcome: true,
            expired: 0,
            stay: false,
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid === m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastchat)) chat.lastchat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0,
         lastchat: 0,
         lastseen: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
      if (!('autodownload' in setting)) setting.autodownload = true
      if (!('debug' in setting)) setting.debug = false
      if (!('games' in setting)) setting.games = true
      if (!('levelup' in setting)) setting.levelup= true
      if (!('verify' in setting)) setting.verify = false
      if (!('mimic' in setting)) setting.mimic = []
      if (!('error' in setting)) setting.error = []
      if (!('hidden' in setting)) setting.hidden = []
      if (!('pluginDisable' in setting)) setting.pluginDisable = []
      if (!('pluginVerified' in setting)) setting.pluginVerified = []
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('sk_pack' in setting)) setting.sk_pack = 'Sticker by'
      if (!('sk_author' in setting)) setting.sk_author = '© neoxr.js'
      if (!('self' in setting)) setting.self = false
      if (!('noprefix' in setting)) setting.noprefix = false
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"]
      if (!('online' in setting)) setting.online = true
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = ['994408364923']
      if (!isNumber(setting.lastReset)) setting.lastReset = new Date * 1
      if (!('msg' in setting)) setting.msg = 'Hi +tag 🪸\nI am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n◦ *Database* : +db\n◦ *Library* : Baileys v+version\n◦ *Rest API* : https://api.neoxr.my.id\n◦ *Source* : https://github.com/neoxr/v4.1-prem\n\n> If you find an error or want to upgrade premium plan contact the owner.'
      if (!isNumber(setting.style)) setting.style = 6
      if (!('cover' in setting)) setting.cover = 'https://telegra.ph/file/d5a48b03b80791b50717f.jpg'
      if (!('link' in setting)) setting.link = 'https://chat.whatsapp.com/JA3VN3XpXQuCBB1uVDUx3x'
   } else {
      global.db.setting = {
         autodownload: true,
         debug: false,
         games: true,
         levelup: true,
         verify: false,
         mimic: [],
         error: [],
         hidden: [],
         pluginDisable: [],
         pluginVerified: [],
         groupmode: false,
         sk_pack: 'Sticker by',
         sk_author: '© neoxr.js',
         self: false,
         noprefix: false,
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"],
         online: true,
         onlyprefix: '+',
         owners: ['994408364923'],
         lastReset: new Date * 1,
         msg: 'Hi +tag 🪸\nI am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n◦ *Database* : +db\n◦ *Library* : Baileys v+version\n◦ *Rest API* : https://api.neoxr.my.id\n◦ *Source* : https://github.com/neoxr/v4.1-prem\n\n> If you find an error or want to upgrade premium plan contact the owner.',
         style: 6,
         cover: 'https://telegra.ph/file/d5a48b03b80791b50717f.jpg',
         link: 'https://chat.whatsapp.com/JA3VN3XpXQuCBB1uVDUx3x'
      }
   }
}