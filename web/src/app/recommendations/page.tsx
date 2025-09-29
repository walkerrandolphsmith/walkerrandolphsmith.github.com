import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'
import Testimonials from '@/components/Testimonials'
import TestimonialAldo from '@/components/testimonials/TestimonialAldo'
import TestimonialAlejandro from '@/components/testimonials/TestimonialAlejandro'
import TestimonialAnaya from '@/components/testimonials/TestimonialAnaya'
import TestimonialAndrew from '@/components/testimonials/TestimonialAndrew'
import TestimonialAnn from '@/components/testimonials/TestimonialAnn'
import TestimonialCynthia from '@/components/testimonials/TestimonialCynthia'
import TestimonialDaniel from '@/components/testimonials/TestimonialDaniel'
import TestimonialDanny from '@/components/testimonials/TestimonialDanny'
import TestimonialDarnell from '@/components/testimonials/TestimonialDarnell'
import TestimonialDave from '@/components/testimonials/TestimonialDave'
import TestimonialDenise from '@/components/testimonials/TestimonialDenise'
import TestimonialDonella from '@/components/testimonials/TestimonialDonella'
import TestimonialEyoel from '@/components/testimonials/TestimonialEyoel'
import TestimonialHanna from '@/components/testimonials/TestimonialHanna'
import TestimonialHepci from '@/components/testimonials/TestimonialHepci'
import TestimonialHolly from '@/components/testimonials/TestimonialHolly'
import TestimonialIan from '@/components/testimonials/TestimonialIan'
import TestimonialJered from '@/components/testimonials/TestimonialJered'
import TestimonialJerry from '@/components/testimonials/TestimonialJerry'
import TestimonialJohn from '@/components/testimonials/TestimonialJohn'
import TestimonialJosh from '@/components/testimonials/TestimonialJosh'
import TestimonialKeith from '@/components/testimonials/TestimonialKeith'
import TestimonialMatthew from '@/components/testimonials/TestimonialMatthew'
import TestimonialMatthewLemons from '@/components/testimonials/TestimonialMatthewLemons'
import TestimonialSruthi from '@/components/testimonials/TestimonialSruthi'
import TestimonialTom from '@/components/testimonials/TestimonialTom'
import TestimonialTony from '@/components/testimonials/TestimonialTony'
import TestimonialSarah from '@/components/testimonials/TestimonialSarah'

import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({
  title: 'Recommendations',
  route: 'recommendations',
})

const Page = () => (
  <>
    <Nav />
    <GuidedSection
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
      padBottom
    >
      <Testimonials>
        <TestimonialDenise offset />
        <TestimonialKeith />
        <TestimonialAnn />
        <TestimonialDarnell />
        <TestimonialDanny />
        <TestimonialSruthi />
        <TestimonialJerry />
        <TestimonialHolly />
        <TestimonialCynthia />
        <TestimonialTom />
        <TestimonialHanna />
        <TestimonialSarah />
        <TestimonialIan />
        <TestimonialMatthew />

        <TestimonialHepci />
        <TestimonialAndrew />
        <TestimonialTony />
        <TestimonialAlejandro />
        <TestimonialMatthewLemons />
        <TestimonialJosh />
        <TestimonialJohn />
        <TestimonialDonella />
        <TestimonialDave />
        <TestimonialAldo />
        <TestimonialEyoel />
        <TestimonialAnaya />
        <TestimonialDaniel />
        <TestimonialJered />
      </Testimonials>
    </GuidedSection>
    <GuidedSection
      as="footer"
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
