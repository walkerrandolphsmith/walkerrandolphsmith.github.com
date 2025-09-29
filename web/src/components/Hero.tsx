import BlurredBackgroundFilter from './BlurredBackgroundFilter'
import CallToAction from './CallToAction'
import DataSourceIllustration from './DataSourceIllustration'

const Hero = () => (
  <>
    <section className="hero relative mb-0 mt-12 lg:mb-40 lg:mt-32 max-w-screen-xl">
      <>
        <div className="relative text-center flex flex-col items-center lg:flex-row lg:items-end justify-around lg:justify-start overflow-hidden">
          <div className="flex items-center 2xl:justify-center flex-col px-0 lg:pt-8">
            <h1
              style={{
                lineHeight: '85px',
                maxWidth: '700px',
              }}
              className="dark:text-white text-6xl md:text-7xl font-semibold text-zinc-950 tracking-[-0.05em] mt-24 mb-2 m:mb-4 text-center"
            >
              Walker Smith | Engineering Leader
            </h1>
            <p
              style={{ maxWidth: '700px' }}
              className="text-2xl text-zinc-900 dark:text-gray-400 tracking-normal mb-4 m:mb-8 mt-8 lg:mb-12 text-center px-2 hidden sm:block"
            >
              10 years specializing in front end architecture and distributed
              systems serving 2 billion customers.
            </p>
            <span className="mt-2 mb-16 flex flex-row items-center lg:justify-start gap-x-2">
              <span>
                <CallToAction
                  title="View resume"
                  href="/resume"
                  primary
                  dataTestId="hero-primary-cta"
                  color="text-zinc-600"
                  darkColor="text-white"
                />
              </span>
              <span className="">
                <CallToAction
                  title="Read blog"
                  href="/blog"
                  dataTestId="hero-secondary-cta"
                  includeArrow
                  color="text-zinc-600"
                  darkColor="text-white"
                />
              </span>
            </span>
          </div>
          <div className="lg:ml-32">{<DataSourceIllustration />}</div>
        </div>
      </>
    </section>
    <BlurredBackgroundFilter />
  </>
)

export default Hero
