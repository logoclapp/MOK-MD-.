const { bot, getFake, antiList, enableAntiFake, lang } = require('../lib/')

bot(
  {
    pattern: 'antifake ?(.*)',
    desc: lang.plugins.antifake.desc,
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    if (!match) {
      const fake = await getFake(message.jid, message.id)
      const status = fake && fake.enabled ? 'on' : 'off'

      return message.send(
        `╭─⭓ *Anti-Fake Status* ⭓─╮\n` +
        `│ 🧩 ${lang.plugins.antifake.example.format(status)}\n` +
        `╰────────────────────────╯`
      )
    }

    if (match === 'list') {
      const codes = await antiList(message.jid, 'fake', message.id)
      if (!codes.length) {
        return message.send(
          `╭⭓ *No Prefix Codes Found* ⭓╮\n` +
          `│ ❌ ${lang.plugins.antifake.not}\n` +
          `╰────────────────────────────╯`
        )
      }

      return message.send(
        `╭──⭓ *Anti-Fake List* ⭓──╮\n` +
        codes.map((code, i) => `│ ${i + 1}. ${code}`).join('\n') +
        `\n╰──────────────────────╯`
      )
    }

    if (match === 'on' || match === 'off') {
      await enableAntiFake(message.jid, match, message.id)
      return message.send(
        `╭─⭓ *Anti-Fake ${match === 'on' ? 'Enabled' : 'Disabled'}* ⭓─╮\n` +
        `│ ✅ ${lang.plugins.antifake.status.format(match === 'on' ? 'enabled' : 'disabled')}\n` +
        `╰────────────────────────────────────────╯`
      )
    }

    const res = await enableAntiFake(message.jid, match, message.id)
    return message.send(
      `╭─⭓ *Prefix Codes Updated* ⭓─╮\n` +
      `│ ✅ ${lang.plugins.antifake.update.format(
        res.allow.length ? res.allow.join(', ') : '',
        res.notallow.length ? res.notallow.join(', ') : ''
      )}\n` +
      `╰────────────────────────────╯`
    )
  }
)
