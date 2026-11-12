// Dumps cover letter kits to JSON for build.js. Usage: npx tsx scripts/cover-letter-templates/dump.ts /tmp/cl.json
import fs from 'fs'
import { ROLE_COVER_LETTERS } from '../../data/roleCoverLetters'
fs.writeFileSync(process.argv[2], JSON.stringify(ROLE_COVER_LETTERS, null, 2))
