# Vercel Deployment Guide

This guide will help you deploy the Material Inventory Management System on Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Your project pushed to the repository

## Important Notes

⚠️ **SQLite Database Limitation**: The current deployment uses SQLite stored in `/tmp` directory, which is **ephemeral** in serverless environments. This means:
- Data will be lost when serverless functions restart
- Data is not shared across function invocations
- **For production use, consider migrating to a persistent database** (Vercel Postgres, Supabase, PlanetScale, etc.)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to your project root**:
   ```bash
   cd Insyd
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - Project name? (Press Enter for default or enter custom name)
   - Directory? **./** (current directory)
   - Override settings? **No**

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Detailed Step-by-Step)

This method is perfect if you prefer a visual interface and want to connect your GitHub/GitLab/Bitbucket repository for automatic deployments.

#### Step 1: Prepare Your Git Repository

**1.1. Create a Git Repository (if you haven't already)**

If your project isn't in a Git repository yet:

```bash
# Navigate to your project directory
cd Insyd

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Material Inventory Management System"
```

**1.2. Push to GitHub/GitLab/Bitbucket**

Choose one of the following:

**For GitHub:**
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name your repository (e.g., `insyd-inventory`)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click **"Create repository"**
7. Follow the instructions shown, or run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/insyd-inventory.git
   git branch -M main
   git push -u origin main
   ```

**For GitLab:**
1. Go to [gitlab.com](https://gitlab.com) and sign in
2. Click **"New project"** → **"Create blank project"**
3. Enter project name (e.g., `insyd-inventory`)
4. Choose visibility level
5. Click **"Create project"**
6. Follow the instructions shown, or run:
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/insyd-inventory.git
   git branch -M main
   git push -u origin main
   ```

**For Bitbucket:**
1. Go to [bitbucket.org](https://bitbucket.org) and sign in
2. Click **"Create"** → **"Repository"**
3. Enter repository name (e.g., `insyd-inventory`)
4. Choose **Private** or **Public**
5. Click **"Create repository"**
6. Follow the instructions shown, or run:
   ```bash
   git remote add origin https://bitbucket.org/YOUR_USERNAME/insyd-inventory.git
   git branch -M main
   git push -u origin main
   ```

**Important:** Make sure all your files are committed and pushed, including:
- `vercel.json` ⚠️ **CRITICAL - Must be in root**
- `package.json` (root level) ⚠️ **CRITICAL - Must exist in root**
- `api/` directory (entire folder with all files)
- `frontend/` directory (entire folder with all files)
- All other project files

**Quick check before pushing:**
```bash
# Verify these files exist in your project root:
ls vercel.json package.json

# Both should exist and be committed
git status
```

---

#### Step 2: Create Vercel Account

**2.1. Sign Up for Vercel**

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. You'll see three options:
   - **Continue with GitHub** (Recommended if your code is on GitHub)
   - **Continue with GitLab** (If using GitLab)
   - **Continue with Bitbucket** (If using Bitbucket)
   - **Continue with Email** (Alternative option)

3. Click the option matching your Git provider, or use email
4. Complete the signup process:
   - If using Git provider: Authorize Vercel to access your repositories
   - If using email: Verify your email address

**2.2. Complete Onboarding (if prompted)**

- Vercel may ask you to choose a team (select "Personal" for individual use)
- You may see a welcome screen - you can skip any optional steps

---

#### Step 3: Access Vercel Dashboard

**3.1. Navigate to Dashboard**

1. After signing up, you'll be redirected to the Vercel Dashboard
2. If not, go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. You should see:
   - A list of your projects (empty if this is your first time)
   - An **"Add New..."** button or **"New Project"** button (usually in the top right or center)

---

#### Step 4: Import Your Repository

**4.1. Start New Project**

1. Click the **"Add New..."** or **"New Project"** button
2. You'll see a screen titled **"Import Git Repository"** or **"Create Project"**

**4.2. Connect Git Provider (if not already connected)**

If you don't see your repository:

1. Look for a section that says **"Import Git Repository"**
2. You may see options like:
   - **"Connect Git Provider"** or **"Configure Git Provider"**
   - Click this to connect your GitHub/GitLab/Bitbucket account
3. Authorize Vercel to access your repositories
4. You may need to:
   - Select which repositories to give access to (choose "All repositories" or select specific ones)
   - Click **"Install"** or **"Authorize"**

**4.3. Find and Select Your Repository**

1. After connecting, you'll see a list of your repositories
2. Use the **search bar** at the top to find your repository (e.g., type "insyd" or "inventory")
3. Click on your repository name to select it
4. You should see repository details appear

**4.4. Click "Import"**

1. Once you've selected your repository, click the **"Import"** button (usually at the bottom right)
2. You'll be taken to the **"Configure Project"** screen

---

#### Step 5: Configure Project Settings

This is the most important step. You'll see a configuration form with several sections.

**5.1. Project Name**

- **Field:** "Project Name" or "Name"
- **What to enter:** 
  - Vercel will auto-fill with your repository name (e.g., `insyd-inventory`)
  - You can keep this or change it to something like `inventory-app` or `material-inventory`
- **Note:** This will be part of your URL: `your-project-name.vercel.app`

**5.2. Framework Preset**

- **Field:** "Framework Preset" (may be under "Build and Output Settings")
- **What to select:**
  - Look for a dropdown or selection buttons
  - Choose **"Other"** or **"Create React App"** (both work fine)
  - If you see "Vite" or "Next.js", don't select those - choose "Other"
- **Why:** Our project uses Create React App, but Vercel's auto-detection might not catch it

**5.3. Root Directory**

- **Field:** "Root Directory"
- **What to enter:** 
  - Click the field or "Edit" button
  - Enter: `./` (just a period and forward slash)
  - Or leave it empty/default if it shows `./`
- **What it means:** This tells Vercel where your project root is (the root of your repository)

**5.4. Build and Output Settings**

Click **"Show Advanced Options"** or **"Override"** if you see these options. You need to configure:

**Build Command:**
- **Field:** "Build Command"
- **What to enter:** 
  ```
  cd frontend && npm install && npm run build
  ```
- **What it does:** 
  - Changes to the frontend directory
  - Installs dependencies
  - Builds the React app

**Output Directory:**
- **Field:** "Output Directory"
- **What to enter:**
  ```
  frontend/build
  ```
- **What it does:** Tells Vercel where to find the built React app

**Install Command:**
- **Field:** "Install Command" (optional, usually auto-detected)
- **What to enter:** Leave as default (`npm install`) or you can specify:
  ```
  npm install
  ```
- **Note:** This runs at the root level, which is fine

**5.5. Environment Variables (Optional - Skip for Now)**

- **Section:** "Environment Variables"
- **What to do:** 
  - You can skip this section for now
  - The app will work without any environment variables
  - You can add them later in Project Settings if needed
- **If you want to add one:**
  - Click **"Add"** or **"Add Environment Variable"**
  - Name: `REACT_APP_API_URL`
  - Value: Leave empty (will default to `/api`) or enter your custom API URL
  - Environment: Select **Production**, **Preview**, and **Development** (or just Production)

**5.6. Review Your Settings**

Before deploying, double-check:
- ✅ Project Name: Something meaningful
- ✅ Framework Preset: "Other" or "Create React App"
- ✅ Root Directory: `./`
- ✅ Build Command: `cd frontend && npm install && npm run build`
- ✅ Output Directory: `frontend/build`

---

#### Step 6: Deploy

**6.1. Start Deployment**

1. Scroll to the bottom of the configuration page
2. Click the **"Deploy"** button (usually large and prominent, often blue)
3. You'll see a deployment screen with a progress indicator

**6.2. Watch the Build Process**

You'll see several stages:

1. **"Building"** - Installing dependencies and running build command
   - This may take 2-5 minutes
   - You'll see logs scrolling showing:
     - `npm install` output
     - `npm run build` output
     - Any warnings or errors

2. **"Deploying"** - Uploading and configuring your app
   - Usually takes 30 seconds to 1 minute

3. **"Ready"** - Your deployment is complete!

**6.3. What to Watch For**

**Success indicators:**
- ✅ Green checkmark
- ✅ "Deployment ready" or "Ready" message
- ✅ A URL appears (e.g., `insyd-inventory.vercel.app`)

**If you see errors:**
- ❌ Red X or error message
- Check the build logs (scroll up in the deployment screen)
- Common issues:
  - **"Build command failed"**: Check that Build Command is correct
  - **"Module not found"**: Dependencies might be missing (check `frontend/package.json`)
  - **"Output directory not found"**: Check that Output Directory is `frontend/build`

---

#### Step 7: Access Your Deployed App

**7.1. Get Your App URL**

After successful deployment:

1. You'll see a **"Visit"** button or a URL like:
   - `https://insyd-inventory.vercel.app`
   - `https://insyd-inventory-abc123.vercel.app` (with random suffix)

2. Click the **"Visit"** button or copy the URL

**7.2. Test Your Application**

1. Open the URL in your browser
2. You should see your Material Inventory Management System
3. Test the functionality:
   - Try adding a material
   - View the inventory list
   - Adjust quantities
   - Edit items

**7.3. Check API Endpoints**

Test that the API is working:
- Open browser developer tools (F12)
- Go to the Network tab
- Try adding an item
- You should see requests to `/api/inventory` returning 200 status

---

#### Step 8: Configure Automatic Deployments (Optional but Recommended)

**8.1. Enable Auto-Deploy**

By default, Vercel automatically deploys when you push to your main branch. To verify:

1. Go to your project in Vercel Dashboard
2. Click on **"Settings"** tab
3. Click **"Git"** in the sidebar
4. You should see:
   - **Production Branch:** `main` (or `master`)
   - **Automatic deployments from Git:** Enabled

**8.2. How It Works**

- Every time you push code to your `main` branch, Vercel will:
  1. Detect the push
  2. Start a new deployment
  3. Build and deploy your app
  4. Update your production URL

**8.3. Preview Deployments**

- When you push to other branches or create Pull Requests:
  - Vercel creates **preview deployments**
  - Each gets a unique URL
  - Great for testing before merging to main

---

#### Step 9: Custom Domain (Optional)

**9.1. Add Custom Domain**

If you want a custom domain (e.g., `inventory.yourdomain.com`):

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain name
5. Follow the DNS configuration instructions
6. Vercel will provide DNS records to add to your domain registrar

---

#### Step 10: Monitor and Manage

**10.1. View Deployments**

1. In your project dashboard, click **"Deployments"** tab
2. You'll see a list of all deployments:
   - Production deployments (from main branch)
   - Preview deployments (from other branches/PRs)
   - Each shows status, commit message, and timestamp

**10.2. View Logs**

1. Click on any deployment
2. Click **"View Function Logs"** or **"Logs"** tab
3. You can see:
   - Build logs
   - Runtime logs (for serverless functions)
   - Error messages

**10.3. Rollback if Needed**

If a deployment has issues:

1. Go to **"Deployments"** tab
2. Find a previous working deployment
3. Click the **"..."** (three dots) menu
4. Select **"Promote to Production"**

---

### Troubleshooting Common Issues in Dashboard Deployment

**Issue: "Repository not found"**
- **Solution:** Make sure you've connected the correct Git provider account
- Go to Vercel Settings → Git → Reconnect your account

**Issue: "Could not read package.json" or "ENOENT: no such file or directory"**
- **Solution:**
  - Make sure the root `package.json` file is committed to your Git repository
  - The root `package.json` should exist in your project root (same level as `vercel.json`)
  - If it's missing, create it with this content:
    ```json
    {
      "name": "insyd-inventory",
      "version": "1.0.0",
      "description": "Material Inventory Management System",
      "scripts": {
        "build": "cd frontend && npm install && npm run build"
      }
    }
    ```
  - Then commit and push:
    ```bash
    git add package.json
    git commit -m "Add root package.json for Vercel"
    git push
    ```
  - Redeploy in Vercel

**Issue: "Could not read package.json" or "ENOENT: no such file or directory, open '/vercel/path0/package.json'"**
- **This is the error you're seeing!** 
- **Solution:**
  1. The root `package.json` file is missing from your Git repository
  2. Check if it exists locally:
     ```bash
     # From your project root
     ls package.json
     ```
  3. If it exists locally but not in Git, add and commit it:
     ```bash
     git add package.json
     git commit -m "Add root package.json for Vercel deployment"
     git push
     ```
  4. If it doesn't exist, create it with this content:
     ```json
     {
       "name": "insyd-inventory",
       "version": "1.0.0",
       "description": "Material Inventory Management System",
       "scripts": {
         "build": "cd frontend && npm install && npm run build"
       }
     }
     ```
  5. Then commit and push:
     ```bash
     git add package.json
     git commit -m "Add root package.json for Vercel"
     git push
     ```
  6. Go back to Vercel Dashboard and click **"Redeploy"** or trigger a new deployment

**Issue: "Build command failed"**
- **Solution:** 
  - Double-check your Build Command: `cd frontend && npm install && npm run build`
  - Make sure there are no typos
  - Check that `frontend/package.json` exists and has a `build` script

**Issue: "Output directory not found"**
- **Solution:**
  - Verify Output Directory is: `frontend/build`
  - Make sure the build command actually creates this directory
  - Check build logs to see if build completed successfully

**Issue: "Module not found" errors**
- **Solution:**
  - Ensure `frontend/package.json` has all dependencies
  - Make sure `axios` is listed in dependencies
  - The build process should install dependencies automatically

**Issue: "API routes return 404"**
- **Solution:**
  - Verify `api/` directory is in your repository root
  - Check that `api/inventory.js` and other API files are committed
  - Review function logs in Vercel Dashboard

**Issue: "Database not working / Data disappears"**
- **Solution:**
  - This is expected! SQLite in `/tmp` is ephemeral
  - Consider migrating to a persistent database (see "Migrating to a Persistent Database" section below)

---

### Next Steps After Deployment

1. **Test thoroughly:** Try all features of your app
2. **Monitor logs:** Check Vercel Dashboard for any errors
3. **Set up database:** For production, migrate from SQLite to a cloud database
4. **Configure environment variables:** If needed for production
5. **Set up custom domain:** If you want a branded URL

---

### Quick Reference: Settings Summary

When configuring in Vercel Dashboard, use these exact values:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Other` or `Create React App` |
| **Root Directory** | `./` |
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Output Directory** | `frontend/build` |
| **Install Command** | `npm install` (default) |
| **Node.js Version** | `18.x` (default, usually auto-detected) |

## Project Structure for Vercel

```
Insyd/
├── api/                    # Serverless functions
│   ├── db.js              # Database connection (uses /tmp)
│   └── inventory.js       # Main API handler
├── frontend/              # React app
│   ├── src/
│   └── package.json
├── vercel.json            # Vercel configuration
├── package.json           # Root package.json
└── .vercelignore         # Files to ignore
```

## How It Works

1. **Frontend**: React app is built and served as static files
2. **Backend**: Express routes converted to Vercel serverless functions in `/api` directory
3. **Database**: SQLite database stored in `/tmp` (temporary, not persistent)

## API Endpoints

After deployment, your API will be available at:
- `https://your-project.vercel.app/api/inventory` (GET, POST)
- `https://your-project.vercel.app/api/inventory/:id` (PUT, DELETE)
- `https://your-project.vercel.app/api/inventory/:id/adjust` (PATCH)

## Troubleshooting

### Build Fails

1. **Check Node.js version**: Vercel uses Node.js 18.x by default
   - You can specify version in `package.json`:
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

2. **Check build logs**: Go to Vercel Dashboard → Your Project → Deployments → Click on failed deployment → View logs

### API Not Working

1. **Check function logs**: Vercel Dashboard → Your Project → Functions → Click on function → View logs
2. **Verify CORS**: The API includes CORS headers, but check browser console for errors
3. **Check API routes**: Ensure requests go to `/api/inventory` not `/api/inventory/`

### Database Issues

- Remember: SQLite in `/tmp` is **not persistent**
- Data will reset on function cold starts
- Consider migrating to a cloud database for production

## Migrating to a Persistent Database

For production use, consider:

1. **Vercel Postgres**: Native integration with Vercel
2. **Supabase**: Free tier available, PostgreSQL
3. **PlanetScale**: MySQL-compatible, serverless
4. **MongoDB Atlas**: NoSQL option

To migrate:
1. Replace SQLite queries with your chosen database
2. Update `api/db.js` to use the new database connection
3. Update environment variables in Vercel dashboard

## Environment Variables

If needed, add these in Vercel Dashboard → Project Settings → Environment Variables:

- `REACT_APP_API_URL`: Custom API URL (defaults to `/api` if not set)

## Updating Your Deployment

After making changes:

1. **Via CLI**:
   ```bash
   vercel --prod
   ```

2. **Via Git**: Push to your repository, Vercel will auto-deploy if connected

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Note**: This deployment uses a temporary SQLite database. For production applications, please migrate to a persistent cloud database.

