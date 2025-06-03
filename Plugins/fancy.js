const { bot, textToStylist, fontType, stylishTextGen, lang } = require('../lib')

bot(
  {
    pattern: 'fancy ?(.*)',
    fromMe: true,
    desc: lang.plugins.fancy.desc,
    type: 'misc',
  },
  async (message, match) => {
    const replyText = message.reply_message?.text

    if (!match && !replyText) {
      return message.send(lang.plugins.fancy.example)
    }

    // If user replies to a message with .fancy 7
    if (replyText && !isNaN(match) && match >= 1 && match <= 100) {
      const styled = textToStylist(replyText, fontType(match))
      return await message.send(styled, { quoted: message.reply_message.data })
    }

    // If user just types .fancy Hello
    if (!replyText && match) {
      let fancyList = []
      for (let i = 1; i <= 100; i++) {
        fancyList.push(`*${i}* ➤ ${textToStylist(match, fontType(i))}`)
      }
      return message.send(fancyList.join('\n\n'))
    }

    return message.send(lang.plugins.fancy.invalid)
  }
)
