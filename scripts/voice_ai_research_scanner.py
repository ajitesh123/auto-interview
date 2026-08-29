import os
import re
import sys
import glob
from typing import Dict, List, Any

BANNED_SLOP_WORDS = [
    'game-changer', 'revolutionary', 'dive deep', 'delve', 'landscape',
    'cutting-edge', 'robust', 'leverage', 'utilize', 'seamlessly',
    'unlock', 'harness', 'elevate', 'it is worth noting', 'importantly',
    'testament to', 'tapestry', 'beacon', 'realm', 'revolutionize',
    'ever-evolving', 'unprecedented'
]

REQUIRED_RESEARCH_CONCEPTS = [
    r'(conformer|transformer|encoder|decoder)',
    r'(stt|asr|speech.to.text)',
    r'(tts|vocoder|text.to.speech|ssm|state space)',
    r'(vad|voice activity|turn.taking|endpointing|barge.in)',
    r'(latency|ttft|ttfa|rtt|ms|milliseconds)',
    r'(webrtc|sip|pstn|g\.711|pcm|opus)',
    r'(log.mel|spectrogram|filterbank|fourier|stft|acoustic|hz|khz)'
]

def scan_blog_file(filepath: str) -> Dict[str, Any]:
    with open(filepath, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    lines = raw_content.split('\n')
    
    # 1. Frontmatter extraction
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', raw_content, re.DOTALL)
    frontmatter_text = frontmatter_match.group(1) if frontmatter_match else ''
    body_text = raw_content[frontmatter_match.end():] if frontmatter_match else raw_content

    # Formatting & Compliance Checks
    em_dashes = raw_content.count('\u2014')
    en_dashes = raw_content.count('\u2013')
    
    in_code = False
    unescaped_dollars = []
    lt_digit_errors = []
    
    for i, line in enumerate(lines, 1):
        if line.strip().startswith('```'):
            in_code = not in_code
        if not in_code:
            # Check unescaped $ followed by digit
            matches = re.findall(r'(?<!\\)\$\d', line)
            if matches:
                unescaped_dollars.append((i, line.strip()[:60]))
            # Check raw < followed by digit
            if re.search(r'<\d', line):
                lt_digit_errors.append((i, line.strip()[:60]))

    # Slop Detection
    found_slop = [w for w in BANNED_SLOP_WORDS if re.search(r'\b' + re.escape(w) + r'\b', raw_content, re.IGNORECASE)]
    
    # Word count
    words = len(raw_content.split())
    
    # Paragraph length check (max 3 sentences)
    long_paragraphs = []
    body_paragraphs = body_text.split('\n\n')
    for p in body_paragraphs:
        clean_p = p.strip()
        if clean_p and not clean_p.startswith('#') and not clean_p.startswith('```') and not clean_p.startswith('|') and not clean_p.startswith('>'):
            sentences = re.split(r'(?<=[.!?])\s+', clean_p)
            if len(sentences) > 4:
                long_paragraphs.append(clean_p[:70] + f"... ({len(sentences)} sentences)")

    # 2. SEO Evaluation (0-100)
    seo_score = 100
    seo_issues = []
    
    if 'title:' not in frontmatter_text:
        seo_score -= 20
        seo_issues.append("Missing title in frontmatter")
    if 'keywords:' not in frontmatter_text:
        seo_score -= 15
        seo_issues.append("Missing keywords in frontmatter")
    elif re.search(r'keywords:\s*\[', frontmatter_text):
        seo_score -= 10
        seo_issues.append("Keywords must be a comma-separated string, not a YAML array")
        
    if 'canonicalUrl:' not in frontmatter_text:
        seo_score -= 10
        seo_issues.append("Missing canonicalUrl in frontmatter")
        
    if 'structuredData:' not in frontmatter_text:
        seo_score -= 15
        seo_issues.append("Missing structuredData JSON-LD schema in frontmatter")
        
    if words < 1200:
        seo_score -= 20
        seo_issues.append(f"Word count too low ({words} words < 1200 target)")

    # 3. AEO & LLM Citation Readiness (0-100)
    aeo_score = 100
    aeo_issues = []
    
    has_exec_summary = bool(re.search(r'>\s*\*\*Executive Summary', body_text, re.IGNORECASE) or re.search(r'>\s*\*\*Quick Answer', body_text, re.IGNORECASE))
    if not has_exec_summary:
        aeo_score -= 25
        aeo_issues.append("Missing Executive Summary / Quick Answer blockquote for AEO extraction")
        
    has_faq = bool(re.search(r'##\s*.*?Frequently Asked Questions', body_text, re.IGNORECASE) or re.search(r'##\s*.*?FAQ', body_text, re.IGNORECASE))
    if not has_faq:
        aeo_score -= 25
        aeo_issues.append("Missing Frequently Asked Questions (FAQ) section")
        
    has_table = bool(re.search(r'\|.*?\|.*?\|\n\|[-:\s|]+\|\n\|.*?\|', body_text))
    if not has_table:
        aeo_score -= 20
        aeo_issues.append("Missing structured comparison markdown table")
        
    bold_stats_count = len(re.findall(r'\*\*(?:[\$₹]|(?:&lt;|<|>|~))?\d+(?:\.\d+)?(?:%|\s*ms|\s*seconds|\s*turns|\s*locales|\s*WER|\s*/\s*min)?\*\*', body_text))
    if bold_stats_count < 5:
        aeo_score -= 15
        aeo_issues.append(f"Insufficient bold citable metrics ({bold_stats_count} found, minimum 5 required)")

    # 4. Stanford / Gemini Research & Engineering Depth (0-100)
    research_score = 100
    research_issues = []
    
    concept_matches = 0
    for pattern in REQUIRED_RESEARCH_CONCEPTS:
        if re.search(pattern, body_text, re.IGNORECASE):
            concept_matches += 1
            
    if concept_matches < 5:
        penalty = (5 - concept_matches) * 15
        research_score -= penalty
        research_issues.append(f"Low speech systems concept density ({concept_matches}/7 core concepts present)")
        
    has_math_or_latency = bool(re.search(r'(\$\$.*?\$\$|\$.*?\$|log-mel|stft|ctc|wer|ttft|ttfa)', body_text, re.IGNORECASE))
    if not has_math_or_latency:
        research_score -= 20
        research_issues.append("Missing mathematical / acoustic physics formulas or latency budgets")
        
    has_diagram_or_code = bool(re.search(r'```(?:text|python|json|bash)', body_text))
    if not has_diagram_or_code:
        research_score -= 20
        research_issues.append("Missing ASCII architecture diagram or code implementation block")

    # Overall Composite Score
    is_compliant = (
        em_dashes == 0 and
        en_dashes == 0 and
        len(unescaped_dollars) == 0 and
        len(lt_digit_errors) == 0 and
        len(found_slop) == 0
    )
    
    composite_score = (seo_score * 0.3) + (aeo_score * 0.35) + (research_score * 0.35)
    if not is_compliant:
        composite_score = min(composite_score, 70.0)

    return {
        "file": os.path.basename(filepath),
        "words": words,
        "is_compliant": is_compliant,
        "em_dashes": em_dashes,
        "en_dashes": en_dashes,
        "unescaped_dollars": unescaped_dollars,
        "lt_digit_errors": lt_digit_errors,
        "found_slop": found_slop,
        "long_paragraphs_count": len(long_paragraphs),
        "seo_score": max(0, seo_score),
        "seo_issues": seo_issues,
        "aeo_score": max(0, aeo_score),
        "aeo_issues": aeo_issues,
        "research_score": max(0, research_score),
        "research_issues": research_issues,
        "composite_score": round(composite_score, 1)
    }

def main():
    target_pattern = sys.argv[1] if len(sys.argv) > 1 else 'data/blog/*.mdx'
    files = glob.glob(target_pattern)
    
    if not files:
        print(f"No files matching {target_pattern}")
        return

    print("=" * 90)
    print("VOICE AI RESEARCH & QUALITY SCANNER: SEO | AEO | CITATIONS | STANFORD/GEMINI DEPTH")
    print("=" * 90)
    
    total_passed = 0
    
    for f in sorted(files):
        result = scan_blog_file(f)
        score = result["composite_score"]
        status = "[PASS]" if (result["is_compliant"] and score >= 90) else "[FAIL]"
        if status == "[PASS]":
            total_passed += 1
            
        print(f"\n* {result['file']} ({result['words']} words) -> {status} [Composite: {score}/100]")
        print(f"   - SEO: {result['seo_score']}/100 | AEO/Citations: {result['aeo_score']}/100 | Research Depth: {result['research_score']}/100")
        
        if not result["is_compliant"]:
            print(f"   ! Compliance Violations:")
            if result["em_dashes"] > 0: print(f"      - {result['em_dashes']} em dashes (—)")
            if result["en_dashes"] > 0: print(f"      - {result['en_dashes']} en dashes (–)")
            if result["unescaped_dollars"]: print(f"      - {len(result['unescaped_dollars'])} unescaped dollar signs ($)")
            if result["lt_digit_errors"]: print(f"      - {len(result['lt_digit_errors'])} raw < before digits")
            if result["found_slop"]: print(f"      - Banned AI slop words: {result['found_slop']}")
            
        if result["seo_issues"]:
            print(f"   - SEO Issues: {', '.join(result['seo_issues'])}")
        if result["aeo_issues"]:
            print(f"   - AEO / Citation Issues: {', '.join(result['aeo_issues'])}")
        if result["research_issues"]:
            print(f"   - Research Depth Issues: {', '.join(result['research_issues'])}")

    print("\n" + "=" * 90)
    print(f"AUDIT SUMMARY: {total_passed}/{len(files)} Blogs Scored >=90/100 and Passed All Checks.")
    print("=" * 90)

if __name__ == "__main__":
    main()
