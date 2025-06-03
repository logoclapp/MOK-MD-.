const { bot, lang } = require('../lib/')

bot(
  {
    pattern: 'fullpp ?(.*)',
    desc: lang.plugins.fullpp.desc,
    type: 'user',
  },
  async (message) => {
    if (!message.reply_message || !message.reply_message.image) {
      return await message.send(
        `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ ${lang.plugins.fullpp.usage}\n╰────────────⭓`
      )
    }

    await message.updateProfilePicture(
      await message.reply_message.downloadMediaMessage(),
      message.client.user.jid
    )

    return await message.send(
      `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ ${lang.plugins.fullpp.updated}\n╰────────────⭓`
    )
  }
)
