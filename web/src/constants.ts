import DigitalAiCard from '../public/career-digitalai.webp'
import MicrosoftCard from '../public/career-microsoft.webp'
import SmashCard from '../public/career-startgg.webp'
import VersionOneCard from '../public/career-versionone.webp'
import DigitalAiImage from '../public/defcon.webp'
import DigitalAiLogo from '../public/digitalai.webp'
import MicrosoftImage from '../public/microsoft.webp'
import MsLogo from '../public/mslogo.webp'
import SmashGGImage from '../public/smash.webp'
import SmashGGLogo from '../public/smashgglogo.webp'
import VersionOneImage from '../public/versionone.webp'
import VersionOneLogo from '../public/versiononelogo.webp'

const companyById = {
  bluelinesolutions: {
    title: 'Staff Engineer, then Director of Engineering',
    name: 'Blue Line Solutions',
    description:
      'I joined as Staff Engineer and became Director of Engineering within 8 months. I direct engineering for NewGuard, a CJIS-compliant SaaS platform for 200+ law enforcement agencies. I provisioned isolated Azure tenants with Terraform to pass a CJIS audit and get final NLETS approval.',
    image: null,
    logo: null,
    card: null,
    link: null,
  },
  microsoft: {
    title: 'Senior Software Engineer',
    name: 'Microsoft',
    description:
      'I designed and built an event-driven content platform for support.microsoft.com, Office, and Windows. It serves 2B+ users and 1B+ requests each month. I made CI six times faster and cut rollbacks by 30% with ephemeral environments.',
    image: MicrosoftImage,
    logo: { src: MsLogo, alt: 'Microsoft', height: 40, width: 150 },
    card: MicrosoftCard,
    link: 'https://microsoft.com',
  },
  digitalai: {
    title: 'Senior Software Engineer',
    name: 'Digital.ai',
    description:
      'I led the webhooks feature that hundreds of engineering teams used to connect their tools. The platform served 53% of the Fortune 100. I replaced week-long manual regression cycles across three teams with Cypress end-to-end tests.',
    image: DigitalAiImage,
    logo: { src: DigitalAiLogo, alt: 'Digital.ai', height: 40, width: 200 },
    card: DigitalAiCard,
    link: 'https://digital.ai',
  },
  smashgg: {
    title: 'Software Engineer',
    name: 'smash.gg',
    description:
      'I led the Event Check-in feature that moved the company from in-person to online esports. I defined the Software Engineer in Test role and hired two engineers to automate critical user flows with Cypress.',
    image: SmashGGImage,
    logo: { src: SmashGGLogo, alt: 'start.gg', height: 50, width: 75 },
    card: SmashCard,
    link: 'https://start.gg',
  },
  versionone: {
    title: 'Software Engineer',
    name: 'VersionOne',
    description:
      'I helped start the release automation product. It took the platform from planning into DevOps tooling. VersionOne later became Digital.ai.',
    image: VersionOneImage,
    logo: { src: VersionOneLogo, alt: 'VersionOne', height: 40, width: 200 },
    card: VersionOneCard,
    link: 'https://versionone.com',
  },
}

const education = {
  degrees: [
    {
      degree: 'M.S. Machine Learning',
      school: 'Columbus State University',
      year: '2026',
      note: 'AI and Machine Learning Track Award',
    },
    {
      degree: 'B.S. Computer Science',
      school: 'Columbus State University',
      year: '2014',
    },
  ],
  publication: {
    title:
      'Deriving Entrepreneurial Insights from Open-Ended and Unstructured Survey Data Using NLP Techniques',
    venue: 'MDPI',
    date: 'November 2024',
    href: 'https://www.mdpi.com/2079-9292/13/23/4725',
  },
}

const contactUsSubmissionFailed =
  "Sorry, we're having some issues please try reaching out again shortly."

const contactUsSubmissionSuccessful =
  "Thanks for reaching out! You'll receive an email shortly."

const contactUsSubmissionPending =
  "Hang tight, we're processing your submission..."

export {
  companyById,
  contactUsSubmissionFailed,
  contactUsSubmissionPending,
  contactUsSubmissionSuccessful,
  education,
}
