const { bot, wcg, lang } = require('../lib/')

bot( { pattern: 'wcg ?(.*)', desc: lang.plugins.wcg.desc, type: 'game', }, async (message, match) => { if (match === 'start') { return await wcg.start(message.jid, message.participant, message.id, '🔰 𝗠𝗢𝗞 𝗠𝗗 🔰\n┌──────⭓\n│ 𝖂𝖔𝖗𝖉 𝖈𝖍𝖆𝖎𝖓 𝖌𝖆𝖒𝖊 𝖘𝖙𝖆𝖗𝖙𝖊𝖉 !\n└───────────⭓') } if (match === 'end') { return await wcg.end(message.jid, message.participant, message.id, '🔰 𝗠𝗢𝗞 𝗠𝗗 🔰\n┌──────⭓\n│ 𝖂𝖔𝖗𝖉 𝖈𝖍𝖆𝖎𝖓 𝖌𝖆𝖒𝖊 𝖊𝖓𝖉𝖊𝖉 !\n└───────────⭓') } wcg.start_game(message.jid, message.participant, 'chain', message.id, match) } )

bot( { pattern: 'wrg ?(.*)', desc: lang.plugins.wrg.desc, type: 'game', }, async (message, match) => { if (match === 'start') { return await wcg.start(message.jid, message.participant, message.id, '🔰 𝗠𝗢𝗞 𝗠𝗗 🔰\n┌──────⭓\n│ 𝖂𝖔𝖗𝖉 𝖗𝖆𝖓𝖉𝖔𝖒 𝖌𝖆𝖒𝖊 𝖘𝖙𝖆𝖗𝖙𝖊𝖉 !\n└───────────⭓') } if (match === 'end') { return await wcg.end(message.jid, message.participant, message.id, '🔰 𝗠𝗢𝗞 𝗠𝗗 🔰\n┌──────⭓\n│ 𝖂𝖔𝖗𝖉 𝖗𝖆𝖓𝖉𝖔𝖒 𝖌𝖆𝖒𝖊 𝖊𝖓𝖉𝖊𝖉 !\n└───────────⭓') } wcg.start_game(message.jid, message.participant, 'random', message.id, match) } )

                                                                                                           
