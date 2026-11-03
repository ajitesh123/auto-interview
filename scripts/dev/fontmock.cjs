// Offline build helper: some sandboxes cannot reach Google Fonts, which makes `next build` fail.
// Usage: NEXT_FONT_GOOGLE_MOCKED_RESPONSES="$PWD/scripts/dev/fontmock.cjs" npx next build
// Production (Vercel) never uses this; it only swaps in a local font file for test builds.
const path = require('path')
const f = path.join(__dirname, 'mock-font.woff2')
module.exports = new Proxy(
  {},
  {
    get: (_, url) => {
      const fam = decodeURIComponent(String(url)).match(/family=([^:&]+)/)
      const n = fam ? fam[1].replace(/\+/g, ' ') : 'X'
      return `@font-face{font-family:'${n}';font-style:normal;font-weight:400;font-display:swap;src:url(${f}) format('woff2');unicode-range:U+0000-00FF;}`
    },
  }
)
