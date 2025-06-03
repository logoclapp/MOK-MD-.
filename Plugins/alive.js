const {
  getUptime,
  getRam,
  getPlatform,
  getDate,
  bot,
} = require('../lib/')

bot(
  {
    pattern: 'alive',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const [date, time] = getDate()

    const caption = `
╭─𖤐「 𝕸𝖔𝖐 𝕸𝖉 𝖆𝖑𝖎𝖛𝖊 」𖤐─╮
│ ⚰️ *Bot Name:* ${ctx.botName || 'MOK MD'}
│ 🕸️ *Uptime:* ${getUptime('t')}
│ 💻 *Platform:* ${getPlatform()}
│ 🧠 *RAM:* ${getRam()}
│ ⌚ *Time:* ${time}
│ 📅 *Date:* ${date.toLocaleDateString('hi')}
╰─𖤐──────────────𖤐─╯

⚔️ *Owner:* ${ctx.ownerName || 'PSUXIN'}
⚜️ *Prefix:* ${ctx.PREFIX}
🧩 *Version:* ${ctx.VERSION}
🛠️ *Plugins:* ${ctx.pluginsCount}
`.trim()

    await message.send(
      {
        image: {
          url: 'https://files.catbox.moe/xg3bb0.png'
        },
        caption
      },
      { quoted: message }
    )
  }
)
