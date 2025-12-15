'use client'

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

interface CertificateGeneratorProps {
    userName: string
    onUserNameChange: (name: string) => void
}

export default function CertificateGenerator({
    userName,
    onUserNameChange,
}: CertificateGeneratorProps) {
    const certificateRef = useRef<HTMLDivElement>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const downloadPDF = async () => {
        if (!certificateRef.current || !userName.trim()) {
            alert('Please enter a name first!')
            return
        }

        setIsGenerating(true)
        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height],
            })

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)

            // Create a clean filename
            const cleanName = userName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
            const filename = `${cleanName}_certificate.pdf`

            // Use file-saver to ensure proper filename
            const pdfBlob = pdf.output('blob')
            saveAs(pdfBlob, filename)
        } catch (error) {
            console.error('Error generating PDF:', error)
            alert('Failed to generate PDF. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const downloadPNG = async () => {
        if (!certificateRef.current || !userName.trim()) {
            alert('Please enter a name first!')
            return
        }

        setIsGenerating(true)
        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
            })

            // Create a clean filename
            const cleanName = userName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
            const filename = `${cleanName}_certificate.png`

            // Convert canvas to blob and use file-saver
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, filename)
                }
                setIsGenerating(false)
            }, 'image/png')
        } catch (error) {
            console.error('Error generating PNG:', error)
            alert('Failed to generate PNG. Please try again.')
            setIsGenerating(false)
        }
    }

    return (
        <div className="w-full space-y-8">
            {/* Input Section */}
            <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-2xl backdrop-blur-sm dark:from-gray-800/90 dark:to-gray-900/70">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
                    Generate Your Certificate
                </h2>

                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="userName"
                            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Enter Your Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => onUserNameChange(e.target.value)}
                            placeholder="John Doe"
                            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-lg text-gray-800 transition-all duration-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-pink-400"
                        />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button
                            onClick={downloadPDF}
                            disabled={isGenerating || !userName.trim()}
                            className="flex-1 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isGenerating ? '⏳ Generating...' : '📄 Download PDF'}
                        </button>

                        <button
                            onClick={downloadPNG}
                            disabled={isGenerating || !userName.trim()}
                            className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isGenerating ? '⏳ Generating...' : '🖼️ Download PNG'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Certificate Preview */}
            <div className="mx-auto max-w-6xl">
                <h3 className="mb-4 text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Preview
                </h3>
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div
                        ref={certificateRef}
                        className="relative aspect-[3/2] w-full bg-white"
                        style={{ minHeight: '600px' }}
                    >
                        {/* Left Sidebar - Dark with Logo */}
                        <div className="absolute left-0 top-0 flex h-full w-[25%] flex-col items-center justify-center bg-[#1a1a1a] text-white">
                            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-white">
                                <span className="text-5xl font-black text-black">T</span>
                            </div>
                            <h3 className="text-center text-xl font-bold tracking-wide">
                                Tough Tongue AI
                            </h3>
                        </div>

                        {/* Main Certificate Area */}
                        <div className="absolute left-[25%] top-0 h-full w-[75%] bg-[#f5f5f0]">
                            {/* Pink Header */}
                            <div className="h-[12%] w-full bg-gradient-to-r from-[#ff69b4] to-[#ff1493]"></div>

                            {/* Certificate Content */}
                            <div className="flex h-[88%] flex-col items-center justify-center px-12 py-8">
                                <div className="w-full max-w-2xl space-y-6 text-center">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-light tracking-[0.3em] text-gray-600">
                                            CERTIFICATE OF
                                        </h1>
                                        <h2 className="text-5xl font-light tracking-[0.2em] text-gray-700">
                                            RECOGNITION
                                        </h2>
                                    </div>

                                    {/* Awarded To */}
                                    <p className="pt-4 text-sm font-medium text-gray-600">
                                        This certificate is awarded to:
                                    </p>

                                    {/* User Name */}
                                    <div className="py-4">
                                        <h3 className="text-4xl font-light tracking-wide text-gray-700">
                                            {userName || 'User Name'}
                                        </h3>
                                        <div className="mx-auto mt-2 h-[2px] w-full max-w-md bg-gray-400"></div>
                                    </div>

                                    {/* Description */}
                                    <p className="px-4 text-sm leading-relaxed text-gray-600">
                                        for valuable contributions in promoting and growing the Tough Tongue AI
                                        <br />
                                        community on campus, demonstrating initiative and a spirit of
                                        <br />
                                        collaboration
                                    </p>

                                    {/* Signature */}
                                    <div className="pt-8">
                                        <p className="text-lg font-medium text-gray-700">Ajitesh Abhishek</p>
                                        <p className="text-sm text-gray-600">CEO, Tough Tongue AI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
