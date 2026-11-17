import React from 'react'

import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Hero from '@/components/Hero'
import LevelingUp from '@/components/LevelingUp'
import Nav from '@/components/Nav'
import PlatformWork from '@/components/PlatformWork'
import Testimonials, { TestimonialGrid } from '@/components/Testimonials'
import TestimonialAndrew from '@/components/testimonials/TestimonialAndrew'
import TestimonialDaniel from '@/components/testimonials/TestimonialDaniel'
import TestimonialDenise from '@/components/testimonials/TestimonialDenise'
import TestimonialIan from '@/components/testimonials/TestimonialIan'
import TestimonialJered from '@/components/testimonials/TestimonialJered'
import TestimonialRd from '@/components/testimonials/TestimonialRd'
import TrendingArticles from '@/components/TrendingArticles'

const Narrative = () => (
  <>
    <Nav />
    <GuidedSection
      allowOverflow
      noPadding
      backgroundDark="oklch(21% .006 285.885)"
    >
      <Hero />
    </GuidedSection>
    <GuidedSection
      angleTop
      background="#f6f9fc"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <Testimonials includeCallToAction>
        <TestimonialGrid>
          <TestimonialIan />
          <TestimonialJered />
          <TestimonialDenise />
          <TestimonialRd />
          <TestimonialAndrew />
          <TestimonialDaniel />
        </TestimonialGrid>
      </Testimonials>
    </GuidedSection>
    <GuidedSection
      angleTop
      angleBoth
      padBottom
      bleedTop="#f6f9fc"
      bleedTopDark="oklch(27.4% .006 286.033)"
      bleedBottom="white"
      bleedBottomDark="oklch(27.4% .006 286.033)"
      bleedGuideSolidColorDark="rgba(255, 255, 255, 0.08)"
      bleedGuideDashedColorDark="rgba(255, 255, 255, 0.08)"
      background="#0a2540"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColor="rgba(66,71,112,0.3)"
      guideDashedColor="rgba(66,71,112,0.3)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <PlatformWork />
    </GuidedSection>
    <GuidedSection
      angleTop
      background="white"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <TrendingArticles />
    </GuidedSection>
    <GuidedSection
      angleBottom
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <Experience />
    </GuidedSection>
    <GuidedSection
      angleTop
      background="#0a2540"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColor="rgba(66,71,112,0.3)"
      guideDashedColor="rgba(66,71,112,0.3)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <LevelingUp />
    </GuidedSection>
    <GuidedSection
      as="footer"
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
      noPadding
    >
      <Footer />
    </GuidedSection>
  </>
)

export default Narrative
