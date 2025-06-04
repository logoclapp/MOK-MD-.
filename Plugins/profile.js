const { bot, getName, formatTime, jidToNum, parsedJid, isUser, isGroup, lang } = require('../lib/')

bot({ pattern: 'jid', desc: lang.plugins.jid.desc, type: 'user' }, async (message) => { await message.send(╭───「 *MOK MD* 」 │ 🔎 *JID:* ${message.mention[0] || message.reply_message.jid || message.jid} ╰───────────────) })

bot({ pattern: 'left', decs: lang.plugins.left.desc, type: 'user', onlyGroup: true }, async (message, match) => { if (match) await message.send(╭───「 *MOK MD* 」 │ 💬 ${match} ╰───────────────) await message.leftFromGroup(message.jid) })

bot({ pattern: 'block', desc: lang.plugins.block.desc, type: 'user' }, async (message) => { const id = message.mention[0] || message.reply_message.jid || (!message.isGroup && message.jid) if (!id) return await message.send(lang.plugins.block.usage) await message.send('╭───「 MOK MD 」 │ ⛔ Blocking user... ╰───────────────') await message.Block(id) })

bot({ pattern: 'unblock', desc: lang.plugins.unblock.desc, type: 'user' }, async (message) => { const id = message.mention[0] || message.reply_message.jid || (!message.isGroup && message.jid) if (!id) return await message.send(lang.plugins.unblock.usage) await message.Unblock(id) await message.send('╭───「 MOK MD 」 │ ✅ User unblocked successfully! ╰───────────────') })

bot({ pattern: 'pp', desc: lang.plugins.pp.desc, type: 'user' }, async (message) => { if (!message.reply_message || !message.reply_message.image) return await message.send(lang.plugins.pp.usage) await message.updateProfilePicture(await message.reply_message.downloadMediaMessage()) await message.send('╭───「 MOK MD 」 │ 🖼️ Profile picture updated! ╰───────────────') })

bot({ pattern: 'whois ?(.*)', desc: lang.plugins.whois.desc, type: 'misc' }, async (message, match) => { match = parsedJid(match)[0] const gid = (isGroup(match) && match) || message.jid const id = (isUser(match) && match) || message.mention[0] || message.reply_message.jid let pp = '' try { pp = await message.profilePictureUrl(id || gid) } catch {} let caption = '' if (id) { caption = ╭───「 *MOK MD - Whois* 」 │ 📞 Number: ${jidToNum(id)} try { const [res] = await message.fetchStatus(id) if (res.status) { caption +=  │ 🧾 Name: ${await getName(gid, id, message.id)} │ 🗒️ About: ${res.status} │ ⏰ Set At: ${res.date} } } catch {} caption += '\n╰───────────────' } else { const { subject, size, creation, desc, owner } = await message.groupMetadata(gid, !!gid) caption = ╭───「 *MOK MD - Group Info* 」 │ 🧾 Name: ${subject} │ 👤 Owner: ${owner ? +${jidToNum(owner)} : ''} │ 👥 Members: ${size} │ 📆 Created: ${formatTime(creation)} │ 🗒️ Description: ${desc} ╰─────────────── } if (!pp) return await message.send(caption, { quoted: message.data }) return await message.sendFromUrl(pp, { caption, quoted: message.data }) })

bot({ pattern: 'gjid', desc: lang.plugins.gjid.desc, type: 'user' }, async (message) => { const gids = await message.getGids() let msg = '╭───「 MOK MD - Group JIDs 」\n' let i = 1 for (const gid in gids) { const name = gids[gid].subject msg += │ *${i}.* ${name} : ${gid}\n i++ } msg += '╰───────────────' await message.send(msg) })

  
