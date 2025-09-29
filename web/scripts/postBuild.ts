import rss from './generateRSS'

async function run() {
  await rss()
}

run()
  .then(() => console.log('✅ Generated RSS feed successfully'))
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error('❌ Error post building:', error)
    process.exit(1)
  })
