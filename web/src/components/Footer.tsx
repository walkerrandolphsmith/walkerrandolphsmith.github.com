import Link from 'next/link'

const Footer = () => (
  <nav className="pt-12 grid md:grid-cols-[2fr_1fr_1fr] gap-y-5">
    <div className="grid gap-y-5 auto-rows-min">
      <div className="py-4 md:py-2 px-4">
        <a
          href="/Walker_Smith_Resume.pdf"
          download
          className={`group inline-block w-[fit-content] h-[fit-content] min-w-max justify-start m-0 text-blue-1000 border-blue-900 dark:border-violet-500 dark:text-white px-3 items-center cta font-medium text-base transition-opacity transition-colors border hover:opacity-70 rounded-2xl`}
          data-test="download-resume"
        >
          Download Resume
        </a>
      </div>
    </div>
    <div className="grid gap-y-5 auto-rows-min">
      <div>
        <div className="py-4 md:py-2 px-4 text-xl font-semibold relative text-zinc-950 dark:text-white tracking-[-0.05em]">
          Contact
        </div>

        <Link
          className="text-zinc-800 hover:text-zinc-400 dark:text-gray-400 dark:hover:text-gray-600 text-[18px] font-normal leading-[1.555556] tracking-[0.2px] transition-colors cursor-pointer py-4 md:py-2 px-4 flex"
          href="https://github.com/walkerrandolphsmith"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>
        <Link
          className="text-zinc-800 hover:text-zinc-400 dark:text-gray-400 dark:hover:text-gray-600 text-[18px] font-normal leading-[1.555556] tracking-[0.2px] transition-colors cursor-pointer py-4 md:py-2 px-4 flex"
          href="https://linkedin.com/in/walkerrandolphsmith"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </Link>
      </div>
    </div>
    <div className="grid gap-y-5 auto-rows-min">
      <div className="grid grid-cols-1 gap-16">
        <div>
          <div className="py-4 md:py-2 px-4 text-xl font-semibold relative text-zinc-950 dark:text-white tracking-[-0.05em]">
            Resources
          </div>
          <Link
            className="text-zinc-800 hover:text-zinc-400 dark:text-gray-400 dark:hover:text-gray-600 text-[18px] font-normal leading-[1.555556] tracking-[0.2px] transition-colors cursor-pointer py-4 md:py-2 px-4 flex"
            href="/resume"
            scroll={true}
          >
            Resume
          </Link>
          <Link
            className="text-zinc-800 hover:text-zinc-400 dark:text-gray-400 dark:hover:text-gray-600 text-[18px] font-normal leading-[1.555556] tracking-[0.2px] transition-colors cursor-pointer py-4 md:py-2 px-4 flex"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-zinc-800 hover:text-zinc-400 dark:text-gray-400 dark:hover:text-gray-600 text-[18px] font-normal leading-[1.555556] tracking-[0.2px] transition-colors cursor-pointer py-4 md:py-2 px-4 flex"
            href="https://discord.com/channels/520327352790548501/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Software Craftsmen Discord
          </Link>
        </div>
        <div className="flex md:justify-end px-4"></div>
      </div>
    </div>
  </nav>
)

export default Footer
