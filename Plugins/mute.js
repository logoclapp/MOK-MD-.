const { bot, isAdmin, setMute, addTask, c24to12, getMute, lang } = require('../lib')

bot( { pattern: 'amute ?(.*)', desc: lang.plugins.amute.desc, type: 'group', onlyGroup: true, }, async (message, match) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(lang.plugins.common.not_admin) let msg = message.reply_message.text || 'null' const [hour, min] = match.split(' ')

if (hour == 'info') {
  const task = await getMute(message.jid, 'mute', message.id)
  if (!task) return await message.send(lang.plugins.amute.not_found)
  const { hour, minute, msg, enabled } = task
  return await message.send(
    `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoMute Info:\n│ Time: ${hour}:${minute} (${c24to12(`${hour}:${minute}`)})\n│ Status: ${enabled ? '🟢 ON' : '🔴 OFF'}\n│ Msg: ${msg}\n╰────────────⭓`
  )
}

if (hour == 'on' || hour == 'off') {
  const isMute = await setMute(message.jid, 'mute', hour == 'on', message.id)
  if (!isMute) return await message.send(lang.plugins.amute.not_found)
  const task = await getMute(message.jid, 'mute', message.id)
  if (!task || !task.hour) return await message.send(lang.plugins.amute.not_found)
  const isTask = addTask(
    message.jid,
    'mute',
    hour == 'off' ? 'off' : task.hour,
    task.minute,
    task.msg,
    message.id
  )
  if (!isTask) return await message.send(lang.plugins.amute.already_disabled)
  return await message.send(
    `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoMute ${hour.toUpperCase()} successfully.\n╰────────────⭓`
  )
}

if (!hour || !min || isNaN(hour) || isNaN(min))
  return await message.send(lang.plugins.amute.invalid_format)

await setMute(message.jid, 'mute', true, message.id, hour, min, msg)
addTask(message.jid, 'mute', hour, min, msg, message.id)

return await message.send(
  `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoMute scheduled at ${c24to12(`${hour}:${min}`)}\n│ Msg: ${msg === 'null' ? '-' : msg}\n╰────────────⭓`
)

} )

bot( { pattern: 'aunmute ?(.*)', desc: lang.plugins.aunmute.desc, type: 'group', onlyGroup: true, }, async (message, match) => { const participants = await message.groupMetadata(message.jid) const isImAdmin = await isAdmin(participants, message.client.user.jid) if (!isImAdmin) return await message.send(lang.plugins.common.not_admin) let msg = message.reply_message.text || 'null' const [hour, min] = match.split(' ')

if (hour == 'info') {
  const task = await getMute(message.jid, 'unmute', message.id)
  if (!task || !task.hour) return await message.send(lang.plugins.aunmute.not_found)
  const { hour, minute, msg, enabled } = task
  return await message.send(
    `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoUnmute Info:\n│ Time: ${hour}:${minute} (${c24to12(`${hour}:${minute}`)})\n│ Status: ${enabled ? '🟢 ON' : '🔴 OFF'}\n│ Msg: ${msg}\n╰────────────⭓`
  )
}

if (hour == 'on' || hour == 'off') {
  const isMute = await setMute(message.jid, 'unmute', hour == 'on', message.id)
  if (!isMute) return await message.send(lang.plugins.aunmute.not_found)
  const task = await getMute(message.jid, 'unmute', message.id)
  if (!task) return await message.send(lang.plugins.aunmute.not_found)
  const isTask = addTask(
    message.jid,
    'unmute',
    hour == 'off' ? 'off' : task.hour,
    task.minute,
    task.msg,
    message.id
  )
  if (!isTask) return await message.send(lang.plugins.aunmute.already_disabled)
  return await message.send(
    `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoUnmute ${hour.toUpperCase()} successfully.\n╰────────────⭓`
  )
}

if (!hour || !min || isNaN(hour) || isNaN(min))
  return await message.send(lang.plugins.aunmute.invalid_format)

await setMute(message.jid, 'unmute', true, message.id, hour, min, msg)
addTask(message.jid, 'unmute', hour, min, msg, message.id)
return await message.send(
  `╭──⭓ 𝙈𝙊𝙆 𝙈𝘿\n│ AutoUnmute scheduled at ${c24to12(`${hour}:${min}`)}\n│ Msg: ${msg === 'null' ? '-' : msg}\n╰────────────⭓`
)

} )

                                                                                                                            
