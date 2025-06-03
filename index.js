const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode
            console.log("❌ Disconnected!", reason)
            if (reason !== DisconnectReason.loggedOut) {
                startBot()
            }
        } else if (connection === 'open') {
            console.log(`
███████╗███████╗██╗   ██╗██╗  ██╗██╗███╗   ██╗
██╔════╝██╔════╝██║   ██║██║  ██║██║████╗  ██║
█████╗  █████╗  ██║   ██║███████║██║██╔██╗ ██║
██╔══╝  ██╔══╝  ██║   ██║██╔══██║██║██║╚██╗██║
██║     ███████╗╚██████╔╝██║  ██║██║██║ ╚████║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

✅ Bot Connected - MOK MD By PSUXIN
            `)
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text === '!ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: '🏓 MOK MD Online!' })
        }
    })
}

startBot()
