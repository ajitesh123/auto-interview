import sys

file_path = r'd:\auto-interview\data\blog\best-stt-speech-to-text-models-voice-agents-2026.mdx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

section1 = """
## The End-of-Turn Detection Problem

Most developers focus on transcription accuracy (WER) when evaluating STT providers. They should be focused on end-of-turn detection. Here is why.

In a voice AI conversation, the system needs to know when the human has finished speaking before it can respond. The naive approach is Voice Activity Detection (VAD): detect silence lasting longer than 300ms and declare the turn over. This works fine in a controlled environment. It fails constantly in real conversations.

Human speech has natural pauses that are not turn-ending. "I want to... [250ms pause]... book a table for four people." A 300ms VAD fires incorrectly and the AI interrupts before "book a table." Now two things are speaking. The user stops, confused. The AI finishes its incorrect response. The conversation is broken.

The fix is semantic end-of-turn detection. Instead of listening for silence, the system predicts — from the linguistic content of what was said — whether the utterance is complete. "I want to..." is grammatically incomplete. The model predicts more speech is coming and holds the turn open. "I want to book a table for four people." is complete. The model fires the end-of-turn signal.

Deepgram's Flux model implements this natively. The model runs two parallel streams: a transcription stream and an utterance-completion prediction stream. The utterance-completion model is fine-tuned to distinguish incomplete thoughts from complete ones. In practice this reduces false end-of-turn fires by about 60% compared to VAD alone, according to Deepgram's published benchmarks.

AssemblyAI implements something similar through their streaming real-time API with smart formatting enabled. OpenAI Whisper does not have a streaming mode designed for this use case. Gladia supports streaming with end-of-utterance detection via their `utterance_end_ms` parameter.

For Indian languages, the problem compounds. Hinglish sentences do not follow consistent grammatical patterns that English-trained models can predict. "Main soch raha hun..." (I am thinking...) is often the beginning of a longer statement. A model trained primarily on English cannot reliably predict when a Hinglish speaker has finished their thought. Ringg's Parrot model and Gnani's Prisma model are specifically tuned for Indian conversational patterns and perform better on end-of-turn detection for Hindi and Hinglish than global models.

"""

section2 = """
## Real Cost Comparison: STT at Production Scale

Let us do the actual math for a mid-sized Indian AI calling operation: 5,000 calls per day, 4 minutes average call duration.

Total daily audio: 5,000 calls × 4 min = 20,000 minutes per day.
Monthly: 20,000 × 30 = 600,000 minutes.

| Provider | Rate | Monthly Cost (600K min) | Notes |
|:---|:---|:---|:---|
| Deepgram Nova-3 (streaming) | $0.0043/min | **$2,580/mo** | Best-in-class English real-time |
| AssemblyAI (streaming) | $0.0066/min | **$3,960/mo** | Includes audio intelligence |
| Gladia | $0.0077/min | **$4,620/mo** | Includes diarization |
| OpenAI Whisper (API) | ~$0.006/min | **$3,600/mo** | Not streaming; batch only |
| Self-hosted Whisper | GPU cost ~$0.001/min | **~$600/mo** | Requires GPU infra management |
| Gnani Prisma v2.5 | Custom enterprise | **Custom** | On-premise option available |
| Ringg Parrot V1 | Per-minute (contact) | **Bundled** | Included in Ringg platform pricing |

The cost comparison reveals an interesting dynamic: self-hosted Whisper is 4-6x cheaper than any cloud provider if you can manage the GPU infrastructure. But for real-time streaming voice agents, Whisper is not the right architecture. You end up paying 4-6x more for real-time capability (Deepgram), or you build your own real-time serving layer around faster-whisper — which is an engineering project, not a provider swap.

For Indian enterprise deployments, Gnani's on-premise model can be cost-competitive with cloud providers at high volume while delivering better accuracy on Indian telephony audio. The economics depend on whether you can amortize the on-premise infrastructure cost across sufficient call volume. Typically this makes sense above 1 million minutes per month.

## Keyterm and Domain Vocabulary Boosting

Every AI calling system has domain-specific vocabulary that general STT models mishear. Product names, competitor names, industry terms, proper nouns — these are where standard models fail and cascade errors cascade.

"Did you see the TTGE demo?" — a model that has never seen "TTGE" mishears it as "TV GE" or "T-T-G-E" (letter-by-letter). The LLM receives a broken transcript and cannot recover.

All major STT providers except Whisper support some form of keyterm/keyword boosting:

**Deepgram**: pass a `keywords` array in your API request. Each term can have a boost weight (1-10): `keywords=["TTGE:5", "Vobiz:5", "Plivo:3"]`. Higher weight = the model is more confident when it hears that phoneme pattern.

**AssemblyAI**: use `word_boost` parameter with the list of terms. No weight parameter but similar effect.

**Gladia**: uses `custom_vocabulary` parameter.

**Ringg Parrot V1**: handles Indian brand names natively because it was trained on Indian conversational data including brand names.

```python
# Deepgram keyword boosting example
options = LiveOptions(
    model="nova-3",
    language="en-US",
    keywords=["TTGE:3", "Vobiz:3", "Plivo:2"]
)
```

## Choosing Based on Your Audio Source

The right STT provider depends heavily on where your audio comes from:

- **Telephony audio** (Indian PSTN, 8kHz G.711): Gnani Prisma > Ringg Parrot > Deepgram Nova-3 > others
- **WebRTC audio** (browser, 16-48kHz Opus): Deepgram Nova-3 ≈ AssemblyAI Universal ≈ Gladia
- **Microphone audio** (recorded interviews, 44.1kHz): OpenAI Whisper > others for accuracy
- **Multilingual mixed audio**: Gladia > OpenAI Whisper > others

This ordering is not absolute — it reflects the training data and optimization priorities of each provider. Deepgram Nova-3 handles telephony better than older Deepgram models because Nova-3 includes telephony audio in training. But it still lacks Gnani's specific optimization for Indian 8kHz TRAI-network audio.

"""

content = content.replace('## Deepgram: The Real-Time Champion', section1 + '## Deepgram: The Real-Time Champion')
content = content.replace('## Comparison Table', section2 + '## Comparison Table')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('File updated successfully.')
