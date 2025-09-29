import { copyFile, readdir } from 'fs/promises'
import { resolve } from 'path'

const run = async () => {
  const webDir = resolve(__dirname, '..', '..', 'web')
  const outputDir = resolve(webDir, 'out')

  const isPreProduction = Boolean(process.env['ENVIRONMENT'])

  const robotsTxtFileName = isPreProduction
    ? 'robots.preproduction.txt'
    : 'robots.production.txt'

  const robotsTxtFilePath = resolve(webDir, 'public', robotsTxtFileName)

  await copyFile(
    resolve(webDir, 'src', 'staticwebapp.config.json'),
    resolve(outputDir, 'staticwebapp.config.json'),
  )

  // await copyFile(
  //   resolve(webDir, 'public', 'manifest.json'),
  //   resolve(outputDir, 'manifest.json'),
  // )

  const icons = await readdir(resolve(outputDir, 'favicons'))
  await Promise.all(
    icons.map(file =>
      copyFile(resolve(outputDir, 'favicons', file), resolve(outputDir, file)),
    ),
  )

  await copyFile(resolve(robotsTxtFilePath), resolve(outputDir, 'robots.txt'))
}

run()
  .then(() => console.log('✅ build generated successfully'))
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error('❌ Error building:', error)
    process.exit(1)
  })
