'use client'

import { useState } from 'react'
import CertificateGenerator from '@/components/CertificateGenerator'
import AppLayout from '@/components/AppLayout'

export default function CertificatePage() {
    const [userName, setUserName] = useState('')

    return (
        <AppLayout>
            <div className="py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
                            Certificate Generator
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-400">
                            Create your personalized Certificate of Recognition from Tough Tongue AI. Simply
                            enter your name and download your certificate instantly!
                        </p>
                    </div>

                    {/* Certificate Generator Component */}
                    <CertificateGenerator userName={userName} onUserNameChange={setUserName} />

                    {/* Instructions */}
                    <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-matte-dark p-8 shadow-lg border border-gray-800">
                        <h2 className="mb-4 text-2xl font-bold text-white">
                            How to Use
                        </h2>
                        <ol className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                                    1
                                </span>
                                <span>Enter your name in the input field above</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                                    2
                                </span>
                                <span>Preview your certificate in real-time</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                                    3
                                </span>
                                <span>Click "Download PDF" or "Download PNG" to save your certificate</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                                    4
                                </span>
                                <span>Share your achievement on social media! 🎉</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
