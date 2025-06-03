const { bot, isAdmin, lang } = require('../lib')

bot(
  {
    pattern: 'dlt ?(.*)',
    desc: lang.plugins.dlt.desc,
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!message.reply_message)
      return await message.send('⚠️ *Reply to a message to delete.*')

    const key = message.reply_message.key

    if (!key.fromMe && message.isGroup) {
      const participants = await message.groupMetadata(message.jid)
      const isImAdmin = await isAdmin(participants, message.client.user.jid)
      if (!isImAdmin)
        return await message.send('❌ *I need to be admin to delete others\' messages.*')
    }

    return await message.send(key, {}, 'delete')
  }
)
