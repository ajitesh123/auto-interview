import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  TabStopPosition,
  TabStopType,
  UnderlineType,
  LevelFormat,
} from 'docx'
import { saveAs } from 'file-saver'
import { ResumeData } from './resumeStore'

// Helper function to parse text with bold formatting
function parseBoldText(text: string): TextRun[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  const runs: TextRun[] = []

  parts.forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      const boldText = part.slice(2, -2)
      if (boldText.length > 0) {
        runs.push(
          new TextRun({
            text: boldText,
            bold: true,
            size: 22,
            color: '000000',
            font: 'Calibri',
          })
        )
      }
    } else if (part.length > 0) {
      // Regular text
      runs.push(
        new TextRun({
          text: part,
          size: 22,
          color: '000000',
          font: 'Calibri',
        })
      )
    }
  })

  return runs
}

export async function generateDocx(resumeData: ResumeData): Promise<void> {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inch
                right: 720, // 0.5 inch
                bottom: 720, // 0.5 inch
                left: 720, // 0.5 inch
              },
            },
          },
          children: [
            // Header Section
            ...createHeaderSection(resumeData.contact),

            // Education Section
            ...createEducationSection(resumeData.education),

            // Experience Section
            ...createExperienceSection(resumeData.experience),

            // Leadership Section
            ...createLeadershipSection(resumeData.leadership),

            // Projects Section
            ...createProjectsSection(resumeData.projects),

            // Other Sections
            ...createOtherSection(resumeData.other1),

            // Skills Section
            ...createSkillsSection(resumeData),
          ],
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    const fileName = `${resumeData.contact.name.replace(/\s+/g, '_')}_Resume.docx`
    saveAs(blob, fileName)
  } catch (error) {
    console.error('Error generating DOCX:', error)
    throw new Error('Failed to generate DOCX file')
  }
}

function createHeaderSection(contact: ResumeData['contact']) {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: contact.name || '',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: [
            contact.location || '',
            contact.phone || '',
            contact.email || '',
            contact.linkedin || '',
          ]
            .filter(Boolean)
            .join(' • '),
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
  ]
}

function createEducationSection(education: ResumeData['education']) {
  if (!education.length) return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Education',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...education
      .map((edu) => [
        // Institution name and location row
        new Paragraph({
          children: [
            new TextRun({
              text: edu.university || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: edu.location || '',
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
        // Degree/major/GPA and graduation date row
        new Paragraph({
          children: [
            new TextRun({
              text: [edu.degree || '', edu.major || '', edu.gpa || ''].filter(Boolean).join(' — '),
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: [edu.graduationMonth || '', edu.graduationYear || ''].filter(Boolean).join(' '),
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
      ])
      .flat(),
  ]
}

function createExperienceSection(experience: ResumeData['experience']) {
  if (!experience.length) return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Experience',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...experience
      .map((exp) => [
        // Company name and location row
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: exp.location || '',
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
        // Job title and date row
        new Paragraph({
          children: [
            new TextRun({
              text: exp.jobTitle || '',
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: [
                exp.startMonth || '',
                exp.startYear || '',
                exp.endMonth || '',
                exp.endYear || '',
              ]
                .filter(Boolean)
                .join(' '),
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
        // Bullet points with proper Word bullets and bold formatting
        ...(exp.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 50 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createLeadershipSection(leadership: ResumeData['leadership']) {
  if (!leadership.length) return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Leadership & Activities',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...leadership
      .map((lead) => [
        // Organization name and location row
        new Paragraph({
          children: [
            new TextRun({
              text: lead.organization || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: lead.location || '',
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
        // Title and date row
        new Paragraph({
          children: [
            new TextRun({
              text: lead.title || '',
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: [
                lead.startMonth || '',
                lead.startYear || '',
                lead.endMonth || '',
                lead.endYear || '',
              ]
                .filter(Boolean)
                .join(' '),
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { after: 50 },
        }),
        // Bullet points with proper Word bullets and bold formatting
        ...(lead.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 50 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createProjectsSection(projects: ResumeData['projects']) {
  if (!projects.length) return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Projects',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...projects
      .map((project) => [
        // Project name
        new Paragraph({
          children: [
            new TextRun({
              text: project.projectName || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          spacing: { after: 50 },
        }),
        // Bullet points with proper Word bullets and bold formatting
        ...(project.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 50 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createOtherSection(other: ResumeData['other1']) {
  if (!other.entries.length) return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: other.sectionTitle || 'Other',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...other.entries.map(
      (entry) =>
        new Paragraph({
          children: [
            new TextRun({
              text: entry.title || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
          ],
          spacing: { after: 50 },
        })
    ),
  ]
}

function createSkillsSection(resumeData: ResumeData) {
  const { skills } = resumeData
  if (!skills.technical.length && !skills.languages.length && !skills.interests.length) {
    return []
  }

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Skills',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    // Technical skills
    ...(skills.technical.length > 0
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: skills.technical.join(' • '),
                size: 22,
                color: '000000',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
        ]
      : []),
    // Languages
    ...(skills.languages.length > 0
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `Languages: ${skills.languages.join(', ')}`,
                size: 22,
                color: '000000',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
        ]
      : []),
    // Interests
    ...(skills.interests.length > 0
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `Interests: ${skills.interests.join(', ')}`,
                size: 22,
                color: '000000',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
        ]
      : []),
  ]
}
