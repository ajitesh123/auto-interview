const fs = require('fs')
const path = require('path')
const sharp = require('d:/auto-interview/node_modules/sharp')
const { execSync } = require('child_process')

const N = 4
const u = 10
const cos30 = 0.8660254037844386
const sin30 = 0.5
const cx = 50
const cy = 50

const project = (x, y, z) => {
  const px = cx + (x - y) * u * cos30
  const py = cy + (x + y) * u * sin30 - z * u
  return `${px.toFixed(2)},${py.toFixed(2)}`
}

const topFace = (x, y, z) => {
  return `M${project(x, y, z)} L${project(x + 1, y, z)} L${project(x + 1, y + 1, z)} L${project(x, y + 1, z)} Z`
}

const leftFace = (x, y, z) => {
  return `M${project(x, y, z)} L${project(x, y + 1, z)} L${project(x, y + 1, z - 1)} L${project(x, y, z - 1)} Z`
}

const rightFace = (x, y, z) => {
  return `M${project(x + 1, y, z)} L${project(x + 1, y + 1, z)} L${project(x + 1, y + 1, z - 1)} L${project(x + 1, y, z - 1)} Z`
}

const absent = { x: 0, y: 0, z: 3 }
const topPolys = []
const leftPolys = []
const rightPolys = []

for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (x === absent.x && y === absent.y) topPolys.push(topFace(x, y, 3))
    else topPolys.push(topFace(x, y, 4))
  }
}

for (let y = 0; y < N; y++) {
  for (let z = 1; z <= N; z++) {
    if (y === absent.y && z === absent.z + 1) leftPolys.push(leftFace(1, y, z - 1))
    else leftPolys.push(leftFace(0, y, z))
  }
}

for (let x = 0; x < N; x++) {
  for (let z = 1; z <= N; z++) {
    if (x === absent.x && z === absent.z + 1) rightPolys.push(rightFace(x, 1, z - 1))
    else rightPolys.push(rightFace(x, 0, z))
  }
}

function generateSvg(strokeWidth = 0.8) {
  return `<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#ffffff" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round">
    ${leftPolys.map((d) => `<path d="${d}" fill="#1a1a1a" />`).join('\n    ')}
    ${rightPolys.map((d) => `<path d="${d}" fill="#0d0d0d" />`).join('\n    ')}
    ${topPolys.map((d) => `<path d="${d}" fill="#2e2e2e" />`).join('\n    ')}
  </g>
</svg>`
}

function generateMonochromeSvg() {
  return `<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#ffffff" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round">
    ${leftPolys.map((d) => `<path d="${d}" fill="#333333" />`).join('\n    ')}
    ${rightPolys.map((d) => `<path d="${d}" fill="#111111" />`).join('\n    ')}
    ${topPolys.map((d) => `<path d="${d}" fill="#555555" />`).join('\n    ')}
  </g>
</svg>`
}

async function main() {
  const rootDir = path.resolve(__dirname, '..')
  const svgContent = generateSvg(0.8)
  const monochromeSvgContent = generateMonochromeSvg()
  const svgBuffer = Buffer.from(svgContent)

  // 1. Write SVG to target locations
  const svgPaths = [
    path.join(rootDir, 'data', 'logo.svg'),
    path.join(rootDir, 'static', 'images', 'logo.svg'),
    path.join(rootDir, 'public', 'static', 'images', 'logo.svg'),
    path.join(rootDir, 'public', 'static', 'favicons', 'favicon.svg'),
  ]

  for (const p of svgPaths) {
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, svgContent, 'utf8')
    console.log('Written SVG:', p)
  }

  // Safari pinned tab
  const safariSvg = path.join(rootDir, 'public', 'static', 'favicons', 'safari-pinned-tab.svg')
  fs.writeFileSync(safariSvg, monochromeSvgContent, 'utf8')
  console.log('Written Safari pinned tab SVG:', safariSvg)

  // 2. Render PNGs using Sharp across all required sizes
  const sizes = [
    // Primary brand assets
    { size: 512, dest: path.join(rootDir, 'public', 'static', 'images', 'logo.png') },
    { size: 512, dest: path.join(rootDir, 'static', 'images', 'logo.png') },

    // Apple Touch Icons
    { size: 180, dest: path.join(rootDir, 'public', 'apple-touch-icon.png') },
    { size: 180, dest: path.join(rootDir, 'public', 'apple-touch-icon-precomposed.png') },
    { size: 180, dest: path.join(rootDir, 'public', 'static', 'favicons', 'apple-touch-icon.png') },

    // Google Search recommended favicon sizes (multiples of 48px: 48, 96, 192)
    { size: 48, dest: path.join(rootDir, 'public', 'static', 'favicons', 'favicon-48x48.png') },
    {
      size: 96,
      dest: path.join(rootDir, 'public', 'static', 'favicons', 'android-chrome-96x96.png'),
    },
    {
      size: 192,
      dest: path.join(rootDir, 'public', 'static', 'favicons', 'android-chrome-192x192.png'),
    },
    {
      size: 512,
      dest: path.join(rootDir, 'public', 'static', 'favicons', 'android-chrome-512x512.png'),
    },

    // Standard browser tab favicon sizes
    { size: 32, dest: path.join(rootDir, 'public', 'static', 'favicons', 'favicon-32x32.png') },
    { size: 16, dest: path.join(rootDir, 'public', 'static', 'favicons', 'favicon-16x16.png') },

    // Windows tile
    { size: 150, dest: path.join(rootDir, 'public', 'static', 'favicons', 'mstile-150x150.png') },
  ]

  for (const { size, dest } of sizes) {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    await sharp(svgBuffer).resize(size, size).png().toFile(dest)
    console.log(`Rendered PNG (${size}x${size}):`, dest)
  }

  // Also render temporary PNGs for ICO generation (multi-resolution ICO)
  const tempDir = path.join(rootDir, 'scripts', 'temp_ico')
  fs.mkdirSync(tempDir, { recursive: true })
  for (const s of [16, 32, 48, 64]) {
    await sharp(svgBuffer)
      .resize(s, s)
      .png()
      .toFile(path.join(tempDir, `icon_${s}.png`))
  }

  // 3. Generate multi-resolution ICO with Python Pillow
  const pyScript = `import os
from PIL import Image

temp_dir = r"${tempDir}"
img16 = Image.open(os.path.join(temp_dir, "icon_16.png"))
img32 = Image.open(os.path.join(temp_dir, "icon_32.png"))
img48 = Image.open(os.path.join(temp_dir, "icon_48.png"))
img64 = Image.open(os.path.join(temp_dir, "icon_64.png"))

ico_targets = [
    r"${path.join(rootDir, 'public', 'favicon.ico')}",
    r"${path.join(rootDir, 'app', 'favicon.ico')}",
    r"${path.join(rootDir, 'public', 'static', 'favicons', 'favicon.ico')}"
]

for target in ico_targets:
    os.makedirs(os.path.dirname(target), exist_ok=True)
    img64.save(target, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)], append_images=[img48, img32, img16])
    print(f"Generated ICO: {target}")
`
  const pyPath = path.join(rootDir, 'scripts', 'gen_ico.py')
  fs.writeFileSync(pyPath, pyScript, 'utf8')
  execSync(`python "${pyPath}"`, { stdio: 'inherit' })
  fs.unlinkSync(pyPath)

  // Clean up temp dir
  fs.rmSync(tempDir, { recursive: true, force: true })
  console.log('Done generating all assets successfully!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
