import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const publicDir = path.resolve(__dirname, '../public')
const validExtensions = ['.png', '.jpg', '.jpeg']

async function getFilesRecursively(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map(async dirent => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory()
        ? dirent.name === 'favicons'
          ? []
          : getFilesRecursively(res)
        : [res]
    }),
  )
  return files.flat()
}

async function convertToWebP(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase()
  if (!validExtensions.includes(ext.toLocaleLowerCase())) return

  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(outputPath)
    console.log(`✅ Converted: ${filePath} → ${outputPath}`)
  } catch (error) {
    console.error(`❌ Failed to convert ${filePath}:`, error)
  }
}

async function main() {
  try {
    const files = await getFilesRecursively(publicDir)
    await Promise.all(files.map(convertToWebP))
    console.log('🎉 All images converted to WebP.')
  } catch (error) {
    console.error('❌ Error during conversion:', error)
  }
}

main()
