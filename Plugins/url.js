const { bot, getUrl, lang } = require('../lib/')

bot(
  {
    pattern: 'url ?(.*)',
    fromMe: true,
    desc: lang.plugins.url.desc,
    type: 'misc',
  },
  async (message, match) => {
    if (!message.reply_message || (!message.reply_message.image && !message.reply_message.video)) {
      return await message.send(
        `╭──[ *🚫 MOK MD – INVALID INPUT* ]──╮\n│\n│ 🖼️ *Reply* to an *image* or *video*.\n│\n╰────────────────────────────╯`
      )
    }

    const mediaPath = await message.reply_message.downloadAndSaveMediaMessage('url')
    const link = await getUrl(mediaPath, match)

    await message.send(
      `╭──[ *🔗 MOK MD – URL GENERATED* ]──╮\n│\n│ 📎 *Here is your media link:*\n│\n│ ${link}\n│\n╰────────────────────────────╯`
    )
  }
)
