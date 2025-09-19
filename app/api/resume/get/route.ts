import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations } from '../../../../lib/resumeStore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resumeId = searchParams.get('id')

    // If no ID provided, return all resumes
    if (!resumeId) {
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
    }

    // Get specific resume by ID
    const resume = resumeStoreOperations.get(resumeId)

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume not found',
        },
        { status: 404 }
      )
    }

    // Return the complete resume data
    return NextResponse.json({
      success: true,
      data: resume,
    })
  } catch (error) {
    console.error('Error retrieving resume:', error)
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

// PUT endpoint to update an existing resume
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resumeId = searchParams.get('id')

    if (!resumeId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume ID is required',
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Update the resume data
    const success = resumeStoreOperations.update(resumeId, body)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume not found',
        },
        { status: 404 }
      )
    }

    // Get the updated resume to return the updatedAt timestamp
    const updatedResume = resumeStoreOperations.get(resumeId)

    return NextResponse.json({
      success: true,
      message: 'Resume updated successfully',
      data: {
        id: resumeId,
        updatedAt: updatedResume?.updatedAt || new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error updating resume:', error)
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

// DELETE endpoint to remove a resume
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resumeId = searchParams.get('id')

    if (!resumeId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume ID is required',
        },
        { status: 400 }
      )
    }

    // Delete the resume
    const success = resumeStoreOperations.delete(resumeId)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting resume:', error)
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
