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
    'ever-evolving', 'unprecedented', 'groundbreaking', 'paradigm shift',
    'synergy', 'in conclusion', 'furthermore', 'moreover', 'more importantly',
    'at the end of the day', 'it goes without saying', 'needless to say',
    'holistic', 'empower', 'streamline'
]

REQUIRED_SPEECH_RESEARCH_DOMAINS = [
    ('Neural Architectures', r'(conformer|transformer|encoder|decoder|mamba|ssm|state space|attention)'),
    ('Speech Recognition (ASR/STT)', r'(stt|asr|speech.to.text|ctc|wer|beam search|transcription)'),
    ('Speech Synthesis (TTS/Vocoder)', r'(tts|vocoder|text.to.speech|hifi.gan|bigvgan|synthesis|prosody)'),
    ('Voice Activity & Turn-Taking', r'(vad|voice activity|turn.taking|endpointing|barge.in|echo cancellation|aec)'),
    ('Latency & Performance Profiling', r'(latency|ttft|ttfa|rtt|ms|milliseconds|turnaround)'),
    ('Telephony & Network Protocols', r'(webrtc|sip|pstn|g\.711|pcm|opus|rtp|jitter buffer)'),
    ('Acoustic Physics & Signal Processing', r'(log.mel|spectrogram|filterbank|fourier|stft|acoustic|hz|khz|cochlea|formant)')
]

def scan_legendary_blog(filepath: str) -> Dict[str, Any]:
    with open(filepath, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    lines = raw_content.split('\n')
    
    # 1. Frontmatter extraction
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', raw_content, re.DOTALL)
    frontmatter_text = frontmatter_match.group(1) if frontmatter_match else ''
    body_text = raw_content[frontmatter_match.end():] if frontmatter_match else raw_content

    # Strict Compliance Checks
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
            # Check raw < followed by digit in prose
            if re.search(r'<\d', line):
                lt_digit_errors.append((i, line.strip()[:60]))

    # Slop Detection
    found_slop = []
    for w in BANNED_SLOP_WORDS:
        if re.search(r'\b' + re.escape(w) + r'\b', raw_content, re.IGNORECASE):
            found_slop.append(w)
    
    # Word count
    words = len(raw_content.split())
    
    # Paragraph structure check (max 3-4 sentences per paragraph for mobile scannability)
    overly_long_paragraphs = []
    body_paragraphs = body_text.split('\n\n')
    for p in body_paragraphs:
        clean_p = p.strip()
        if clean_p and not clean_p.startswith('#') and not clean_p.startswith('```') and not clean_p.startswith('|') and not clean_p.startswith('>'):
            sentences = re.split(r'(?<=[.!?])\s+', clean_p)
            if len(sentences) > 4:
                overly_long_paragraphs.append(clean_p[:60] + f"... ({len(sentences)} sentences)")

    # =========================================================================
    # 2. SEO Evaluation (0-100) - Google Day-1 Ranking Criteria
    # =========================================================================
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
        seo_issues.append("Missing structuredData JSON-LD Article schema in frontmatter")
        
    if words < 3500:
        seo_score -= 30
        seo_issues.append(f"Word count too low ({words} words < 3500 exhaustive research threshold)")

    # Check primary keyword density in first 150 words & headings
    first_150_words = ' '.join(body_text.split()[:150]).lower()
    h2_headings = re.findall(r'^##\s+(.*?)$', body_text, re.MULTILINE)
    if len(h2_headings) < 4:
        seo_score -= 10
        seo_issues.append(f"Insufficient H2 heading depth ({len(h2_headings)} found, minimum 4 required)")

    # =========================================================================
    # 3. AEO & LLM Citation Readiness (0-100) - ChatGPT / Claude / Perplexity
    # =========================================================================
    aeo_score = 100
    aeo_issues = []
    
    has_exec_summary = bool(re.search(r'>\s*\*\*Executive Summary', body_text, re.IGNORECASE) or re.search(r'>\s*\*\*Quick Answer', body_text, re.IGNORECASE))
    if not has_exec_summary:
        aeo_score -= 25
        aeo_issues.append("Missing Executive Summary / Quick Answer blockquote for LLM citation extraction")
        
    has_faq = bool(re.search(r'##\s*.*?Frequently Asked Questions', body_text, re.IGNORECASE) or re.search(r'##\s*.*?FAQ', body_text, re.IGNORECASE))
    if not has_faq:
        aeo_score -= 25
        aeo_issues.append("Missing Frequently Asked Questions (FAQ) section")
    else:
        # Check FAQ questions count
        faq_questions = len(re.findall(r'\*\*(?:What|Why|How|Can|Is|Does).*?\?\*\*', body_text))
        if faq_questions < 4:
            aeo_score -= 10
            aeo_issues.append(f"FAQ too brief ({faq_questions} questions, minimum 4 required)")
        
    has_table = bool(re.search(r'\|.*?\|.*?\|\n\|[-:\s|]+\|\n\|.*?\|', body_text))
    if not has_table:
        aeo_score -= 20
        aeo_issues.append("Missing structured quantitative comparison markdown table")
        
    # Bold citable stats count (e.g., **<200ms**, **₹3.50/min**, **$0.042/min**, **2.60%**, **24kHz**, etc.)
    bold_stats = re.findall(r'\*\*(?:[\$₹]|(?:&lt;|<|>|~))?\d[^*]*?\*\*', body_text)
    bold_stats_count = len(bold_stats)
    if bold_stats_count < 6:
        aeo_score -= 15
        aeo_issues.append(f"Insufficient bold citable metrics ({bold_stats_count} found, minimum 6 required)")

    # =========================================================================
    # 4. Stanford / Gemini Research & Systems Rigor (0-100)
    # =========================================================================
    research_score = 100
    research_issues = []
    
    covered_domains = []
    for domain_name, pattern in REQUIRED_SPEECH_RESEARCH_DOMAINS:
        if re.search(pattern, body_text, re.IGNORECASE):
            covered_domains.append(domain_name)
            
    if len(covered_domains) < 5:
        missing_count = 5 - len(covered_domains)
        research_score -= missing_count * 12
        research_issues.append(f"Low domain breadth ({len(covered_domains)}/7 domains covered: {', '.join(covered_domains)})")
        
    has_math_or_physics = bool(re.search(r'(\$\$.*?\$\$|\$.*?\$|log-mel|stft|filterbank|fourier|nyquist|cochlea|f0|spectrogram|ctc)', body_text, re.IGNORECASE))
    if not has_math_or_physics:
        research_score -= 20
        research_issues.append("Missing mathematical / acoustic physics formulas ($$ or $)")
        
    has_ascii_diagram = bool(re.search(r'```text.*?┌.*?┐.*?```', body_text, re.DOTALL) or re.search(r'```text.*?──►.*?```', body_text, re.DOTALL))
    if not has_ascii_diagram:
        research_score -= 15
        research_issues.append("Missing multi-tier ASCII architecture or state machine diagram")
        
    has_runnable_code = bool(re.search(r'```python.*?async def.*?```', body_text, re.DOTALL) or re.search(r'```(?:bash|json|javascript).*?```', body_text, re.DOTALL))
    if not has_runnable_code:
        research_score -= 15
        research_issues.append("Missing production code implementation block")

    # =========================================================================
    # 5. Composite Score Calculation & Quality Gate
    # =========================================================================
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
        "long_paragraphs_count": len(overly_long_paragraphs),
        "seo_score": max(0, seo_score),
        "seo_issues": seo_issues,
        "aeo_score": max(0, aeo_score),
        "aeo_issues": aeo_issues,
        "research_score": max(0, research_score),
        "research_issues": research_issues,
        "composite_score": round(composite_score, 1),
        "covered_domains": covered_domains
    }

def main():
    target_pattern = sys.argv[1] if len(sys.argv) > 1 else 'data/blog/*.mdx'
    files = glob.glob(target_pattern)
    
    if not files:
        print(f"No files matching {target_pattern}")
        return

    print("=" * 95)
    print("LEGENDARY VOICE AI SCANNER: GOOGLE DAY-1 | CHATGPT & CLAUDE CITATIONS | STANFORD/GEMINI DEPTH")
    print("=" * 95)
    
    total_passed = 0
    
    for f in sorted(files):
        result = scan_legendary_blog(f)
        score = result["composite_score"]
        status = "[LEGENDARY PASS]" if (result["is_compliant"] and score >= 95) else ("[PASS]" if (result["is_compliant"] and score >= 90) else "[FAIL]")
        if status in ["[LEGENDARY PASS]", "[PASS]"]:
            total_passed += 1
            
        print(f"\n* {result['file']} ({result['words']} words) -> {status} [Composite: {score}/100]")
        print(f"   - SEO: {result['seo_score']}/100 | AEO/Citations: {result['aeo_score']}/100 | Research Depth: {result['research_score']}/100")
        print(f"   - Speech Domains Covered ({len(result['covered_domains'])}/7): {', '.join(result['covered_domains'])}")
        
        if not result["is_compliant"]:
            print(f"   ! Compliance Violations:")
            if result["em_dashes"] > 0: print(f"      - {result['em_dashes']} em dashes (—)")
            if result["en_dashes"] > 0: print(f"      - {result['en_dashes']} en dashes (–)")
            if result["unescaped_dollars"]: print(f"      - {len(result['unescaped_dollars'])} unescaped dollar signs ($)")
            if result["lt_digit_errors"]: print(f"      - {len(result['lt_digit_errors'])} raw < before digits in prose")
            if result["found_slop"]: print(f"      - Banned AI slop words: {result['found_slop']}")
            
        if result["seo_issues"]:
            print(f"   - SEO Issues: {', '.join(result['seo_issues'])}")
        if result["aeo_issues"]:
            print(f"   - AEO / Citation Issues: {', '.join(result['aeo_issues'])}")
        if result["research_issues"]:
            print(f"   - Research Depth Issues: {', '.join(result['research_issues'])}")

    print("\n" + "=" * 95)
    print(f"AUDIT SUMMARY: {total_passed}/{len(files)} Blogs Scored >=90/100 and Passed All Checks.")
    print("=" * 95)

if __name__ == "__main__":
    main()
