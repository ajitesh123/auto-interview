// Builds one Word resume template per role from the role kits' sample resumes:
//   <slug>-resume-template.docx  (one-page Indian table CV format, based on Rahul's template;
//   Rahul chose this format for every role on Nov 6, 2026)
// Usage: node build.js <samples.json> <campus.json> <outDir>
const fs = require('fs')
const path = require('path')
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  BorderStyle,
  AlignmentType,
  LevelFormat,
  TabStopType,
  VerticalAlign,
  TableLayoutType,
} = require('docx')

const [, , samplesPath, campusPath, outDir] = process.argv
const SAMPLES = JSON.parse(fs.readFileSync(samplesPath, 'utf8'))
const CAMPUS = JSON.parse(fs.readFileSync(campusPath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

const A4 = { width: 11906, height: 16838 }
const clean = (s) => s.replace(/\s*\((sample|fictional)\)/gi, '').trim()
const PHONE = '+91 98765 XXXXX'
function contactParts(contact) {
  const parts = contact.split(' · ')
  const city = parts[0]
  const rest = parts.slice(1)
  const iEmail = rest.findIndex((x) => x.includes('@'))
  rest.splice(iEmail + 1, 0, PHONE)
  return [...rest, city]
}
const NOTE =
  'SAMPLE: every name, company, college and number here is made up to show what good looks like. Replace each line with your own, then delete this note.'

/* ------------------------------ Campus / MBA table format ------------------------------ */
const CF = 'Garamond'
const M = 567
const W = A4.width - 2 * M // 10772
const GREY = 'BFBFBF'
const LIGHT = 'E7E6E6'
const line = { style: BorderStyle.SINGLE, size: 6, color: '000000' }
const borders = { top: line, bottom: line, left: line, right: line }
const cellMargins = { top: 40, bottom: 40, left: 90, right: 90 }

const run = (text, o = {}) =>
  new TextRun({
    text,
    font: CF,
    size: o.size ?? 20,
    bold: o.bold,
    italics: o.italics,
    color: o.color,
  })
const p = (children, o = {}) =>
  new Paragraph({
    children: Array.isArray(children) ? children : [children],
    alignment: o.align,
    spacing: { before: 0, after: 0 },
    tabStops: o.tabs,
    numbering: o.bullet ? { reference: 'cv-bullets', level: 0 } : undefined,
  })

function cell(children, width, o = {}) {
  return new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: { size: width, type: WidthType.DXA },
    borders,
    margins: cellMargins,
    verticalAlign: o.vAlign ?? VerticalAlign.CENTER,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    columnSpan: o.span,
  })
}
function table(cols, rows) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: cols,
    layout: TableLayoutType.FIXED,
    rows,
  })
}
const sectionBar = (title, cols) =>
  new TableRow({
    children: [cell(p(run(title, { bold: true, size: 21 })), W, { fill: GREY, span: cols })],
  })

function educationTable(rows) {
  const cols = [1700, 4572, 1500, 3000]
  const head = new TableRow({
    children: ['', 'College / Board', 'Marks', 'Achievement'].map((t, i) =>
      cell(
        p(run(t, { bold: true }), { align: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT }),
        cols[i],
        { fill: LIGHT }
      )
    ),
  })
  const body = rows.map(
    (r) =>
      new TableRow({
        children: r.map((t, i) =>
          cell(
            p(run(t, { bold: i === 0 }), {
              align: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
            }),
            cols[i],
            { fill: i === 0 ? LIGHT : undefined }
          )
        ),
      })
  )
  return table(cols, [sectionBar('Educational Background', 4), head, ...body])
}

function jobRows(org, role, dates, items) {
  const cols = [1900, W - 1900]
  const tabs = [
    { type: TabStopType.CENTER, position: Math.round((W - 180) / 2) },
    { type: TabStopType.RIGHT, position: W - 180 },
  ]
  const headRow = new TableRow({
    children: [
      cell(
        p(
          [
            run(org, { bold: true }),
            run('\t' + role, { bold: true }),
            run('\t(' + dates + ')', { bold: true }),
          ],
          { tabs }
        ),
        W,
        { fill: LIGHT, span: 2 }
      ),
    ],
  })
  const rows = items.map(
    ([label, text]) =>
      new TableRow({
        children: [
          cell(p(run(label, { bold: true, size: 19 })), cols[0], { fill: LIGHT }),
          cell(p(run(text), { bullet: true }), cols[1]),
        ],
      })
  )
  return [headRow, ...rows]
}

function datedRows(items) {
  const cols = [1900, W - 1900 - 1100, 1100]
  return items.map(
    ([label, text, year]) =>
      new TableRow({
        children: [
          cell(p(run(label, { bold: true, size: 19 })), cols[0], { fill: LIGHT }),
          cell(p(run(text), { bullet: true }), cols[1]),
          cell(p(run(year, { size: 19 }), { align: AlignmentType.CENTER }), cols[2]),
        ],
      })
  )
}

function campusDoc(slug) {
  const s = SAMPLES[slug].sample
  const c = CAMPUS[slug]
  const expCols = [1900, W - 1900]
  const expRows = [sectionBar('Professional Experience', 2)]
  s.experience.forEach((e, i) => {
    const labels = c.labels[i] || []
    expRows.push(
      ...jobRows(
        clean(e.org).replace(/,.*$/, ''),
        e.role,
        e.dates.replace('–', '–'),
        e.bullets.map((b, j) => [labels[j] || '', b])
      )
    )
  })
  const [iOrg, iRole, iDates, iItem] = c.internship
  expRows.push(...jobRows(clean(iOrg), iRole, iDates, [iItem]))
  const datedCols = [1900, W - 3000, 1100]
  const children = [
    new Paragraph({
      children: [run(NOTE, { italics: true, size: 16, color: '7F7F7F' })],
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [
        run(clean(s.name), { bold: true, size: 28 }),
        run('  |  ' + contactParts(s.contact).join('  |  '), { size: 19 }),
      ],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [run(s.headline, { italics: true, size: 20 })],
      spacing: { after: 140 },
    }),
    educationTable(c.education),
    table(expCols, expRows),
    table(datedCols, [sectionBar('Co-curricular and Projects', 3), ...datedRows(c.cocurricular)]),
    table(datedCols, [
      sectionBar('Extra-Curricular Activities', 3),
      ...datedRows(c.extracurricular),
    ]),
    table(datedCols, [sectionBar('Positions of Responsibility', 3), ...datedRows(c.por)]),
    table(
      [1900, W - 1900],
      [
        sectionBar('Skills and Tools', 2),
        new TableRow({
          children: [
            cell(p(run('Skills', { bold: true, size: 19 })), 1900, { fill: LIGHT }),
            cell(p(run(s.skills.join(' · '))), W - 1900),
          ],
        }),
      ]
    ),
  ]
  return new Document({
    creator: 'Auto Interview AI (autointerviewai.com)',
    title: `${SAMPLES[slug].roleName} resume template`,
    styles: { default: { document: { run: { font: CF, size: 20 } } } },
    numbering: {
      config: [
        {
          reference: 'cv-bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 240, hanging: 200 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { size: A4, margin: { top: M, bottom: M, left: M, right: M } } },
        children,
      },
    ],
  })
}

;(async () => {
  for (const slug of Object.keys(SAMPLES)) {
    if (!CAMPUS[slug]) {
      console.warn(`skip ${slug}: add it to data/roleKits/campusResumes.json`)
      continue
    }
    const buf = await Packer.toBuffer(campusDoc(slug))
    const f = path.join(outDir, `${slug}-resume-template.docx`)
    fs.writeFileSync(f, buf)
    console.log(f, buf.length)
  }
})()
