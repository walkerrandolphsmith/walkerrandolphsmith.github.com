import Head from 'next/head'
import ExportedImage from 'next-image-export-optimizer'

import BlurredBackgroundFilter from '@/components/BlurredBackgroundFilter'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'

import OfflineImage from '../../../public/offline.webp'
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
                className="text-6xl md:text-7xl font-semibold text-zinc-950 tracking-[-0.05em] mt-24 mb-2 m:mb-4 text-center dark:text-white"
              >
                You&apos;re Offline — But I&apos;m Still Here
              </p>
              <p
                style={{ maxWidth: '700px' }}
                className="text-2xl text-zinc-900 tracking-normal mb-4 m:mb-8 mt-8 lg:mb-12 text-center px-2"
              >
                <span className="dark:text-gray-400">
                  It looks like your device lost connection. This site works
                  best with internet access. When you&apos;re back online,
                  everything will sync right up.
                </span>
              </p>
            </div>
            <div className="lg:ml-32">
              <ExportedImage
                src={OfflineImage}
                alt="User offline illustration"
                loading="eager"
              />
            </div>
          </div>
        </>
      </section>
      <BlurredBackgroundFilter />
    </GuidedSection>
    <GuidedSection
      as="footer"
      guideSolidColor="transparent"
      guideDashedColor="transparent"
      noPadding
    >
      <Footer />
    </GuidedSection>
  </>
)

export default NotFound
