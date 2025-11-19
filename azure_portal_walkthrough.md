# Azure Portal Deployment Walkthrough

You have chosen **Option 1: Azure Static Web Apps (Frontend) + Azure App Service (Backend)**.
This guide will walk you through the deployment process using the **Azure Portal**.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to GitHub.
2.  **Azure Account**: Log in to [portal.azure.com](https://portal.azure.com).

---

## Part 1: Deploy the Backend (App Service)

1.  **Create Resource**:

    - In the Azure Portal, click **"Create a resource"**.
    - Search for **"Web App"** and select it. Click **Create**.

2.  **Basics Tab**:

    - **Subscription**: Select your subscription.
    - **Resource Group**: Create a new one (e.g., `buyosweb-rg`).
    - **Name**: Enter a unique name (e.g., `buyosweb-api`). _Remember this name!_
    - **Publish**: Select **Code**.
    - **Runtime stack**: Select **Node 20 LTS** (or your preferred version).
    - **Operating System**: Select **Linux**.
    - **Region**: Select a region close to you.
    - **Pricing Plan**: Select **Free F1** (for testing) or **Basic B1**.

3.  **Deployment Tab** (Crucial Step):

    - **Continuous deployment**: Enable it (GitHub Actions).
    - **GitHub Account**: Authorize your account.
    - **Organization/Repository/Branch**: Select your `buyosweb` repository and branch.
    - **Build Settings**:
      - **App location**: `server` (This is very important! It tells Azure your backend is in the `server` folder).
      - **Output location**: Leave blank or default.
      - **Startup command**: `npm start`

4.  **Review + Create**:

    - Click **Review + create**, then **Create**.
    - Wait for the deployment to finish.

5.  **Get Backend URL**:
    - Go to the new resource.
    - Copy the **Default domain** from the Overview page (e.g., `https://buyosweb-api.azurewebsites.net`).

---

## Part 2: Connect Frontend to Backend

1.  **Update Code**:
    - I have created a file named `env_template` in your project root.
    - Rename it to `.env.production`.
    - Open it and replace `https://YOUR-BACKEND-APP-NAME.azurewebsites.net` with the URL you just copied.
    - **Commit and Push** this change to GitHub. (Note: Usually `.env` files are ignored, but for this setup, you can either commit it OR set the environment variable in the Static Web App settings later. Committing is easier for now if you don't mind the URL being visible in your repo).

---

## Part 3: Deploy the Frontend (Static Web Apps)

1.  **Create Resource**:

    - In the Azure Portal, search for **"Static Web Apps"**.
    - Click **Create**.

2.  **Basics Tab**:

    - **Resource Group**: Select the same one (`buyosweb-rg`).
    - **Name**: Enter a name (e.g., `buyosweb-frontend`).
    - **Plan type**: **Free**.
    - **Deployment details**: Select **GitHub**.
    - **Organization/Repository/Branch**: Select your `buyosweb` repository.

3.  **Build Details** (Crucial Step):

    - **Build Presets**: Select **Vue.js**.
    - **App location**: `/` (Root).
    - **Api location**: Leave blank (we are using a separate App Service).
    - **Output location**: `dist`.

4.  **Review + Create**:

    - Click **Review + create**, then **Create**.
    - Azure will now create a GitHub Action in your repo and start building.

5.  **Verify**:
    - Go to the resource.
    - Click the **URL** to see your live website!

---

## Part 4: Final Configuration (CORS)

Your frontend might fail to talk to the backend until you allow it.

1.  **Get Frontend URL**:

    - Copy the URL of your new Static Web App (e.g., `https://agreeable-island...azurestaticapps.net`).

2.  **Configure Backend**:
    - Go back to your **App Service** (Backend) in the Azure Portal.
    - In the left menu, find **CORS** (under API).
    - Check "Enable Access-Control-Allow-Credentials".
    - Under **Allowed Origins**, add your **Frontend URL**.
    - Click **Save**.

## Done!

Your application should now be fully deployed and connected.
