import './globals.css'

import localFont from 'next/font/local'

import PaletteRoot from '@/components/palette/PaletteRoot'
import ResetScrollPosition from '@/components/ResetScrollPosition'
import WebMCPTools from '@/components/WebMCPTools'
import sitemetadata from '@/data/sitemetadata'
import { getSocialInfo } from '@/lib/siteContent'

// Roboto is self-hosted. Google Fonts served Vercel's build a font URL with no
// file extension, which crashed next/font/google. The file is Google's Latin
// subset of the Roboto variable font, so it covers weights 300 to 700.
const roboto = localFont({
  src: './fonts/roboto-latin-variable.woff2',
  weight: '300 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-roboto',
})

const homeTitle =
  'Walker Smith | Staff Engineer, Developer Experience and Platform'

export const viewport = {
  themeColor: '#ffffff',
}

// Relative URLs in page metadata (Open Graph images, canonical links)
// resolve against the production origin, so every environment advertises
// the production URLs.
export const metadata = {
  metadataBase: new URL(sitemetadata.siteUrl),
  manifest: '/manifest.webmanifest',
  title: {
    default: homeTitle,
    template: `%s | ${sitemetadata.title}`,
  },
  description: sitemetadata.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: homeTitle,
    description: sitemetadata.description,
    url: '/',
    siteName: sitemetadata.title,
    images: [sitemetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: homeTitle,
    card: 'summary_large_image',
    images: [sitemetadata.socialBanner],
  },
  icons: {
    icon: '/favicons/favicon-32x32.png',
    apple: [
      {
        url: '/favicons/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-touch-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
    ],
    other: [
      {
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${sitemetadata.title}: Writing`}
          href="/feed.xml"
        />
      </head>
      <body className="font-roboto">
        {children}
        <ResetScrollPosition />
        <WebMCPTools />
        <PaletteRoot social={getSocialInfo()} />
      </body>
    </html>
  )
}
