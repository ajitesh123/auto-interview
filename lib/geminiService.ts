import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiService {
  private genAI: GoogleGenerativeAI | null
  private modelId: string

  constructor() {
    const key = process.env.GEMINI_API_KEY || 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
    this.genAI = key ? new GoogleGenerativeAI(key) : null
    this.modelId = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  }

  private getModel() {
    if (!this.genAI) throw new Error('Gemini not configured')
    // @ts-ignore types differ per sdk versions
    return this.genAI.getGenerativeModel({
      model: this.modelId,
      generationConfig: { temperature: 0, topK: 40, topP: 0.95, maxOutputTokens: 6144 },
    })
  }

  async generateContent(prompt: string): Promise<string> {
    const model = this.getModel()
    // @ts-ignore
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })
    // @ts-ignore
    const response = await result.response
    return response.text()
  }

  async generateStructuredContent(prompt: string): Promise<any> {
    // Try up to 3 attempts to coerce JSON
    let lastErr: any
    const augmented = prompt + '\n\nReturn ONLY valid minified JSON. No prose.'
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const text = await this.generateContent(augmented)
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) return JSON.parse(jsonMatch[0])
        lastErr = new Error('No JSON found')
      } catch (e) {
        lastErr = e
      }
    }
    // eslint-disable-next-line no-console
    console.error('Failed to parse Gemini response:', lastErr)
    throw new Error('No valid JSON found in response')
  }
}

const geminiService = new GeminiService()
export default geminiService
