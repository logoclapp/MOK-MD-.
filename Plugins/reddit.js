const { reddit, bot, isUrl, lang } = require('../lib/')

bot(
  {
    pattern: 'reddit ?(.*)',
    desc: lang.plugins.reddit.desc,
    type: 'download',
  },
  async (message, match) => {
    match = isUrl(match || message.reply_message.text)
    
    if (!match) {
      return await message.send(
        `╭────❏ *『 𝙈𝙊𝙆 𝙈𝘿 』*\n│\n├➤ ${lang.plugins.reddit.usage}\n│\n╰─────────────⭓`
      )
    }

    const result = await reddit(match)

    if (!result) {
      return await message.send(
        `╭────❏ *『 𝙈𝙊𝙆 𝙈𝘿 』*\n│\n├➤ ${lang.plugins.reddit.error}\n│\n╰─────────────⭓`,
        { quoted: message.quoted }
      )
    }

    return await message.sendFromUrl(result)
  }
)
