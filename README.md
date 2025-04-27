# 📰 News Researcher – AI-Powered News Summarizer

![News Researcher Logo](logo3.png)

---

## Overview
News Researcher is a full-stack web application that fetches, organizes, and summarizes technology news articles from top sources like TechCrunch, The Verge, and Wired. Built with **Next.js**, **React**, **TailwindCSS**, and **PostgreSQL**, it empowers users to read, search, save, and generate AI-based summaries with a single click. The application is fully responsive, offering seamless light and dark mode experiences.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Workflow](#workflow)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Modules and Components](#modules-and-components)
- [API Endpoints](#api-endpoints)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

---

##  Features
- **Fetch Articles:** Automatically retrieve tech articles from multiple trusted sources.
- **AI Summarization:** Instantly generate concise summaries using AI.
- **Save & Note Articles:** Save articles for future reading and annotate them.
- **Search Functionality:** Quickly search saved articles by keyword.
- **Responsive Design:** Fully mobile-friendly with Light and Dark mode support.

---

##  Architecture
The application architecture includes:
- **Frontend:** Built with Next.js and React, offering dynamic pages and server-side rendering.
- **Backend:** REST API for fetching, parsing, and summarizing news articles.
- **Database:** PostgreSQL for storing articles, summaries, and user notes.
- **AI Integration:** Summarization through an external AI service.

---

##  Workflow
1. **Fetch News:** Backend scrapes and parses latest articles from sources.
2. **Store Articles:** Articles are stored into PostgreSQL database.
3. **AI Summarization:** Articles are summarized using an AI API.
4. **User Interaction:** Users can browse, search, save, and annotate articles.

---

##  Technologies Used
- **Next.js** — React Framework with SSR and SSG.
- **React.js** — For building dynamic and reusable UI components.
- **TailwindCSS** — Fast styling with utility-first approach.
- **PostgreSQL** — Relational database for articles and user data.
- **Node.js** — Server-side operations.
- **AI API Integration** — For summarizing articles intelligently.

---

## 🛠️ Getting Started

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/stuhamz/News-researcher.git
cd News-researcher
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Access the App**
Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

##  File Structure
```
/News-researcher
├── .gitignore
├── README.md
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── src/
    ├── api/
    │   ├── fetch-news/route.js
    │   └── summarize/route.js
    ├── app/
    │   ├── _/saved/page.jsx
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.jsx
    ├── middleware.js
    └── utilities/runtime-helpers.js
```

---

##  Modules and Components

### 1. API Routes
- **`src/api/fetch-news/route.js`**: Fetches and parses tech news articles.
- **`src/api/summarize/route.js`**: Summarizes articles using AI and updates database entries.

### 2. Pages
- **`src/app/_/saved/page.jsx`**: Displays saved articles with edit and remove options.
- **`src/app/page.jsx`**: Main page for fetching and displaying latest articles.
- **`src/app/layout.js`**: Application layout and global styles.

### 3. Utilities
- **`src/utilities/runtime-helpers.js`**: Handles streaming responses and file uploads.

### 4. Middleware
- **`src/middleware.js`**: Adds security headers and handles request forwarding.

---

##  API Endpoints
- **`POST /api/fetch-news`**: Fetches and stores tech news articles.
- **`POST /api/summarize-article`**: Summarizes an article and returns the AI-generated summary.

---

##  Styling
- **TailwindCSS** is used extensively for rapid UI development.
- **globals.css** defines core styles.
- Utility classes applied across components ensure responsiveness.
- Fully supports **light** and **dark themes**, toggleable by users.

---

##  Contributing
Contributions are welcome!

- Fork the repository
- Create a feature branch
- Commit your changes
- Push to your branch
- Open a pull request

---

##  License
This project is licensed under the [MIT License](LICENSE).

---
