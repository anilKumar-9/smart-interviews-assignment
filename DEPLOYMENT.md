# 🚀 Deployment Guide: Render (Backend) & Vercel (Frontend)

This guide provides step-by-step instructions to deploy your Full Stack Task Management System to **Render** (Node.js/Express API) and **Vercel** (React Frontend).

---

## 📌 Prerequisites

1. **GitHub Account**: Push your repository to GitHub.
2. **MongoDB Atlas Account**: Ensure you have a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Render Account**: [render.com](https://render.com) (free tier available).
4. **Vercel Account**: [vercel.com](https://vercel.com) (free tier available).

---

## Part 1: Deploy Backend to Render

### Step 1: Create a Web Service on Render
1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `smart-interviews-assignment`.
4. Configure the settings:
   - **Name**: `task-tracker-backend` (or your preferred name)
   - **Language / Runtime**: `Node`
   - **Root Directory**: `backend` *(Important!)*
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 2: Set Environment Variables on Render
Scroll down to **Environment Variables** and add:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations |
| `PORT` | `5000` | Render assigns ports automatically or uses 5000 |
| `MONGO_URI` | `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/task_tracker?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your_custom_long_secret_key_here` | Secure random string |
| `JWT_EXPIRE` | `30d` | Token expiry duration |

### Step 3: Deploy & Copy Backend URL
1. Click **Create Web Service**.
2. Wait 1–2 minutes for the build to finish.
3. Once deployed, copy your Render Service URL (e.g. `https://task-tracker-backend.onrender.com`).
4. Test by opening `https://task-tracker-backend.onrender.com/api/health` in your browser. You should see `{"status":"online", ...}`.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Import Project into Vercel
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Select your GitHub repository: `smart-interviews-assignment`.

### Step 2: Configure Project Settings
In the configuration screen:
1. **Framework Preset**: `Vite`
2. **Root Directory**: Click **Edit** and choose `frontend` *(Important!)*
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Add Environment Variable on Vercel
Expand **Environment Variables** and add:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://task-tracker-backend.onrender.com/api` |

*(Replace `https://task-tracker-backend.onrender.com` with your actual Render backend URL followed by `/api`)*.

### Step 4: Deploy
1. Click **Deploy**.
2. Vercel will build and assign you a live production domain (e.g. `https://task-tracker-frontend.vercel.app`).
3. Open your live Vercel URL and test login / 1-click demo account!

---

## 🔍 Verification Checklist

- [ ] Backend health check responds at `https://<your-render-url>/api/health`.
- [ ] Frontend successfully registers / logs in via your Render backend.
- [ ] 1-Click Demo account populates and shows tasks on the live domain.
- [ ] Task creation, status updates, filters, and analytics work seamlessly in production.
- [ ] Dark/Light mode and responsive view function on mobile.
