const { bot, isTactacToe, ticTacToe, delTicTacToe, isUser, parsedJid, lang } = require('../lib/')

bot(
  {
    pattern: 'tictactoe ?(.*)',
    desc: lang.plugins.tictactoe.desc,
    type: 'game',
  },
  async (message, match) => {
    if (match === 'end') {
      const ended = await delTicTacToe(message.id)
      return ended
        ? await message.send(
            `╭────[ *🏁 MOK MD – GAME OVER* ]────╮\n│\n│ 🎮 TicTacToe session has been *ended successfully!*\n│\n╰──────────────────────────────╯`
          )
        : null
    }

    let [action, id] = match.split(' ')
    let opponent = message.mention?.[0] || message.reply_message?.jid
    let me = message.participant

    const [_me, _opponent] = parsedJid(match)
    if (isUser(_me) && isUser(_opponent)) {
      me = _me
      opponent = _opponent
    }

    if (action === 'restart' && isUser(id)) {
      opponent = id
      await delTicTacToe(message.id)
    }

    if (!opponent || opponent === me) {
      return await message.send(
        `╭──[ *❌ MOK MD ERROR* ]──╮\n│\n│ ⚠️ Please *tag or reply* to a valid opponent.\n│ You can't play alone!\n│\n╰──────────────────────╯`
      )
    }

    const { text } = await ticTacToe(message.jid, me, opponent, message.id)

    return await message.send(
      `╭────[ *🎮 MOK MD - TIC TAC TOE* ]────╮\n│\n${text}\n│\n╰────────────────────────────────╯`,
      {
        contextInfo: { mentionedJid: [me, opponent] },
      }
    )
  }
)
