const {
  bot,
  importContacts,
  listContacts,
  removeContacts,
  addContacts,
  jidToNum,
  existContacts,
  saveContacts,
} = require('../lib/')

bot(
  {
    pattern: 'contacts ?(.*)',
    desc: 'contact manager',
    type: 'whatsapp',
  },
  async (message, match) => {
    if (match === 'import') {
      if (
        !message.reply_message ||
        !message.reply_message.mimetype ||
        !message.reply_message.mimetype.endsWith('vcard')
      ) {
        return await message.send('*Reply to a VCF file.*')
      }
      const vcfData = await message.reply_message.downloadMediaMessage()
      const contacts = await importContacts(vcfData, message)

      if (contacts.length === 0) {
        return await message.send('*No contacts found.*')
      }

      let msg = `╭━━〔 *📇 MOK MD - Contacts Imported* 〕━━⬣\n┃\n┃ Total: *${contacts.length}*`
      contacts.forEach((contact, i) => {
        msg += `\n┃ ${i + 1}. *${contact.name}* : ${contact.phone}`
      })
      msg += `\n╰━━━━━━━━━━━━━━━━━━━━⬣`
      return await message.send(msg)
    }

    if (match === 'list') {
      const contacts = await listContacts(message.id)
      let msg = `╭━━〔 *📋 MOK MD - Contacts List* 〕━━⬣\n┃\n┃ Total: *${contacts.length}*`
      contacts.forEach((contact, i) => {
        msg += `\n┃ ${i + 1}. *${contact.name}* : ${jidToNum(contact.jid)}`
      })
      msg += `\n╰━━━━━━━━━━━━━━━━━━━━⬣`
      return await message.send(msg)
    }

    if (match === 'save') {
      const savedContacts = await saveContacts(message.id)
      return await message.send(`✅ Saved: *${savedContacts.length}* contacts.`)
    }

    if (match === 'flush') {
      await removeContacts('all', message.id)
      return await message.send('🗑️ All contacts removed.')
    }

    if (match.startsWith('delete')) {
      const contactNumber = match.replace('delete', '').trim()
      const isRemoved = await removeContacts(contactNumber, message.id)
      return await message.send(isRemoved ? '✅ Removed.' : '❌ Not found.')
    }

    if (match.startsWith('add')) {
      const [contactName, contactNumber] = match.replace('add', '').trim().split(',')
      const isAdded = await addContacts(contactName, contactNumber, message.id)
      return await message.send(isAdded.length ? '✅ Added.' : '❌ Failed.')
    }

    if (match.startsWith('exist')) {
      const contactNumber = match.replace('exist', '').trim()
      const exist = await existContacts(contactNumber, message.id)
      return await message.send(exist ? '✅ Exists.' : '❌ Not exists.')
    }

    return await message.send(
      `╭━━〔 *📱 MOK MD - Contact Manager* 〕━━⬣
┃
┃ • contacts import
┃ • contacts flush
┃ • contacts save
┃ • contacts list
┃ • contacts delete <number>
┃ • contacts add <name>,<number>
┃ • contacts exist <number>
╰━━━━━━━━━━━━━━━━━━━━⬣`
    )
  }
)
