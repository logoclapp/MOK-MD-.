const { bot, setSpam, lang } = require('../lib')

bot(
  {
    pattern: 'antispam ?(.*)',
    desc: lang.plugins.antispam.desc,
    onlyGroup: true,
    type: 'group',
  },
  async (message, match) => {
    if (match !== 'on' && match !== 'off') {
      return await message.send(
        `╭━━〔 *MOK MD - ANTISPAM* 〕━━⊷
┃
┃ ❏ Usage: antispam on / off
┃ ❏ Example: antispam on
┃
╰━━━━━━━━━━━━━━━⊷`
      )
    }

    const isOn = match === 'on'
    await setSpam(message.jid, isOn)

    return await message.send(
      `╭━━〔 *MOK MD - ANTISPAM* 〕━━⊷
┃
┃ ❏ Antispam has been *${isOn ? 'Activated ✅' : 'Deactivated ❌'}*
┃ ❏ Status: *${isOn ? 'ON 🟢' : 'OFF 🔴'}*
┃
╰━━━━━━━━━━━━━━━⊷`
    )
  }
)
