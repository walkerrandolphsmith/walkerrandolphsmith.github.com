import path from 'path'
import fs from 'fs/promises'
const {
  QRCodeStyling,
} = require('qr-code-styling-node/lib/qr-code-styling.common.js')
const nodeCanvas = require('canvas')

const options = {
  width: 300,
  height: 300,
  data: 'https://walkerrandolphsmith.com',
  image: './public/logo.png',
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.3,
    margin: 10,
  },
  dotsOptions: {
    color: '#000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#fff',
  },
  qrOptions: {
    errorCorrectionLevel: 'H',
  },
}

const run = async () => {
  const qrCodeImage = new QRCodeStyling({
    nodeCanvas,
    ...options,
  })
  const buffer = await qrCodeImage.getRawData('png')

  fs.writeFile(path.join(process.cwd(), 'public', 'qrcode.png'), buffer)
}

run()
  .then(() => console.log(`✅ Generated QR code image successfully`))
  .catch(error => {
    console.error('❌ Error generating QR Code:', error)
  })
