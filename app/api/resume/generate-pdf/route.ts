import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations, ResumeData } from '../../../../lib/resumeStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeId, template, data } = body

    if (!resumeId || !template || !data) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required parameters',
        },
        { status: 400 }
      )
    }

    // For now, we'll return a simple HTML representation
    // In a real application, you would use a library like puppeteer or jsPDF
    const htmlContent = generateResumeHTML(data, template)

    // Return HTML content for now (in production, convert to PDF)
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="resume.html"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
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

function generateResumeHTML(data: ResumeData, template: string) {
  const { contact, education, experience, leadership, projects, other1, other2 } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${contact.name || 'Resume'} - Resume</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .contact-info {
            font-size: 14px;
            color: #666;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }
        .entry {
            margin-bottom: 15px;
        }
        .entry-title {
            font-weight: bold;
            font-size: 16px;
        }
        .entry-subtitle {
            font-style: italic;
            color: #666;
        }
        .entry-dates {
            font-size: 14px;
            color: #666;
        }
        .entry-description {
            margin-top: 5px;
            font-size: 14px;
        }
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill-tag {
            background-color: #f0f0f0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${contact.name || 'Your Name'}</div>
        <div class="contact-info">
            ${contact.email ? `<div>${contact.email}</div>` : ''}
            ${contact.phone ? `<div>${contact.phone}</div>` : ''}
            ${contact.location ? `<div>${contact.location}</div>` : ''}
            ${contact.linkedin ? `<div>LinkedIn: ${contact.linkedin}</div>` : ''}
            ${contact.portfolio ? `<div>Portfolio: ${contact.portfolio}</div>` : ''}
        </div>
    </div>

    ${
      education.length > 0
        ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${education
          .map(
            (edu) => `
            <div class="entry">
                <div class="entry-title">${edu.degree}${edu.major ? ` in ${edu.major}` : ''}</div>
                <div class="entry-subtitle">${edu.university}${edu.location ? `, ${edu.location}` : ''}</div>
                <div class="entry-dates">
                    ${edu.graduationMonth} ${edu.graduationYear}
                    ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </div>
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }

    ${
      experience.length > 0
        ? `
    <div class="section">
        <div class="section-title">Experience</div>
        ${experience
          .map(
            (exp) => `
            <div class="entry">
                <div class="entry-title">${exp.jobTitle}</div>
                <div class="entry-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
                <div class="entry-dates">
                    ${exp.startMonth} ${exp.startYear} - ${exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                </div>
                ${exp.responsibilities ? `<div class="entry-description">${exp.responsibilities.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }

    ${
      leadership.length > 0
        ? `
    <div class="section">
        <div class="section-title">Leadership & Activities</div>
        ${leadership
          .map(
            (lead) => `
            <div class="entry">
                <div class="entry-title">${lead.title}</div>
                <div class="entry-subtitle">${lead.organization}${lead.location ? `, ${lead.location}` : ''}</div>
                <div class="entry-dates">
                    ${lead.startMonth} ${lead.startYear} - ${lead.isCurrent ? 'Present' : `${lead.endMonth} ${lead.endYear}`}
                </div>
                ${lead.description ? `<div class="entry-description">${lead.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }

    ${
      projects.length > 0
        ? `
    <div class="section">
        <div class="section-title">Projects</div>
        ${projects
          .map(
            (proj) => `
            <div class="entry">
                <div class="entry-title">${proj.projectName}</div>
                ${proj.technologies ? `<div class="entry-subtitle">Technologies: ${proj.technologies}</div>` : ''}
                ${proj.link ? `<div class="entry-dates">Link: ${proj.link}</div>` : ''}
                ${proj.description ? `<div class="entry-description">${proj.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }

    ${
      other1.entries.length > 0
        ? `
    <div class="section">
        <div class="section-title">${other1.sectionTitle}</div>
        ${other1.entries
          .map(
            (entry) => `
            <div class="entry">
                <div class="entry-title">${entry.title}</div>
                ${entry.subtitle ? `<div class="entry-subtitle">${entry.subtitle}</div>` : ''}
                ${entry.startDate || entry.endDate ? `<div class="entry-dates">${entry.startDate}${entry.startDate && entry.endDate ? ' - ' : ''}${entry.endDate || (entry.isCurrent ? 'Present' : '')}</div>` : ''}
                ${entry.description ? `<div class="entry-description">${entry.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }

    ${
      other2.entries.length > 0
        ? `
    <div class="section">
        <div class="section-title">${other2.sectionTitle}</div>
        ${other2.entries
          .map(
            (entry) => `
            <div class="entry">
                <div class="entry-title">${entry.title}</div>
                ${entry.subtitle ? `<div class="entry-subtitle">${entry.subtitle}</div>` : ''}
                ${entry.startDate || entry.endDate ? `<div class="entry-dates">${entry.startDate}${entry.startDate && entry.endDate ? ' - ' : ''}${entry.endDate || (entry.isCurrent ? 'Present' : '')}</div>` : ''}
                ${entry.description ? `<div class="entry-description">${entry.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `
          )
          .join('')}
    </div>
    `
        : ''
    }
</body>
</html>
  `
}
