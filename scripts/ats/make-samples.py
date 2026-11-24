"""Build the three fictional sample resumes used by /ats-resume-checker.
Run: python3 scripts/ats/make-samples.py  (writes public/samples/ats-check/*)
Same person and the same words in all three files; only the layout changes."""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import docx
from docx.shared import Pt, Cm
import os

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'samples', 'ats-check')
pdfmetrics.registerFont(TTFont('Sans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SansB', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))

NAME = 'Ananya Rao'
TITLE = 'Data Analyst'
CONTACT = ['ananya.rao@example.com', '+91 98765 43210', 'Bengaluru, India', 'linkedin.com/in/ananya-rao']
SUMMARY = 'Data analyst with 2 years in retail and fintech. SQL, Python and Power BI; turns messy sales data into weekly decisions.'
EXP = [
    ('Data Analyst, Kirana Mart (fictional)', 'Jul 2024 - Present', [
        'Built a Power BI sales dashboard used by 40 store managers every Monday.',
        'Cut the weekly reporting run from 6 hours to 45 minutes with SQL views.',
        'Found a 12% stock-out pattern in 3 regions; reorder rules changed within a month.',
    ]),
    ('Analyst Intern, PaySetu (fictional)', 'Jan 2024 - Jun 2024', [
        'Cleaned 1.2 million UPI transaction rows in Python (pandas) for a fraud review.',
        'Wrote 15 SQL checks that now run nightly on the payments warehouse.',
    ]),
]
EDU = ['B.Sc. Statistics, Christ University (fictional details), 2023', 'CGPA 8.4 / 10']
SKILLS = ['SQL (PostgreSQL, BigQuery)', 'Python (pandas)', 'Power BI', 'Excel', 'A/B testing', 'Statistics']
PROJ = ['Swiggy-style delivery time model: predicted delays within 6 minutes on a public dataset.']


def single_column(path):
    c = canvas.Canvas(path, pagesize=A4)
    c.setTitle('Ananya Rao - Data Analyst - Resume')
    w, h = A4
    x, y = 50, h - 60

    def line(t, f='Sans', s=10, gap=14):
        nonlocal y
        c.setFont(f, s)
        c.drawString(x, y, t)
        y -= gap

    line(NAME, 'SansB', 18, 22)
    line(' | '.join(CONTACT), 'Sans', 9, 22)
    line('Summary', 'SansB', 11)
    line(SUMMARY, 'Sans', 9, 20)
    line('Experience', 'SansB', 11)
    for role, dates, bullets in EXP:
        line(f'{role}    {dates}', 'SansB', 10)
        for b in bullets:
            line(f'- {b}', 'Sans', 9, 13)
        y -= 6
    line('Education', 'SansB', 11)
    for e in EDU:
        line(e, 'Sans', 9, 13)
    y -= 6
    line('Skills', 'SansB', 11)
    line(', '.join(SKILLS), 'Sans', 9, 19)
    line('Projects', 'SansB', 11)
    for p in PROJ:
        line(f'- {p}', 'Sans', 9, 13)
    c.save()


def two_column(path):
    c = canvas.Canvas(path, pagesize=A4)
    c.setTitle('Ananya Rao - Data Analyst - Resume (two-column)')
    w, h = A4
    # sidebar
    c.setFillGray(0.93)
    c.rect(0, 0, 190, h, stroke=0, fill=1)
    c.setFillGray(0)
    lx, ly = 24, h - 60
    rx, ry = 215, h - 60

    def L(t, f='Sans', s=9, gap=13):
        nonlocal ly
        c.setFont(f, s)
        c.drawString(lx, ly, t)
        ly -= gap

    def R(t, f='Sans', s=9, gap=13):
        nonlocal ry
        c.setFont(f, s)
        c.drawString(rx, ry, t)
        ry -= gap

    L(NAME, 'SansB', 15, 20)
    L(TITLE, 'Sans', 10, 24)
    L('Contact', 'SansB', 10, 15)
    for t in CONTACT:
        L(t[:30], 'Sans', 8, 12)
    ly -= 10
    L('Skills', 'SansB', 10, 15)
    for s in SKILLS:
        L(s, 'Sans', 8, 12)
    ly -= 10
    L('Education', 'SansB', 10, 15)
    L('B.Sc. Statistics', 'Sans', 8, 12)
    L('Christ University, 2023', 'Sans', 8, 12)
    L('CGPA 8.4 / 10', 'Sans', 8, 12)

    R('Profile', 'SansB', 11, 15)
    words, cur = SUMMARY.split(), ''
    for wd in words:
        if len(cur) + len(wd) > 62:
            R(cur)
            cur = ''
        cur += wd + ' '
    R(cur, gap=22)
    R('Experience', 'SansB', 11, 15)
    for role, dates, bullets in EXP:
        R(role, 'SansB', 9.5, 12)
        R(dates, 'Sans', 8, 13)
        for b in bullets:
            words, cur, first = b.split(), '', True
            for wd in words:
                if len(cur) + len(wd) > 60:
                    R(('- ' if first else '  ') + cur)
                    cur, first = '', False
                cur += wd + ' '
            R(('- ' if first else '  ') + cur)
        ry -= 8
    R('Projects', 'SansB', 11, 15)
    for p in PROJ:
        words, cur, first = p.split(), '', True
        for wd in words:
            if len(cur) + len(wd) > 60:
                R(('- ' if first else '  ') + cur)
                cur, first = '', False
            cur += wd + ' '
        R(('- ' if first else '  ') + cur)
    c.save()


def table_docx(path):
    d = docx.Document()
    sec = d.sections[0]
    sec.left_margin = sec.right_margin = Cm(1.8)
    hp = sec.header.paragraphs[0]
    hp.text = f'{NAME}  |  ' + '  |  '.join(CONTACT[:3])
    t = d.add_table(rows=1, cols=2)
    left, right = t.rows[0].cells
    left.width, right.width = Cm(5.5), Cm(12)
    left.paragraphs[0].add_run('Skills').bold = True
    for s in SKILLS:
        left.add_paragraph(s)
    left.add_paragraph().add_run('Education').bold = True
    for e in EDU:
        left.add_paragraph(e)
    right.paragraphs[0].add_run(f'{TITLE}').bold = True
    right.add_paragraph(SUMMARY)
    right.add_paragraph().add_run('Experience').bold = True
    for role, dates, bullets in EXP:
        right.add_paragraph().add_run(f'{role}, {dates}').bold = True
        for b in bullets:
            right.add_paragraph(f'- {b}')
    right.add_paragraph().add_run('Projects').bold = True
    for p in PROJ:
        right.add_paragraph(f'- {p}')
    for p in d.paragraphs:
        for r in p.runs:
            r.font.size = Pt(10)
    d.core_properties.author = 'Auto Interview AI sample'
    d.save(path)


single_column(os.path.join(OUT, 'single-column.pdf'))
two_column(os.path.join(OUT, 'two-column.pdf'))
table_docx(os.path.join(OUT, 'table-and-header.docx'))
print('ok')
