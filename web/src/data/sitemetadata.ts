const sitedata = {
  title: 'Walker Smith',
  author: 'Walker Smith',
  jobTitle: 'Staff Engineer, Developer Experience and Platform',
  headerTitle: 'Walker Smith',
  description:
    'Staff Engineer for developer experience and platform. I make large platforms fast and safe for teams to change.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://walkersmith.me',
  // Relative to metadataBase in src/app/layout.tsx.
  siteLogo: '/logo.png',
  socialBanner: '/twitter-card.png',
  resumePdf: '/Walker_Smith_Resume.pdf',
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
