import BlurredBackgroundFilter from './BlurredBackgroundFilter'
import CallToAction from './CallToAction'
import Code from './Code'

const Hero = () => (
  <>
    <section className="hero relative mb-0 mt-12 lg:mb-40 lg:mt-32 max-w-screen-xl">
      <>
        <div className="relative text-center flex flex-col items-center lg:flex-row lg:items-center justify-around lg:justify-start overflow-hidden">
          <div className="flex items-center 2xl:justify-center flex-col px-0 lg:pt-8">
            <p className="dark:text-gray-300 text-2xl md:text-3xl font-medium text-zinc-700 tracking-[-0.02em] mt-24 text-center">
              Walker Smith
            </p>
            <h1
              style={{
                maxWidth: '760px',
              }}
              className="dark:text-white text-4xl md:text-5xl leading-[1.1] font-semibold text-zinc-950 tracking-[-0.05em] mt-4 mb-2 m:mb-4 text-center"
            >
              Staff Engineer, Developer Experience and Platform
            </h1>
            <p
              style={{ maxWidth: '700px' }}
              className="text-xl sm:text-2xl text-zinc-900 dark:text-gray-400 tracking-normal mb-4 m:mb-8 mt-8 lg:mb-12 text-center px-4"
            >
              I architect large platforms and make them fast and safe for
              engineering teams to change. My work serves 2B+ users at Microsoft
              and 53% of the Fortune 100 at Digital.ai. At Blue Line Solutions,
              it powers nationally deployed public safety programs for law
              enforcement.
            </p>
            <span className="mt-2 mb-16 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-2">
              <span>
                <CallToAction
                  title="See platform results"
                  href="#platform-work"
                  primary
                  dataTestId="hero-primary-cta"
                  color="text-zinc-600"
                  darkColor="text-white"
                />
              </span>
              <span className="">
                <CallToAction
                  title="Read recommendations"
                  href="#recommendations"
                  dataTestId="hero-secondary-cta"
                  includeArrow
                  color="text-zinc-600"
                  darkColor="text-white"
                />
              </span>
            </span>
          </div>
          <div className="hidden sm:block w-full max-w-[560px] px-4 lg:px-0 lg:ml-16 mb-12 lg:mb-0 text-left">
            <Code />
          </div>
        </div>
      </>
    </section>
    <BlurredBackgroundFilter />
  </>
)

export default Hero
