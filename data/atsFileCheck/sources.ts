/**
 * What applicant tracking systems and resume parsers say breaks parsing, in their own help pages.
 * Every quote below was read on the linked page on CHECKED. "date" is the date the page shows
 * (empty when it shows none). Rows feed the checker's source notes, the matrix on
 * /ats-resume-checker and the FAQ, so a quote lives in one place.
 */

export const CHECKED = '24 Nov 2026'

export type SourceKey =
  | 'greenhouseParse'
  | 'greenhouseFormats'
  | 'lever'
  | 'workday'
  | 'icims'
  | 'workable'
  | 'textkernel'
  | 'affinda'
  | 'rchilli'
  | 'talview'
  | 'recruiterflow'
  | 'hiringthing'
  | 'mit'
  | 'buffalo'

export type Source = {
  org: string
  kind: 'ATS' | 'Parser' | 'Career office'
  label: string
  url: string
  date: string
  quotes: string[]
}

export const SOURCES: Record<SourceKey, Source> = {
  greenhouseParse: {
    org: 'Greenhouse',
    kind: 'ATS',
    label: 'Greenhouse: Unsuccessful resume parse',
    url: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse',
    date: 'updated 2 Mar 2026',
    quotes: [
      'Greenhouse Recruiting can’t parse resumes larger than 2.5MB.',
      'Complex resumes with tables, headers, and footers',
      'Resumes with the name and contact information in the header, footer, or text box',
      'Resumes that have a columned layout',
      'Resumes that include graphics, photos, or word art',
      'Resumes that are uploaded as an image, rather than a document (such as a .docx or .pdf)',
    ],
  },
  greenhouseFormats: {
    org: 'Greenhouse',
    kind: 'ATS',
    label: 'Greenhouse: Supported formats for candidate uploads',
    url: 'https://support.greenhouse.io/hc/en-us/articles/360052218132',
    date: 'updated 19 Aug 2026',
    quotes: ['.doc, .docx, .pdf, .rtf, .txt', 'up to 100 MB'],
  },
  lever: {
    org: 'Lever',
    kind: 'ATS',
    label: 'Lever: Understanding resume parsing',
    url: 'https://lever-old.zendesk.com/hc/en-us/articles/360056337151',
    date: '',
    quotes: [
      'Lever cannot parse information from image files (like JPG or PNG).',
      'If you cannot highlight text, the document is likely not parseable.',
    ],
  },
  workday: {
    org: 'Workday',
    kind: 'ATS',
    label: 'Workday: Concept: Resume Parsing',
    url: 'https://doc.workday.com/admin-guide/en-us/human-capital-management/recruiting/candidates/set-up-prospects-and-candidates/hdc1552497830785.html',
    date: '23 Jun 2023',
    quotes: [
      'Resume parsing results can vary based on resume format and order of words.',
      'For best results, use resumes that don’t have images or image-based styles.',
    ],
  },
  icims: {
    org: 'iCIMS',
    kind: 'ATS',
    label: 'iCIMS: Candidate Guide to the iCIMS Talent Platform',
    url: 'https://community.icims.com/articles/HowTo/Candidate-Guide-to-the-iCIMS-Talent-Platform',
    date: '',
    quotes: [
      'When uploading a resume, the system may populate some profile fields with the information from that resume.',
      'Review the information parsed from your resume or social account (if applicable), and fill in all required information.',
    ],
  },
  workable: {
    org: 'Workable',
    kind: 'ATS',
    label: 'Workable help: resume file types',
    url: 'https://help.workable.com/hc/en-us/articles/115012238108',
    date: '',
    quotes: [
      'Accepted file types: .pdf / .doc / .docx / .rtf / .html / .odt',
      'The file size limit for resumes is 5MB.',
    ],
  },
  textkernel: {
    org: 'Textkernel',
    kind: 'Parser',
    label: 'Textkernel developer docs: file formats',
    url: 'https://developer.textkernel.com/TKPlatform/master/file-formats',
    date: '',
    quotes: ['images take considerably longer to parse due to the additional OCR step'],
  },
  affinda: {
    org: 'Affinda',
    kind: 'Parser',
    label: 'Affinda docs: OCR',
    url: 'https://docs.affinda.com/configuration/ocr.md',
    date: '',
    quotes: [
      'Applied to documents where no text layer is found within the document.',
      'may have a corrupted or duplicated text layer',
    ],
  },
  rchilli: {
    org: 'RChilli',
    kind: 'Parser',
    label: 'RChilli help: scanned and corrupted files',
    url: 'https://help.rchilli.com/hc/en-us/articles/360011281053',
    date: '',
    quotes: [
      'we are unable to parse scanned files',
      'If the text appears jumbled or distorted, it indicates that the PDF is corrupted, and unfortunately, it cannot be repaired or parsed.',
    ],
  },
  talview: {
    org: 'Talview',
    kind: 'ATS',
    label: 'Talview: Why did my resume fail to parse',
    url: 'https://docs.talview.com/hiring-teams/recruiter/screening/diagnostics/why-did-my-resume-fail-to-parse-during-upload',
    date: '',
    quotes: [
      'The resume is uploaded in an unsupported format (e.g., image, scanned PDF).',
      'Resume contains excessive design elements (tables, graphics, charts, or multi-column layouts)',
      'avoiding headers, footers, and text boxes',
      'The file is password-protected or encrypted.',
      'File size is too large',
      'DOCX format',
    ],
  },
  recruiterflow: {
    org: 'Recruiterflow',
    kind: 'ATS',
    label: 'Recruiterflow: My resumes are not being parsed',
    url: 'https://help.recruiterflow.com/en/articles/7996760-my-resumes-are-not-being-parsed',
    date: '3 Sep 2026',
    quotes: [
      'a PDF that’s a scanned image without a text layer',
      'Password-protected files can’t be parsed - remove the protection before uploading.',
    ],
  },
  hiringthing: {
    org: 'HiringThing',
    kind: 'ATS',
    label: 'HiringThing: Why some resumes won’t parse',
    url: 'https://support.hiringthing.com/support/solutions/articles/3000128879-why-some-resumes-won-t-parse',
    date: '',
    quotes: ['Heavy use of images', 'Unique or decorative fonts'],
  },
  mit: {
    org: 'MIT CAPD',
    kind: 'Career office',
    label: 'MIT CAPD: Make your resume ATS-friendly',
    url: 'https://capd.mit.edu/resources/make-your-resume-ats-friendly/',
    date: 'updated 23 Apr 2026',
    quotes: [
      'Avoid placing information into tables or text boxes.',
      'Avoid use of graphics, icons, or images.',
      'formatting options (e.g. columns)',
    ],
  },
  buffalo: {
    org: 'University at Buffalo',
    kind: 'Career office',
    label: 'UB School of Management: ATS-Friendly Résumés',
    url: 'https://management.buffalo.edu/career-resource-center/students/preparation/tools/correspondence/resume/electronic.html',
    date: '26 Jun 2026',
    quotes: [
      'Use a PDF. Other file types (doc or docx, HTML, Open Office) may not be recognized.',
      'Do not use headers, footers, or page numbers',
      'Avoid using tables, as it may not be read',
      'Exclude images of any kind, including photos of yourself, icons and graphics of certifications.',
    ],
  },
}

/** Matrix rows: which layout problems each source names. 'yes' = named on the page we opened. */
export type Problem =
  | 'image'
  | 'columns'
  | 'tables'
  | 'headerFooter'
  | 'textBox'
  | 'graphics'
  | 'size'
  | 'password'

export const PROBLEM_LABEL: Record<Problem, string> = {
  image: 'Scanned or image file',
  columns: 'Columns',
  tables: 'Tables',
  headerFooter: 'Header / footer',
  textBox: 'Text boxes',
  graphics: 'Graphics, icons, photos',
  size: 'File size limit',
  password: 'Password',
}

export const MATRIX: { key: SourceKey; named: Problem[]; note?: string }[] = [
  {
    key: 'greenhouseParse',
    named: ['image', 'columns', 'tables', 'headerFooter', 'textBox', 'graphics', 'size'],
    note: 'Parse limit 2.5 MB; uploads up to 100 MB are still accepted',
  },
  {
    key: 'talview',
    named: [
      'image',
      'columns',
      'tables',
      'headerFooter',
      'textBox',
      'graphics',
      'size',
      'password',
    ],
    note: 'Suggests DOCX for the most reliable parsing',
  },
  { key: 'mit', named: ['columns', 'tables', 'textBox', 'graphics'] },
  {
    key: 'buffalo',
    named: ['tables', 'headerFooter', 'graphics'],
    note: 'Recommends PDF over Word',
  },
  { key: 'recruiterflow', named: ['image', 'password'] },
  { key: 'lever', named: ['image'] },
  {
    key: 'workday',
    named: ['graphics'],
    note: 'Results “vary based on resume format and order of words”',
  },
  { key: 'hiringthing', named: ['image', 'graphics'], note: 'Also “Unique or decorative fonts”' },
  { key: 'rchilli', named: ['image'], note: 'Jumbled text = corrupted PDF, cannot be parsed' },
  { key: 'affinda', named: ['image'], note: 'Runs OCR when no text layer is found' },
  { key: 'workable', named: ['size'], note: '5 MB resume limit' },
]

export const PROBLEMS = Object.keys(PROBLEM_LABEL) as Problem[]
/** How many of the sources in the matrix name each problem (computed, never typed). */
export const NAMED_BY: Record<Problem, number> = Object.fromEntries(
  PROBLEMS.map((p) => [p, MATRIX.filter((r) => r.named.includes(p)).length])
) as Record<Problem, number>
