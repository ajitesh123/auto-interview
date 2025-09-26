import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    console.log('Cover letter generation request received')

    const { jobTitle, company, jobDescription, resumeData } = await request.json()
    console.log('Request data:', {
      jobTitle,
      company,
      jobDescription: jobDescription?.substring(0, 100) + '...',
      resumeData: resumeData ? 'Present' : 'Missing',
    })

    if (!jobTitle || !company || !jobDescription || !resumeData) {
      console.log('Missing required fields:', {
        jobTitle: !!jobTitle,
        company: !!company,
        jobDescription: !!jobDescription,
        resumeData: !!resumeData,
      })
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: jobTitle, company, jobDescription, and resumeData are required',
        },
        { status: 400 }
      )
    }

    // Initialize Gemini AI with embedded API key
    const GEMINI_API_KEY = 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
    console.log('Gemini API key is configured, proceeding with generation')

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

    // Extract key information from resume data
    const resumeText = `
Name: ${resumeData.contact?.name || 'Not provided'}
Email: ${resumeData.contact?.email || 'Not provided'}
Phone: ${resumeData.contact?.phone || 'Not provided'}
Location: ${resumeData.contact?.location || 'Not provided'}

Education:
${
  resumeData.education
    ?.map(
      (edu: any, index: number) => `
${index + 1}. Degree: ${edu.degree || 'Not provided'}
   Institution: ${edu.institution || 'Not provided'}
   Specialization: ${edu.specialization || 'Not provided'}
   Graduation: ${edu.graduationMonth || ''} ${edu.graduationYear || ''}
   GPA: ${edu.gpa || 'Not provided'}
`
    )
    .join('') || 'No education information provided'
}

Experience:
${
  resumeData.experience
    ?.map(
      (exp: any, index: number) => `
${index + 1}. Company: ${exp.company || 'Not provided'}
   Position: ${exp.position || 'Not provided'}
   Duration: ${exp.duration || 'Not provided'}
   Location: ${exp.location || 'Not provided'}
   Description: ${exp.bullets?.join(' ') || 'No description provided'}
`
    )
    .join('') || 'No experience information provided'
}

Leadership and Activities:
${
  resumeData.leadership
    ?.map(
      (lead: any, index: number) => `
${index + 1}. Organization: ${lead.organization || 'Not provided'}
   Position: ${lead.position || 'Not provided'}
   Duration: ${lead.duration || 'Not provided'}
   Location: ${lead.location || 'Not provided'}
   Description: ${lead.bullets?.join(' ') || 'No description provided'}
`
    )
    .join('') || 'No leadership information provided'
}

Projects:
${
  resumeData.projects
    ?.map(
      (proj: any, index: number) => `
${index + 1}. Title: ${proj.title || 'Not provided'}
   Duration: ${proj.duration || 'Not provided'}
   Link: ${proj.link || 'Not provided'}
   Description: ${proj.bullets?.join(' ') || 'No description provided'}
`
    )
    .join('') || 'No projects information provided'
}

Skills:
Technical Skills: ${resumeData.skills?.technical?.join(', ') || 'Not provided'}
Languages: ${resumeData.skills?.languages?.join(', ') || 'Not provided'}
Interests: ${resumeData.skills?.interests?.join(', ') || 'Not provided'}
`

    console.log('Creating Gemini model...')
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `
You are an expert career coach and professional writer. Your task is to create a compelling, personalized cover letter based on the provided resume information and job details.

RESUME INFORMATION:
${resumeText}

JOB DETAILS:
Job Title: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription}

INSTRUCTIONS:
1. Read the resume carefully and identify the most relevant skills, experiences, and achievements that align with the job requirements.
2. Create a professional, well-crafted cover letter that is 250-300 words long.
3. Write in a professional human tone, as if a human has written it themselves.
4. Structure the cover letter properly:
   - Start with "Dear Hiring Manager,"
   - Break into multiple paragraphs (2-3 paragraphs)
   - End with "Warm regards," followed by the person's name from the resume
5. Focus on the most relevant aspects of the candidate's background that match the job requirements.
6. Make it specific to the company and role, not generic.
7. Use the person's actual name from the resume in the signature.
8. Ensure the tone is confident but not arrogant, professional but personable.

IMPORTANT: Return ONLY the cover letter text, no additional explanations or formatting. The cover letter should be ready to use as-is.
`

    console.log('Sending request to Gemini API...')
    const result = await model.generateContent(prompt)
    console.log('Received response from Gemini API')

    const response = await result.response
    const coverLetter = response.text()
    console.log('Cover letter generated successfully, length:', coverLetter.length)

    // Clean up the response
    const cleanedCoverLetter = coverLetter
      .replace(/```/g, '')
      .replace(/markdown/g, '')
      .trim()

    return NextResponse.json({
      success: true,
      coverLetter: cleanedCoverLetter,
    })
  } catch (error) {
    console.error('Error generating cover letter:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate cover letter',
      },
      { status: 500 }
    )
  }
}
