// Test script to verify the new Gemini API key
const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'

async function testNewAPIKey() {
  try {
    console.log('Testing new Gemini API key:', API_KEY.substring(0, 10) + '...')

    const genAI = new GoogleGenerativeAI(API_KEY)

    // Try different model names to find one that works
    const modelsToTry = ['gemini-1.5-flash-001', 'gemini-1.5-flash', 'gemini-pro', 'gemini-1.5-pro']

    for (const modelName of modelsToTry) {
      try {
        console.log(`\nTrying model: ${modelName}`)
        const model = genAI.getGenerativeModel({ model: modelName })

        const result = await model.generateContent(
          'Hello, this is a test. Please respond with "API working"'
        )
        const response = await result.response
        const text = response.text()

        console.log(`✅ SUCCESS with model: ${modelName}`)
        console.log('✅ Response:', text)
        console.log('✅ API key is working correctly!')
        return
      } catch (modelError) {
        console.log(`❌ Failed with model ${modelName}:`, modelError.message)
      }
    }

    console.log('\n❌ All models failed. The API key may not have access to Gemini models.')
  } catch (error) {
    console.error('❌ General API Error:', error.message)

    if (error.message.includes('API_KEY_INVALID')) {
      console.error('❌ The API key is invalid or expired')
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      console.error('❌ API quota exceeded')
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.error('❌ Permission denied - check API key permissions')
    } else if (error.message.includes('404')) {
      console.error('❌ Model not found - API key may not have access to Gemini models')
    }
  }
}

testNewAPIKey()
