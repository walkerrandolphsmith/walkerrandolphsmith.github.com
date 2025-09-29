import Link from 'next/link'
import ExportedImage from 'next-image-export-optimizer'

import { companyById } from '@/constants'

import SectionHeader from './SectionHeader'

const Company = ({ title, name, description, isActive, logo, card, link }) => (
  <>
    <li className="relative border-l pl-8 border-l-transparent border-l-2 pl-4 pr-2">
      <div
        className={`mt-4 w-4 h-4 -left-[9px] border-2 absolute top-0 flex items-center justify-center rounded-full border ${isActive ? 'border-[#0a2540] bg-[#0a2540] dark:border-white dark:bg-white' : 'border-gray-300 bg-gray-300  dark:border-gray-600 dark:bg-gray-600 '}`}
        aria-hidden="true"
      ></div>
      <div className="flex flex-row gap-x-2">
        <ExportedImage
          src={logo.src}
          alt={logo.alt}
          width={50}
          height={50}
          placeholder="blur"
        />
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
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center w-full max-h-[150px] min-h-[150px] lg:max-h-[214px] lg:min-h-[214px] hidden md:flex overflow-hidden relative rounded-md shadow transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      >
        <ExportedImage
          src={card}
          alt="Career Figure"
          fill
          className="w-full transition-scale duration-300 hover:scale-105 object-cover"
          sizes="300px 300px, 400px 400px"
          priority={false}
          placeholder="blur"
        />
      </Link>
    </li>
  </>
)

const Experience = () => (
  <div className="grid gap-y-8">
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
  </div>
)

export default Experience
