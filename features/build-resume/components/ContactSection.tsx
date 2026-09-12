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
      <div className="mb-6">
        <h2 className="text-xl font-normal tracking-tight text-[#171717]">Contact Information</h2>
        <p className="mt-1 text-xs text-[#666666]">
          Enter your accurate contact details for recruiters and ATS parsers.
        </p>
      </div>

      {/* Form Fields - 2 Column Grid for compact layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="name" className="block text-xs font-medium text-[#171717]">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={contactData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="e.g., Alex Morgan"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-[#171717]">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={contactData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="alex.morgan@example.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-medium text-[#171717]">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={contactData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="block text-xs font-medium text-[#171717]">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={contactData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="San Francisco, CA"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1.5">
          <label htmlFor="linkedin" className="block text-xs font-medium text-[#171717]">
            LinkedIn URL *
          </label>
          <input
            type="url"
            id="linkedin"
            value={contactData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="linkedin.com/in/username"
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="portfolio" className="block text-xs font-medium text-[#171717]">
            Portfolio / GitHub Website (Optional)
          </label>
          <input
            type="url"
            id="portfolio"
            value={contactData.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4 text-xs text-[#666666]">
        <div className="flex items-start">
          <svg
            className="mr-2.5 mt-0.5 h-4 w-4 flex-shrink-0 text-[#171717]"
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
            <h4 className="font-medium text-[#171717]">Contact Tips for ATS</h4>
            <ul className="mt-1 space-y-0.5 text-[#666666]">
              <li>• Always include a standardized phone number with country code.</li>
              <li>• Make sure your email address is professional (e.g. firstname.lastname@...).</li>
              <li>• Use a clean LinkedIn vanity URL without tracking queries.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
