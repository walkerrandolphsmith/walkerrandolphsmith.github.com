type SectionHeaderProps = {
  title: string
  byline?: string
  isLight?: boolean
  maxWidth?: string
}

const SectionHeader = ({
  title,
  byline,
  isLight = false,
  maxWidth = 'max-w-full md:max-w-[74%]',
}: SectionHeaderProps) => (
  <>
    <h2
      className={`${isLight ? 'text-zinc-950 dark:text-white' : 'text-white'} w-fit ${maxWidth} text-[36px] leading-[44px] font-medium font-[var(--font-roboto)] sm:text-[48px] sm:leading-[56px] relative tracking-[-0.05em] bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColorDark)_75%,_transparent_100%)] pointer-events-none pb-4`}
    >
      {title}
    </h2>
    {byline && (
      <p
        className={`${isLight ? 'text-[rgb(66, 84, 102)] dark:text-gray-400' : 'text-[#adbdcc]'} max-w-[600px] text-[18px] font-normal leading-[1.555556] tracking-[0.2px] bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColorDark)_75%,_transparent_100%)] pointer-events-none`}
      >
        {byline}
      </p>
    )}
  </>
)

export default SectionHeader
