const { getAntiLink, bot, setAntiLink, lang } = require('../lib/')

bot(
  {
    pattern: 'antilink ?(.*)',
    desc: lang.plugins.antilink.desc,
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const antilink = await getAntiLink(message.jid, message.id)
    const status = antilink.enabled ? 'on' : 'off'

    if (!match) {
      return message.send(
        `╭─⭓ *Anti-Link Status* ⭓─╮\n` +
        `│ 🔗 ${lang.plugins.antilink.example.format(status)}\n` +
        `╰────────────────────────╯`
      )
    }

    if (match === 'on' || match === 'off') {
      if (match === 'off' && !antilink.enabled) {
        return message.send(
          `╭───⭓ *Already Disabled* ⭓───╮\n` +
          `│ 🚫 ${lang.plugins.antilink.disable}\n` +
          `╰────────────────────────────╯`
        )
      }

      await setAntiLink(message.jid, match === 'on', message.id)
      return message.send(
        `╭──⭓ *Anti-Link ${match === 'on' ? 'Enabled' : 'Disabled'}* ⭓──╮\n` +
        `│ ✅ ${lang.plugins.antilink.status.format(match === 'on' ? 'enabled' : 'disabled')}\n` +
        `╰────────────────────────────────────╯`
      )
    }

    if (match === 'info') {
      if (!antilink) {
        return message.send(
          `╭─⭓ *Anti-Link Info* ⭓─╮\n` +
          `│ ❌ ${lang.plugins.antilink.antilink_notset}\n` +
          `╰───────────────────────╯`
        )
      }
      return message.send(
        `╭───⭓ *Anti-Link Info* ⭓───╮\n` +
        `│ 🟢 ${lang.plugins.antilink.info.format(status, antilink.allowedUrls, antilink.action)}\n` +
        `╰────────────────────────────╯`
      )
    }

    if (match.startsWith('action/')) {
      const action = match.replace('action/', '')
      if (!['warn', 'kick', 'null'].includes(action)) {
        return message.send(
          `╭⭓ *Invalid Action* ⭓╮\n` +
          `│ ⚠️ ${lang.plugins.antilink.action_invalid}\n` +
          `╰────────────────────╯`
        )
      }

      await setAntiLink(message.jid, match, message.id)
      return message.send(
        `╭──⭓ *Action Updated* ⭓──╮\n` +
        `│ 🛡️ ${lang.plugins.antilink.action_update.format(action)}\n` +
        `╰────────────────────────╯`
      )
    }

    const res = await setAntiLink(message.jid, match)
    return message.send(
      `╭─⭓ *Allowed/Blocked URLs* ⭓─╮\n` +
      `│ ✅ ${lang.plugins.antilink.update.format(
        res.allow.length ? res.allow.join(', ') : '',
        res.notallow.length ? res.notallow.join(', ') : ''
      )}\n` +
      `╰────────────────────────────╯`
    )
  }
)
