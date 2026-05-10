import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'

export async function POST(request: NextRequest) {
  try {
    const { coverLetter, jobTitle, company } = await request.json()

    if (!coverLetter) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cover letter content is required',
        },
        { status: 400 }
      )
    }

    // Split the cover letter into paragraphs
    const paragraphs = coverLetter.split('\n').filter((line) => line.trim() !== '')

    // Create document paragraphs
    const docParagraphs: Paragraph[] = []

    paragraphs.forEach((paragraph, index) => {
      const trimmedParagraph = paragraph.trim()

      if (trimmedParagraph === '') return

      // Check if it's the greeting (Dear Hiring Manager,)
      if (trimmedParagraph.toLowerCase().startsWith('dear')) {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedParagraph,
                font: 'Arial',
                size: 20, // 10pt in half-points
                bold: false,
              }),
            ],
            spacing: {
              after: 200, // 1 line spacing
            },
          })
        )
      }
      // Check if it's the closing (Warm regards,)
      else if (
        trimmedParagraph.toLowerCase().includes('warm regards') ||
        trimmedParagraph.toLowerCase().includes('sincerely') ||
        trimmedParagraph.toLowerCase().includes('best regards')
      ) {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedParagraph,
                font: 'Arial',
                size: 20, // 10pt in half-points
                bold: false,
              }),
            ],
            spacing: {
              before: 200, // 1 line spacing before
              after: 200, // 1 line spacing after
            },
          })
        )
      }
      // Check if it's the signature (person's name)
      else if (
        index === paragraphs.length - 1 &&
        !trimmedParagraph.toLowerCase().includes('warm regards') &&
        !trimmedParagraph.toLowerCase().includes('sincerely') &&
        !trimmedParagraph.toLowerCase().includes('best regards')
      ) {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedParagraph,
                font: 'Arial',
                size: 20, // 10pt in half-points
                bold: false,
              }),
            ],
            spacing: {
              before: 200, // 1 line spacing before
            },
          })
        )
      }
      // Regular paragraph
      else {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedParagraph,
                font: 'Arial',
                size: 20, // 10pt in half-points
                bold: false,
              }),
            ],
            spacing: {
              after: 200, // 1 line spacing
            },
          })
        )
      }
    })

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docParagraphs,
        },
      ],
    })

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc)

    // Create filename
    const safeCompany = company?.replace(/[^a-zA-Z0-9]/g, '_') || 'Company'
    const safeJobTitle = jobTitle?.replace(/[^a-zA-Z0-9]/g, '_') || 'Position'
    const filename = `Cover_Letter_${safeCompany}_${safeJobTitle}.docx`

    // Return the document as a download
    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating cover letter document:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate document',
      },
      { status: 500 }
    )
  }
}
