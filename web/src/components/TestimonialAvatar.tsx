import dynamic from 'next/dynamic'

import TestimonialAvatarSkeleton from '@/components/TestimonialAvatarSkeleton'

const TestimonialAvatar = dynamic(
  () => import('@/components/TestimonialAvatarInteractive'),
  {
    ssr: false,
    loading: () => <TestimonialAvatarSkeleton />,
  },
)

export default TestimonialAvatar
