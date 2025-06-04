const { bot, setWarn, jidToNum, isAdmin, deleteWarn, sleep, lang } = require('../lib/')

bot( { pattern: 'warn ?(.*)', desc: lang.plugins.warn.desc, type: 'group', onlyGroup: true, }, async (message, match, ctx) => { if (!match && !message.reply_message) return await message.send( ╭─『 *⚠️ MOK MD – WARN* 』\n│\n│ 🔹 *Usage:* .warn @user [reason]\n╰────────────────────────╯ )

let [m, u] = match.split(' ')

if (m && m.toLowerCase() === 'reset') {
  u = u && u.endsWith('@s.whatsapp.net') ? u : message.mention[0] || message.reply_message?.jid
  if (!u)
    return await message.send(
      `╭─『 *⚠️ MOK MD – WARN RESET* 』\n│\n│ 🔹 *Usage:* .warn reset @user\n╰────────────────────────╯`
    )

  const count = await setWarn(
    u,
    message.jid,
    message.id,
    ctx.WARN_LIMIT,
    (!isNaN(u) && u) || -1
  )

  const mention = `@${jidToNum(u)}`
  const remaining = ctx.WARN_LIMIT - count
  const resetMessage = ctx.WARN_RESET_MESSAGE.replace('&mention', mention)
    .replace('&remaining', remaining)
    .replace('&warn', ctx.WARN_LIMIT)

  return await message.send(
    `╭─『 *✅ MOK MD – WARN RESET* 』\n│\n│ ${resetMessage}\n╰────────────────────────╯`,
    { contextInfo: { mentionedJid: [u] } }
  )
}

const user = message.mention[0] || message.reply_message?.jid
if (!user)
  return await message.send(
    `╭─『 *⚠️ MOK MD – WARN* 』\n│\n│ 🔹 *Usage:* .warn @user [reason]\n╰────────────────────────╯`
  )

const count = await setWarn(user, message.jid, message.id, ctx.WARN_LIMIT)

if (count > ctx.WARN_LIMIT) {
  const participants = await message.groupMetadata(message.jid)
  const isImAdmin = await isAdmin(participants, message.client.user.jid)
  if (!isImAdmin)
    return await message.send(
      `╭─『 *❌ MOK MD – ADMIN ERROR* 』\n│\n│ ⚠️ M pa admin poum ka kick.\n╰────────────────────────╯`
    )

  const isUserAdmin = await isAdmin(participants, user)
  if (isUserAdmin)
    return await message.send(
      `╭─『 *❌ MOK MD – KICK FAILED* 』\n│\n│ ❎ User sa a se admin.\n╰────────────────────────╯`
    )

  const mention = `@${jidToNum(user)}`
  const kickMessage = ctx.WARN_KICK_MESSAGE.replace('&mention', mention)

  await message.send(
    `╭─『 *💪 MOK MD – WARN KICK* 』\n│\n│ ${kickMessage}\n╰────────────────────────╯`,
    { contextInfo: { mentionedJid: [user] } }
  )
  await deleteWarn(user, message.jid, message.id)
  return await message.Kick(user)
}

const mention = `@${jidToNum(user)}`
const remainWarnCount = ctx.WARN_LIMIT - count
const warnMessage = ctx.WARN_MESSAGE.replace('&mention', mention)
  .replace('&remaining', remainWarnCount)
  .replace('&reason', match)
  .replace('&warn', ctx.WARN_LIMIT)

await message.send(
  `╭─『 *⚠️ MOK MD – WARNED* 』\n│\n│ ${warnMessage}\n╰────────────────────────╯`,
  { contextInfo: { mentionedJid: [user] } }
)

if (message.reply_message) {
  await sleep(3000)
  await message.send(message.reply_message.key, {}, 'delete')
}

} )

  
