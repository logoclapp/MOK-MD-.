const { bot, isUrl, takeScreenshot } = require('../lib/')

bot(
  {
    pattern: 'ss ?(.*)',
    desc: 'Take web page screenshot',
    type: 'download',
  },
  async (message, match) => {
    match = isUrl(match || message.reply_message.text)
    if (!match) {
      return await message.send(
        `╭━━〔 *MOK MD - SCREENSHOT* 〕━━⊷
┃
┃ ❏ Usage: ss <url>
┃ ❏ Example: ss https://google.com
┃ ❏ Action: Capture screenshot of visible part
┃
╰━━━━━━━━━━━━━━━⊷`
      )
    }

    const image = await takeScreenshot(match)
    await message.send(image, { quoted: message.data, mimetype: 'image/png' }, 'image')
  }
)

bot(
  {
    pattern: 'fullss ?(.*)',
    desc: 'Take full web page screenshot',
    type: 'download',
  },
  async (message, match) => {
    match = isUrl(match || message.reply_message.text)
    if (!match) {
      return await message.send(
        `╭━━〔 *MOK MD - FULL SCREENSHOT* 〕━━⊷
┃
┃ ❏ Usage: fullss <url>
┃ ❏ Example: fullss https://example.com
┃ ❏ Action: Capture full page screenshot
┃
╰━━━━━━━━━━━━━━━⊷`
      )
    }

    const image = await takeScreenshot(match, 'full')
    await message.send(image, { quoted: message.data, mimetype: 'image/png' }, 'image')
  }
)
