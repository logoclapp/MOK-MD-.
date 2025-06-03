const { bot } = require('../lib/')

bot(
  {
    pattern: 'poll ?(.*)',
    desc: 'Creates a WhatsApp poll.',
    type: 'whatsapp',
  },
  async (message, match) => {
    const poll = match.split(',')
    if (poll.length < 3) {
      return await message.send(
        '╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ *Usage:* poll <question>,<option1>,<option2>,...\n╰────────────⭓'
      )
    }

    const name = poll[0]
    const options = []

    for (let i = 1; i < poll.length; i++) {
      options.push({ optionName: poll[i].trim() })
    }

    await message.send(
      {
        name,
        options,
        selectableOptionsCount: options.length,
      },
      {},
      'poll'
    )
  }
)
