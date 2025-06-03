const { bot, setPdm, lang } = require('../lib/')

bot(
  {
    pattern: 'pdm ?(.*)',
    desc: lang.plugins.pdm.desc,
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    if (!match)
      return await message.send(`╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ Usage: .pdm on / off\n╰────────────⭓`)

    if (match == 'on' || match == 'off') {
      await setPdm(message.jid, match, message.id)
      return await message.send(
        match == 'on'
          ? `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ PDM mode has been *activated* ✅\n╰────────────⭓`
          : `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ PDM mode has been *deactivated* ❌\n╰────────────⭓`
      )
    }

    await message.send(`╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ Invalid option. Use .pdm on / off\n╰────────────⭓`)
  }
)
