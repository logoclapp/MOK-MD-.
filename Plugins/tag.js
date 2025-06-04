const { bot, addSpace, forwardOrBroadCast, lang } = require('../lib/') bot( { pattern: 'tag ?(.*)', onlyGroup: true, desc: lang.plugins.tag.desc, type: 'group', }, async (message, match) => { const participants = await message.groupMetadata(message.jid) const mentionedJid = participants.map(({ id }) => id)

const header = '╔═══════『 MOK MD 』═══════╗'
const footer = '╚════════════════════════╝'

if (match == 'all') {
  let mesaj = header + '\n'
  mentionedJid.forEach((e, i) => {
    mesaj += `║ ${i + 1}. @${e.split('@')[0]}\n`
  })
  mesaj += footer
  return await message.send(mesaj.trim(), {
    contextInfo: { mentionedJid },
  })
} else if (match == 'admin' || match == 'admins') {
  let mesaj = header + '\n'
  let admins = participants.filter((user) => !!user.admin == true).map(({ id }) => id)
  admins.forEach((e) => {
    mesaj += `║ @${e.split('@')[0]}\n`
  })
  mesaj += footer
  return await message.send(mesaj.trim(), {
    contextInfo: { mentionedJid: admins },
  })
} else if (match == 'notadmin' || match == 'not admins') {
  let mesaj = header + '\n'
  const notAdmins = participants.filter((user) => !!user.admin != true).map(({ id }) => id)
  notAdmins.forEach((e) => {
    mesaj += `║ @${e.split('@')[0]}\n`
  })
  mesaj += footer
  return await message.send(mesaj.trim(), {
    contextInfo: { mentionedJid: notAdmins },
  })
}

if (match || message.reply_message?.text) {
  return await message.send(match || message.reply_message.text, {
    contextInfo: { mentionedJid },
  })
}

if (!message.reply_message) return await message.send(lang.plugins.tag.usage)

forwardOrBroadCast(message.jid, message, { contextInfo: { mentionedJid } })

} )

    
