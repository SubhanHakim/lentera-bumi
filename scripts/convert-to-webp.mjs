import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const DIRS = [PUBLIC, join(PUBLIC, 'activity'), join(PUBLIC, 'kegiatan')]
const EXTS = ['.jpg', '.jpeg', '.png']
let converted = 0

for (const dir of DIRS) {
  let files
  try { files = await readdir(dir) } catch { continue }
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!EXTS.includes(ext)) continue
    const input  = join(dir, file)
    const output = join(dir, basename(file, ext) + '.webp')
    await sharp(input).webp({ quality: 85, effort: 4 }).toFile(output)
    await unlink(input)
    console.log('converted: ' + file)
    converted++
  }
}
console.log('Done: ' + converted + ' files')
