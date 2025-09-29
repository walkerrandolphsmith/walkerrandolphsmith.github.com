import { existsSync } from 'fs'
import fs from 'fs/promises'
import path, { resolve } from 'path'

const webDir = resolve(__dirname, '..', '..', 'web')
const source = path.join(webDir, 'public', 'logo.png')
const publicDir = path.join(webDir, 'public')
const outputPath = path.join(publicDir, 'favicons')

const maskableIconName = 'maskable_icon_x512.png'

type Icon = {
  src: string
  sizes: string
  type: string
  purpose?: string
}

const configuration = {
  path: '/',
  appName: 'Walker Randolph Smith',
  appShortName: 'Walker Smith',
  appDescription:
    'Professional Resume Site - 10 years specializing in front end architecture and distributed systems serving 2 billion customers.',
  developerName: 'Walker Smith',
  developerURL: 'https://walkerrandolphsmith.com',
  background: '#ffffff',
  theme_color: '#ffffff',
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  lang: 'en-US',
  icons: {
    appleStartup: true,
    android: true,
    appleIcon: true,
    favicons: true,
    windows: false,
    yandex: false,
  },
}

async function run() {
  try {
    if (!existsSync(outputPath)) {
      await fs.mkdir(outputPath)
    }
    const favicons = await import('favicons')
    const response = await favicons.favicons(source, configuration)

    // Write images
    await Promise.all(
      response.images.map(({ name, contents }) =>
        fs.writeFile(
          path.join(outputPath, name),
          contents as unknown as Uint8Array,
        ),
      ),
    )

    await Promise.all(
      response.files.map(({ name, contents }) => {
        let content = contents
        if (name === 'manifest.webmanifest') {
          const manifest = JSON.parse(content)
          manifest.icons.push({
            src: `/${maskableIconName}`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          })
          manifest.icons = manifest.icons.map((icon: Icon) => ({
            ...icon,
            src: icon.src.replace(/^\//, '/favicons/'),
          }))
          content = JSON.stringify(manifest, null, 2)
        }

        return fs.writeFile(
          path.join(publicDir, name),
          content as unknown as Uint8Array,
        )
      }),
    )

    await fs.copyFile(
      path.join(publicDir, maskableIconName),
      path.join(publicDir, 'favicons', maskableIconName),
    )
    console.log('✅ Generated favicons successfully')
  } catch (error) {
    console.error('❌ Error generating favicons:', error)
  }
}

run()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
