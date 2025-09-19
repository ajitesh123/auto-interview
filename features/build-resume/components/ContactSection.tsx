'use client'

import { useState } from 'react'

interface ContactData {
  name: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  location: string
}

interface ContactSectionProps {
  data?: ContactData
  onChange: (data: ContactData) => void
}

const ContactSection = ({ data, onChange }: ContactSectionProps) => {
  const [contactData, setContactData] = useState<ContactData>({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    linkedin: data?.linkedin || '',
    portfolio: data?.portfolio || '',
    location: data?.location || '',
  })

  const handleInputChange = (field: keyof ContactData, value: string) => {
    const updatedData = { ...contactData, [field]: value }
    setContactData(updatedData)
    onChange(updatedData)
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Contact Information</h2>
        <p className="text-gray-300">Let's start with your basic contact details</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={contactData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={contactData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={contactData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={contactData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="City, State/Country"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            value={contactData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-2">
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300">
            Portfolio Website
          </label>
          <input
            type="url"
            id="portfolio"
            value={contactData.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="rounded-lg bg-gray-700 p-4">
        <div className="flex items-start">
          <svg
            className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="mb-1 text-sm font-medium text-white">Tips for Contact Information</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Use a professional email address</li>
              <li>• Include your LinkedIn profile to showcase your professional network</li>
              <li>• Add your portfolio website if you have one</li>
              <li>• Use a consistent format for your phone number</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
