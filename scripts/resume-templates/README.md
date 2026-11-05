# Role resume templates (Word)

Builds two `.docx` templates per role hub into `public/downloads/resume-templates/`:

- `<slug>-resume-template-ats.docx`: single column, standard headings, no tables. For online applications.
- `<slug>-resume-template-campus.docx`: the Indian campus / MBA table format. For placement cells and founder applications.

Both are filled with a fictional sample (from `data/roleKits/<slug>.ts` → `resume.sample`) plus the campus details in `campus.json`.

Regenerate after editing a kit or adding a role (add the role to `campus.json` first):

```bash
npx tsx --tsconfig tsconfig.json scripts/resume-templates/dump-samples.ts scripts/resume-templates/samples.json
node scripts/resume-templates/build.js scripts/resume-templates/samples.json scripts/resume-templates/campus.json public/downloads/resume-templates
```
