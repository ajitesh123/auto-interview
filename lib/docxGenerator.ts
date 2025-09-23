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

export async function generateDocx(
  resumeData: ResumeData,
  template: 'harvard' | 'lbs' = 'harvard'
): Promise<void> {
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
          children:
            template === 'lbs'
              ? [
                  // LBS Template Structure
                  ...createLBSHeaderSection(resumeData.contact),
                  ...createLBSEducationSection(resumeData.education),
                  ...createLBSExperienceSection(resumeData.experience),
                  ...createLBSLeadershipSection(resumeData.leadership),
                  ...createLBSProjectsSection(resumeData.projects),
                  ...createLBSSkillsSection(resumeData.skills),
                ]
              : [
                  // Harvard Template Structure
                  ...createHeaderSection(resumeData.contact),
                  ...createEducationSection(resumeData.education),
                  ...createExperienceSection(resumeData.experience),
                  ...createLeadershipSection(resumeData.leadership),
                  ...createProjectsSection(resumeData.projects),
                  ...createOtherSection(resumeData.other1),
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
      spacing: { after: 200 },
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
      spacing: { after: 200 },
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
      spacing: { before: 200, after: 200 },
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
      spacing: { before: 200, after: 200 },
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
      spacing: { before: 200, after: 200 },
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
      spacing: { before: 200, after: 200 },
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
      spacing: { before: 200, after: 200 },
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
      spacing: { before: 200, after: 200 },
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

// LBS Template Functions

function createLBSHeaderSection(contact: ResumeData['contact']): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: contact.name || '',
          bold: true,
          size: 22, // 11pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: contact.email || '',
          size: 20, // 10pt
          color: '0000FF',
          font: 'Arial',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: contact.phone || '',
          size: 20, // 10pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: contact.linkedin || '',
          size: 20, // 10pt
          color: '0000FF',
          font: 'Arial',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  ]
}

function createLBSEducationSection(education: ResumeData['education']): Paragraph[] {
  if (!education || education.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'EDUCATION',
          bold: true,
          size: 22, // 11pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      spacing: { after: 200 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  ]

  education.slice(0, 4).forEach((edu) => {
    if (edu.university || edu.degree) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.graduationYear || ''} – 2030`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${edu.university || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `\t${edu.degree || ''}${edu.major ? `, ${edu.major}` : ''}`,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 250 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        })
      )
    }
  })

  return paragraphs
}

function createLBSExperienceSection(experience: ResumeData['experience']): Paragraph[] {
  if (!experience || experience.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'BUSINESS EXPERIENCE',
          bold: true,
          size: 22, // 11pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      spacing: { after: 200 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  ]

  experience.slice(0, 3).forEach((exp) => {
    if (exp.company || exp.jobTitle) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.startYear || ''} - ${exp.endYear || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${exp.company || ''}, ${exp.location || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `\t${exp.jobTitle || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        })
      )

      // Add bullet points
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.slice(0, 15).forEach((bullet, index) => {
          if (bullet.trim()) {
            const isLastBullet = index === exp.bullets.slice(0, 15).length - 1
            paragraphs.push(
              new Paragraph({
                children: parseBoldText(bullet),
                bullet: { level: 0 },
                spacing: { after: isLastBullet ? 150 : 50 }, // More spacing after last bullet
                indent: {
                  left: 1440, // 1 inch indentation
                },
              })
            )
          }
        })
      } else {
        // If no bullets, add spacing after the job title by adding an empty paragraph
        paragraphs.push(
          new Paragraph({
            children: [],
            spacing: { after: 100 },
          })
        )
      }
    }
  })

  return paragraphs
}

function createLBSLeadershipSection(leadership: ResumeData['leadership']): Paragraph[] {
  if (!leadership || leadership.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'LEADERSHIP & ACTIVITIES',
          bold: true,
          size: 22, // 11pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      spacing: { after: 200 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  ]

  leadership.slice(0, 2).forEach((lead) => {
    if (lead.organization || lead.title) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${lead.startYear || ''} - ${lead.endYear || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${lead.organization || ''}, ${lead.location || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `\t${lead.title || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: TabStopType.LEFT,
              position: 1440, // 1 inch
            },
          ],
        })
      )

      // Add bullet points
      if (lead.bullets && lead.bullets.length > 0) {
        lead.bullets.slice(0, 15).forEach((bullet, index) => {
          if (bullet.trim()) {
            const isLastBullet = index === lead.bullets.slice(0, 15).length - 1
            paragraphs.push(
              new Paragraph({
                children: parseBoldText(bullet),
                bullet: { level: 0 },
                spacing: { after: isLastBullet ? 150 : 50 }, // More spacing after last bullet
                indent: {
                  left: 1440, // 1 inch indentation
                },
              })
            )
          }
        })
      } else {
        // If no bullets, add spacing after the title by adding an empty paragraph
        paragraphs.push(
          new Paragraph({
            children: [],
            spacing: { after: 100 },
          })
        )
      }
    }
  })

  return paragraphs
}

function createLBSSkillsSection(skills: ResumeData['skills']): Paragraph[] {
  const paragraphs: Paragraph[] = []

  // Only add Technical Skills if there are skills to display
  if (
    skills.technical &&
    skills.technical.length > 0 &&
    skills.technical.some((skill) => skill.trim())
  ) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Technical Skills: ${skills.technical.join(', ')}`,
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 50 },
      })
    )
  }

  // Only add Languages if there are languages to display
  if (
    skills.languages &&
    skills.languages.length > 0 &&
    skills.languages.some((lang) => lang.trim())
  ) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Languages: ${skills.languages.join(', ')}`,
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 50 },
      })
    )
  }

  // Only add Interests if there are interests to display
  if (
    skills.interests &&
    skills.interests.length > 0 &&
    skills.interests.some((interest) => interest.trim())
  ) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Interests: ${skills.interests.join(', ')}`,
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 50 },
      })
    )
  }

  return paragraphs
}

function createLBSProjectsSection(projects: ResumeData['projects']): Paragraph[] {
  if (!projects || projects.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'PROJECTS',
          bold: true,
          size: 22, // 11pt
          color: '000000',
          font: 'Arial',
        }),
      ],
      spacing: { after: 200 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  ]

  projects.slice(0, 2).forEach((project) => {
    if (project.projectName || project.bullets?.length) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.projectName || '',
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 50 },
        })
      )

      // Add bullet points if available
      if (project.bullets && project.bullets.length > 0) {
        project.bullets.forEach((bullet, index) => {
          if (bullet.trim()) {
            const isLastBullet = index === project.bullets.length - 1
            paragraphs.push(
              new Paragraph({
                children: parseBoldText(bullet),
                bullet: { level: 0 },
                spacing: { after: isLastBullet ? 150 : 50 }, // More spacing after last bullet
                indent: {
                  left: 1440, // 1 inch indentation
                },
              })
            )
          }
        })
      } else {
        // If no bullets, add spacing after the project name by adding an empty paragraph
        paragraphs.push(
          new Paragraph({
            children: [],
            spacing: { after: 100 },
          })
        )
      }
    }
  })

  return paragraphs
}
