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
} from 'docx'
import { saveAs } from 'file-saver'
import { ResumeData } from './resumeStore'

export async function generateDocx(resumeData: ResumeData): Promise<void> {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
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
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: [
            contact.location || '',
            contact.email || '',
            contact.phone || '',
            contact.linkedin || '',
            contact.portfolio || '',
          ]
            .filter(Boolean)
            .join(' • '),
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
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
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    ...education
      .map((edu) => [
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree || ''}${edu.major ? ` in ${edu.major}` : ''}`,
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.university || ''}${edu.location ? `, ${edu.location}` : ''}`,
              size: 18,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.graduationMonth || ''} ${edu.graduationYear || ''}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}`,
              size: 16,
            }),
          ],
          spacing: { after: 200 },
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
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    ...experience
      .map((exp) => [
        new Paragraph({
          children: [
            new TextRun({
              text: exp.jobTitle || '',
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}`,
              size: 18,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.startMonth || ''} ${exp.startYear || ''} - ${exp.isCurrent ? 'Present' : `${exp.endMonth || ''} ${exp.endYear || ''}`}`,
              size: 16,
            }),
          ],
          spacing: { after: 100 },
        }),
        ...(exp.bullets && exp.bullets.filter((bullet) => bullet.trim() !== '').length > 0
          ? exp.bullets
              .filter((bullet) => bullet.trim() !== '')
              .map(
                (bullet) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${bullet}`,
                        size: 16,
                      }),
                    ],
                    spacing: { after: 50 },
                  })
              )
          : []),
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
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    ...leadership
      .map((lead) => [
        new Paragraph({
          children: [
            new TextRun({
              text: lead.title || '',
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${lead.organization || ''}${lead.location ? `, ${lead.location}` : ''}`,
              size: 18,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${lead.startMonth || ''} ${lead.startYear || ''} - ${lead.isCurrent ? 'Present' : `${lead.endMonth || ''} ${lead.endYear || ''}`}`,
              size: 16,
            }),
          ],
          spacing: { after: 100 },
        }),
        ...(lead.bullets && lead.bullets.filter((bullet) => bullet.trim() !== '').length > 0
          ? lead.bullets
              .filter((bullet) => bullet.trim() !== '')
              .map(
                (bullet) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${bullet}`,
                        size: 16,
                      }),
                    ],
                    spacing: { after: 50 },
                  })
              )
          : []),
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
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    ...projects
      .map((proj) => [
        new Paragraph({
          children: [
            new TextRun({
              text: proj.projectName || '',
              bold: true,
              size: 20,
              ...(proj.link
                ? {
                    link: proj.link,
                    underline: { type: 'single' },
                  }
                : {}),
            }),
          ],
          spacing: { after: 100 },
        }),
        ...(proj.bullets && proj.bullets.filter((bullet) => bullet.trim() !== '').length > 0
          ? proj.bullets
              .filter((bullet) => bullet.trim() !== '')
              .map(
                (bullet) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${bullet}`,
                        size: 16,
                      }),
                    ],
                    spacing: { after: 50 },
                  })
              )
          : []),
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
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    ...other.entries
      .map((entry) => [
        new Paragraph({
          children: [
            new TextRun({
              text: entry.title || '',
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
        ...(entry.subtitle
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: entry.subtitle,
                    size: 18,
                  }),
                ],
                spacing: { after: 50 },
              }),
            ]
          : []),
        ...(entry.startDate || entry.endDate
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${entry.startDate || ''}${entry.startDate && entry.endDate ? ' - ' : ''}${entry.endDate || (entry.isCurrent ? 'Present' : '')}`,
                    size: 16,
                  }),
                ],
                spacing: { after: 50 },
              }),
            ]
          : []),
        ...(entry.bullets && entry.bullets.filter((bullet) => bullet.trim() !== '').length > 0
          ? entry.bullets
              .filter((bullet) => bullet.trim() !== '')
              .map(
                (bullet) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${bullet}`,
                        size: 16,
                      }),
                    ],
                    spacing: { after: 50 },
                  })
              )
          : []),
      ])
      .flat(),
  ]
}

function createSkillsSection(resumeData: ResumeData) {
  const { skills } = resumeData
  const sections: Paragraph[] = []

  // Only add the heading if there are any skills
  const hasAnySkills =
    skills.technical.some((s) => s.trim() !== '') ||
    skills.languages.some((s) => s.trim() !== '') ||
    skills.interests.some((s) => s.trim() !== '')

  if (!hasAnySkills) return []

  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Skills & Interests',
          bold: true,
          size: 24,
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    })
  )

  // Technical Skills
  const technicalSkills = skills.technical.filter((s) => s.trim() !== '')
  if (technicalSkills.length > 0) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Technical: ${technicalSkills.join(', ')}`,
            size: 16,
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Languages
  const languages = skills.languages.filter((s) => s.trim() !== '')
  if (languages.length > 0) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Languages: ${languages.join(', ')}`,
            size: 16,
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Interests
  const interests = skills.interests.filter((s) => s.trim() !== '')
  if (interests.length > 0) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Interests: ${interests.join(', ')}`,
            size: 16,
          }),
        ],
        spacing: { after: 200 },
      })
    )
  }

  return sections
}
