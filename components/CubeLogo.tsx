import React from 'react'

interface CubeLogoProps {
  size?: number
  className?: string
  variant?: 'solid' | 'glass'
  strokeColor?: string
}

/**
 * 4x4x4 Isometric 3D Geometric Cube Logo
 * Mathematically solid 4x4x4 isometric projection with one missing top apex sub-cube
 * and crisp grid lines outlining each sub-block.
 */
export default function CubeLogo({
  size = 24,
  className = '',
  variant = 'solid',
  strokeColor,
}: CubeLogoProps) {
  const N = 4
  const u = 10 // unit size
  const cos30 = 0.866025
  const sin30 = 0.5
  const cx = 50
  const cy = 50

  const project = (x: number, y: number, z: number) => {
    const px = cx + (x - y) * u * cos30
    const py = cy + (x + y) * u * sin30 - z * u
    return `${px.toFixed(2)},${py.toFixed(2)}`
  }

  // Top sub-face polygon (z=const)
  const topQuad = (x: number, y: number, z: number) => {
    const p1 = project(x, y, z)
    const p2 = project(x + 1, y, z)
    const p3 = project(x + 1, y + 1, z)
    const p4 = project(x, y + 1, z)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Front-Left sub-face polygon (y=4, varying x and z)
  const frontLeftQuad = (x: number, z: number) => {
    const p1 = project(x, 4, z + 1)
    const p2 = project(x + 1, 4, z + 1)
    const p3 = project(x + 1, 4, z)
    const p4 = project(x, 4, z)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Front-Right sub-face polygon (x=4, varying y and z)
  const frontRightQuad = (y: number, z: number) => {
    const p1 = project(4, y, z + 1)
    const p2 = project(4, y + 1, z + 1)
    const p3 = project(4, y + 1, z)
    const p4 = project(4, y, z)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Cavity inner walls for missing sub-cube at (0, 0, 3)
  const cavityRightWall = () => {
    const p1 = project(1, 0, 4)
    const p2 = project(1, 1, 4)
    const p3 = project(1, 1, 3)
    const p4 = project(1, 0, 3)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  const cavityLeftWall = () => {
    const p1 = project(0, 1, 4)
    const p2 = project(1, 1, 4)
    const p3 = project(1, 1, 3)
    const p4 = project(0, 1, 3)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Build polygons
  const topPolys: { d: string; isCavity?: boolean }[] = []
  const frontLeftPolys: string[] = []
  const frontRightPolys: string[] = []

  // Top surface grid (z = 4, except (0,0) which is at z = 3)
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (x === 0 && y === 0) {
        topPolys.push({ d: topQuad(0, 0, 3), isCavity: true })
      } else {
        topPolys.push({ d: topQuad(x, y, 4) })
      }
    }
  }

  // Front-Left surface grid (y = 4, x in 0..3, z in 0..3)
  for (let x = 0; x < N; x++) {
    for (let z = 0; z < N; z++) {
      frontLeftPolys.push(frontLeftQuad(x, z))
    }
  }

  // Front-Right surface grid (x = 4, y in 0..3, z in 0..3)
  for (let y = 0; y < N; y++) {
    for (let z = 0; z < N; z++) {
      frontRightPolys.push(frontRightQuad(y, z))
    }
  }

  const defaultStroke = strokeColor || (variant === 'glass' ? 'rgba(255,255,255,0.45)' : '#ffffff')
  const defaultStrokeWidth = variant === 'glass' ? '0.75' : '0.6'

  // Facet fills
  const topFill = variant === 'glass' ? 'rgba(46, 46, 46, 0.85)' : '#2e2e2e'
  const leftFill = variant === 'glass' ? 'rgba(26, 26, 26, 0.9)' : '#1a1a1a'
  const rightFill = variant === 'glass' ? 'rgba(13, 13, 13, 0.95)' : '#0d0d0d'
  const cavityFloorFill = variant === 'glass' ? 'rgba(32, 32, 32, 0.85)' : '#202020'
  const cavityRightFill = variant === 'glass' ? 'rgba(18, 18, 18, 0.95)' : '#121212'
  const cavityLeftFill = variant === 'glass' ? 'rgba(22, 22, 22, 0.9)' : '#161616'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 align-middle ${className}`}
      aria-label="Auto Interview AI 4x4x4 3D Cube Logo"
    >
      {/* Front-Left Faces (Mid Obsidian) */}
      <g
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {frontLeftPolys.map((d, i) => (
          <path key={`fl-${i}`} d={d} fill={leftFill} />
        ))}
      </g>

      {/* Front-Right Faces (Deep Carbon) */}
      <g
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {frontRightPolys.map((d, i) => (
          <path key={`fr-${i}`} d={d} fill={rightFill} />
        ))}
      </g>

      {/* Cavity Inner Walls (revealed by missing top-apex block) */}
      <g
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d={cavityRightWall()} fill={cavityRightFill} />
        <path d={cavityLeftWall()} fill={cavityLeftFill} />
      </g>

      {/* Top Faces (Light Matte Charcoal + Cavity Floor) */}
      <g
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {topPolys.map((poly, i) => (
          <path key={`top-${i}`} d={poly.d} fill={poly.isCavity ? cavityFloorFill : topFill} />
        ))}
      </g>
    </svg>
  )
}
