const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

/**
 * Add text watermark to image (PNG or JPEG) buffer
 * @param {Buffer} buffer - original image buffer
 * @param {String} text - watermark text (eg. "MOK MD")
 * @returns {Buffer} - new image buffer with watermark
 */
async function addWatermark(buffer, text = 'MOK MD') {
  const fontSize = 32
  const svgText = `
    <svg width="512" height="512">
      <style>
        .title { fill: white; font-size: ${fontSize}px; font-weight: bold; font-family: Arial, sans-serif; text-shadow: 2px 2px 4px black; }
      </style>
      <text x="50%" y="90%" text-anchor="middle" class="title">${text}</text>
    </svg>`

  const svgBuffer = Buffer.from(svgText)
  return await sharp(buffer)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .png()
    .toBuffer()
}

module.exports = { addWatermark }
