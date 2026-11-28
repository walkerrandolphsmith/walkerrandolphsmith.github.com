'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LiaFileDownloadSolid } from 'react-icons/lia'

import {
  externalNavLinks,
  inlineNavLinkClassName,
  navBarBackgroundClassName,
  navBarClassName,
  primaryNavLinks,
} from './navLinks'
import PaletteTrigger from './palette/PaletteTrigger'
import ThemeToggle from './ThemeToggle'

const keys: Record<number, boolean | undefined> = {
  37: true,
  39: true,
}

function preventDefault(e: Event) {
  e.preventDefault()
}

function preventDefaultForScrollKeys(event: KeyboardEvent) {
  if (keys[event.keyCode]) {
    preventDefault(event)
    return false
  }
}

function disableScroll() {
  document.body.addEventListener('DOMMouseScroll', preventDefault, false)
  document.body.addEventListener(
    'onwheel' in document ? 'wheel' : 'mousewheel',
    preventDefault,
    { passive: false },
  )
  document.body.addEventListener('touchmove', preventDefault, {
    passive: false,
  })
  document.body.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

function enableScroll() {
  document.body.removeEventListener('DOMMouseScroll', preventDefault, false)
  document.body.removeEventListener(
    'onwheel' in document ? 'wheel' : 'mousewheel',
    preventDefault,
    false,
  )
  document.body.removeEventListener('touchmove', preventDefault, false)
  document.body.removeEventListener(
    'keydown',
    preventDefaultForScrollKeys,
    false,
  )
}

const overlayItemClassName =
  'flex items-center w-full justify-center h-full min-h-full rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-600 py-3 px-4 dark:text-white'

const NavInteractive = ({ isResumePage = false }) => {
  const [open, setOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setOpen(value => !value)
  }
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const scrollControlFunction = open ? disableScroll : enableScroll
    scrollControlFunction()
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    let currentIndex = -1

    const handleKeyDown = (e: KeyboardEvent) => {
      const refs = navItemRefs.current
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        currentIndex = (currentIndex + 1) % refs.length
        refs[currentIndex]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        currentIndex = (currentIndex - 1 + refs.length) % refs.length
        refs[currentIndex]?.focus()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const menuRef = useRef<HTMLDivElement>(null)
  const navItemRefs = useRef<HTMLElement[]>([])

  const handleFocusFirst = () => {
    const focusableEls = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const lastEl = focusableEls?.[focusableEls.length - 1] as HTMLElement
    lastEl?.focus()
  }

  const handleFocusLast = () => {
    if (navItemRefs.current && navItemRefs.current[0]) {
      navItemRefs.current[0].focus()
    }
  }

  return (
    <div
      className={`${navBarClassName} ${open ? 'bg-white dark:bg-[oklch(21%_0.006_285.885)]' : navBarBackgroundClassName}`}
    >
      <div className={`Section__layoutContainer ${open ? 'h-100vh' : ''}`}>
        <span tabIndex={open ? 0 : -1} onFocus={handleFocusFirst} />
        <nav
          className="h-20 flex items-center justify-between px-8"
          aria-label="Primary"
        >
          <div className="flex items-center gap-x-6 text-black dark:text-white">
            <Link
              href="/"
              className="font-medium"
              tabIndex={open ? -1 : 0}
              aria-hidden={open}
            >
              Walker Smith
            </Link>
            {primaryNavLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={inlineNavLinkClassName}
                tabIndex={open ? -1 : 0}
                aria-hidden={open}
              >
                {link.label}
              </Link>
            ))}
            {isResumePage && (
              <a
                href="/Walker_Smith_Resume.pdf"
                download
                title="Download resume"
                className={`group w-12 h-12 min-w-12 min-h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[oklch(27.4%_.006_286.033)] rounded-sm cursor-pointer`}
                data-test="download-resume"
              >
                <LiaFileDownloadSolid />
              </a>
            )}
            <ThemeToggle tabIndex={open ? -1 : 0} ariaHidden={open} />
          </div>
          <div className="flex items-center gap-x-2">
            <PaletteTrigger tabIndex={open ? -1 : 0} ariaHidden={open} />
            <button
              onClick={handleClick}
              aria-expanded={open}
              aria-controls="overlay-nav"
              aria-label="Toggle menu"
              ref={el => {
                if (el) navItemRefs.current[0] = el
              }}
              className="lg:hidden w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 cursor-pointer flex items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`${
                  open
                    ? 'bg-transparent before:rotate-45 before:translate-x-0 before:translate-y-[10px] after:-rotate-45 after:translate-x-0 after:translate-y-[-10px] '
                    : 'bg-zinc-900 dark:bg-slate-100 '
                } cursor-pointer flex transform-gpu before:transform-gpu before:content-[''] after:content-[''] h-[2px] before:h-[2px] after:h-[2px] w-8 before:w-8 after:w-8 before:visible before:top-[-10px] after:top-[10px] relative before:bg-zinc-900 after:bg-zinc-900 dark:before:bg-slate-100 dark:after:bg-slate-100 before:absolute after:absolute text-zinc-900 dark:text-white rounded-sm before:rounded-sm after:rounded-sm transition-transform before:transition-transform after:transition-transform duration-300 ease-in-out before:duration-300 before:ease-in-out after:duration-300 after:ease-in-out`}
              ></span>
            </button>
          </div>
        </nav>

        <nav
          id="overlay-nav"
          aria-label={open ? 'Close main menu' : 'Open main menu'}
          className={`h-20 fixed left-0 w-[100vw] top-[80px] h-[100vh] bg-white dark:bg-[oklch(21%_0.006_285.885)] flex items-start justify-between transition-opacity duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          ref={menuRef}
        >
          <ul className="flex-col items-center flex w-full" role="menu">
            {[{ href: '/', label: 'Home' }, ...primaryNavLinks].map(
              (link, index) => (
                <li key={link.href} className="h-16 w-full" role="none">
                  <Link
                    role="menuitem"
                    href={link.href}
                    className={overlayItemClassName}
                    tabIndex={open ? 0 : -1}
                    onClick={closeMenu}
                    ref={el => {
                      if (el) navItemRefs.current[index + 1] = el
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
            {externalNavLinks.map((link, index) => (
              <li key={link.href} className="h-16 w-full" role="none">
                <Link
                  role="menuitem"
                  href={link.href}
                  className={overlayItemClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  ref={el => {
                    if (el)
                      navItemRefs.current[primaryNavLinks.length + 2 + index] =
                        el
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="h-16 w-full flex justify-center mt-12" role="none">
              <a
                href="/Walker_Smith_Resume.pdf"
                download
                role="menuitem"
                className={`group inline-block w-[fit-content] h-[fit-content] min-w-max justify-start m-0 text-blue-1000 border-blue-900 dark:border-violet-500 dark:text-white px-3 items-center cta font-medium text-base transition-opacity transition-colors border hover:opacity-70 rounded-2xl`}
                data-test="download-resume"
                tabIndex={open ? 0 : -1}
                onClick={closeMenu}
                ref={el => {
                  if (el)
                    navItemRefs.current[
                      primaryNavLinks.length + externalNavLinks.length + 2
                    ] = el
                }}
              >
                Download Resume
              </a>
            </li>
          </ul>
        </nav>
        <span tabIndex={open ? 0 : -1} onFocus={handleFocusLast} />
      </div>
    </div>
  )
}

export default NavInteractive
