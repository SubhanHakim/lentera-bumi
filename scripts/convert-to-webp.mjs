import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const TARGETS = ['.jpg', '.jpeg', '.png']

async function convert(inputPath, outputPath) {
  const before = statSync(inputPath).size
  await sharp(inputPath)
    .webp({ quality: 85, effort: 5 })
    .toFile(outputPath)
  const after = statSync(outputPath).size
  const saved = (((before - after) / before) * 100).toFixed(1)
  const kb = (n) => (n / 1024).toFixed(1) + ' KB'
  console.log(`✓  ${basename(inputPath)}  →  ${basename(outputPath)}   ${kb(before)} → ${kb(after)}  (−${saved}%)`)
}

const files = readdirSync(PUBLIC_DIR).filter(f => TARGETS.includes(extname(f).toLowerCase()))

if (files.length === 0) {
  console.log('No JPG/PNG files found in /public.')
  process.exit(0)
}

for (const file of files) {
  const input  = join(PUBLIC_DIR, file)
  const output = join(PUBLIC_DIR, basename(file, extname(file)) + '.webp')
  await convert(input, output)
}

console.log('\nDone. Update your src references to use .webp extensions.')
