import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from 'docx'
import { saveAs } from 'file-saver'
import { ResumeData } from '../lib/resumeStore'

export async function generateDOCX(
  resumeData: ResumeData,
  template: 'harvard' | 'lbs' = 'harvard'
) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
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
      spacing: { after: 400 },
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
        // University name and location row
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
        // Degree and date row
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree || ''} in ${edu.major || ''}`,
              size: 22,
              color: '000000',
              font: 'Calibri',
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`,
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
        // GPA row
        ...(edu.gpa
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `GPA: ${edu.gpa}`,
                    size: 22,
                    color: '000000',
                    font: 'Calibri',
                  }),
                ],
                spacing: { after: 100 },
              }),
            ]
          : []),
      ])
      .flat(),
  ]
}

function createLBSEducationSection(education: ResumeData['education']) {
  if (!education.length) return []

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
            children: [new TextRun({ text: '', size: 20 })],
            spacing: { after: 150 },
          })
        )
      }
    }
  })

  return paragraphs
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
            children: [new TextRun({ text: '', size: 20 })],
            spacing: { after: 150 },
          })
        )
      }
    }
  })

  return paragraphs
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
                spacing: { after: isLastBullet ? 150 : 50 }, // More spacing after last bullet
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

  return paragraphs
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
    ...certifications.bullets
      .filter((bullet) => bullet.trim())
      .map(
        (bullet) =>
          new Paragraph({
            children: parseBoldText(bullet),
            indent: { left: 400 },
            spacing: { before: 100, after: 100 },
            bullet: { level: 0 },
          })
      ),
  ]
}

function createLBSCertificationsSection(certifications: ResumeData['certifications']): Paragraph[] {
  if (!certifications.bullets.length || certifications.bullets.every((bullet) => !bullet.trim()))
    return []

  const paragraphs: Paragraph[] = [
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
          spacing: { after: isLastBullet ? 150 : 50 }, // More spacing after last bullet
          indent: {
            left: 1440, // 1 inch indentation to match other sections
          },
        })
      )
    })

  return paragraphs
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
            spacing: { after: 100 },
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
            spacing: { after: 100 },
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
            spacing: { after: 100 },
          }),
        ]
      : []),
  ]
}

function createLBSSkillsSection(skills: ResumeData['skills']): Paragraph[] {
  if (!skills.technical.length && !skills.languages.length && !skills.interests.length) {
    return []
  }

  const paragraphs: Paragraph[] = []

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

  return paragraphs
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
