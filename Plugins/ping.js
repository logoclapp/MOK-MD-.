const { bot, lang } = require('../lib/')

bot(
  {
    pattern: 'ping ?(.*)',
    desc: lang.plugins.ping.desc,
    type: 'misc',
  },
  async (message, match) => {
    const start = new Date().getTime()
    await message.send('╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ 𝙋𝙞𝙣𝙜𝙞𝙣𝙜...\n╰────────────⭓')
    const end = new Date().getTime()
    const speed = end - start
    return await message.send(
      `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ 𝙋𝙞𝙣𝙜 𝙧𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ${speed} ms ⚡\n╰────────────⭓`
    )
  }
)
