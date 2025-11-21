import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  TabStopType,
  TabStopPosition,
  Table,
  TableRow,
  TableCell,
  WidthType,
  IPropertiesOptions,
} from 'docx'
import { saveAs } from 'file-saver'
import { ResumeData } from '../lib/resumeStore'

export async function generateDOCX(
  resumeData: ResumeData,
  template: 'harvard' | 'lbs' | 'stanford' = 'harvard'
) {
  try {
    const doc = new Document({
      // Set default styles: 1.15 line spacing across the document
      styles: {
        default: {
          document: {
            paragraph: {
              spacing: {
                line: 276, // 1.15 * 240 twips (240 = single line)
              },
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                // US Letter size: 21.59 cm x 27.94 cm (8.5" x 11")
                // Dimensions in twips (twentieths of a point)
                // 8.5 inches = 8.5 * 72 points * 20 twips = 12,240 twips
                // 11 inches = 11 * 72 points * 20 twips = 15,840 twips
                width: 12240, // 8.5 inches in twips
                height: 15840, // 11 inches in twips
              },
              margin: {
                top: 400, // 0.2 inches
                right: 400, // 0.2 inches
                bottom: 400, // 0.2 inches
                left: 400, // 0.2 inches
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
                  ...createLBSCertificationsSection(resumeData.certifications),
                  ...createLBSSkillsSection(resumeData.skills),
                ]
              : template === 'stanford'
                ? ([
                    // Stanford Template Structure
                    ...createStanfordHeaderSection(resumeData.contact),
                    ...createStanfordExperienceSection(resumeData.experience),
                    ...createStanfordEducationSection(resumeData.education),
                    ...createStanfordLeadershipSection(resumeData.leadership),
                    ...createStanfordProjectsSection(resumeData.projects),
                    ...createStanfordCertificationsSection(resumeData.certifications),
                    ...createStanfordSkillsSection(resumeData.skills),
                  ] as any)
                : [
                    // Harvard Template Structure
                    ...createHeaderSection(resumeData.contact),
                    ...createEducationSection(resumeData.education),
                    ...createExperienceSection(resumeData.experience),
                    ...createLeadershipSection(resumeData.leadership),
                    ...createProjectsSection(resumeData.projects),
                    ...createCertificationsSection(resumeData.certifications),
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
          size: 28,
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
      spacing: { after: 75 },
    }),
  ]
}

function createLBSHeaderSection(contact: ResumeData['contact']) {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: contact.name || '',
          bold: true,
          size: 24, // 12pt
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
          text: [
            contact.location || '',
            contact.phone || '',
            contact.email || '',
            contact.linkedin || '',
          ]
            .filter(Boolean)
            .join(' • '),
          size: 20, // 10pt
          color: '000000',
          font: 'Arial',
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
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 75, after: 100 },
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
        // Create table for proper 2x2 structure
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            // Row 1: University name and location
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: edu.university || '',
                          bold: true,
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: edu.location || '',
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
            // Row 2: Degree, Major, GPA and date
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: [edu.degree || '', edu.major || '', edu.gpa || '']
                            .filter(Boolean)
                            .join(', '),
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`,
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
          ],
        }),
      ])
      .flat(),
  ]
}

function createLBSEducationSection(education: ResumeData['education']) {
  if (!education.length) return []

  const paragraphs: (Paragraph | Table)[] = [
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

  education.slice(0, 3).forEach((edu) => {
    if (edu.university || edu.degree) {
      // Format completion date as MM/YYYY
      const completionDate = formatEducationCompletionDate(edu.graduationMonth, edu.graduationYear)

      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: completionDate,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${edu.university || ''}, ${edu.location || ''}`,
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
              text: `\t${edu.degree || ''} in ${edu.major || ''}`,
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
          ],
          spacing: { after: 100 },
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

  return paragraphs as any
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
      spacing: { before: 75, after: 100 },
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
        // Create table for proper 2x2 structure
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            // Row 1: Company name and location
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: exp.company || '',
                          bold: true,
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: exp.location || '',
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
            // Row 2: Job title and date
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: exp.jobTitle || '',
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: (() => {
                            const startDate = [exp.startMonth || '', exp.startYear || '']
                              .filter(Boolean)
                              .join(' ')
                            const endDate = exp.isCurrent
                              ? 'Present'
                              : [exp.endMonth || '', exp.endYear || ''].filter(Boolean).join(' ')
                            return [startDate, endDate].filter(Boolean).join(' – ')
                          })(),
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
          ],
        }),
        // Bullet points with proper Word bullets and bold formatting
        ...(exp.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 25 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createLBSExperienceSection(experience: ResumeData['experience']): Paragraph[] {
  if (!experience || experience.length === 0) return []

  const paragraphs: (Paragraph | Table)[] = [
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
              text: `${exp.startYear || ''} - ${exp.isCurrent ? 'Present' : exp.endYear || ''}`,
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
                spacing: { after: isLastBullet ? 150 : 25 }, // More spacing after last bullet
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
            children: [new TextRun({ text: '', size: 20 })],
            spacing: { after: 150 },
          })
        )
      }
    }
  })

  return paragraphs as any
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
      spacing: { before: 75, after: 100 },
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
        // Create table for proper 2x2 structure
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            // Row 1: Organization name and location
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: lead.organization || '',
                          bold: true,
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: lead.location || '',
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
            // Row 2: Title and date
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: lead.title || '',
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: (() => {
                            const startDate = [lead.startMonth || '', lead.startYear || '']
                              .filter(Boolean)
                              .join(' ')
                            const endDate = lead.isCurrent
                              ? 'Present'
                              : [lead.endMonth || '', lead.endYear || ''].filter(Boolean).join(' ')
                            return [startDate, endDate].filter(Boolean).join(' – ')
                          })(),
                          size: 22,
                          color: '000000',
                          font: 'Calibri',
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
          ],
        }),
        // Bullet points with proper Word bullets and bold formatting
        ...(lead.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 25 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createLBSLeadershipSection(leadership: ResumeData['leadership']): Paragraph[] {
  if (!leadership || leadership.length === 0) return []

  const paragraphs: (Paragraph | Table)[] = [
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
              text: `${lead.startYear || ''} - ${lead.isCurrent ? 'Present' : lead.endYear || ''}`,
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
                spacing: { after: isLastBullet ? 150 : 25 }, // More spacing after last bullet
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
            children: [new TextRun({ text: '', size: 20 })],
            spacing: { after: 150 },
          })
        )
      }
    }
  })

  return paragraphs as any
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
      spacing: { before: 75, after: 100 },
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
      .map((proj) => [
        // Project title and duration row
        new Paragraph({
          children: [
            new TextRun({
              text: proj.projectName || '',
              bold: true,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: '', // ProjectEntry doesn't have duration field
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
        // Project description removed - ProjectEntry doesn't have description field
        // Bullet points with proper Word bullets and bold formatting
        ...(proj.bullets || []).map(
          (bullet) =>
            new Paragraph({
              children: parseBoldText(bullet),
              indent: { left: 400 },
              spacing: { after: 25 },
              bullet: {
                level: 0,
              },
            })
        ),
      ])
      .flat(),
  ]
}

function createLBSProjectsSection(projects: ResumeData['projects']): Paragraph[] {
  if (!projects || projects.length === 0) return []

  const paragraphs: (Paragraph | Table)[] = [
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

  projects.slice(0, 2).forEach((proj) => {
    if (proj.projectName) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '', // ProjectEntry doesn't have duration field
              bold: true,
              size: 20, // 10pt
              color: '000000',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${proj.projectName || ''}`,
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
      if (proj.bullets && proj.bullets.length > 0) {
        proj.bullets.slice(0, 15).forEach((bullet, index) => {
          if (bullet.trim()) {
            const isLastBullet = index === proj.bullets.slice(0, 15).length - 1
            paragraphs.push(
              new Paragraph({
                children: parseBoldText(bullet),
                bullet: { level: 0 },
                spacing: { after: isLastBullet ? 150 : 25 }, // More spacing after last bullet
                indent: {
                  left: 1440, // 1 inch indentation
                },
              })
            )
          }
        })
      } else {
        // If no bullets, add spacing after the project title by adding an empty paragraph
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: '', size: 20 })],
            spacing: { after: 150 },
          })
        )
      }
    }
  })

  return paragraphs as any
}

function createCertificationsSection(certifications: ResumeData['certifications']) {
  if (!certifications.bullets.length || certifications.bullets.every((bullet) => !bullet.trim()))
    return []

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Certifications',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 75, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...certifications.bullets
      .filter((bullet) => bullet.trim())
      .map(
        (bullet) =>
          new Paragraph({
            children: parseBoldText(bullet),
            indent: { left: 400 },
            spacing: { before: 75, after: 100 },
            bullet: { level: 0 },
          })
      ),
  ]
}

function createLBSCertificationsSection(certifications: ResumeData['certifications']): Paragraph[] {
  if (!certifications.bullets.length || certifications.bullets.every((bullet) => !bullet.trim()))
    return []

  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'CERTIFICATIONS',
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

  // Add certification entries with dynamic 2-column structure
  certifications.bullets
    .filter((bullet) => bullet.trim())
    .forEach((bullet, index) => {
      const isLastBullet = index === certifications.bullets.filter((b) => b.trim()).length - 1

      // Dynamic date and certification name row (only if they exist)
      // Since we don't have these fields, this will always be empty and no row will be created
      const certificationYear = '' // Placeholder for future year field
      const certificationName = '' // Placeholder for future certification name field

      if (certificationYear && certificationName) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: certificationYear,
                bold: true,
                size: 20, // 10pt
                color: '000000',
                font: 'Arial',
              }),
              new TextRun({
                text: `\t${certificationName}`,
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
      }

      // Always add bullets with proper indentation (same as other sections)
      paragraphs.push(
        new Paragraph({
          children: parseBoldText(bullet),
          bullet: { level: 0 },
          spacing: { after: isLastBullet ? 150 : 25 }, // More spacing after last bullet
          indent: {
            left: 1440, // 1 inch indentation to match other sections
          },
        })
      )
    })

  return paragraphs as any
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
          text: 'Skills & Interests',
          bold: true,
          size: 22,
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 75, after: 100 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...(skills.technical.length
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `Technical: ${skills.technical.join(', ')}`,
                size: 22,
                color: '000000',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 150 },
          }),
        ]
      : []),
    ...(skills.languages.length
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
            spacing: { after: 150 },
          }),
        ]
      : []),
    ...(skills.interests.length
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
            spacing: { after: 150 },
          }),
        ]
      : []),
  ]
}

function createLBSSkillsSection(skills: ResumeData['skills']): Paragraph[] {
  if (!skills.technical.length && !skills.languages.length && !skills.interests.length) {
    return []
  }

  const paragraphs: (Paragraph | Table)[] = []

  // Technical Skills
  if (skills.technical.length) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Technical Skills:',
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
          new TextRun({
            text: ` ${skills.technical.join(', ')}`,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Languages
  if (skills.languages.length) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Languages:',
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
          new TextRun({
            text: ` ${skills.languages.join(', ')}`,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Interests
  if (skills.interests.length) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Interests:',
            bold: true,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
          new TextRun({
            text: ` ${skills.interests.join(', ')}`,
            size: 20, // 10pt
            color: '000000',
            font: 'Arial',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  return paragraphs as any
}

// Helper function to parse bold text (text with **bold** markers)
function parseBoldText(text: string): TextRun[] {
  if (!text) return []

  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      return new TextRun({
        text: part.slice(2, -2), // Remove ** markers
        bold: true,
        size: 22,
        color: '000000',
        font: 'Calibri',
      })
    } else {
      // Normal text
      return new TextRun({
        text: part,
        size: 22,
        color: '000000',
        font: 'Calibri',
      })
    }
  })
}

// Helper function to format education completion date as MM/YYYY
function formatEducationCompletionDate(graduationMonth?: string, graduationYear?: string): string {
  if (!graduationMonth || !graduationYear) return ''

  // Convert month name to number
  const monthMap: { [key: string]: string } = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  }

  const monthNumber = monthMap[graduationMonth] || graduationMonth
  return `${monthNumber}/${graduationYear}`
}

// Stanford Template Functions
function createStanfordHeaderSection(contact: ResumeData['contact']): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: contact.name || '',
          bold: true,
          size: 28, // 14pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${contact.location || ''} • ${contact.phone || ''} • ${contact.email || ''} • ${contact.linkedin || ''}`,
          size: 22, // 11pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  ]
}

function createStanfordExperienceSection(
  experience: ResumeData['experience']
): (Paragraph | Table)[] {
  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Experience',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Add up to 4 experience entries
  for (let i = 0; i < Math.min(4, experience.length); i++) {
    const exp = experience[i]
    if (!exp.company) continue

    // Create table for proper 2x2 structure
    const endDate = exp.isCurrent ? 'Present' : `${exp.endMonth || ''} ${exp.endYear || ''}`
    const dateRange = `${exp.startMonth || ''} ${exp.startYear || ''}– ${endDate}`

    paragraphs.push(
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          // Row 1: Company name and location
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: exp.company || '',
                        bold: true,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: exp.location || '',
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
          // Row 2: Job title and date
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: exp.jobTitle || '',
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: dateRange,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
        ],
      })
    )

    // Bullet points (up to 15, dynamic - no blank bullets)
    exp.bullets
      ?.filter((bullet) => bullet.trim())
      .slice(0, 15)
      .forEach((bullet, index) => {
        paragraphs.push(
          new Paragraph({
            children: parseBoldText(bullet),
            bullet: { level: 0 },
            spacing: { after: 25, line: 276 }, // 1.15 line spacing
            indent: { left: 400 },
          })
        )
      })

    // No spacing between experience entries
  }

  return paragraphs as any
}

function createStanfordEducationSection(education: ResumeData['education']): (Paragraph | Table)[] {
  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Education',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Add up to 4 education entries
  for (let i = 0; i < Math.min(4, education.length); i++) {
    const edu = education[i]
    if (!edu.university) continue

    // Create table for proper 2x2 structure
    paragraphs.push(
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          // Row 1: University name and location
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: edu.university || '',
                        bold: true,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: edu.location || '',
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
          // Row 2: Degree, Major, GPA and date
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: [edu.degree || '', edu.major || '', edu.gpa || '']
                          .filter(Boolean)
                          .join(', '),
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
        ],
      })
    )
  }

  return paragraphs as any
}

function createStanfordLeadershipSection(
  leadership: ResumeData['leadership']
): (Paragraph | Table)[] {
  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Positions of Responsibility',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Add up to 2 leadership entries
  for (let i = 0; i < Math.min(2, leadership.length); i++) {
    const lead = leadership[i]
    if (!lead.organization) continue

    // Create table for proper 2x2 structure
    const endDate = lead.isCurrent ? 'Present' : `${lead.endMonth || ''} ${lead.endYear || ''}`
    const dateRange = `${lead.startMonth || ''} ${lead.startYear || ''}– ${endDate}`

    paragraphs.push(
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          // Row 1: Organization name and location
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: lead.organization || '',
                        bold: true,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: lead.location || '',
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
          // Row 2: Title and date
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: lead.title || '',
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: dateRange,
                        size: 22,
                        color: '000000',
                        font: 'Calibri',
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
        ],
      })
    )

    // Bullet points (up to 15, dynamic - no blank bullets)
    lead.bullets
      ?.filter((bullet) => bullet.trim())
      .slice(0, 15)
      .forEach((bullet, index) => {
        paragraphs.push(
          new Paragraph({
            children: parseBoldText(bullet),
            bullet: { level: 0 },
            spacing: { after: 25, line: 276 }, // 1.15 line spacing
            indent: { left: 400 },
          })
        )
      })

    // No spacing between leadership entries
  }

  return paragraphs as any
}

function createStanfordProjectsSection(projects: ResumeData['projects']): Paragraph[] {
  // Check if there are any projects with content
  const hasProjects = projects.some(
    (project) =>
      project.projectName &&
      project.projectName.trim() &&
      project.bullets &&
      project.bullets.some((bullet) => bullet.trim())
  )

  if (!hasProjects) return []

  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Projects',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Add up to 2 project entries
  for (let i = 0; i < Math.min(2, projects.length); i++) {
    const project = projects[i]
    if (!project.projectName) continue

    // Project name
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.projectName || '',
            bold: true,
            size: 22, // 11pt
            color: '000000',
            font: 'Calibri',
          }),
        ],
        spacing: { after: 100, line: 276 }, // 1.15 line spacing
      })
    )

    // Bullet points (up to 15, dynamic - no blank bullets)
    project.bullets
      ?.filter((bullet) => bullet.trim())
      .slice(0, 15)
      .forEach((bullet, index) => {
        paragraphs.push(
          new Paragraph({
            children: parseBoldText(bullet),
            bullet: { level: 0 },
            spacing: { after: 25, line: 276 }, // 1.15 line spacing
            indent: { left: 400 },
          })
        )
      })

    // No spacing between project entries
  }

  return paragraphs as any
}

function createStanfordCertificationsSection(
  certifications: ResumeData['certifications']
): Paragraph[] {
  if (!certifications.bullets.length || certifications.bullets.every((bullet) => !bullet.trim()))
    return []

  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Certifications',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Add up to 15 certification bullets (dynamic - no blank bullets)
  certifications.bullets
    .filter((bullet) => bullet.trim())
    .slice(0, 15)
    .forEach((bullet, index) => {
      paragraphs.push(
        new Paragraph({
          children: parseBoldText(bullet),
          bullet: { level: 0 },
          spacing: { after: 50, line: 276 }, // 1.15 line spacing
          indent: { left: 400 },
        })
      )
    })

  return paragraphs as any
}

function createStanfordSkillsSection(skills: ResumeData['skills']): Paragraph[] {
  // Check if there are any skills with content
  const hasTechnicalSkills = skills.technical && skills.technical.some((skill) => skill.trim())
  const hasLanguages = skills.languages && skills.languages.some((lang) => lang.trim())
  const hasInterests = skills.interests && skills.interests.some((interest) => interest.trim())

  if (!hasTechnicalSkills && !hasLanguages && !hasInterests) return []

  const paragraphs: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Skills & Interests',
          size: 24, // 12pt
          color: '000000',
          font: 'Calibri',
        }),
      ],
      spacing: { before: 100, after: 25 },
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

  // Technical Skills
  if (skills.technical && skills.technical.length > 0) {
    const techSkills = skills.technical.filter((skill) => skill.trim()).join(', ')
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Technical Skills: ',
            bold: true,
            size: 22, // 11pt
            color: '000000',
            font: 'Calibri',
          }),
          new TextRun({
            text: techSkills,
            size: 22,
            color: '000000',
            font: 'Calibri',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Languages
  if (skills.languages && skills.languages.length > 0) {
    const languages = skills.languages.filter((lang) => lang.trim()).join(', ')
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Languages: ',
            bold: true,
            size: 22, // 11pt
            color: '000000',
            font: 'Calibri',
          }),
          new TextRun({
            text: languages,
            size: 22,
            color: '000000',
            font: 'Calibri',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  // Interests
  if (skills.interests && skills.interests.length > 0) {
    const interests = skills.interests.filter((interest) => interest.trim()).join(', ')
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Interests: ',
            bold: true,
            size: 22, // 11pt
            color: '000000',
            font: 'Calibri',
          }),
          new TextRun({
            text: interests,
            size: 22,
            color: '000000',
            font: 'Calibri',
          }),
        ],
        spacing: { after: 100 },
      })
    )
  }

  return paragraphs as any
}
