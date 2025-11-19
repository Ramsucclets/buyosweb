# AWS Elastic Beanstalk Deployment Guide

This guide will walk you through deploying the buyosweb application to AWS Elastic Beanstalk using the AWS Console web interface.

## Prerequisites

Before you begin, ensure you have:

- ✅ An AWS account with appropriate permissions for Elastic Beanstalk
- ✅ Access to the AWS Console web interface
- ✅ Node.js and npm installed on your local machine (for building the package)

## Architecture Overview

This deployment uses a simplified architecture where:

- The **Vue.js frontend** is built into static files
- The **Express backend** serves both the API routes and the static frontend files
- Everything is packaged as a **single Node.js application** for Elastic Beanstalk

```
┌─────────────────────────────────────┐
│   AWS Elastic Beanstalk Environment │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Node.js Application         │ │
│  │                               │ │
│  │  ├─ Express Server            │ │
│  │  │  ├─ /api/* (API routes)    │ │
│  │  │  └─ /* (Static files)      │ │
│  │  │                            │ │
│  │  └─ public/                   │ │
│  │     └─ Vue.js built files     │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Step 1: Install Required npm Package

The packaging script uses the `archiver` package. Install it first:

```bash
npm install --save-dev archiver
```

## Step 2: Build and Package the Application

Run the deployment packaging script:

```bash
npm run package:deploy
```

This script will:

1. Build the Vue.js frontend using Vite
2. Output the built files to `server/public/`
3. Create a `buyosweb-deploy.zip` file in the root directory

You should see output like:

```
🚀 Starting deployment package creation...

📦 Step 1: Building Vue.js frontend...
✅ Frontend build completed

✅ Build verification passed

📦 Step 2: Creating deployment ZIP package...
✅ Deployment package created: E:\WEB SHI\Buyosv2\buyosweb\buyosweb-deploy.zip
📊 Package size: X.XX MB

🎉 Deployment package is ready!
```

The `buyosweb-deploy.zip` file is now ready for upload to AWS.

## Step 3: Deploy to AWS Elastic Beanstalk (Web Console)

### 3.1 Log in to AWS Console

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Sign in with your AWS account credentials
3. Select your preferred region from the top-right dropdown (e.g., `us-east-1`)

### 3.2 Navigate to Elastic Beanstalk

1. In the AWS Console search bar, type **"Elastic Beanstalk"**
2. Click on **Elastic Beanstalk** service

### 3.3 Create a New Application

1. Click **"Create Application"** button
2. Fill in the application details:
   - **Application name**: `buyosweb` (or your preferred name)
   - **Application tags**: (optional) Add tags for organization
3. Click **"Create"**

### 3.4 Create an Environment

After creating the application, you'll be prompted to create an environment:

1. **Environment tier**: Select **"Web server environment"**
2. Click **"Select"**

3. **Environment information**:

   - **Environment name**: `buyosweb-prod` (or your preferred name)
   - **Domain**: This will auto-generate (e.g., `buyosweb-prod.us-east-1.elasticbeanstalk.com`)
     - You can customize this if the name is available

4. **Platform**:

   - **Platform**: Select **"Node.js"**
   - **Platform branch**: Select **"Node.js 20 running on 64bit Amazon Linux 2023"** (or latest)
   - **Platform version**: Select the recommended version

5. **Application code**:

   - Select **"Upload your code"**
   - **Version label**: `v1.0` (or your preferred version identifier)
   - Click **"Choose file"**
   - Navigate to and select `buyosweb-deploy.zip`

6. **Presets**: Select **"Single instance (free tier eligible)"** to start

   - ⚠️ **Note**: For production, you may want "High availability" with load balancing

7. Click **"Next"**

### 3.5 Configure Service Access

1. **Service role**:

   - If this is your first EB application, select **"Create and use new service role"**
   - Otherwise, select existing EB service role

2. **EC2 key pair**: (Optional)

   - Select an existing key pair if you want SSH access
   - Or select "Proceed without a key pair"

3. **EC2 instance profile**:

   - If first time: Select **"Create and use new instance profile"**
   - Otherwise: Select existing `aws-elasticbeanstalk-ec2-role`

4. Click **"Next"**

### 3.6 Set up Networking, Database, and Tags

1. **VPC**: Select your default VPC (or create a new one if needed)
2. **Public IP address**: Check **"Activated"**
3. **Instance subnets**: Select at least one subnet
4. **Database**: Skip this (we're not using a database currently)
5. **Tags**: (Optional) Add any tags for resource management
6. Click **"Next"**

### 3.7 Configure Instance Traffic and Scaling

1. **Root volume type**: Keep default (General Purpose SSD)
2. **Size**: 10 GB (default is fine)
3. **EC2 security groups**: Create a new security group or use default
4. **Auto scaling group**: Keep defaults for now
5. Click **"Next"**

### 3.8 Configure Updates, Monitoring, and Logging

1. **Health reporting**: System (Enhanced is optional but costs more)
2. **Managed updates**: Enable if desired
3. **CloudWatch logs**: Enable log streaming if you want logs in CloudWatch
4. Click **"Next"**

### 3.9 Review and Submit

1. Review all your configuration settings
2. Click **"Submit"**

> [!NOTE]
> The environment creation process will take **5-10 minutes**. You can monitor progress in the console.

### 3.10 Monitor Deployment

You'll see the environment status going through stages:

- 🟡 **Launching** - Setting up resources
- 🟡 **Updating** - Installing application
- 🟢 **Ok** - Application is running successfully
- 🔴 **Severe** - There's an error (check logs)

## Step 4: Access Your Application

Once the environment shows **Health: Ok** status:

1. Find your environment URL in the console (e.g., `buyosweb-prod.us-east-1.elasticbeanstalk.com`)
2. Click the URL or copy and paste it into your browser
3. Your Vue.js application should load!

### Verify Deployment

Test these endpoints:

- **Frontend**: `https://your-app.elasticbeanstalk.com/`
- **Health Check**: `https://your-app.elasticbeanstalk.com/api/health`

## Step 5: Configure Environment Variables (Optional)

If you need to add environment variables:

1. Go to your environment in EB Console
2. Click **"Configuration"** in the left sidebar
3. Scroll to **"Software"** category
4. Click **"Edit"**
5. Scroll to **"Environment properties"**
6. Add your variables:
   - `NODE_ENV`: `production`
   - `PORT`: `8081` (if you want to change from default)
   - Any other custom variables
7. Click **"Apply"** at the bottom

> [!WARNING]
> Applying configuration changes will restart your application (brief downtime).

## Updating Your Application

When you make changes to your code:

### Method 1: Upload New Version (Recommended)

1. Make your code changes locally
2. Run `npm run package:deploy` to create a new ZIP
3. Go to your EB environment in AWS Console
4. Click **"Upload and deploy"** button
5. Choose the new `buyosweb-deploy.zip` file
6. Provide a version label (e.g., `v1.1`, `v1.2`)
7. Click **"Deploy"**

### Method 2: Update Application Version

1. Go to **Application versions** in the left sidebar
2. Click **"Upload"**
3. Upload your new ZIP file
4. Once uploaded, select it and click **"Deploy"**
5. Choose your environment and click **"Deploy"**

## Troubleshooting

### Application Returns 502 Bad Gateway

**Cause**: Application isn't listening on the correct port.

**Solution**: EB expects your app to listen on port `8080` or the `PORT` environment variable. Our code uses `process.env.PORT || 3000`, and EB sets `PORT=8080` automatically.

Check the logs:

1. Go to your environment
2. Click **"Logs"** in left sidebar
3. Click **"Request Logs"** → **"Last 100 Lines"**
4. Check for startup errors

### Application Shows White Screen

**Cause**: Frontend build files not included or incorrect paths.

**Solution**:

1. Verify `server/public/index.html` exists in the ZIP
2. Check that Vite build completed successfully
3. Verify `server/index.js` has the catch-all route

### Cannot Upload ZIP (File Too Large)

**Cause**: ZIP file exceeds EB upload limit (512 MB).

**Solution**:

1. Ensure `node_modules` is NOT in the ZIP (it shouldn't be)
2. Check that you're not including source files (`.ebignore` should handle this)

### Environment Creation Failed

**Cause**: Insufficient permissions or resource limits.

**Solution**:

1. Check that your AWS account has EB permissions
2. Verify you haven't hit EC2 instance limits in your region
3. Check EB events for specific error message

## Cost Management

> [!CAUTION]
> Elastic Beanstalk environments run continuously and incur costs!

**Resources that cost money:**

- EC2 instances (runs 24/7)
- Load balancer (if using high availability)
- Data transfer

**To avoid costs when not using:**

1. **Terminate the environment** (recommended for testing):

   - Go to your environment
   - Click **"Actions"** → **"Terminate environment"**
   - Type the environment name to confirm

2. **Delete the application** (if completely done):
   - Go to Applications
   - Select your application
   - Click **"Actions"** → **"Delete application"**

**Cost estimates** (as of 2025):

- Single t3.micro instance: ~$10-15/month
- High availability setup: ~$50-100/month

## Custom Domain Setup (Optional)

To use your own domain (e.g., `www.yourdomain.com`):

1. Go to your EB environment
2. Note the EB URL (e.g., `buyosweb-prod.us-east-1.elasticbeanstalk.com`)
3. In your domain registrar (GoDaddy, Namecheap, Route 53, etc.):
   - Create a **CNAME** record
   - Point `www.yourdomain.com` to your EB URL

For apex domain (`yourdomain.com`), use Route 53 with an Alias record.

## Need Help?

- **AWS Documentation**: [Elastic Beanstalk Node.js Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.html)
- **EB Console**: Check "Events" and "Logs" for detailed error messages
- **Health Dashboard**: Monitor application health and metrics

---

**Congratulations! Your Vue.js + Express application is now deployed to AWS! 🎉**
