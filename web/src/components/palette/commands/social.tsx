import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import {
  LuDownload,
  LuFileText,
  LuLink,
  LuMessageSquare,
  LuQrCode,
  LuUserRound,
} from 'react-icons/lu'

import { filterByLabel } from '@/lib/paletteSearch'

import { downloadFile } from '../download'
import { Badge, DetailGrid } from '../parts'
import type {
  PaletteActions,
  PaletteCommand,
  PaletteItem,
  PaletteLevel,
  SocialInfo,
} from '../types'

/**
 * Social info: a custom view, not a flat list. The right pane arranges who
 * Walker is, his profiles, and the ways to reach him. The left pane holds
 * the same links as keyboard actions. Every link comes from the site
 * metadata that the server passes in.
 */

const profileIcons: Record<string, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
}

const SocialPanel = ({ info }: { info: SocialInfo }) => {
  const linkedin = info.profiles.find(profile => profile.id === 'linkedin')
  return (
    <div className="grid gap-5" data-test="palette-social-panel">
      <header className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={info.avatar}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border-2 border-violet-500 object-cover"
        />
        <div className="grid gap-0.5">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            {info.name}
          </h2>
          <p className="text-[15px] text-zinc-600 dark:text-zinc-400">
            {info.jobTitle}
          </p>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent">{info.currentRole}</Badge>
      </div>
      <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {info.headline}
      </p>
      <section aria-labelledby="palette-social-profiles" className="grid gap-2">
        <h3
          id="palette-social-profiles"
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          Profiles
        </h3>
        <ul className="grid gap-2">
          {info.profiles.map(profile => {
            const Icon = profileIcons[profile.id] ?? LuLink
            return (
              <li key={profile.id}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start gap-3 rounded-lg border border-zinc-200 p-3 hover:border-violet-400 dark:border-white/10 dark:hover:border-violet-400"
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-zinc-700 dark:text-zinc-200"
                  />
                  <span className="grid min-w-0">
                    <span className="font-medium text-zinc-950 dark:text-white">
                      {profile.label}
                    </span>
                    <span className="truncate text-sm text-zinc-600 dark:text-zinc-400">
                      {profile.handle}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>
      <section aria-labelledby="palette-social-reach" className="grid gap-2">
        <h3
          id="palette-social-reach"
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          Ways to reach out
        </h3>
        <DetailGrid
          rows={[
            ...(linkedin
              ? [
                  {
                    label: 'Message',
                    value: (
                      <a
                        href={linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        Send a message on LinkedIn
                      </a>
                    ),
                  },
                ]
              : []),
            {
              label: 'Resume',
              value: (
                <a
                  href={info.resumePdf}
                  download
                  className="underline underline-offset-4"
                >
                  Download the PDF
                </a>
              ),
            },
            {
              label: 'Website',
              value: (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/" className="underline underline-offset-4">
                  {new URL(info.website).host}
                </a>
              ),
            },
          ]}
        />
      </section>
    </div>
  )
}

const socialLevel = (info: SocialInfo): PaletteLevel => ({
  key: 'social',
  chip: 'Social info',
  placeholder: 'Filter links...',
  useContent: query => {
    const profiles: PaletteItem[] = info.profiles.map(profile => ({
      id: `profile-${profile.id}`,
      title: `Open ${profile.label}`,
      description: profile.description,
      icon: profileIcons[profile.id] ?? LuLink,
      meta: profile.handle,
      onSelect: actions => actions.openExternal(profile.url),
    }))
    const linkedin = info.profiles.find(profile => profile.id === 'linkedin')
    const reachOut: PaletteItem[] = [
      ...(linkedin
        ? [
            {
              id: 'message',
              title: 'Send a message',
              description: 'Send Walker a message on LinkedIn',
              icon: LuMessageSquare,
              onSelect: (actions: PaletteActions) =>
                actions.openExternal(linkedin.url),
            },
          ]
        : []),
      {
        id: 'resume-pdf',
        title: 'Download resume',
        description: 'Save the resume as a PDF file',
        icon: LuDownload,
        onSelect: actions => downloadFile(info.resumePdf, actions),
      },
      {
        id: 'resume-page',
        title: 'Read the resume',
        description: 'Open the resume page of this site',
        icon: LuFileText,
        onSelect: actions => actions.navigate(info.resumePage),
      },
      {
        id: 'qr',
        title: 'Share with a QR code',
        description: 'Show a QR code that opens this site',
        icon: LuQrCode,
        onSelect: actions => actions.navigate(info.qrPage),
      },
    ]
    const filter = (items: PaletteItem[]) =>
      filterByLabel(
        items,
        query,
        item => item.title,
        item => [item.description ?? '', item.meta ?? ''],
      )
    return {
      sections: [
        { id: 'profiles', title: 'Profiles', items: filter(profiles) },
        { id: 'reach-out', title: 'Reach out', items: filter(reachOut) },
      ],
      panel: <SocialPanel info={info} />,
      emptyText: 'No link matches. Press Backspace to clear the filter.',
    }
  },
})

export const createSocialCommand = (info: SocialInfo): PaletteCommand => ({
  id: 'social',
  title: 'Social info',
  description: 'Profiles and ways to reach Walker',
  icon: LuUserRound,
  keywords: ['contact', 'linkedin', 'github', 'profile', 'about', 'reach'],
  open: () => socialLevel(info),
})
