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
  microsoft: {
    title: 'Senior Software Engineer',
    name: 'Microsoft',
    description:
      'I worked on this massive content platform at Microsoft — basically the system behind all the docs and help pages. It handled publishing, localization into 64 languages, and had hundreds of thousands of assets. Served billions of hits a month.',
    image: MicrosoftImage,
    logo: { src: MsLogo, alt: 'Card Image', height: 40, width: 150 },
    card: MicrosoftCard,
    link: 'https://microsoft.com',
  },
  digitalai: {
    title: 'Senior Software Engineer',
    name: 'digital.ai',
    description:
      'At Digital.ai, I worked on a platform that brought software planning and release automation together — kind of full lifecycle management for enterprise development. One of the big things I built was a webhooks system that let teams integrate with their existing tools. It ended up being used by about half of the Fortune 500, which was rewarding to see in action.',
    image: DigitalAiImage,
    logo: { src: DigitalAiLogo, alt: 'Digital.ai', height: 40, width: 200 },
    card: DigitalAiCard,
    link: 'https://digital.ai',
  },
  smashgg: {
    title: 'Software Engineer',
    name: 'smash.gg',
    description:
      'At Smash.gg, a startup focused on making grassroots esports tournaments truly matter, I helped lead the shift from in-person events to online competitions — right when the world was changing fast. That pivot repositioned us as a market leader and opened up a major new revenue stream that fueled the company’s growth.',
    image: SmashGGImage,
    logo: { src: SmashGGLogo, alt: 'start.gg', height: 50, width: 75 },
    card: SmashCard,
    link: 'https://start.gg',
  },
  versionone: {
    title: 'Software Engineer',
    name: 'VersionOne',
    description:
      'Back when it was still VersionOne (before becoming Digital.ai), I helped get their new release automation product off the ground. It was a big deal because it expanded the platform beyond just planning into actual DevOps tooling. That shift really widened the scope of what the company could offer and set the stage for deeper end-to-end software lifecycle management.',
    image: VersionOneImage,
    logo: { src: VersionOneLogo, alt: 'VersionOne', height: 40, width: 200 },
    card: VersionOneCard,
    link: 'https://versionone.com',
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
}
