import dynamic from 'next/dynamic'

import SocialGraphSkeleton from './SocialGraphSkeleton'

const SocialGraph = dynamic(
  () => import('@/components/SocialGraphInteractive'),
  {
    ssr: false,
    loading: () => <SocialGraphSkeleton />,
  },
)

export default SocialGraph
