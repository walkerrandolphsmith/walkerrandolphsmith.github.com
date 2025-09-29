import './globals.css'

import { Roboto } from 'next/font/google'
import Script from 'next/script'

import ResetScrollPosition from '@/components/ResetScrollPosition'
import sitemetadata from '@/data/sitemetadata'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata = {
  canonical: sitemetadata.siteUrl,
  metadataBase: sitemetadata.metadataBase,
  manifest: './manifest.webmanifest',
  title: 'Walker Smith',
  description:
    'Professional Resume Site - 10 years specializing in front end architecture and distributed systems serving 2 billion customers.',
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
    title: sitemetadata.title,
    description: sitemetadata.description,
    url: './',
    siteName: sitemetadata.title,
    images: [sitemetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  themeColor: '#ffffff',
  twitter: {
    title: sitemetadata.title,
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
      <body className="font-roboto">
        <Script
          defer
          data-domain="walkersmith.me"
          src="https://analytics.walkersmith.me/js/script.js"
          strategy="afterInteractive"
        />
        {children}
        <ResetScrollPosition />
      </body>
    </html>
  )
}
