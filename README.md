# 🚀 BeyondChats Article Intelligence

A full-stack application demonstrating **AI-powered article enhancement**.  
The system fetches original articles, analyzes top-ranking related content, and generates **SEO-optimized AI-enhanced versions**, while preserving clear attribution and traceability.

---

## 🌐 Live Demo

### Frontend (Deployed)

👉 **[https://beyondchats-article-intelligence-ljz12igmw.vercel.app/](https://beyondchats-article-intelligence-ljz12igmw.vercel.app/)**

> ⚠️ **Important Note for Reviewers**  
> Only the **frontend** is deployed publicly.  
> The **backend (Laravel API)** and **AI Engine** are intended to be run **locally**, as they depend on:
> - PostgreSQL
> - OpenAI API
> - SerpAPI  
>  
> This approach avoids managed database and API costs while keeping the architecture production-ready.

---

## 📁 Project Structure

```
beyondchats-article-intelligence/
├── backend/      # Laravel REST API (Articles + DB)
├── frontend/     # React + Vite + Tailwind + shadcn/ui
└── ai-engine/    # Node.js scraping + AI rewrite pipeline
```

---

## 🏗️ Architecture & Data Flow

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│    AI Engine    │─────▶│   Laravel API   │◀─────│    React App    │
│    (Node.js)    │      │    (Backend)    │      │   (Frontend)    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                        │                        │
        │                        ▼                        │
        │                ┌───────────────┐                │
        │                │  PostgreSQL   │                │
        │                │  (Articles)   │                │
        │                └───────────────┘                │
        ▼                                                 ▼
┌─────────────────┐                          ┌─────────────────┐
│     SerpAPI     │                          │  Article List   │
│ (Google Search) │                          │ Article Detail  │
└─────────────────┘                          │ Filters & Tabs  │
        │                                    └─────────────────┘
        ▼
┌─────────────────┐
│  Web Scraping   │
│    (Cheerio)    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   OpenAI API    │
│  (AI Rewrite)   │
└─────────────────┘
```

---

## 🔄 Data Flow Summary

1. **Original Articles**
   - Stored in PostgreSQL with `type = "original"`

2. **AI Processing Pipeline**
   - Fetches original articles from the Laravel API
   - Searches Google using **SerpAPI**
   - Scrapes top-ranking articles using **Cheerio**
   - Uses **OpenAI API** to generate improved content
   - Publishes AI-enhanced articles with `type = "updated"`

3. **Frontend**
   - Fetches articles via REST API
   - Displays tabs: **All / Original / AI Updated**
   - Renders markdown cleanly
   - Shows reference links for AI-updated articles

---

## 🚀 Local Setup Instructions

### Prerequisites

- **PHP 8.2+** with Composer
- **Node.js 18+**
- **PostgreSQL**
- **npm**

---

## 🧩 Backend Setup (Laravel)

```bash
cd backend

composer install
cp .env.example .env
php artisan key:generate
```

Update `.env` with PostgreSQL credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=beyondchats
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

Run migrations and start the server:

```bash
php artisan migrate
php artisan serve --port=8001
```

📍 **Backend runs at:** `http://127.0.0.1:8001/api`

### API Endpoints

| Method   | Endpoint              | Description          |
|----------|----------------------|----------------------|
| `GET`    | `/api/articles`      | List all articles    |
| `GET`    | `/api/articles/{id}` | Get single article   |
| `POST`   | `/api/articles`      | Create article       |
| `PUT`    | `/api/articles/{id}` | Update article       |
| `DELETE` | `/api/articles/{id}` | Delete article       |

---

## 🎨 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

📍 **Local frontend:** `http://localhost:8080`

---

## 🤖 AI Engine Setup (Node.js)

```bash
cd ai-engine
npm install
```

Create `.env` file:

```env
SERPAPI_KEY=your_serpapi_key
OPENAI_API_KEY=your_openai_api_key
LARAVEL_API_BASE=http://127.0.0.1:8001/api
```

### Run AI Pipeline

```bash
node fetchArticles.js     # Fetch original articles
node runPhase2.js         # Search, scrape, rewrite, publish
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend    | Laravel 12, PHP 8.2+, PostgreSQL                    |
| AI Engine  | Node.js, Cheerio, OpenAI API, SerpAPI               |

---

## ✨ Features

- ✅ Article listing with grid layout
- ✅ Tabs: All / Original / AI Updated
- ✅ Clean markdown rendering
- ✅ Reference attribution for AI articles
- ✅ Dark mode
- ✅ Reading time estimation
- ✅ Responsive UI
- ✅ Skeleton loaders

---

## 📄 Notes for Evaluation

- ✔️ Backend & AI Engine are fully functional locally
- ✔️ Frontend is publicly deployed
- ✔️ Clean separation of concerns
- ✔️ Exact type-based filtering (no hardcoded labels)
- ✔️ Frequent commits maintained

---

## 📜 License

This project is built strictly for evaluation purposes as part of the **BeyondChats Internship Assignment**.
