import dynamic from 'next/dynamic'

import HeroIllustration from '@/components/HeroIllustration'

const HeroIllustrationAnimated = dynamic(
  () => import('@/components/HeroIllustrationAnimated'),
  {
    ssr: false,
    loading: () => <HeroIllustration />,
  },
)

export default HeroIllustrationAnimated
