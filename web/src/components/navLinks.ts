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

export const navBarClassName =
  'flex justify-center z-20 w-full h-20 fixed top-0 transition duration-300 ease-in-out print:hidden'

// A frosted, near-opaque bar with a bottom border keeps the nav text readable
// over every section, including the dark blue bands.
export const navBarBackgroundClassName =
  'bg-white/90 dark:bg-[oklch(21%_0.006_285.885)]/90 backdrop-blur-md border-b border-zinc-200 dark:border-white/10'
