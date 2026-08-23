import React from 'react'

interface CubeLogoProps {
  size?: number
  className?: string
}

/**
 * 4x4x4 Isometric 3D Geometric Cube Logo
 * Represents structured career intelligence with an architectural absent block at the top corner.
 */
export default function CubeLogo({ size = 24, className = '' }: CubeLogoProps) {
  // 4x4x4 Isometric parameters
  const N = 4
  const unit = 14
  const cos30 = 0.866025
  const sin30 = 0.5
  const originX = 100
  const originY = 62

  const project = (x: number, y: number, z: number) => {
    const px = originX + (x - y) * unit * cos30
    const py = originY + (x + y) * unit * sin30 - z * unit
    return `${px.toFixed(2)},${py.toFixed(2)}`
  }

  // Polygon path for a diamond/rhombus top face at (x, y, z)
  const topFace = (x: number, y: number, z: number) => {
    const p1 = project(x, y, z)
    const p2 = project(x + 1, y, z)
    const p3 = project(x + 1, y + 1, z)
    const p4 = project(x, y + 1, z)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Polygon path for a left face at (x, y, z)
  const leftFace = (x: number, y: number, z: number) => {
    const p1 = project(x, y, z)
    const p2 = project(x, y + 1, z)
    const p3 = project(x, y + 1, z - 1)
    const p4 = project(x, y, z - 1)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Polygon path for a right face at (x, y, z)
  const rightFace = (x: number, y: number, z: number) => {
    const p1 = project(x + 1, y, z)
    const p2 = project(x + 1, y + 1, z)
    const p3 = project(x + 1, y + 1, z - 1)
    const p4 = project(x + 1, y, z - 1)
    return `M${p1} L${p2} L${p3} L${p4} Z`
  }

  // Absent block coordinates (top corner at (0, 0, 3))
  const absent = { x: 0, y: 0, z: 3 }

  const topPolys: string[] = []
  const leftPolys: string[] = []
  const rightPolys: string[] = []

  // Generate outer top faces (z = 4)
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (x === absent.x && y === absent.y) {
        // Render the inner floor of the cavity at z = 3
        topPolys.push(topFace(x, y, 3))
      } else {
        topPolys.push(topFace(x, y, 4))
      }
    }
  }

  // Generate outer left faces (x = 0)
  for (let y = 0; y < N; y++) {
    for (let z = 1; z <= N; z++) {
      if (y === absent.y && z === absent.z + 1) {
        // Cavity back-left wall (at x = 1)
        leftPolys.push(leftFace(1, y, z - 1))
      } else {
        leftPolys.push(leftFace(0, y, z))
      }
    }
  }

  // Generate outer right faces (y = 0)
  for (let x = 0; x < N; x++) {
    for (let z = 1; z <= N; z++) {
      if (x === absent.x && z === absent.z + 1) {
        // Cavity back-right wall (at y = 1)
        rightPolys.push(rightFace(x, 1, z - 1))
      } else {
        rightPolys.push(rightFace(x, 0, z))
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Auto Interview AI 3D Cube Logo"
    >
      <g stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" strokeLinecap="round">
        {/* Left Faces (Mid-tone Obsidian) */}
        {leftPolys.map((d, i) => (
          <path key={`left-${i}`} d={d} fill="#1a1a1a" />
        ))}

        {/* Right Faces (Deep Carbon) */}
        {rightPolys.map((d, i) => (
          <path key={`right-${i}`} d={d} fill="#0d0d0d" />
        ))}

        {/* Top Faces (Light Matte Charcoal) */}
        {topPolys.map((d, i) => (
          <path key={`top-${i}`} d={d} fill="#2e2e2e" />
        ))}
      </g>
    </svg>
  )
}
