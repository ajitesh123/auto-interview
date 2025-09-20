'use client'

import { useState } from 'react'

interface BulletPointsInputProps {
  bullets: string[]
  onChange: (bullets: string[]) => void
  placeholder?: string
  maxBullets?: number
}

const BulletPointsInput = ({
  bullets,
  onChange,
  placeholder = 'Enter bullet point...',
  maxBullets = 15,
}: BulletPointsInputProps) => {
  const [localBullets, setLocalBullets] = useState<string[]>(bullets.length > 0 ? bullets : [''])

  const handleBulletChange = (index: number, value: string) => {
    const newBullets = [...localBullets]
    newBullets[index] = value
    setLocalBullets(newBullets)
    onChange(newBullets.filter((bullet) => bullet.trim() !== ''))
  }

  const addBullet = () => {
    if (localBullets.length < maxBullets) {
      const newBullets = [...localBullets, '']
      setLocalBullets(newBullets)
    }
  }

  const removeBullet = (index: number) => {
    if (localBullets.length > 1) {
      const newBullets = localBullets.filter((_, i) => i !== index)
      setLocalBullets(newBullets)
      onChange(newBullets.filter((bullet) => bullet.trim() !== ''))
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        Bullet Points ({localBullets.filter((bullet) => bullet.trim() !== '').length}/{maxBullets})
      </label>

      {localBullets.map((bullet, index) => (
        <div key={index} className="flex items-start space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={bullet}
              onChange={(e) => handleBulletChange(index, e.target.value)}
              className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder={placeholder}
            />
          </div>

          <div className="flex space-x-1">
            {index === localBullets.length - 1 && localBullets.length < maxBullets && (
              <button
                type="button"
                onClick={addBullet}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-500 bg-gray-600 text-gray-300 transition-colors hover:bg-gray-500 hover:text-white"
                title="Add bullet point"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            )}

            {localBullets.length > 1 && (
              <button
                type="button"
                onClick={() => removeBullet(index)}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-red-500 bg-red-600 text-white transition-colors hover:bg-red-500"
                title="Remove bullet point"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="text-xs text-gray-400">
        Tip: Start each bullet point with an action verb for better impact
      </div>
    </div>
  )
}

export default BulletPointsInput
