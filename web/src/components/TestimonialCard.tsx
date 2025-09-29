import CallToAction from './CallToAction'
import TestimonialAvatar from './TestimonialAvatar'

const TestimonialCard = ({
  offset = false,
  image = null,
  children = null,
  name = '',
  level = '',
  company = '',
  url = '',
}) => (
  <div
    className={`break-inside-avoid mb-12 pb-4 group flex flex-col-reverse relative rounded-[8px] bg-white dark:bg-[rgba(39,39,42,0.9)] shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden ${offset ? 'mt-12 small:mt-24 md:mt-32' : ''}`}
  >
    <div
      className="bg-white dark:bg-[rgba(39,39,42,1)] w-full text-zinc-950 absolute bottom-0 left-0 z-1 p-0 px-8 py-8 
  translate-y-full opacity-0
group-hover:translate-y-0 group-focus-within:translate-y-0
group-hover:opacity-100 group-focus-within:opacity-100
  transition-all duration-300 ease-in-out
  will-change-[transform,opacity]"
    >
      <CallToAction
        title="View profile"
        href={url}
        dataTestId="view-profile"
        includeArrow
        excludeLeftPadding
        color="text-[#7a6ded]"
        darkColor="text-[#7a6ded]"
      />
    </div>
    <div className="relative overflow-hidden rounded-[4px] pt-8 p-4 sm:p-8 text-zinc-700 dark:text-gray-400 ">
      {children}
    </div>
    <div className="h-[130px] sm:h-[120px] grid sm:gap-2 pt-8 py-4 sm:py-8 px-2 sm:px-8">
      <div className="flex justify-between w-full items-start flex-row-reverse gap-x-2 sm:gap-x-4">
        <section className="flex-1">
          <span className="inline-flex items-center justify-start gap-3 border border-[#f6f9fc] dark:border-gray-600 bg-[#f6f9fc] dark:bg-[rgba(39,39,42,0.9)] px-4 py-2.5 pr-4 rounded-sm text-[12px] font-semibold leading-[1.25] dark:text-gray-400">
            <span>{company}</span>
          </span>

          <header className="text-2xl relative text-zinc-950 dark:text-white tracking-[-0.05em] grid-cols-1 max-w-[400px]">
            {name}
          </header>
          <div className="text-xl dark:text-gray-400">{level}</div>
        </section>
        <div className="w-24 h-24 min-h-24 min-w-24 max-h-24 max-w-24 rounded-full bg-[#f6f9fc] dark:bg-[oklch(21%_.006_285.885)]">
          <TestimonialAvatar src={image} alt={`Image of ${name}`} />
        </div>
      </div>
    </div>
  </div>
)

export default TestimonialCard
