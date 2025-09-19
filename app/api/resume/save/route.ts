import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations, validateResumeData, ResumeData } from '../../../../lib/resumeStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming data
    const validation = validateResumeData(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid resume data',
          errors: validation.errors,
        },
        { status: 400 }
      )
    }

    // Save the resume data
    const result = resumeStoreOperations.save(body as ResumeData)

    // Return success response with the resume ID
    return NextResponse.json({
      success: true,
      message: 'Resume saved successfully',
      data: {
        id: result.id,
        createdAt: result.createdAt,
      },
    })
  } catch (error) {
    console.error('Error saving resume:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all saved resumes (for debugging)
export async function GET() {
  try {
    const resumes = resumeStoreOperations.getAll()

    return NextResponse.json({
      success: true,
      data: {
        resumes: resumes.map((resume) => ({
          id: resume.id,
          contact: {
            name: resume.contact?.name || '',
            email: resume.contact?.email || '',
          },
          createdAt: resume.createdAt,
          updatedAt: resume.updatedAt,
        })),
        total: resumes.length,
      },
    })
  } catch (error) {
    console.error('Error retrieving resumes:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
