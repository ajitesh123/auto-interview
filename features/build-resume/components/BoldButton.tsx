'use client'

import { useRef } from 'react'

interface BoldButtonProps {
  onBold: (selectedText: string, startPos: number, endPos: number) => void
  disabled?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
}

const BoldButton = ({ onBold, disabled = false, inputRef }: BoldButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleBoldClick = () => {
    // Try to find the input element
    let inputElement: HTMLInputElement | null = null

    if (inputRef && inputRef.current) {
      inputElement = inputRef.current
    } else {
      // Fallback: find the nearest input element
      const button = buttonRef.current
      if (button) {
        const container = button.closest('.flex')
        if (container) {
          inputElement = container.querySelector('input') as HTMLInputElement
        }
      }
    }

    if (!inputElement) {
      console.log('No input element found')
      return
    }

    const startPos = inputElement.selectionStart || 0
    const endPos = inputElement.selectionEnd || 0

    if (startPos === endPos) {
      // No text selected
      console.log('No text selected')
      return
    }

    const selectedText = inputElement.value.substring(startPos, endPos).trim()

    if (selectedText.length === 0) {
      console.log('No text selected')
      return
    }

    console.log('Selected text:', selectedText, 'from', startPos, 'to', endPos)

    // Call the parent's bold handler
    onBold(selectedText, startPos, endPos)
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleBoldClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white text-[#666666] transition-colors hover:border-[#171717] hover:bg-[#fafafa] hover:text-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
      title="Bold selected text (select text first, then click this button)"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
        />
      </svg>
    </button>
  )
}

export default BoldButton
