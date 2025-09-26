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
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-chatgpt-border bg-chatgpt-card text-chatgpt-textSecondary transition-colors hover:bg-chatgpt-input hover:text-chatgpt-text disabled:cursor-not-allowed disabled:opacity-50"
      title="Bold selected text (select text first, then click this button)"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
        />
      </svg>
    </button>
  )
}

export default BoldButton
