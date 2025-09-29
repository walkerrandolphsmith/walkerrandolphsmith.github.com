import Resume from '@/components/Resume'

import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'Resume', route: 'resume' })

const Page = () => <Resume />

export default Page
