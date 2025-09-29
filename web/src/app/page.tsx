import React from 'react'

import Awards from '@/components/Awards'
import CommunityHighlights from '@/components/CommunityHighlights'
import Examples from '@/components/Examples'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Hero from '@/components/Hero'
import Nav from '@/components/Nav'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import TestimonialDaniel from '@/components/testimonials/TestimonialDaniel'
import TestimonialIan from '@/components/testimonials/TestimonialIan'
import TestimonialJered from '@/components/testimonials/TestimonialJered'
import TestimonialMatthew from '@/components/testimonials/TestimonialMatthew'
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
      background="#0a2540"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColor="rgba(66,71,112,0.3)"
      guideDashedColor="rgba(66,71,112,0.3)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <Examples />
    </GuidedSection>
    <GuidedSection
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <Testimonials includeCallToAction>
        <TestimonialIan offset />
        <TestimonialJered />
        <TestimonialDaniel />
        <TestimonialMatthew />
      </Testimonials>
    </GuidedSection>
    <GuidedSection
      background="white"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <Projects />
    </GuidedSection>
    <GuidedSection
      angleBottom
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <TrendingArticles />
    </GuidedSection>
    <GuidedSection
      angleTop
      angleBoth
      padBottom
      background="#0a2540"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColor="rgba(66,71,112,0.3)"
      guideDashedColor="rgba(66,71,112,0.3)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
    >
      <CommunityHighlights />
    </GuidedSection>
    <GuidedSection
      background="white"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
      angleTop
    >
      <Experience />
    </GuidedSection>
    <GuidedSection
      background="#f6f9fc"
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      guideDashedColorDark="rgba(255, 255, 255, 0.08)"
      fullWidth
    >
      <Awards />
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
