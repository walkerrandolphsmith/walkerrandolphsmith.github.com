import ExportedImage from 'next-image-export-optimizer'

import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'

import QRCodeImage from '../../../public/qrcode.webp'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'QR Code', route: 'qr' })

const Page = () => (
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
        <ExportedImage src={QRCodeImage} alt="QR Code" />
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

export default Page
