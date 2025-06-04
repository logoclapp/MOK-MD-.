const { bot, parsedJid, validateTime, createSchedule, delScheduleMessage, deleteScheduleTask, getScheduleMessage, parseSchedule, sleep, isGroup, jidToNum, lang, } = require('../lib/')

bot( { pattern: 'setschedule ?(.*)', desc: lang.plugins.setschedule.desc, type: 'schedule', }, async (message, match) => { const schedule = parseSchedule(match) const isTimeValid = validateTime(schedule.time) if (!schedule.jids.length || !isTimeValid) { return await message.send( ╭───────◆ *MOK MD* ├❏ 𝙴𝚇𝙰𝙼𝙿𝙻𝙴: ├❏ setschedule 10m @user ╰─────────────◆) } if (!message.reply_message) { return await message.send( ╭───────◆ *MOK MD* ├❏ 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰 𝙼𝙴𝚂𝚂𝙰𝙶𝙴 ╰─────────────◆) } schedule.jids.forEach(async (jid, index) => { const time = validateTime(schedule.time, index + 1) const at = await createSchedule(jid, time, message, message.jid, schedule.once, message.id) await message.send( ╭───────◆ *MOK MD* ├❏ Scheduled at: *${at}* ├❏ To: *${isGroup(jid) ? jid : jidToNum(jid)}* ╰─────────────◆, { contextInfo: { mentionedJid: [jid] }, }) await sleep(3000) }) } )

bot( { pattern: 'getschedule ?(.*)', desc: lang.plugins.getschedule.desc, type: 'schedule', }, async (message, match) => { const [jid] = parsedJid(match) const schedules = await getScheduleMessage(jid, message.id) if (schedules.length < 1) return await message.send( ╭───────◆ *MOK MD* ├❏ No scheduled messages found. ╰─────────────◆)

let msg = '╭───────◆ *MOK MD*\n'
for (const schedule of schedules) {
  msg += `├❏ Jid : ${schedule.jid}\n├❏ Time : ${schedule.time}\n├─────────────◆\n`
}
msg += '╰─────────────◆'
return await message.send(msg.trim())

} )

bot( { pattern: 'delschedule ?(.*)', desc: lang.plugins.delschedule.desc, type: 'schedule', }, async (message, match) => { if (!match) return await message.send( ╭───────◆ *MOK MD* ├❏ Usage: ├❏ delschedule @user,10m ╰─────────────◆)

const [jid, time] = match.split(',')
let [isJid] = parsedJid(jid)
const isTimeValid = validateTime(time)

if (!isJid && match !== 'all')
  return await message.send(`

╭───────◆ MOK MD ├❏ Invalid input. ╰─────────────◆`)

if (!isJid) isJid = match
const isDeleted = await delScheduleMessage(isJid, isTimeValid, message.id)

if (!isDeleted)
  return await message.send(`

╭───────◆ MOK MD ├❏ Schedule not found. ╰─────────────◆`)

deleteScheduleTask(isJid, isTimeValid, message.id)
return await message.send(`

╭───────◆ MOK MD ├❏ Schedule deleted. ╰─────────────◆`) } )

  
