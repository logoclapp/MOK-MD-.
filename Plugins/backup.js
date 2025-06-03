const { bot, backupFilesToDrive, initiateUserToken, validateUserCode } = require('../lib/')

if (process.env.VPS) {
  bot(
    {
      pattern: 'backup ?(.*)',
      desc: 'Manage backup operations: authenticate, validate, or perform a backup.',
      type: 'bot',
    },
    async (message, match) => {
      if (!match) {
        return await message.send(
          `╭──〔 𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐔𝐒𝐀𝐆𝐄 〕──╮\n` +
          `│\n` +
          `│ • *backup auth* — Authenticate with Google Drive.\n` +
          `│ • *backup code <your_code>* — Validate auth code.\n` +
          `│ • *backup now* — Start backup immediately.\n` +
          `╰───────────────────────────────╯`
        )
      }

      if (match === 'now') {
        await backupFilesToDrive()
        return await message.send(`✅ *Backup completed successfully!*`)
      }

      if (match === 'auth') {
        const authUrl = await initiateUserToken()
        return await message.send(
          `╭─〔 𝐀𝐔𝐓𝐇𝐄𝐍𝐓𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐑𝐄𝐐𝐔𝐈𝐑𝐄𝐃 〕─╮\n` +
          `│ 1. Click the link below to authenticate:\n` +
          `│ ${authUrl}\n` +
          `│\n` +
          `│ 2. You'll land on an error page — that's OK.\n` +
          `│ 3. Copy the FULL URL & run:\n` +
          `│    *backup code <your_code>*\n` +
          `╰────────────────────────────────────╯`
        )
      }

      if (match.startsWith('code')) {
        await validateUserCode(match)
        return await message.send(`✅ *Code validated successfully! Backup is now authorized.*`)
      }
    }
  )

  bot(
    {
      pattern: 'gupload ?(.*)',
      desc: 'Upload a file from URL directly to Google Drive.',
      type: 'bot',
    },
    async (message, match) => {
      const url = isUrl(match)
      if (!url) {
        return await message.send(
          `⚠️ *Please provide a valid URL!*\n` +
          `Example: \`gupload https://example.com/file.zip\``
        )
      }
      await backupFilesToDrive(url, message)
    }
  )
    }
