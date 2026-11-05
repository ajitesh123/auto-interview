# Role resume templates (Word)

Builds one `.docx` per role hub into `public/downloads/resume-templates/<slug>-resume-template.docx`.

Format: the one-page Indian table CV (Rahul's template, chosen for every role on Nov 6, 2026):
education with marks, experience with a label per bullet, co-curriculars, extra-curriculars,
positions of responsibility and skills. Each file is filled with a fictional sample for the role:

- `data/roleKits/<slug>.ts` → `resume.sample` (summary, experience bullets, skills)
- `data/roleKits/campusResumes.json` (education rows, bullet labels, internship, activities, positions)

The page preview (`components/roleKits/CampusResumePreview.tsx`) reads the same data, so the page and the file match.

Regenerate after editing a kit or adding a role (add the role to `campusResumes.json` first):

```bash
npx tsx --tsconfig tsconfig.json scripts/resume-templates/dump-samples.ts /tmp/samples.json
node scripts/resume-templates/build.js /tmp/samples.json data/roleKits/campusResumes.json public/downloads/resume-templates
```

Then convert one file to PDF with LibreOffice and check it is still one page.
