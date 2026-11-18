import Link from 'next/link'
import ExportedImage from 'next-image-export-optimizer'

import { companyById } from '@/constants'
import { education } from '@/data/resume'

import SectionHeader from './SectionHeader'

const cardTileClassName =
  'flex justify-center w-full max-h-[150px] min-h-[150px] lg:max-h-[214px] lg:min-h-[214px] hidden md:flex overflow-hidden relative rounded-md shadow'

const Company = ({ title, name, description, isActive, logo, card, link }) => (
  <>
    <li className="relative border-l pl-8 border-l-transparent border-l-2 pl-4 pr-2">
      <div
        className={`mt-4 w-4 h-4 -left-[9px] border-2 absolute top-0 flex items-center justify-center rounded-full border ${isActive ? 'border-[#0a2540] bg-[#0a2540] dark:border-white dark:bg-white' : 'border-gray-300 bg-gray-300  dark:border-gray-600 dark:bg-gray-600 '}`}
        aria-hidden="true"
      ></div>
      <div className="flex flex-row gap-x-2">
        {logo ? (
          <ExportedImage
            src={logo.src}
            alt={logo.alt}
            width={50}
            height={50}
            placeholder="blur"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-[50px] h-[50px] min-w-[50px] rounded-md bg-[#0a2540] dark:bg-white text-white dark:text-[#0a2540] flex items-center justify-center font-semibold"
          >
            {name
              .split(' ')
              .map(word => word[0])
              .join('')
              .slice(0, 2)}
          </div>
        )}
        <div>
          <div className="text-2xl mb-1 font-semibold leading-none bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColorDark)_75%,_transparent_100%)] dark:text-white">
            {name}
          </div>
          <div className="bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColorDark)_75%,_transparent_100%)] dark:text-gray-200">
            {title}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-2 bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColorDark)_75%,_transparent_100%)] dark:text-gray-400">
        {description}
      </p>
    </li>
    <li className="flex justify-center w-full px-12">
      {card ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardTileClassName} cursor-pointer transition-shadow duration-300 hover:shadow-lg`}
        >
          <ExportedImage
            src={card}
            alt={`${name} career highlight`}
            fill
            className="w-full transition-scale duration-300 hover:scale-105 object-cover"
            sizes="300px 300px, 400px 400px"
            priority={false}
            placeholder="blur"
          />
        </Link>
      ) : (
        <div
          aria-hidden="true"
          className={`${cardTileClassName} items-center bg-[#0a2540] text-white text-3xl font-semibold tracking-[-0.05em]`}
        >
          {name}
        </div>
      )}
    </li>
  </>
)

const Experience = () => (
  <div id="experience" className="grid gap-y-8 scroll-mt-24">
    <header className="px-8 grid">
      <SectionHeader title="Experience" byline="" isLight />
    </header>
    <ul className="grid grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)] gap-y-8">
      {Object.values(companyById).map((company, index) => (
        <Company
          key={index}
          isActive={index === 0}
          title={company.title}
          name={company.name}
          description={company.description}
          logo={company.logo}
          card={company.card}
          link={company.link}
        />
      ))}
    </ul>
    <section className="px-8 grid gap-y-2 text-zinc-700 dark:text-gray-400">
      <h3 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-[-0.05em]">
        Education
      </h3>
      {education.degrees.map(degree => (
        <p key={degree.degree}>
          {degree.degree}, {degree.school}, {degree.year}.
          {degree.note && ` ${degree.note}.`}
        </p>
      ))}
      <p>
        Paper:{' '}
        <a
          href={education.publication.href}
          target="_blank"
          rel="noopener noreferrer"
          data-test="browse-publications"
          className="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white"
        >
          {education.publication.title}
        </a>
        , {education.publication.venue}, {education.publication.date}.
      </p>
    </section>
  </div>
)

export default Experience
