'use client'

import { useState, useRef } from 'react'
import BoldButton from './BoldButton'

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

  // Create refs for all possible bullet inputs (up to maxBullets)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleBulletChange = (index: number, value: string) => {
    const newBullets = [...localBullets]
    newBullets[index] = value
    setLocalBullets(newBullets)
    // Don't filter out empty bullets if they're the only bullets (for new entries)
    const filteredBullets = newBullets.filter((bullet) => bullet.trim() !== '')
    onChange(filteredBullets.length > 0 ? filteredBullets : newBullets)
  }

  const handleBoldText = (
    index: number,
    selectedText: string,
    startPos: number,
    endPos: number
  ) => {
    const currentBullet = localBullets[index]
    const beforeSelection = currentBullet.substring(0, startPos)
    const afterSelection = currentBullet.substring(endPos)
    const boldedText = `**${selectedText}**`

    const newBullet = beforeSelection + boldedText + afterSelection
    handleBulletChange(index, newBullet)
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
      <label className="block text-sm font-medium text-chatgpt-textSecondary">
        Bullet Points ({localBullets.filter((bullet) => bullet.trim() !== '').length}/{maxBullets})
      </label>

      {localBullets.map((bullet, index) => (
        <div key={index} className="flex items-start space-x-2">
          <div className="flex-1">
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              value={bullet}
              onChange={(e) => handleBulletChange(index, e.target.value)}
              className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
              placeholder={placeholder}
            />
          </div>

          <div className="flex space-x-1">
            <BoldButton
              inputRef={{ current: inputRefs.current[index] }}
              onBold={(selectedText, startPos, endPos) =>
                handleBoldText(index, selectedText, startPos, endPos)
              }
            />

            {index === localBullets.length - 1 && localBullets.length < maxBullets && (
              <button
                type="button"
                onClick={addBullet}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-chatgpt-border bg-chatgpt-card text-chatgpt-textSecondary transition-colors hover:bg-chatgpt-input hover:text-chatgpt-text"
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

      <div className="text-xs text-chatgpt-textSecondary">
        Tip: Start each bullet point with an action verb for better impact. Select text and click
        the bold button (B) to make it bold, or use **text** syntax (e.g., **increased** sales by
        20%)
      </div>
    </div>
  )
}

export default BulletPointsInput
