const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const path = require('path')

const commands = new Map()

const commandsPath = path.join(__dirname, 'commands')
fs.readdirSync(commandsPath).forEach(file => {
    const command = require(`./commands/${file}`)
    commands.set(command.name, command)
})

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode
            if (reason !== DisconnectReason.loggedOut) startBot()
        } else if (connection === 'open') {
            console.log(`\n☠️ MOK MD is connected\n`)
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        const prefix = "!"

        if (!text.startsWith(prefix)) return

        const args = text.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = commands.get(commandName)

        if (command) {
            try {
                await command.execute(sock, msg, args)
            } catch (err) {}
        }
    })
}

startBot()
