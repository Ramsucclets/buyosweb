---
description: Deploy to Render.com
---

# Deploy to Render

This workflow guides you through deploying the buyosweb application to Render.com.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com) (free)
3. **Environment Variables**: Prepare any sensitive config values

## Step 1: Push Code to GitHub

// turbo

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

> **Note**: Replace `main` with your branch name if different.

## Step 2: Create Render Account

1. Go to [https://render.com/](https://render.com/)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with **GitHub** (recommended for easy integration)
4. Authorize Render to access your repositories

## Step 3: Deploy Using render.yaml

### Option A: Auto-Deploy (Recommended)

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository: `Ramsucclets/buyosweb`
3. Render will automatically detect `render.yaml`
4. Click **"Apply"** to create both services:
   - `buyosweb-api` (Backend)
   - `buyosweb-frontend` (Frontend)

### Option B: Manual Service Creation

If auto-deploy doesn't work, create services manually:

#### Create Backend Service

1. Click **"New +"** → **"Web Service"**
2. Connect your repository
3. Configure:
   - **Name**: `buyosweb-api`
   - **Runtime**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: `Free`
4. Add environment variable:
   - `NODE_ENV` = `production`

#### Create Frontend Service

1. Click **"New +"** → **"Static Site"**
2. Connect the same repository
3. Configure:
   - **Name**: `buyosweb-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://buyosweb-api.onrender.com`

## Step 4: Configure Environment Variables

### Backend Environment Variables

In the `buyosweb-api` service settings:

1. Go to **"Environment"** tab
2. Add variables:
   ```
   NODE_ENV=production
   PORT=10000
   ```
3. Add any database or API keys you need

### Frontend Environment Variables

In the `buyosweb-frontend` service settings:

1. Go to **"Environment"** tab
2. Add:
   ```
   VITE_API_URL=https://buyosweb-api.onrender.com
   ```

## Step 5: Wait for Deployment

- **Backend**: First deployment takes ~5-10 minutes
- **Frontend**: Usually completes in 2-5 minutes
- Watch the build logs for any errors

## Step 6: Update CORS Settings (If Needed)

Once you know your frontend URL:

1. Note the frontend URL (e.g., `https://buyosweb-frontend.onrender.com`)
2. If it's different from what's in `server/index.js`, update the CORS origins
3. Push changes to trigger redeployment

## Step 7: Test Your Deployment

1. **Test Backend**:

   ```
   https://buyosweb-api.onrender.com/api/health
   ```

   Should return: `{"status":"ok","message":"Server is running",...}`

2. **Test Frontend**:
   - Visit: `https://buyosweb-frontend.onrender.com`
   - Check browser console for errors
   - Verify API calls work

## Step 8: Custom Domain (Optional)

### Frontend Custom Domain

1. Go to frontend service → **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `www.buyos.com`)
4. Follow DNS configuration instructions
5. Update backend CORS to include your custom domain

### Backend Custom Domain

1. Go to backend service → **"Settings"** → **"Custom Domain"**
2. Add subdomain (e.g., `api.buyos.com`)
3. Update `VITE_API_URL` in frontend environment variables

## Troubleshooting

### Backend Won't Start

- Check build logs for npm install errors
- Verify `cd server && npm install` command works locally
- Ensure all dependencies are in `server/package.json`

### Frontend Shows Blank Page

- Check build logs
- Verify `npm run build` works locally
- Check `dist` folder is created

### CORS Errors

- Verify frontend URL matches CORS origins in `server/index.js`
- Check environment variables are set correctly
- Ensure `credentials: true` is in CORS config

### Cold Starts (Free Tier)

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier for always-on service

## Auto-Deploy on Push

Render automatically redeploys when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub
3. Render detects changes and redeploys automatically
4. Check deployment status in Render dashboard

## Monitoring

- **Logs**: View real-time logs in service dashboard
- **Metrics**: Check request count, response times
- **Alerts**: Set up email notifications for deployment failures

---

## Quick Reference

**Backend URL**: `https://buyosweb-api.onrender.com`  
**Frontend URL**: `https://buyosweb-frontend.onrender.com`  
**Health Check**: `https://buyosweb-api.onrender.com/api/health`

**Free Tier Limits**:

- Static sites: Unlimited bandwidth, global CDN
- Web services: 512 MB RAM, sleeps after 15 min inactivity
- 750 hours/month of runtime (enough for one service)
