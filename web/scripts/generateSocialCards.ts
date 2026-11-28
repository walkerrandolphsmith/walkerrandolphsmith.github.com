import { mkdir, readFile, writeFile } from 'fs/promises'
import { ImageResponse } from 'next/og.js'
import { dirname, join, resolve } from 'path'
import { createElement as h, type ReactNode } from 'react'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import siteMetadata from '../src/data/sitemetadata.ts'
import { tagLabel } from '../src/lib/discovery.ts'

/**
 * Writes one Open Graph image per post to out/social/<slug>.png. Each card
 * shows the post title, the author, the first three tags, and the reading
 * time. It runs after `next build`, so it reads the search index that
 * contentlayer wrote for the same build, and the images skip the service
 * worker precache and the public-folder image optimizer.
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const webDir = resolve(__dirname, '..')
const outputDir = join(webDir, 'out', 'social')

const SOCIAL_CARD_SIZE = { width: 1200, height: 630 }

type IndexedPost = {
  slug: string
  title: string
  tags?: string[]
  readingTime?: { minutes?: number }
}

const font = async (weight: 400 | 700) => {
  const file = await readFile(join(__dirname, 'fonts', `Roboto-${weight}.ttf`))
  return file.buffer.slice(
    file.byteOffset,
    file.byteOffset + file.byteLength,
  ) as ArrayBuffer
}

// A stable number per post, so each card gets its own tile pattern and a
// rebuild draws the same card.
const hash = (text: string) =>
  text
    .split('')
    .reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7)

const tiles = (seed: number) => {
  const cells: ReactNode[] = []
  let state = seed || 1
  const next = () => {
    state = (state * 1103515245 + 12345) >>> 0
    return state / 2 ** 32
  }
  for (let row = 0; row < 9; row += 1) {
    for (let column = 0; column < 17; column += 1) {
      const roll = next()
      const background =
        roll > 0.94
          ? 'rgba(124, 58, 237, 0.85)'
          : roll > 0.8
            ? 'rgba(91, 33, 182, 0.55)'
            : 'rgba(76, 29, 149, 0.28)'
      cells.push(
        h('div', {
          key: `${row}-${column}`,
          style: {
            position: 'absolute',
            left: column * 72 - 12,
            top: row * 72 - 20,
            width: 64,
            height: 64,
            borderRadius: 10,
            background,
          },
        }),
      )
    }
  }
  return cells
}

const titleSize = (title: string) =>
  title.length > 90 ? 50 : title.length > 60 ? 58 : 66

const card = (post: IndexedPost, avatar: string) => {
  const minutes = Math.max(1, Math.round(post.readingTime?.minutes ?? 0))
  const host = new URL(siteMetadata.siteUrl).host
  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0d0a2b',
        fontFamily: 'Roboto',
        color: 'white',
      },
    },
    h(
      'div',
      {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
        },
      },
      ...tiles(hash(post.slug)),
    ),
    h('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundImage:
          'linear-gradient(100deg, rgba(13,10,43,0.97) 0%, rgba(13,10,43,0.9) 55%, rgba(13,10,43,0.4) 100%)',
      },
    }),
    h(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '64px 72px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: 26,
            color: '#c4b5fd',
            letterSpacing: 0.5,
          },
        },
        host,
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 28 } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              fontSize: titleSize(post.title),
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              maxWidth: 1010,
            },
          },
          post.title,
        ),
        h(
          'div',
          { style: { display: 'flex', gap: 14 } },
          ...(post.tags ?? []).slice(0, 3).map(tag =>
            h(
              'div',
              {
                key: tag,
                style: {
                  display: 'flex',
                  fontSize: 24,
                  padding: '8px 20px',
                  borderRadius: 999,
                  background: 'rgba(167, 139, 250, 0.28)',
                  color: '#ede9fe',
                },
              },
              tagLabel(tag),
            ),
          ),
        ),
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 20 } },
          h('img', {
            src: avatar,
            width: 72,
            height: 72,
            style: { borderRadius: 999, border: '3px solid #8b5cf6' },
          }),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
            h(
              'div',
              { style: { display: 'flex', fontSize: 28, fontWeight: 700 } },
              siteMetadata.author,
            ),
            h(
              'div',
              { style: { display: 'flex', fontSize: 22, color: '#c4b5fd' } },
              siteMetadata.jobTitle,
            ),
          ),
        ),
        h(
          'div',
          { style: { display: 'flex', fontSize: 24, color: '#c4b5fd' } },
          `${minutes} min read`,
        ),
      ),
    ),
  )
}

const run = async () => {
  const posts: IndexedPost[] = JSON.parse(
    await readFile(join(webDir, 'public', 'search.json'), 'utf8'),
  )
  const avatarPng = await sharp(join(webDir, 'public', 'headshot.webp'))
    .resize(144, 144)
    .png()
    .toBuffer()
  const avatar = `data:image/png;base64,${avatarPng.toString('base64')}`
  const fonts = [
    { name: 'Roboto', data: await font(400), weight: 400 as const },
    { name: 'Roboto', data: await font(700), weight: 700 as const },
  ]

  await mkdir(outputDir, { recursive: true })
  for (const post of posts) {
    const image = new ImageResponse(card(post, avatar), {
      ...SOCIAL_CARD_SIZE,
      fonts,
    })
    await writeFile(
      join(outputDir, `${post.slug}.png`),
      new Uint8Array(await image.arrayBuffer()),
    )
  }
  return posts.length
}

run()
  .then(count => console.log(`✓ ${count} social cards generated`))
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error('❌ Error generating social cards:', error)
    process.exit(1)
  })
