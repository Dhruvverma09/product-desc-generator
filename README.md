# HimShakti ListingAI — Product Description Generator

AI-powered e-commerce product description generator built for **HimShakti Food Processing Unit** as part of **TBI-GEU Summer Internship Program 2026 (AI-02)**.

## 🚀 Features

- Generate SEO-optimized product descriptions using Groq API
- Three tone modes: Premium, Traditional, Health-Focused
- Regenerate to get alternate versions
- Copy to clipboard in one click
- Generation history (last 5 outputs)
- Fully responsive — works on mobile

## 🛠️ Tech Stack

- **Frontend:** React 18
- **AI:** Groq API
- **Styling:** Custom CSS with CSS Variables
- **Fonts:** Playfair Display + Inter (Google Fonts)

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/Dhruvverma09/product-desc-generator.git
cd product-desc-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your Groq API key
Create a `.env` file in the root folder:
```
REACT_APP_GROQ_API_KEY=your_api_key_here
```

Get your free API key at: https://groq.com

### 4. Start the app
```bash
npm start
```

App runs at `http://localhost:3000`

## 📦 Build for Production
```bash
npm run build
```

## 🌐 Deploy on GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json`:
```json
"homepage": "https://Dhruvverma09.github.io/product-desc-generator",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
Then run:
```bash
npm run deploy
```

## ⚠️ Important
- Never commit your `.env` file — it's in `.gitignore`
- AI-generated descriptions should be reviewed before publishing

---
Built by **Dhruv Verma** · TBI-GEU SIP 2026 · AI-02
