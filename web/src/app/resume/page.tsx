import Resume from '@/components/Resume'
import { profile } from '@/lib/siteContent'
import {
  breadcrumbNode,
  JsonLd,
  personNode,
  profilePageNode,
  websiteNode,
} from '@/lib/structuredData'

import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({
  title: 'Resume',
  route: 'resume',
  description:
    'Resume of Walker Smith. Platform, CI/CD, and developer experience work at Blue Line Solutions, Microsoft, Digital.ai, smash.gg, and VersionOne.',
})

const Page = () => (
  <>
    <JsonLd
      graph={[
        websiteNode(),
        personNode(),
        profilePageNode('/resume/', `${profile.name} resume`),
        breadcrumbNode([{ name: 'Resume', route: '/resume/' }]),
      ]}
    />
    <Resume />
  </>
)

export default Page
