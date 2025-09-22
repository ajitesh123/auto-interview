import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload simple API called')
    const formData = await request.formData()
    const file = formData.get('resume') as File

    console.log('File received:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      exists: !!file,
    })

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: 'No file uploaded',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File received successfully',
      data: {
        name: file.name,
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    console.error('Error in upload simple API:', error)
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
