import { CiDark } from 'react-icons/ci'
import { LiaFileDownloadSolid } from 'react-icons/lia'

const NavSkeleton = ({ isResumePage = false }) => (
  <div
    className={`flex justify-center z-20 w-full h-20 bg-transparent fixed top-0 transition duration-300 ease-in-out print:hidden`}
  >
    <div className={`Section__layoutContainer`}>
      <span tabIndex={-1} />
      <nav
        className="h-20 flex items-center justify-between px-8"
        aria-label="Primary"
      >
        <div className="flex items-center gap-x-8">
          <a href="/" tabIndex={0}>
            Home
          </a>
          {isResumePage ? (
            <a
              href="/Walker_Smith_Resume.pdf"
              download
              className={`group w-12 h-12 min-w-12 min-h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[oklch(27.4%_.006_286.033)] rounded-sm cursor-pointer`}
              data-test="download-resume"
            >
              <LiaFileDownloadSolid />
            </a>
          ) : (
            <a href="/resume">Resume</a>
          )}
          <button
            tabIndex={0}
            type="button"
            title="toggle dark theme"
            className="w-12 h-12 min-w-12 min-h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[oklch(27.4%_.006_286.033)] rounded-sm cursor-pointer"
          >
            <CiDark />
          </button>
        </div>
        <button
          aria-expanded={false}
          aria-controls="overlay-nav"
          aria-label="Toggle menu"
          className="h-[36px] cursor-pointer"
        >
          <span
            aria-hidden="true"
            className={`${'bg-zinc-900 '}height-[36px] cursor-pointer flex transform-gpu before:transform-gpu before:content-[''] after:content-[''] h-1 before:h-1 after:h-1 w-9 before:w-9 after:w-9 before:visible before:top-[-10px] after:top-2.5 relative before:bg-zinc-900 after:bg-zinc-900 before:absolute after:absolute text-zinc-900 rounded-sm before:rounded-sm after:rounded-sm transition-transform before:transition-transform after:transition-transform duration-300 ease-in-out before:duration-300 before:ease-in-out after:duration-300 after:ease-in-out`}
          ></span>
        </button>
      </nav>
    </div>
  </div>
)

export default NavSkeleton
