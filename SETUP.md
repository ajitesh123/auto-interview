# Development Setup Guide

## Environment Variables Setup

### 1. Create Local Environment File

Copy the environment template to create your local configuration:

```bash
copy .env.example .env.local
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 3. Configure Your API Key

Open `.env.local` and add your Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied from Google AI Studio.

**IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore` to prevent accidental commits.

### 4. Verify Setup

Test that your API key is configured correctly:

```bash
npm run dev
```

Try using any feature that requires the Gemini API (resume upload, ATS analysis, job matching, etc.). If you see an error about missing `GEMINI_API_KEY`, double-check that:
- `.env.local` exists in the project root
- The file contains `GEMINI_API_KEY=your_key`
- You've restarted the development server

---

## Deployment (Vercel)

### Add Environment Variable in Vercel Dashboard

1. Go to your project on [Vercel](https://vercel.com/)
2. Navigate to Settings → Environment Variables
3. Add new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environments**: Select Production, Preview, and Development
4. Click Save
5. Redeploy your application

---

## Security Notes

✅ **DO**:
- Keep `.env.local` on your local machine only
- Add `.env.local` to `.gitignore` (already done)
- Use environment variables for all sensitive keys
- Rotate your API key if accidentally exposed

❌ **DON'T**:
- Never commit API keys to git
- Never share `.env.local` file
- Never hardcode API keys in source code
- Never push `.env.local` to GitHub

---

## Troubleshooting

### Error: "GEMINI_API_KEY environment variable is required"

**Solution**: Create `.env.local` file with your API key

### API key not working

**Solutions**:
1. Verify the key is correct in `.env.local`
2. Restart the development server (`npm run dev`)
3. Check that the key has proper permissions in Google Cloud Console
4. Ensure billing is enabled for your Google Cloud project

### Changes not reflecting

**Solution**: Restart the development server after changing environment variables

---

## Next Steps

After setting up your environment variables:

1. Test all features that use Gemini API
2. Deploy to Vercel with environment variables configured
3. Monitor API usage in Google Cloud Console
