const { bot, setWord, getWord, lang } = require('../lib')

const actions = ['null', 'warn', 'kick']

bot(
  {
    pattern: 'antiword ?(.*)',
    desc: lang.plugins.antiword.desc,
    onlyGroup: true,
    type: 'group',
  },
  async (message, match) => {
    const { enabled } = await getWord(message.jid, message.id)

    if (!match || (!['on', 'off'].includes(match) && !match.startsWith('action/'))) {
      return message.send(
        `╭─⭓ *Anti-Word Usage* ⭓─╮\n` +
        `│ 📌 ${lang.plugins.antiword.example.format(enabled ? 'on' : 'off')}\n` +
        `╰────────────────────────╯`
      )
    }

    if (match.startsWith('action/')) {
      const newAction = match.replace('action/', '')
      if (!actions.includes(newAction)) {
        return message.send(
          `╭─⭓ *Invalid Action* ⭓─╮\n` +
          `│ ❌ ${lang.plugins.antilink.action_invalid}\n` +
          `╰───────────────────────╯`
        )
      }

      await setWord(message.jid, newAction, message.id)
      return message.send(
        `╭─⭓ *Action Updated* ⭓─╮\n` +
        `│ ⚙️ ${lang.plugins.antiword.action_update.format(newAction)}\n` +
        `╰──────────────────────╯`
      )
    }

    await setWord(message.jid, match === 'on', message.id)

    return message.send(
      match === 'on'
        ? `╭─⭓ *Anti-Word Activated* ⭓─╮\n│ ✅ ${lang.plugins.antiword.status.format('activated')}\n╰────────────────────────────╯`
        : `╭─⭓ *Anti-Word Deactivated* ⭓─╮\n│ ❌ ${lang.plugins.antiword.status.format('deactivated')}\n╰────────────────────────────╯`
    )
  }
)
