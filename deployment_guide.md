# Deploying Buyosweb to Azure

This guide outlines two primary strategies for deploying your full-stack Vue.js + Express application to Azure.

## Prerequisites

1.  **Azure Account**: [Create one for free](https://azure.microsoft.com/free/).
2.  **VS Code Azure Extensions**: Install the "Azure Tools" extension pack in VS Code.
3.  **GitHub Repository**: Push your code to GitHub (Azure integrates seamlessly with GitHub for CI/CD).

---

## Option 1: Azure Static Web Apps (Recommended for Frontend) + App Service (Backend)

This approach is best for performance and scalability. The frontend is served from a global CDN, and the backend runs on a dedicated server.

### Step 1: Prepare the Backend (App Service)

1.  Navigate to the `server` directory in your terminal.
2.  Ensure your `package.json` has a start script: `"start": "node index.js"`.
3.  Go to the **Azure Portal** > **Create a resource** > **Web App**.
4.  **Basics**:
    - **Name**: `buyosweb-api` (or similar unique name).
    - **Publish**: Code.
    - **Runtime stack**: Node 20 LTS (or your local version).
    - **Operating System**: Linux.
    - **Pricing Plan**: Free (F1) or Basic (B1).
5.  **Deployment**: Connect to your GitHub repo.
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
    - **Base Directory**: `server` (Important! Tell Azure the app is in the `server` folder).
6.  Once deployed, copy the **URL** (e.g., `https://buyosweb-api.azurewebsites.net`).

### Step 2: Update Frontend Configuration

1.  Open `vite.config.js`.
2.  The `proxy` setting only works locally. For production, you need to point your API calls to the real backend URL.
3.  Update your API client (wherever you make `fetch` or `axios` calls) to use the environment variable `VITE_API_URL`.
    - Create a `.env.production` file in the root:
      ```
      VITE_API_URL=https://buyosweb-api.azurewebsites.net
      ```
    - Update your code to use `import.meta.env.VITE_API_URL` instead of hardcoded paths.

### Step 3: Deploy Frontend (Static Web Apps)

1.  In VS Code, right-click the **Static Web Apps** extension tab (or use the Command Palette: `Azure Static Web Apps: Create Static Web App...`).
2.  Follow the prompts:
    - **Name**: `buyosweb-frontend`.
    - **Region**: Choose one close to you.
    - **Framework**: Vue.js.
    - **App location**: `/` (root).
    - **Output location**: `dist`.
3.  Azure will create a GitHub Action to build and deploy your site automatically.

### Step 4: Configure CORS (Important!)

1.  Go to your **Backend Web App** in the Azure Portal.
2.  Go to **CORS** in the left menu.
3.  Add the URL of your **Frontend Static Web App** (e.g., `https://agreeable-island-012345.azurestaticapps.net`) to the allowed origins.
4.  Save.

---

## Option 2: Single Azure App Service (Monolithic)

This approach is simpler to manage (one resource) but requires minor code changes to serve the frontend from the backend.

### Step 1: Modify Server Code

1.  We need to tell Express to serve the static files from the Vue build.
2.  **I can apply these changes for you automatically if you choose this path.**
    - Add `app.use(express.static('../dist'))`.
    - Add a catch-all route to serve `index.html` for SPA routing.

### Step 2: Build and Deploy

1.  Run `npm run build` in the root to create the `dist` folder.
2.  Create a Web App in Azure (like in Option 1, Step 1).
3.  Configure the deployment to deploy the **entire repository** (root).
4.  Set the **Startup Command** to: `node server/index.js`.
5.  Go to **Configuration** > **Application Settings** and ensure `WEBSITE_NODE_DEFAULT_VERSION` is set correctly.

---

## Which one should I choose?

- **Choose Option 1** if you want the best performance, free SSL, and a "serverless-ready" architecture.
- **Choose Option 2** if you want a quick, simple deployment with fewer moving parts.

**I can help you implement the code changes for Option 2 or help you configure the environment variables for Option 1. What would you like to do?**
