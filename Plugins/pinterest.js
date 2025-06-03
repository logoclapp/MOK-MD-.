const { pinterest, bot, isUrl, lang } = require('../lib/')

bot(
  {
    pattern: 'pinterest ?(.*)',
    desc: lang.plugins.pinterest.desc,
    type: 'download',
  },
  async (message, match) => {
    match = isUrl(match || message.reply_message.text)
    if (!match)
      return await message.send(
        '╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ Please provide a valid Pinterest URL.\n╰────────────⭓'
      )

    const result = await pinterest(match)
    if (!result.length)
      return await message.send(
        '╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ No results found.\n╰────────────⭓',
        { quoted: message.quoted }
      )

    await message.send(
      '╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ Fetching Pinterest media...\n╰────────────⭓'
    )

    return await message.sendFromUrl(result)
  }
)
