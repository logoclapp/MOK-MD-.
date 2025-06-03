const { bot, getGPTResponse, getDallEResponse } = require('../lib')

bot(
  {
    pattern: 'gpt ?(.*)',
    desc: 'ChatGPT fun',
    type: 'AI',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        `╭━━〔 *🤖 MOK MD - GPT AI* 〕━━⬣
┃
┃ *🧠 Example Commands :*
┃
┃ ➤ gpt What is the capital of France?
┃ ➤ gpt What's in this image? (reply to image)
┃
╰━━━━━━━━━━━━━━━━━━⬣`
      )
    let image
    if (message.reply_message && message.reply_message.image) {
      image = await message.reply_message.downloadAndSaveMediaMessage('gpt')
    }
    const res = await getGPTResponse(match, message.id, image)
    await message.send(res, { quoted: message.data })
  }
)

bot(
  {
    pattern: 'dall ?(.*)',
    desc: 'dall image generator',
    type: 'AI',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        `╭━━〔 *🎨 MOK MD - DALL·E* 〕━━⬣
┃
┃ *🎯 Example :*
┃ ➤ dall a close up, studio photographic portrait of a white siamese cat that looks curious, backlit ears
┃
╰━━━━━━━━━━━━━━━━━━⬣`
      )
    const res = await getDallEResponse(match, message.id)
    await message.sendFromUrl(res)
  }
)
