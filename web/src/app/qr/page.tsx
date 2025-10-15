import nodeCanvas from 'canvas'
import { JSDOM } from 'jsdom'
import QRCodeStyling, { Options } from 'qr-code-styling'

import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'

import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'QR Code', route: 'qr' })

const options: Options = {
  width: 300,
  height: 300,
  nodeCanvas,
  jsdom: JSDOM,
  data: 'https://walkersmith.me',
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

const Page = async () => {
  const qrCode = new QRCodeStyling(options)
  const buffer = await qrCode.getRawData('svg')
  const svg = buffer?.toString()

  return (
    <>
      <Nav />
      <GuidedSection
        background="white"
        guideDashedColor="transparent"
        padBottom
        backgroundDark="oklch(21% .006 285.885)"
        guideSolidColorDark="rgba(255, 255, 255, 0.08)"
        guideDashedColorDark="rgba(255, 255, 255, 0.08)"
      >
        <section className="flex justify-center mt-32">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </section>
      </GuidedSection>
      <GuidedSection
        as="footer"
        background="#f6f9fc"
        backgroundDark="oklch(27.4% .006 286.033)"
        guideSolidColorDark="rgba(255, 255, 255, 0.08)"
        guideDashedColorDark="rgba(255, 255, 255, 0.08)"
        noPadding
      >
        <Footer />
      </GuidedSection>
    </>
  )
}

export default Page
