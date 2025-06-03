const {
  addSpace,
  textToStylist,
  getUptime,
  getRam,
  getDate,
  getPlatform,
  bot,
  lang,
} = require('../lib/')

bot(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const [date, time] = getDate()

    const CMD_HELP = [
      lang.plugins.menu.help.format(
        ctx.PREFIX,
        message.pushName,
        time,
        date.toLocaleString('en', { weekday: 'long' }),
        date.toLocaleDateString('hi'),
        ctx.VERSION,
        ctx.pluginsCount,
        getRam(),
        getUptime('t'),
        getPlatform()
      ),
      '╭─𖤐────𖤐────𖤐─╮',
    ]

    sorted.forEach((command, i) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        CMD_HELP.push(
          `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
            command.name.toUpperCase(),
            'mono'
          )}`
        )
      }
    })

    CMD_HELP.push('╰─𖤐────𖤐────𖤐─╯')

    return await message.send(CMD_HELP.join('\n'))
  }
)

bot(
  {
    pattern: 'list ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const commandList = sorted
      .filter((command) => !command.dontAddCommandList && command.pattern !== undefined)
      .map(
        (command, i) =>
          `🕸️ ${i + 1}. ⚜️ *${textToStylist(command.name.toUpperCase(), 'mono')}*\n     𝔇𝔢𝔰𝔠: ${command.desc}`
      )
      .join('\n\n')

    await message.send(commandList)
  }
)

bot(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const commands = {}

    ctx.commands.forEach((command) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []

        let isDisabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDisabled ? `${cmd} [disabled]` : cmd)
      }
    })

    const sortedCommandKeys = Object.keys(commands).sort()

    const [date, time] = getDate()
    let msg = lang.plugins.menu.menu.format(
      ctx.PREFIX,
      message.pushName,
      time,
      date.toLocaleString('en', { weekday: 'long' }),
      date.toLocaleDateString('hi'),
      ctx.VERSION,
      ctx.pluginsCount,
      getRam(),
      getUptime('t'),
      getPlatform()
    )

    msg += '\n'

    if (match && commands[match]) {
      msg += `╭─𖤐 ${textToStylist(match.toLowerCase(), 'smallcaps')} 𖤐─╮\n`
      commands[match]
        .sort((a, b) => a.localeCompare(b))
        .forEach((plugin) => {
          msg += `│ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
        })
      msg += `╰─𖤐─────────────𖤐─╯`
      return await message.send(msg)
    }

    for (const command of sortedCommandKeys) {
      msg += `╭─𖤐 ${textToStylist(command.toLowerCase(), 'smallcaps')} 𖤐─╮\n`
      commands[command]
        .sort((a, b) => a.localeCompare(b))
        .forEach((plugin) => {
          msg += `│ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
        })
      msg += `╰─𖤐─────────────𖤐─╯\n`
    }

    await message.send(msg.trim())
  }
)
