const sitedata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL,
  title: 'Walker Smith',
  author: 'Walker Smith',
  headerTitle: 'Walker Smith',
  description:
    'Professional Resume Site - 10 years specializing in front end architecture and distributed systems serving 2 billion customers.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://walkersmith.me',
  siteLogo: `${process.env.NEXT_PUBLIC_SITE_URL || '/'}logo.png`,
  socialBanner: `${process.env.NEXT_PUBLIC_SITE_URL || '/'}twitter-card.png`,
  github: 'https://github.com/walkerrandolphsmith',
  linkedin: 'https://www.linkedin.com/in/walkerrandolphsmith',
  medium: 'https://medium.com',
  locale: 'en-US',
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/search.json`,
    },
  },
}

export default sitedata
