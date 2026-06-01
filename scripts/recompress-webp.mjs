import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const OUT    = join(__dirname, '..', 'public_opt')

const TASKS = [
  { src: PUBLIC,                    out: OUT,                         maxW: 1600 },
  { src: join(PUBLIC, 'activity'),  out: join(OUT, 'activity'),  maxW: 1200 },
  { src: join(PUBLIC, 'kegiatan'),  out: join(OUT, 'kegiatan'),  maxW: 1400 },
]

let done = 0
for (const { src, out, maxW } of TASKS) {
  let files
  try { files = await readdir(src) } catch { continue }
  await mkdir(out, { recursive: true })

  for (const file of files) {
    if (!file.endsWith('.webp')) continue
    const inPath  = join(src, file)
    const outPath = join(out, file)
    const before  = fs.statSync(inPath).size

    await sharp(inPath)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality: 75, effort: 5 })
      .toFile(outPath)

    const after = fs.statSync(outPath).size
    const pct   = Math.round((1 - after/before) * 100)
    console.log(`${file.padEnd(44)} ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB  (-${pct}%)`)
    done++
  }
}
console.log('\nDone: ' + done + ' files -> public_opt/')
