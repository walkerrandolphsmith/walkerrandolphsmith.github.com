import Head from 'next/head'
import ExportedImage from 'next-image-export-optimizer'

import CallToAction from '@/components/CallToAction'

import NotFoundImage from '../../public/404.webp'
import BlurredBackgroundFilter from './BlurredBackgroundFilter'
import Footer from './Footer'
import GuidedSection from './GuidedSection'
import Nav from './Nav'

const NotFound = () => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <Nav />
    <GuidedSection allowOverflow>
      <section className="hero relative mb-48 mt-12 lg:mb-96 lg:mt-32 max-w-screen-xl">
        <>
          <div className="relative text-center flex flex-col items-center lg:flex-row lg:items-end justify-around lg:justify-start overflow-hidden">
            <div className="flex items-center 2xl:justify-center flex-col px-0 lg:pt-8">
              <p
                style={{
                  lineHeight: '85px',
                  maxWidth: '700px',
                }}
                className="text-6xl md:text-7xl font-semibold text-zinc-950 tracking-[-0.05em] mt-24 mb-2 m:mb-4 text-center"
              >
                <span className="text-purple-950 dark:text-white">404</span>{' '}
                <span className="dark:text-white">Page Not Found</span>
              </p>
              <p
                style={{ maxWidth: '700px' }}
                className="text-2xl text-zinc-900 dark:text-gray-400 tracking-normal mb-4 m:mb-8 mt-8 lg:mb-12 text-center px-2"
              >
                <span>
                  The page you&apos;re looking for could not be found.
                </span>
              </p>
              <span className="mt-2 mb-16 flex flex-col md:flex-row items-center lg:justify-start">
                <CallToAction
                  title="Return to the front page"
                  href="/"
                  primary
                  dataTestId="hero-primary-cta"
                  includeArrow
                  color="text-zinc-600"
                  darkColor="text-white"
                />
              </span>
            </div>
            <div className="lg:ml-32 opactiy-[20]">
              <ExportedImage
                src={NotFoundImage}
                alt="Page Not Found Illustration"
                loading="lazy"
                placeholder="blur"
              />
            </div>
          </div>
        </>
      </section>
      <BlurredBackgroundFilter />
    </GuidedSection>
    <GuidedSection as="footer" noPadding>
      <Footer />
    </GuidedSection>
  </>
)

export default NotFound
