import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Wind, ArrowRight, RefreshCw, Activity, MapPin } from 'lucide-react'
import {
  Chart,
  BarElement, LineElement, PointElement,
  BarController, LineController,
  CategoryScale, LinearScale,
  Tooltip, Filler,
} from 'chart.js'
import Navbar from '../components/Navbar'
import FooterCTA from '../components/FooterCTA'

Chart.register(
  BarElement, LineElement, PointElement,
  BarController, LineController,
  CategoryScale, LinearScale,
  Tooltip, Filler,
)

/* ─── Design tokens ─── */
const T = {
  bg:          '#ffffff',
  surface:     '#f8fafc',
  panel:       '#ffffff',
  border:      '#e5e7eb',
  borderMid:   '#d1d5db',
  // Brand accent — emerald for wind/energy
  green:       '#059669',
  greenLt:     '#d1fae5',
  greenBg:     '#f0fdf4',
  greenMid:    '#10b981',
  // Secondary accents
  amber:       '#d97706',
  amberBg:     '#fffbeb',
  amberLt:     '#fde68a',
  cyan:        '#0891b2',
  cyanBg:      '#ecfeff',
  violet:      '#7c3aed',
  violetBg:    '#f5f3ff',
  // Text
  navy:        '#0a2540',
  text:        '#111827',
  textMid:     '#374151',
  textMuted:   '#6b7280',
  textDim:     '#9ca3af',
  // Shadow
  shadow:      '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
  shadowMd:    '0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)',
} as const

/* ─── Motion ─── */
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1]
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}

/* ─── Constants ─── */
const BASE_URL = import.meta.env.DEV
  ? '/api/lbn/LBN_'
  : 'https://lenterabumi.com/data/LBN_'

const DIR16 = ['U','NNE','TL','ENE','T','ESE','TG','SSE','S','SSW','BD','WSW','B','WNW','BL','NNW']
const MONTHS = [
  { value: '2026_04', label: 'April 2026' },
  { value: '2026_03', label: 'Maret 2026' },
  { value: '2026_02', label: 'Februari 2026' },
  { value: '2026_01', label: 'Januari 2026' },
  { value: '2025_12', label: 'Desember 2025' },
  { value: '2025_11', label: 'November 2025' },
  { value: '2025_10', label: 'Oktober 2025' },
]

/* ─── Types ─── */
interface RoseData {
  counts: number[]
  s0: number[]; s1: number[]; s2: number[]; s3: number[]
  dominant: number
}
interface Stats {
  avg15: number; avg10: number; max15: number
  dir: number; wpd: number; proj50: number; recovery: number
}
interface DashState {
  status: 'idle' | 'loading' | 'live' | 'error'
  message: string; progress: number; progressLabel: string
  stats: Stats | null
  hourly: (number | null)[]; daily: (number | null)[]
  binPct: Record<string, number>
  roseAll: RoseData | null; roseDay: RoseData | null; roseNight: RoseData | null
  count: number; wbK: number; wbA: number; month: string
}

/* ─── Helpers ─── */
function degToDir(d: number) {
  return ['Utara','TL','Timur','TG','Selatan','BD','Barat','BL'][Math.round(d / 45) % 8]
}
function degToSector(d: number) {
  d = ((d % 360) + 360) % 360
  return Math.floor((d + 11.25) / 22.5) % 16
}
function wpdf(v: number, k: number, A: number) {
  if (v <= 0) return 0
  return (k / A) * Math.pow(v / A, k - 1) * Math.exp(-Math.pow(v / A, k))
}
function fitWeibull(binPct: Record<string, number>) {
  const keys = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10']
  let sP = 0, sPV = 0, sPV2 = 0
  keys.forEach(k => {
    const mid = parseFloat(k) + 0.5, p = (binPct[k] || 0) / 100
    sP += p; sPV += p * mid; sPV2 += p * mid * mid
  })
  const mean = sPV / Math.max(sP, 0.001), v = sPV2 / Math.max(sP, 0.001) - mean * mean
  const kk = Math.max(0.8, Math.pow(mean, 2) / Math.max(v, 0.01))
  return { k: +kk.toFixed(2), A: +Math.max(0.5, mean / Math.pow(Math.log(2), 1 / kk)).toFixed(2) }
}
function mkRose(): RoseData {
  return { counts: new Array(16).fill(0), s0: new Array(16).fill(0), s1: new Array(16).fill(0), s2: new Array(16).fill(0), s3: new Array(16).fill(0), dominant: 0 }
}
function addToRose(r: RoseData, sec: number, spd: number) {
  r.counts[sec]++
  if (spd < 2) r.s0[sec]++
  else if (spd < 4) r.s1[sec]++
  else if (spd < 6) r.s2[sec]++
  else r.s3[sec]++
}
function roseResultText(rose: RoseData) {
  const total = rose.counts.reduce((a, b) => a + b, 0) || 1
  const maxIdx = rose.counts.indexOf(Math.max(...rose.counts))
  return `${DIR16[maxIdx]} · ${(rose.counts[maxIdx] / total * 100).toFixed(1)}%`
}

/* ─── Panel ─── */
function Panel({ title, tag, children, noPad }: { title: string; tag?: string; children: React.ReactNode; noPad?: boolean }) {
  return (
    <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: T.shadow }}>
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.surface }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.textMid, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          {title}
        </span>
        {tag && (
          <span style={{ fontSize: 10, fontWeight: 600, color: T.green, background: T.greenBg, border: `1px solid ${T.greenLt}`, padding: '2px 9px', borderRadius: 20, letterSpacing: '0.05em' }}>
            {tag}
          </span>
        )}
      </div>
      <div style={noPad ? undefined : { padding: 20 }}>{children}</div>
    </div>
  )
}

/* ─── Wind Rose ─── */
function WindRose({ data, label, sub, result }: { data: RoseData; label: string; sub: string; result: string }) {
  const cx = 100, cy = 100, maxR = 74
  const total = data.counts.reduce((a, b) => a + b, 0) || 1
  const maxPct = Math.max(...data.counts.map(c => c / total * 100)) || 1
  const pctToR = (pct: number) => maxR * pct / maxPct

  const elems: React.ReactNode[] = []

  // Rings
  ;[0.25, 0.5, 0.75, 1].forEach((f, i) => {
    elems.push(<circle key={`r${i}`} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="3,3" />)
  })
  for (let i = 0; i < 16; i++) {
    const a = i * 22.5 * Math.PI / 180
    elems.push(<line key={`s${i}`} x1={cx} y1={cy} x2={+(cx + maxR * Math.sin(a)).toFixed(1)} y2={+(cy - maxR * Math.cos(a)).toFixed(1)} stroke="#e5e7eb" strokeWidth="0.8" />)
  }

  // Petals — 4 speed layers
  const COLORS = ['#d1fae5', '#6ee7b7', '#059669', '#064e3b']
  for (let sec = 0; sec < 16; sec++) {
    const aStart = (sec * 22.5 - 11.25) * Math.PI / 180
    const aEnd   = (sec * 22.5 + 11.25) * Math.PI / 180
    const layers = [
      { d: data.s0[sec], color: COLORS[0] },
      { d: data.s1[sec], color: COLORS[1] },
      { d: data.s2[sec], color: COLORS[2] },
      { d: data.s3[sec], color: COLORS[3] },
    ]
    let cum = 0
    layers.forEach((layer, li) => {
      cum += layer.d
      const r = pctToR(cum / total * 100)
      if (r < 1) return
      const x1 = (cx + r * Math.sin(aStart)).toFixed(2), y1 = (cy - r * Math.cos(aStart)).toFixed(2)
      const x2 = (cx + r * Math.sin(aEnd)).toFixed(2),   y2 = (cy - r * Math.cos(aEnd)).toFixed(2)
      const x0 = (cx + 1 * Math.sin(aStart)).toFixed(2), y0 = (cy - 1 * Math.cos(aStart)).toFixed(2)
      const xp = (cx + 1 * Math.sin(aEnd)).toFixed(2),   yp = (cy - 1 * Math.cos(aEnd)).toFixed(2)
      elems.push(<path key={`p${sec}-${li}`} d={`M${x0} ${y0} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} L${xp} ${yp} Z`} fill={layer.color} opacity="0.9" />)
    })
  }

  // Cardinal labels
  const LBLS = ['U','TL','T','TG','S','BD','B','BL']
  ;[0,45,90,135,180,225,270,315].forEach((deg, i) => {
    const a = deg * Math.PI / 180, r = maxR + 13
    const x = (cx + r * Math.sin(a)).toFixed(1), y = (cy - r * Math.cos(a) + 3.5).toFixed(1)
    const cardinal = ['U','T','S','B'].includes(LBLS[i])
    elems.push(
      <text key={`l${i}`} x={x} y={y} textAnchor="middle" fontSize="9.5"
        fontWeight={cardinal ? '700' : '500'}
        fill={cardinal ? T.text : T.textDim}
        fontFamily="Poppins, sans-serif">
        {LBLS[i]}
      </text>
    )
  })
  elems.push(<circle key="dot" cx={cx} cy={cy} r="2.5" fill={T.green} />)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text, letterSpacing: '0.03em', marginBottom: 1 }}>{label}</div>
      <div style={{ fontSize: 10, color: T.textDim, marginBottom: 10 }}>{sub}</div>
      <svg width="100%" viewBox="0 0 200 200" style={{ display: 'block', maxWidth: 176, margin: '0 auto' }} role="img">
        <rect width="200" height="200" fill="#f8fafc" rx="6" />
        {elems}
      </svg>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.green, textAlign: 'center', marginTop: 8, letterSpacing: '0.04em' }}>
        {result}
      </div>
    </div>
  )
}

/* ─── Chart hook ─── */
function useChart(ref: React.RefObject<HTMLCanvasElement | null>, config: object | null) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null)
  useEffect(() => {
    if (!ref.current || !config) return
    chartRef.current?.destroy()
    chartRef.current = new Chart(ref.current, config as ConstructorParameters<typeof Chart>[1])
    return () => { chartRef.current?.destroy(); chartRef.current = null }
  }, [config]) // eslint-disable-line
}

/* ─── KPI Card ─── */
function KpiCard({ label, value, unit, sub, barW, accent, accentBg }: {
  label: string; value: string; unit: string
  sub: string; barW: number; accent: string; accentBg: string
}) {
  return (
    <div style={{
      background: T.panel, borderRadius: 14, overflow: 'hidden',
      boxShadow: T.shadow, border: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Colored top stripe */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}60)` }} />
      <div style={{ padding: '20px 22px 18px' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textDim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, lineHeight: 1 }}>
          <span style={{ fontSize: 38, fontWeight: 800, color: T.navy, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: accent }}>{unit}</span>
        </div>
        <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 7 }}>{sub}</div>
        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 2, marginTop: 16, background: accentBg, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${barW}%`, borderRadius: 2,
            background: accent,
            transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Dashboard ─── */
function WindDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('2026_04')
  const [state, setState] = useState<DashState>({
    status: 'idle', message: '', progress: 0, progressLabel: '',
    stats: null, hourly: [], daily: [], binPct: {},
    roseAll: null, roseDay: null, roseNight: null,
    count: 0, wbK: 2, wbA: 3, month: '2026_04',
  })
  const abortRef = useRef<AbortController | null>(null)

  const loadData = useCallback(async (month: string) => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setState(s => ({ ...s, status: 'loading', message: 'Memuat...', progress: 5, progressLabel: 'Menghubungi server...' }))

    try {
      const resp = await fetch(`${BASE_URL}${month}.csv`, { signal: ctrl.signal })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const totalBytes = parseInt(resp.headers.get('Content-Length') || '0')
      const reader = resp.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = '', bytesRead = 0, headerParsed = false
      let idx_time = -1, idx_wdir = -1, idx_w10 = -1, idx_w15 = -1
      let count = 0, sum15 = 0, sum10 = 0, max15 = 0, sinS = 0, cosS = 0
      const hSum = new Array(24).fill(0), hCnt = new Array(24).fill(0)
      const dSum: Record<number, number> = {}, dCnt: Record<number, number> = {}
      const bins = new Array(11).fill(0)
      const rAll = mkRose(), rDay = mkRose(), rNight = mkRose()

      const parseLine = (line: string) => {
        if (!line.trim()) return
        const row = line.split(',')
        if (!headerParsed) {
          idx_time = row.indexOf('time')
          if (idx_time === -1) idx_time = row.findIndex(c => c.toLowerCase().includes('time') || c.toLowerCase().includes('timestamp'))
          idx_wdir = row.indexOf('wdir_15m')
          if (idx_wdir === -1) idx_wdir = row.indexOf('wdir_15')
          if (idx_wdir === -1) idx_wdir = row.findIndex(c => c.toLowerCase().includes('wdir') || c.toLowerCase().includes('wind_dir'))
          idx_w10 = row.indexOf('wspd_10m')
          if (idx_w10 === -1) idx_w10 = row.findIndex(c => c.toLowerCase().includes('wspd_10'))
          idx_w15 = row.indexOf('wspd_15m')
          if (idx_w15 === -1) idx_w15 = row.findIndex(c => c.toLowerCase().includes('wspd_15'))
          headerParsed = true; return
        }
        if (row.length <= Math.max(idx_time, idx_w15)) return
        const w15 = parseFloat(row[idx_w15]), w10 = parseFloat(row[idx_w10])
        const wdir = parseFloat(row[idx_wdir]), t = row[idx_time]
        if (isNaN(w15) || w15 < 0 || w15 > 100) return
        count++; sum15 += w15; sum10 += w10
        if (w15 > max15) max15 = w15
        if (!isNaN(wdir) && wdir >= 0 && wdir <= 360) {
          const rad = wdir * Math.PI / 180; sinS += Math.sin(rad); cosS += Math.cos(rad)
        }
        const h = parseInt(t.substring(11, 13), 10), d = parseInt(t.substring(8, 10), 10)
        if (h >= 0 && h < 24) { hSum[h] += w15; hCnt[h]++ }
        if (d >= 1) { dSum[d] = (dSum[d] || 0) + w15; dCnt[d] = (dCnt[d] || 0) + 1 }
        bins[Math.min(Math.floor(w15), 10)]++
        if (!isNaN(wdir) && wdir >= 0 && wdir <= 360) {
          const sec = degToSector(wdir)
          addToRose(rAll, sec, w15)
          if (h >= 6 && h < 18) addToRose(rDay, sec, w15)
          else addToRose(rNight, sec, w15)
        }
      }

      while (true) {
        const res = await reader.read()
        if (res.done) break
        bytesRead += res.value.length
        buffer += decoder.decode(res.value, { stream: true })
        const nl = buffer.lastIndexOf('\n')
        if (nl > -1) { buffer.substring(0, nl).split('\n').forEach(parseLine); buffer = buffer.substring(nl + 1) }
        if (totalBytes > 0) {
          const p = Math.min(95, Math.round(bytesRead / totalBytes * 100))
          setState(s => ({ ...s, progress: p, progressLabel: `${Math.round(bytesRead / 1024 / 1024)} MB / ${Math.round(totalBytes / 1024 / 1024)} MB` }))
        }
      }
      if (buffer.trim()) parseLine(buffer)
      if (count === 0) throw new Error('Tidak ada data valid')

      const avg15 = sum15 / count, avg10 = sum10 / count
      const meanDir = ((Math.atan2(sinS / count, cosS / count) * 180 / Math.PI) + 360) % 360
      const parts = month.split('_')
      const recovery = +(count / (new Date(parseInt(parts[0]), parseInt(parts[1]), 0).getDate() * 86400) * 100).toFixed(1)
      const hourly = hSum.map((s, i) => hCnt[i] > 0 ? +(s / hCnt[i]).toFixed(3) : null)
      const daily: (number | null)[] = []
      for (let dd = 1; dd <= 31; dd++) daily.push(dSum[dd] && dCnt[dd] > 0 ? +(dSum[dd] / dCnt[dd]).toFixed(3) : null)
      const bL = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10']
      const binPct: Record<string, number> = {}
      bL.forEach((l, i) => { binPct[l] = +(bins[i] / count * 100).toFixed(2) })
      ;[rAll, rDay, rNight].forEach(rose => { rose.dominant = rose.counts.indexOf(Math.max(...rose.counts)) * 22.5 })
      const wb = fitWeibull(binPct)
      setState({
        status: 'live', message: 'Data aktif', progress: 100, progressLabel: '',
        stats: { avg15: +avg15.toFixed(3), avg10: +avg10.toFixed(3), max15: +max15.toFixed(3), dir: +meanDir.toFixed(2), wpd: +(0.5 * 1.225 * Math.pow(avg15, 3)).toFixed(2), proj50: +(avg15 * Math.pow(50 / 15, 0.6)).toFixed(3), recovery },
        hourly, daily, binPct, roseAll: rAll, roseDay: rDay, roseNight: rNight,
        count, wbK: wb.k, wbA: wb.A, month,
      })
    } catch (e: unknown) {
      if ((e as Error).name === 'AbortError') return
      setState(s => ({ ...s, status: 'error', message: 'Gagal: ' + (e as Error).message, progress: 0 }))
    }
  }, [])

  useEffect(() => { loadData('2026_04') }, [loadData])

  const { stats } = state
  const ml = state.month.replace('_', '/')
  const isLive = state.status === 'live'
  const isLoading = state.status === 'loading'
  const isError = state.status === 'error'

  function proj(h: number) { return stats ? +(stats.avg15 * Math.pow(h / 15, 0.6)).toFixed(2) : 0 }
  const v50 = proj(50), v30 = proj(30), v2 = proj(2), vmax = v50 || 1

  const bL = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10']
  const wbCurve = [0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5].map(v => +(wpdf(v, state.wbK, state.wbA) * 100).toFixed(2))

  const lTT = {
    backgroundColor: '#fff', titleColor: T.text, bodyColor: T.textMuted,
    borderColor: T.border, borderWidth: 1, padding: 12, cornerRadius: 8,
    titleFont: { family: 'Poppins', size: 11 }, bodyFont: { family: 'Poppins', size: 11 },
  }
  const lSX = { ticks: { color: T.textDim, font: { size: 10, family: 'Poppins' } }, grid: { color: 'rgba(0,0,0,0.04)' }, border: { display: false } }
  const lSY = { ...lSX, min: 0 }

  const wbRef = useRef<HTMLCanvasElement>(null)
  const hrRef = useRef<HTMLCanvasElement>(null)
  const dayRef = useRef<HTMLCanvasElement>(null)

  const wbConfig = isLive ? {
    type: 'bar',
    data: {
      labels: bL,
      datasets: [
        { type: 'bar' as const, label: 'Frekuensi', data: bL.map(k => state.binPct[k] || 0), backgroundColor: '#d1fae5', borderColor: '#6ee7b7', borderWidth: 1, borderRadius: 3 },
        { type: 'line' as const, label: 'Weibull', data: wbCurve, borderColor: T.green, borderWidth: 2, pointRadius: 3, pointBackgroundColor: T.green, pointBorderColor: '#fff', pointBorderWidth: 1.5, fill: false, tension: 0.42 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false, ...lTT } }, scales: { x: lSX, y: lSY } },
  } : null

  const hrConfig = isLive ? {
    type: 'line' as const,
    data: {
      labels: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
      datasets: [{ label: 'm/s', data: state.hourly, borderColor: T.green, backgroundColor: '#d1fae580', borderWidth: 2, pointRadius: 3, pointBackgroundColor: T.green, pointBorderColor: '#fff', pointBorderWidth: 1.5, fill: true, tension: 0.4 }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { ...lTT, callbacks: { label: (c: { parsed: { y: number } }) => `${(c.parsed.y || 0).toFixed(2)} m/s` } } }, scales: { x: lSX, y: lSY } },
  } : null

  const dayConfig = isLive ? {
    type: 'line' as const,
    data: {
      labels: Array.from({ length: state.daily.length }, (_, i) => i + 1),
      datasets: [{ label: 'm/s', data: state.daily, borderColor: T.cyan, backgroundColor: '#cffafe80', borderWidth: 2, pointRadius: 2.5, pointBackgroundColor: T.cyan, fill: true, tension: 0.32 }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { ...lTT, callbacks: { label: (c: { parsed: { y: number } }) => `${(c.parsed.y || 0).toFixed(2)} m/s` } } }, scales: { x: lSX, y: lSY } },
  } : null

  useChart(wbRef, wbConfig)
  useChart(hrRef, hrConfig)
  useChart(dayRef, dayConfig)

  const KPI_CARDS = [
    { label: 'Kec. rata-rata', value: stats?.avg15.toFixed(2) ?? '--', unit: 'm/s', sub: `Sensor 15m · ${ml}`, barW: Math.min(100, (stats?.avg15 ?? 0) / 10 * 100), accent: T.green, accentBg: T.greenLt },
    { label: 'Kec. maks', value: stats?.max15.toFixed(2) ?? '--', unit: 'm/s', sub: 'Puncak bulan ini', barW: Math.min(100, (stats?.max15 ?? 0) / 25 * 100), accent: T.amber, accentBg: T.amberLt },
    { label: 'Wind Power Density', value: stats?.wpd.toFixed(2) ?? '--', unit: 'W/m²', sub: 'Kerapatan daya angin', barW: Math.min(100, (stats?.wpd ?? 0) / 150 * 100), accent: T.cyan, accentBg: '#cffafe' },
    { label: 'Proyeksi 50m', value: stats?.proj50.toFixed(2) ?? '--', unit: 'm/s', sub: 'Ekstrapolasi α = 0.6', barW: Math.min(100, (stats?.proj50 ?? 0) / 10 * 100), accent: T.violet, accentBg: '#ede9fe' },
  ]

  const MAST = [
    { label: '50m', val: v50, pct: Math.min(100, v50 / vmax * 100) },
    { label: '30m', val: v30, pct: Math.min(100, v30 / vmax * 100) },
    { label: '15m', val: stats?.avg15 ?? 0, pct: Math.min(100, (stats?.avg15 ?? 0) / vmax * 100) },
    { label: '10m', val: stats?.avg10 ?? 0, pct: Math.min(100, (stats?.avg10 ?? 0) / vmax * 100) },
    { label:  '2m', val: v2,  pct: Math.min(100, v2 / vmax * 100) },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Topbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14,
        padding: '14px 20px', boxShadow: T.shadow,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: T.greenBg, border: `1px solid ${T.greenLt}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Activity size={16} color={T.green} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, letterSpacing: '-0.01em' }}>Data Pengukuran Angin</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <MapPin size={10} color={T.textDim} />
              <span style={{ fontSize: 11, color: T.textDim }}>Ciheras, Tasikmalaya · -7.7382°, 107.9675°</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Month */}
          <div style={{ position: 'relative' }}>
            <select value={selectedMonth} onChange={e => { setSelectedMonth(e.target.value); loadData(e.target.value) }}
              style={{ fontSize: 12, padding: '7px 30px 7px 12px', border: `1px solid ${T.borderMid}`, borderRadius: 8, color: T.text, background: T.surface, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer', appearance: 'none', outline: 'none' }}>
              {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: T.textDim, fontSize: 10, pointerEvents: 'none' }}>▾</span>
          </div>

          {/* Status */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 20, letterSpacing: '0.05em',
            ...(isLive  ? { background: T.greenBg,   color: T.green,  border: `1px solid ${T.greenLt}` }  :
                isLoading ? { background: T.amberBg, color: T.amber,  border: `1px solid ${T.amberLt}` }  :
                isError   ? { background: '#fef2f2',  color: '#dc2626', border: '1px solid #fecaca' }       :
                            { background: T.surface,  color: T.textMuted, border: `1px solid ${T.border}` }),
          }}>
            {isLive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block', animation: 'livepulse 2s ease-in-out infinite' }} />}
            {state.message || 'Menunggu'}
          </span>

          {/* Refresh */}
          <button onClick={() => loadData(selectedMonth)} disabled={isLoading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 500, color: isLoading ? T.textDim : T.textMuted, border: `1px solid ${T.border}`, background: T.surface, padding: '6px 12px', borderRadius: 8, cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'Poppins' }}>
            <RefreshCw size={11} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
            Muat ulang
          </button>
        </div>
      </div>

      {/* ── Progress ── */}
      {isLoading && (
        <div>
          <div style={{ height: 3, background: T.greenLt, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${state.progress}%`, background: T.green, transition: 'width .3s ease', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: T.textDim, marginTop: 5 }}>{state.progressLabel}</div>
        </div>
      )}

      {/* ── KPI ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {KPI_CARDS.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* ── Mast + Weibull ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Panel title="Profil kecepatan per ketinggian" tag="α = 0.6">
          <div style={{ fontSize: 11, color: T.textDim, marginBottom: 18 }}>Proyeksi shear exponent α = 0.6</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {MAST.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 72px', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textAlign: 'right' }}>{row.label}</span>
                <div style={{ height: 8, background: T.greenBg, borderRadius: 4, overflow: 'hidden', border: `1px solid ${T.greenLt}` }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: `linear-gradient(90deg, #6ee7b7, ${T.green})`, borderRadius: 4, transition: 'width 1.3s cubic-bezier(0.22,1,0.36,1)' }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, textAlign: 'right', color: T.navy, fontVariantNumeric: 'tabular-nums' }}>
                  {row.val > 0 ? `${row.val} m/s` : <span style={{ color: T.textDim }}>--</span>}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: T.textDim, textAlign: 'right', marginTop: 12 }}>kecepatan angin (m/s)</div>
        </Panel>

        <Panel title="Distribusi Weibull" tag={`k=${state.wbK} · A=${state.wbA} m/s`}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
            {[{ sq: true, color: '#d1fae5', border: '#6ee7b7', label: 'Frekuensi bin' }, { line: true, color: T.green, label: 'Kurva Weibull' }]
              .map((l, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.textMuted }}>
                  {l.sq ? <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, border: `1px solid ${l.border}`, display: 'inline-block' }} />
                        : <span style={{ width: 16, height: 2, background: l.color, borderRadius: 1, display: 'inline-block' }} />}
                  {l.label}
                </span>
              ))}
          </div>
          <div style={{ position: 'relative', width: '100%', height: 188 }}><canvas ref={wbRef} /></div>
        </Panel>
      </div>

      {/* ── Hourly + Daily ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Panel title="Rata-rata per jam" tag="Sensor 15m">
          <div style={{ position: 'relative', width: '100%', height: 174 }}><canvas ref={hrRef} /></div>
          <div style={{ fontSize: 10, color: T.textDim, textAlign: 'center', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Jam (WIB)</div>
        </Panel>
        <Panel title="Rata-rata harian" tag={ml}>
          <div style={{ position: 'relative', width: '100%', height: 174 }}><canvas ref={dayRef} /></div>
          <div style={{ fontSize: 10, color: T.textDim, textAlign: 'center', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Hari dalam bulan</div>
        </Panel>
      </div>

      {/* ── Wind Rose ── */}
      <Panel title="Mawar Angin (Wind Rose)" tag={ml}>
        {state.roseAll ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
              <WindRose data={state.roseAll}    label="Keseluruhan" sub="00:00 – 23:59" result={roseResultText(state.roseAll)} />
              <WindRose data={state.roseDay!}   label="Siang hari"  sub="06:00 – 18:00" result={roseResultText(state.roseDay!)} />
              <WindRose data={state.roseNight!} label="Malam hari"  sub="18:00 – 06:00" result={roseResultText(state.roseNight!)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
              {[['#064e3b','> 6 m/s'],['#059669','4–6 m/s'],['#6ee7b7','2–4 m/s'],['#d1fae5','0–2 m/s']].map(([c,l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: T.textMuted }}>
                  <span style={{ width: 11, height: 11, borderRadius: 2, background: c, border: `1px solid ${T.border}`, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: T.textDim, fontSize: 13 }}>Memuat data wind rose...</div>
        )}
      </Panel>

      {/* ── Stats ── */}
      <Panel title="Ringkasan Statistik" tag={ml}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
          {[
            [
              ['Kec. rata-rata 15m', stats ? `${stats.avg15.toFixed(3)} m/s` : '--', false],
              ['Kec. rata-rata 10m', stats ? `${stats.avg10.toFixed(3)} m/s` : '--', false],
              ['Kec. maks 15m',      stats ? `${stats.max15.toFixed(3)} m/s` : '--', false],
              ['Arah angin dominan', stats ? `${stats.dir.toFixed(2)}° (${degToDir(stats.dir)})` : '--', false],
              ['Wind Power Density', stats ? `${stats.wpd.toFixed(2)} W/m²` : '--', false],
              ['Proyeksi 50m',       stats ? `${stats.proj50.toFixed(3)} m/s` : '--', false],
            ],
            [
              ['Data Recovery',      stats ? `${stats.recovery}%` : '--', true],
              ['Total record',       stats ? state.count.toLocaleString('id') : '--', false],
              ['Sensor kecepatan',   '10m & 15m', false],
              ['Sensor arah',        '15m', false],
              ['Sampling',           '1 detik', false],
              ['Elevasi lokasi',     '1 m dpl', false],
            ],
          ].map((col, ci) => (
            <div key={ci}>
              {col.map(([k, v, green]) => (
                <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                  <span style={{ color: T.textMuted }}>{k}</span>
                  <span style={{ fontWeight: 700, color: green ? T.green : T.navy, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Footer strip ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', paddingTop: 12, borderTop: `1px solid ${T.border}`, fontSize: 11, color: T.textDim }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
          Data dari hosting LBN
        </span>
        <span>Ciheras, Tasikmalaya</span>
        {isLive && <span>Diperbarui: {new Date().toLocaleString('id')}</span>}
      </div>

      <style>{`
        @keyframes livepulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(5,150,105,0.4)} 50%{opacity:.7;box-shadow:0 0 0 4px rgba(5,150,105,0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

/* ─── Page ─── */
export default function PotensiAnginPage() {
  const dashRef  = useRef<HTMLElement>(null)
  const dashInView = useInView(dashRef, { once: true, amount: 0.04 })

  return (
    <>
      <Navbar />
      <main>

        {/* ══ Hero ══ */}
        <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${import.meta.env.BASE_URL}divisi_energi.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(3,8,20,0.97) 0%, rgba(4,10,26,0.86) 26%, rgba(5,14,32,0.52) 52%, rgba(6,18,38,0.2) 72%, transparent 88%)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(3,8,20,0.74) 0%, rgba(3,8,20,0.38) 40%, transparent 66%)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 55% 45% at 10% 70%, rgba(5,150,105,0.1), transparent)' }} />

          {/* Animated wind streaks */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} aria-hidden
              initial={{ x: '-8%', opacity: 0 }}
              animate={{ x: '108%', opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 5.5 + i * 1.3, delay: i * 2.1, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', zIndex: 3, pointerEvents: 'none', top: `${20 + i * 10}%`, left: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(110,231,183,0.3), transparent)`, width: `${100 + i * 55}px` }}
            />
          ))}

          <motion.div initial={{ opacity: 0, scale: 0.75, rotate: -18 }} animate={{ opacity: 0.055, scale: 1, rotate: 0 }} transition={{ duration: 2.4, ease: EASE, delay: 0.5 }}
            style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-52%)', zIndex: 4, pointerEvents: 'none' }}>
            <Wind size={300} color="#fff" strokeWidth={0.5} />
          </motion.div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', paddingTop: 80 }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 clamp(1.75rem, 5vw, 5rem)' }}>
              <motion.div variants={stagger} initial="hidden" animate="show">

                <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6ee7b7', boxShadow: '0 0 10px rgba(110,231,183,0.9)', flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(0.6rem, 0.72vw, 0.68rem)', fontWeight: 600, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.32em' }}>
                    Data Lapangan · Ciheras, Tasikmalaya · Lentera Bumi Nusantara
                  </span>
                </motion.div>

                <div style={{ overflow: 'hidden', marginBottom: 2 }}>
                  <motion.h1 variants={fadeUp} style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
                    Potensi
                  </motion.h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                  <motion.h1 variants={fadeUp} style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#6ee7b7' }}>
                    Arah Angin
                  </motion.h1>
                </div>

                <motion.div
                  variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.52, ease: EASE } } }}
                  style={{ height: 2, width: 'clamp(40px, 4vw, 56px)', background: 'linear-gradient(to right, #6ee7b7, transparent)', transformOrigin: 'left', marginBottom: 28 }}
                />

                <motion.p variants={fadeUp} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 0 40px 0' }}>
                  Data pengukuran angin real-time dari stasiun Ciheras — kecepatan, arah, distribusi Weibull,
                  dan proyeksi wind power density untuk evaluasi{' '}
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 600 }}>potensi energi terbarukan</span> di lokasi.
                </motion.p>

                <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12 }}>
                  <motion.button
                    onClick={() => dashRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(0.8rem, 0.92vw, 0.88rem)', color: '#022c22', background: '#6ee7b7', borderRadius: 999, border: 'none', cursor: 'pointer', padding: 'clamp(0.65rem, 1vw, 0.8rem) clamp(1.5rem, 2.2vw, 2.2rem)', letterSpacing: '0.03em', boxShadow: '0 4px 20px rgba(110,231,183,0.35)' }}>
                    Lihat Data <ArrowRight size={14} />
                  </motion.button>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ Dashboard section ══ */}
        <section id="data-angin" ref={dashRef} style={{ background: T.surface, position: 'relative', overflow: 'hidden' }}>
          <div style={{ height: 3, background: 'linear-gradient(to right, #6ee7b7, #059669, transparent)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>

            {/* Section heading */}
            <motion.div variants={stagger} initial="hidden" animate={dashInView ? 'show' : 'hidden'} style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <motion.p variants={fadeUp} style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.8vw, 0.68rem)', color: T.green, textTransform: 'uppercase', letterSpacing: '0.32em', marginBottom: 14 }}>
                Real-Time Data
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 3.5rem)', letterSpacing: '-0.03em', color: T.navy, margin: 0, lineHeight: 1.08 }}>
                Dashboard Pengukuran Angin<br />
                <span style={{ color: T.green }}>Ciheras, Tasikmalaya</span>
              </motion.h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate={dashInView ? 'show' : 'hidden'}>
              <WindDashboard />
            </motion.div>
          </div>
        </section>

        <FooterCTA />
      </main>
    </>
  )
}
