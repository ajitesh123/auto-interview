import { ROLE_KITS } from '../../data/roleKits'
import { ROLE_HUBS } from '../../data/roleHubs'
import { writeFileSync } from 'fs'
const out: Record<string, unknown> = {}
for (const [slug, k] of Object.entries(ROLE_KITS))
  out[slug] = { roleName: ROLE_HUBS[slug].roleName, sample: k.resume.sample }
writeFileSync(
  process.argv[2] ?? 'scripts/resume-templates/samples.json',
  JSON.stringify(out, null, 1)
)
