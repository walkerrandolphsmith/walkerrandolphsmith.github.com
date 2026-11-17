// Primary navigation follows the homepage reading path. Section links use
// root-relative anchors so that they also work from the blog and resume pages.
export const primaryNavLinks = [
  { href: '/#recommendations', label: 'Recommendations' },
  { href: '/#platform-work', label: 'Platform work' },
  { href: '/blog', label: 'Writing' },
  { href: '/#experience', label: 'Experience' },
  { href: '/resume', label: 'Resume' },
]

export const externalNavLinks = [
  { href: 'https://linkedin.com/in/walkerrandolphsmith', label: 'LinkedIn' },
  { href: 'https://github.com/walkerrandolphsmith', label: 'GitHub' },
]

export const inlineNavLinkClassName =
  'hidden lg:inline text-black dark:text-white hover:opacity-70 transition-opacity'
