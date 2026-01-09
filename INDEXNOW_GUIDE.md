# IndexNow Implementation Guide

## What is IndexNow?

IndexNow is a protocol that instantly notifies search engines (Bing, Yandex, etc.) when you publish or update content. Instead of waiting days/weeks for crawlers, search engines are notified immediately.

## Setup Complete ✅

### 1. API Key Generated
- **Key**: `bfb19e6f5a5e3515e0c255f4d3e05d77`
- **Verification File**: `public/bfb19e6f5a5e3515e0c255f4d3e05d77.txt`

### 2. API Endpoint Created
- **URL**: `https://autointerviewai.com/api/indexnow`
- **Method**: POST
- **Payload**: `{ "urls": ["https://autointerviewai.com/blog/your-post"] }`

## How to Use

### Manual Submission (For Testing)

You can test the API by making a POST request:

```bash
curl -X POST https://autointerviewai.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://autointerviewai.com/blog/best-sales-training-platforms-2026"]}'
```

### Automatic Submission (Recommended)

Add this code to your deployment script or create a GitHub Action:

```javascript
// Submit new blog post to IndexNow
async function submitToIndexNow(urls) {
  const response = await fetch('https://autointerviewai.com/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls })
  });
  
  const result = await response.json();
  console.log('IndexNow submission:', result);
}

// Example: Submit the new blog post
submitToIndexNow([
  'https://autointerviewai.com/blog/best-sales-training-platforms-2026'
]);
```

## Verify in Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Navigate to **Diagnostic Tools** → **URL Submission**
3. You should see your IndexNow submissions listed
4. Check **IndexNow** tab to see submission history

## What URLs to Submit

✅ **Submit these:**
- New blog posts
- Updated blog posts
- New pages (features, pricing, etc.)
- Homepage after major updates

❌ **Don't submit:**
- Every page on every deployment
- Pages with minor CSS/typo fixes
- Duplicate URLs

## Expected Results

- **Bing**: Indexed within 24-48 hours
- **Yandex**: Indexed within 1-3 days
- **Google**: Does NOT support IndexNow (use Google Search Console instead)

## Troubleshooting

### Check if the key file is accessible
Visit: `https://autointerviewai.com/bfb19e6f5a5e3515e0c255f4d3e05d77.txt`

You should see: `bfb19e6f5a5e3515e0c255f4d3e05d77`

### Test the API endpoint
Visit: `https://autointerviewai.com/api/indexnow` (GET request)

You should see API status and usage information.

## Next Steps

1. **Push these files to GitHub** (already done if you committed)
2. **Wait for deployment** (Vercel/Netlify auto-deploy)
3. **Submit your new blog post**:
   ```bash
   curl -X POST https://autointerviewai.com/api/indexnow \
     -H "Content-Type: application/json" \
     -d '{"urls": ["https://autointerviewai.com/blog/best-sales-training-platforms-2026"]}'
   ```
4. **Check Bing Webmaster Tools** in 24-48 hours

## Environment Variables (Optional)

If you want to customize, add to `.env.local`:

```
INDEXNOW_API_KEY=bfb19e6f5a5e3515e0c255f4d3e05d77
NEXT_PUBLIC_SITE_URL=https://autointerviewai.com
```

---

**Important**: Keep your API key! If you lose it, you'll need to generate a new one and update the verification file.
