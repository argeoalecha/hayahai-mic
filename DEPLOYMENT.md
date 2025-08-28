# 🚀 Deployment Guide for External Testing

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)
1. Push code to GitHub repository
2. Connect to [Vercel](https://vercel.com)
3. Import repository
4. Add environment variable: `VITE_YOUTUBE_API_KEY`
5. Deploy automatically

**Pros:** Free, instant HTTPS, automatic deployments
**Cons:** Requires GitHub account

### Option 2: Netlify
1. Push code to GitHub repository  
2. Connect to [Netlify](https://netlify.com)
3. Build settings: `npm run build`, publish directory: `dist`
4. Add environment variable: `VITE_YOUTUBE_API_KEY`
5. Deploy

**Pros:** Free, good performance, easy setup
**Cons:** Requires GitHub account

### Option 3: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

**Pros:** Google infrastructure, fast CDN
**Cons:** More setup required

### Option 4: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repository settings

**Pros:** Free, integrated with GitHub
**Cons:** Only static hosting, no environment variables

### Option 5: Local Network Sharing
For quick local testing:
```bash
npm run build
npm run preview -- --host
```
Share the network URL with local testers.

## Environment Variables Setup

All deployment platforms need this environment variable:
```
VITE_YOUTUBE_API_KEY=your_actual_api_key_here
```

### Platform-specific Setup:

**Vercel/Netlify:** Add in dashboard settings → Environment Variables
**Firebase:** Use `firebase functions:config:set`
**Local:** Create `.env` file (already configured)

## Pre-deployment Checklist

- [ ] API key is set in environment variables
- [ ] `.env` is in `.gitignore` 
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in preview (`npm run preview`)
- [ ] Search functionality works
- [ ] Video playback works
- [ ] Queue management works

## Quick Test Commands

```bash
# Build and test locally
npm run build
npm run preview

# Check for issues
npm run lint
npm run build
```

## Security Reminders

- ✅ API keys are in environment variables only
- ✅ No sensitive data in git repository
- ✅ `.env` files are gitignored
- ❌ Never commit actual API keys to git

## Recommended for External Testing

**Best option:** Vercel or Netlify for ease of sharing with external testers.

1. Push to GitHub
2. Connect to hosting platform
3. Add API key as environment variable
4. Share the generated URL with testers
5. Updates automatically deploy when you push changes