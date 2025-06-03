const { isAdmin, sleep, bot, addSpace, jidToNum, formatTime, parsedJid, getCommon, lang, } = require('../lib/')

const gothicBox = (title, body) => { return ╔═〘 ${title.toUpperCase()} 〙═╗\n\n${body}\n\n╚═══════╝ }

bot( { pattern: 'kick ?(.*)', desc: lang.plugins.kick.desc, type: 'group', onlyGroup: true, }, async (message, match) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Kick', lang.plugins.kick.not_admin))

let user = []
if (match === 'all') {
  user = participants.filter((m) => !m.admin).map((m) => m.id)
} else if (message.mention.length) {
  user = message.mention
} else if (message.reply_message) {
  user = [message.reply_message.jid]
}

if (match !== 'all') {
  const isAdminUser = await Promise.all(user.map((u) => isAdmin(participants, u)))
  user = user.filter((_, i) => !isAdminUser[i])
}

if (user.length === 0) return await message.send(gothicBox('Kick', lang.plugins.kick.mention_user))

if (match === 'all') {
  await message.send(gothicBox('Kick All', lang.plugins.kick.kicking_all.format(user.length)))
  await sleep(10 * 1000)
}

await message.Kick(user)

if (message.reply_message) {
  await sleep(3 * 1000)
  await message.send(message.reply_message.key, {}, 'delete')
}

} )

bot( { pattern: 'add ?(.*)', desc: lang.plugins.add.desc, type: 'group', onlyGroup: true, }, async (message, match) => { await message.send(gothicBox('Add', lang.plugins.add.warning)) const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Add', lang.plugins.add.not_admin)) match = match || message.reply_message.jid if (!match) return await message.send(gothicBox('Add', lang.plugins.add.invalid_number)) await sleep(3000) match = jidToNum(match) const res = await message.Add(match) if (res == '403') return await message.send(gothicBox('Add', lang.plugins.add.failed)) else if (res && res != '200') return await message.send(gothicBox('Add', res), { quoted: message.data }) } )

bot( { pattern: 'promote ?(.*)', desc: lang.plugins.promote.desc, type: 'group', onlyGroup: true, }, async (message) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Promote', lang.plugins.promote.not_admin))

let user = []
if (message.mention.length) {
  user = message.mention
} else if (message.reply_message) {
  user = [message.reply_message.jid]
}

const isAdminUser = await Promise.all(user.map((u) => isAdmin(participants, u)))
user = user.filter((_, i) => !isAdminUser[i])
if (user.length === 0) return await message.send(gothicBox('Promote', lang.plugins.promote.already_admin))

return await message.Promote(user)

} )

bot( { pattern: 'demote ?(.*)', desc: lang.plugins.demote.desc, type: 'group', onlyGroup: true, }, async (message) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Demote', lang.plugins.demote.not_admin))

let user = []
if (message.mention.length) {
  user = message.mention
} else if (message.reply_message) {
  user = [message.reply_message.jid]
}

const isAdminUser = await Promise.all(user.map((u) => isAdmin(participants, u)))
user = user.filter((_, i) => isAdminUser[i])
if (user.length === 0) return await message.send(gothicBox('Demote', lang.plugins.demote.not_admin_user))

return await message.Demote(user)

} )

bot( { pattern: 'mute ?(.*)', desc: lang.plugins.mute.desc, type: 'group', onlyGroup: true, }, async (message, match) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Mute', lang.plugins.mute.not_admin)) if (!match || isNaN(match)) return await message.GroupSettingsChange(message.jid, true) await message.GroupSettingsChange(message.jid, true) await message.send(gothicBox('Mute', lang.plugins.mute.mute.format(match))) await sleep(1000 * 60 * match) return await message.GroupSettingsChange(message.jid, false) } )

bot( { pattern: 'unmute ?(.*)', desc: lang.plugins.unmute.desc, type: 'group', onlyGroup: true, }, async (message) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(gothicBox('Unmute', lang.plugins.unmute.not_admin)) return await message.GroupSettingsChange(message.jid, false) } )

                                                                                                                          
