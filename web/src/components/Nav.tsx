import dynamic from 'next/dynamic'

import NavSkeleton from '@/components/NavSkeleton'

const Nav = dynamic(() => import('@/components/NavInteractive'), {
  ssr: false,
  loading: () => <NavSkeleton />,
})

const ResumeNav = dynamic(() => import('@/components/NavInteractive'), {
  ssr: false,
  loading: () => <NavSkeleton isResumePage />,
})

export { ResumeNav }
export default Nav
