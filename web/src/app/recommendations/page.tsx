import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'
import Testimonials, { TestimonialGroup } from '@/components/Testimonials'
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
import TestimonialRd from '@/components/testimonials/TestimonialRd'
import TestimonialSarah from '@/components/testimonials/TestimonialSarah'
import TestimonialSruthi from '@/components/testimonials/TestimonialSruthi'
import TestimonialTom from '@/components/testimonials/TestimonialTom'
import TestimonialTony from '@/components/testimonials/TestimonialTony'

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
        <TestimonialGroup title="Engineering leaders">
          <TestimonialIan />
          <TestimonialJered />
          <TestimonialHepci />
          <TestimonialAnn />
          <TestimonialDenise />
          <TestimonialKeith />
          <TestimonialDarnell />
        </TestimonialGroup>
        <TestimonialGroup title="Staff Engineers">
          <TestimonialRd />
          <TestimonialAndrew />
          <TestimonialTony />
        </TestimonialGroup>
        <TestimonialGroup title="Software engineers">
          <TestimonialDanny />
          <TestimonialJohn />
          <TestimonialDave />
          <TestimonialSruthi />
          <TestimonialAlejandro />
          <TestimonialTom />
          <TestimonialMatthewLemons />
          <TestimonialCynthia />
          <TestimonialEyoel />
          <TestimonialAnaya />
          <TestimonialAldo />
        </TestimonialGroup>
        <TestimonialGroup title="Product, design, and sales partners">
          <TestimonialDaniel />
          <TestimonialMatthew />
          <TestimonialJerry />
          <TestimonialDonella />
          <TestimonialHanna />
          <TestimonialHolly />
          <TestimonialSarah />
          <TestimonialJosh />
        </TestimonialGroup>
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
