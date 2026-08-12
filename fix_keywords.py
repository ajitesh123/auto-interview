import re
import os
import glob

blogs = glob.glob('data/blog/*.mdx')
fixed_count = 0

for f in blogs:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()

    original = content

    # Pattern 1: keywords: ['a', 'b', 'c'] on one line (inline array)
    def fix_inline_array(m):
        inner = m.group(1)
        items = re.findall(r"[\"'](.*?)[\"']", inner)
        joined = ', '.join(items)
        return "keywords: '" + joined + "'"

    content = re.sub(r"keywords:\s*\[([^\]]+)\]", fix_inline_array, content)

    # Pattern 2: keywords:\n  [\n    'a',\n    'b',\n  ]  (multiline bracketed)
    def fix_multiline_bracket(m):
        inner = m.group(1)
        items = re.findall(r"[\"'](.*?)[\"']", inner)
        joined = ', '.join(items)
        return "keywords: '" + joined + "'\n"

    content = re.sub(
        r"keywords:\s*\n\s*\[([^\]]+)\]",
        fix_multiline_bracket,
        content,
        flags=re.DOTALL
    )

    if content != original:
        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(content)
        print('Fixed: ' + os.path.basename(f))
        fixed_count += 1

print('Total fixed: ' + str(fixed_count))
