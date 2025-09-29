import ExportedImage from 'next-image-export-optimizer'

import PortfolioImage from '../../public/project-walkersmith.me.webp'
import ApiDOcsImage from '../../public/projects-apidocs.webp'
import LacesImage from '../../public/projects-laces.webp'
import RetryImage from '../../public/projects-retry-fp.webp'
import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const Projects = ({ includeCallToAction = false }) => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="What I’m Building & Learning"
        byline="Projects, experiments, and code that reflect my journey tackling
        engineering challenges and mentoring teams."
        isLight
      />
      {includeCallToAction && (
        <CallToAction
          href="/recommendations"
          title="Browse all"
          dataTestId="browse-recommendations"
          includeArrow
          excludeLeftPadding
          justify="justify-start"
          color="text-zinc-950"
          darkColor="text-white"
        />
      )}
    </header>
    <section className="grid sm:grid-cols-[repeat(1,1fr)] lg:grid-cols-[repeat(2,1fr)] gap-y-4 sm:gap-y-12 gap-x-4 px-2 pt-12">
      <div className="relative h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md shadow transition-shadow duration-300 hover:shadow-lg focus-within:outline focus-within:outline-2 overflow-hidden focus-within:outline-[oklch(0.656_0.241_354.308)]">
        <a
          href="https://github.com/walkerrandolphsmith/retry-fp"
          target="_blank"
          rel="noopener norefer"
          aria-label="learn more about retry-fp"
          className="flex h-[150px] sm:h-[300px] lg:h-[200px] overflow-hidden relative rounded-md transition-scale duration-300 hover:scale-105"
        >
          <ExportedImage
            src={RetryImage}
            alt="retry-fp library"
            fill
            className="object-cover"
            sizes="200px 200px, 200px 200px"
            loading="lazy"
            placeholder="blur"
          />
        </a>
      </div>
      <div className="relative h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md shadow transition-shadow duration-300 hover:shadow-lg focus-within:outline focus-within:outline-2 overflow-hidden focus-within:outline-[oklch(0.656_0.241_354.308)]">
        <a
          href="https://versionone.github.io/api-docs/"
          target="_blank"
          rel="noopener norefer"
          aria-label="learn more about digital.ai API docs"
          className="flex h-[150px] sm:h-[300px] lg:h-[200px] overflow-hidden relative rounded-md transition-scale duration-300 hover:scale-105"
        >
          <ExportedImage
            src={ApiDOcsImage}
            alt="digital ai api docs"
            fill
            className="object-cover"
            sizes="200px 200px, 200px 200px"
            loading="lazy"
            placeholder="blur"
          />
        </a>
      </div>
      <div className="relative h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md shadow transition-shadow duration-300 hover:shadow-lg overflow-hidden focus-within:outline focus-within:outline-2 focus-within:outline-[oklch(0.656_0.241_354.308)]">
        <a
          href="https://walkerrandolphsmith.github.io/laces"
          target="_blank"
          rel="noopener norefer"
          aria-label="learn more about laces"
          className="flex h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md transition-scale duration-300 hover:scale-105"
        >
          <ExportedImage
            src={LacesImage}
            alt="laces library"
            fill
            className="object-cover"
            sizes="200px 200px, 200px 200px"
            loading="lazy"
            placeholder="blur"
          />
        </a>
      </div>
      <div className="relative h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md shadow transition-shadow duration-300 hover:shadow-lg overflow-hidden">
        <div className="flex h-[150px] sm:h-[300px] lg:h-[200px] relative rounded-md transition-scale duration-300 hover:scale-105">
          <ExportedImage
            src={PortfolioImage}
            alt="resume site"
            fill
            className="object-cover"
            sizes="200px 200px, 200px 200px"
            loading="lazy"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  </div>
)

export default Projects
