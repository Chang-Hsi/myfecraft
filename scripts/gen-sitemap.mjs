// scripts/gen-sitemap.mjs
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 讀取 Pinia store 的 posts（用 setActivePinia）
import { setActivePinia, createPinia } from 'pinia'
import { useSeoStore } from '../src/stores/seo.js' // 路徑依你專案

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 站點 URL（來自 .env）
const SITE_URL = (process.env.VITE_SITE_URL || '').replace(/\/+$/, '')
if (!SITE_URL) {
  console.error('缺少 VITE_SITE_URL，請在 .env 設定，例如 https://myfecraft.com')
  process.exit(1)
}

// 靜態頁路徑（依你的 router）
const STATIC_ROUTES = ['/', '/about', '/works', '/articles', '/seo']

// 啟動一個 Pinia（只為了讀 store 的「初始 state」）
setActivePinia(createPinia())
const seoStore = useSeoStore()
const posts = seoStore.posts || []

// 動態文章路徑
const articleRoutes = posts.map(p => `/seo/${p.id}`)

// 轉 ISO（2025/07/15 -> 2025-07-15）
const toISO = (dateStr) => {
  if (!dateStr) return null
  const [y, m, d] = String(dateStr).split(/[./-]/).map(Number)
  const dt = new Date(y, (m || 1) - 1, d || 1)
  return isNaN(dt.getTime()) ? null : dt.toISOString().slice(0, 10)
}

// 建立 URL 清單（去重）
const paths = Array.from(new Set([...STATIC_ROUTES, ...articleRoutes]))

const urls = paths.map(p => {
  const loc = `${SITE_URL}${p === '/' ? '/' : p.replace(/\/+$/, '')}`
  // 文章有 lastmod，其餘可省略或用今天
  const idMatch = p.match(/^\/seo\/(\d+)/)
  const post = idMatch ? posts.find(x => String(x.id) === idMatch[1]) : null
  const lastmod = post ? toISO(post.date) : null
  return { loc, lastmod }
})

// 輸出 XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}  </url>`
  )
  .join('\n')}
</urlset>
`

// 寫到 public/sitemap.xml
const outFile = path.join(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outFile, xml, 'utf8')
console.log(`✅ 產生完成：${outFile}`)
