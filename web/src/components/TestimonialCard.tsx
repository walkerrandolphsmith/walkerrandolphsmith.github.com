import Link from 'next/link'

import TestimonialAvatar from './TestimonialAvatar'

const testimonialAnchor = (name: string) =>
  `recommendation-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`

type TestimonialCardProps = {
  // Accepted for compatibility with the testimonial components. Cards sit in
  // a row-ordered grid, so a vertical offset no longer applies.
  offset?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  children?: React.ReactNode
  name?: string
  level?: string
  company?: string
  url?: string
}

const TestimonialCard = ({
  image = null,
  children = null,
  name = '',
  level = '',
  company = '',
  url = '',
}: TestimonialCardProps) => (
  <article
    id={testimonialAnchor(name)}
    className="scroll-mt-24 flex flex-col relative rounded-[8px] bg-white dark:bg-[rgba(39,39,42,0.9)] shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden"
  >
    <header className="grid pt-8 pb-4 px-4 sm:px-8">
      <div className="flex w-full items-start gap-x-4">
        <div className="w-24 h-24 min-h-24 min-w-24 max-h-24 max-w-24 rounded-full bg-[#f6f9fc] dark:bg-[oklch(21%_.006_285.885)]">
          <TestimonialAvatar src={image} alt={`Image of ${name}`} />
        </div>
        <section className="flex-1 min-w-0 flex flex-col items-start gap-y-1">
          <p className="text-2xl font-medium leading-tight text-zinc-950 dark:text-white tracking-[-0.05em]">
            {level} · {company}
          </p>
          <div className="text-lg text-zinc-700 dark:text-gray-300">{name}</div>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            data-test="view-profile"
            className="text-base font-medium text-[#7a6ded] hover:opacity-70 transition-opacity"
          >
            LinkedIn ↗
          </Link>
        </section>
      </div>
    </header>
    <div className="relative overflow-hidden rounded-[4px] pt-4 p-4 sm:p-8 sm:pt-4 text-zinc-700 dark:text-gray-400">
      {children}
    </div>
  </article>
)

export default TestimonialCard
