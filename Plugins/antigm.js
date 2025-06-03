const { bot, lang, setGroupMention } = require('../lib/')

bot(
  {
    pattern: 'antigm ?(.*)',
    desc: 'Manage anti group mention configuration',
    type: 'group',
  },
  async (message, match) => {
    if (!match) {
      return await message.send(
        `╭─⭓ *Anti-Group Mention Usage* ⭓─╮\n` +
        `│ 🧩 ${lang.plugins.antigm.usage}\n` +
        `╰────────────────────────────────╯`
      )
    }

    if (['delete', 'warn', 'kick'].includes(match)) {
      await setGroupMention({ action: match })
      return await message.send(
        `╭─⭓ *Action Updated* ⭓─╮\n` +
        `│ ⚙️ ${lang.plugins.antigm.action.format(match)}\n` +
        `╰────────────────────────╯`
      )
    }

    if (match.startsWith('ignore')) {
      await setGroupMention({ filter: match })
      return await message.send(
        `╭─⭓ *Ignore List Updated* ⭓─╮\n` +
        `│ 🔕 ${lang.plugins.antigm.filter}\n` +
        `╰──────────────────────────────╯`
      )
    }

    const enabled = match === 'on'
    await setGroupMention({ enabled })

    return await message.send(
      enabled
        ? `╭─⭓ *Anti-Group Mention Enabled* ⭓─╮\n│ ✅ ${lang.plugins.antigm.enabled}\n╰────────────────────────────────╯`
        : `╭─⭓ *Anti-Group Mention Disabled* ⭓─╮\n│ ❌ ${lang.plugins.antigm.disabled}\n╰────────────────────────────────╯`
    )
  }
)
