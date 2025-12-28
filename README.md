# BeyondChats Article Intelligence

A full-stack application that demonstrates AI-powered article enhancement. The system fetches articles, searches for related content from top-ranking sources, and uses AI to create improved, SEO-optimized versions.

## 🌐 Live Demo

**Frontend:** [Coming Soon - Add your deployed URL here]

## 📁 Project Structure

```
beyondchats-ai-blog/
├── backend/          # Laravel REST API
├── frontend/         # React + Vite + Tailwind + shadcn/ui
└── ai-engine/        # Node.js scraping + AI rewrite scripts
```

## 🏗️ Architecture & Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AI Engine     │────▶│   Laravel API   │◀────│   React App     │
│   (Node.js)     │     │   (Backend)     │     │   (Frontend)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       ▼                       │
        │               ┌───────────────┐               │
        │               │  PostgreSQL   │               │
        │               │   (Articles)  │               │
        │               └───────────────┘               │
        │                                               │
        ▼                                               ▼
┌─────────────────┐                         ┌─────────────────┐
│  SerpAPI        │                         │  Article List   │
│  (Google Search)│                         │  Article Detail │
└─────────────────┘                         │  Filter & Search│
        │                                   └─────────────────┘
        ▼
┌─────────────────┐
│  Web Scraping   │
│  (Cheerio)      │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  OpenAI API     │
│  (Rewrite)      │
└─────────────────┘
```

### Flow Description

1. **Original Articles**: Stored in the database with `type: "original"`
2. **AI Engine Processing**:
   - Fetches original articles from the Laravel API
   - Searches Google (via SerpAPI) for related top-ranking articles
   - Scrapes content from competitor articles
   - Uses OpenAI to rewrite and improve the article
   - Publishes improved version with `type: "updated"`
3. **Frontend Display**:
   - Fetches all articles from the API
   - Displays articles with filter tabs (All / Original / AI Updated)
   - Renders markdown content with proper styling
   - Shows references for AI-updated articles

## 🚀 Local Setup Instructions

### Prerequisites

- **PHP 8.2+** with Composer
- **Node.js 18+** with npm
- **PostgreSQL** database

### Backend Setup (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env (set PostgreSQL credentials)
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=beyondchats
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed sample data (optional)
php artisan db:seed

# Start the server (port 8001)
php artisan serve --port=8001
```

The API will be available at `http://localhost:8001/api`

**API Endpoints:**
- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### AI Engine Setup (Node.js)

```bash
cd ai-engine

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # or create .env manually
```

**Required Environment Variables** (in `ai-engine/.env`):
```env
SERPAPI_KEY=your_serpapi_key
OPENAI_API_KEY=your_openai_api_key
LARAVEL_API_BASE=http://127.0.0.1:8001/api
```

**Running the AI Engine:**

```bash
# Fetch and display original articles
node fetchArticles.js

# Process articles (search, scrape, rewrite, publish)
node runPhase2.js

# Test individual components
node testSerp.js    # Test SerpAPI search
node testScrape.js  # Test web scraping
```

## 🛠️ Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend    | Laravel 12, PHP 8.2+, PostgreSQL                |
| AI Engine  | Node.js, Axios, Cheerio, OpenAI API, SerpAPI    |
| UI Library | shadcn/ui (Radix UI primitives)                 |

## 📱 Features

- **Article Listing** with grid layout and responsive design
- **Filter Tabs**: All / Original / AI Updated
- **Search**: Filter articles by title or content
- **Dark/Light Mode** toggle
- **Reading Time** estimation
- **Markdown Rendering** with proper formatting
- **References Section** for AI-updated articles
- **Skeleton Loading** states
- **Mobile Responsive** design

## 📝 Scripts

### Backend
```bash
php artisan serve --port=8001    # Start server
php artisan migrate              # Run migrations
php artisan migrate:fresh        # Reset database
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### AI Engine
```bash
node fetchArticles.js     # Fetch original articles
node runPhase2.js         # Full AI processing pipeline
node testSerp.js          # Test Google search
node testScrape.js        # Test web scraping
```

## 📄 License

This project is for demonstration purposes.

---

Built for BeyondChats Assignment
