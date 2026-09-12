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
      <div className="flex items-center justify-between">
        <label className="block font-mono text-xs uppercase tracking-[0.05em] text-[#666666]">
          Bullet Points ({localBullets.filter((bullet) => bullet.trim() !== '').length}/{maxBullets}
          )
        </label>
      </div>

      {localBullets.map((bullet, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-1">
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              value={bullet}
              onChange={(e) => handleBulletChange(index, e.target.value)}
              className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
              placeholder={placeholder}
            />
          </div>

          <div className="flex flex-shrink-0 space-x-1.5">
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
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white text-[#666666] transition-colors hover:border-[#171717] hover:bg-[#fafafa] hover:text-[#171717]"
                title="Add bullet point"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white text-[#999999] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                title="Remove bullet point"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-3 text-xs text-[#666666]">
        <strong>Tip:</strong> Start bullet points with strong action verbs. Highlight key metrics
        and click <strong>B</strong> to bold keywords.
      </div>
    </div>
  )
}

export default BulletPointsInput
