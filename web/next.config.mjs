import { withContentlayer } from 'next-contentlayer2'

import configureBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = configureBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

import withSerwistInit from '@serwist/next'

import crypto from 'crypto'

const revision = process.env.BUILD_ID || crypto.randomUUID()

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  /**
   * @link https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
   */
  output: 'export',
  images: {
    loader: 'custom',
    imageSizes: [10, 16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 100,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: false,
  },
}

export default withSerwist(withContentlayer(withBundleAnalyzer(nextConfig)))
