const { bot } = require('../lib/')

bot(
  {
    pattern: 'react ?(.*)',
    desc: '➢ React to a replied message with an emoji',
    type: 'misc',
  },
  async (message, match) => {
    if (!match || !message.reply_message) {
      return await message.send(
        `╭────❏ *『 𝙈𝙊𝙆 𝙈𝘿 』*\n│\n├➤ _Example:_ react ❣\n│\n╰─────────────⭓`
      )
    }

    return await message.send(
      {
        text: match,
        key: message.reply_message.key,
      },
      {},
      'react'
    )
  }
)
