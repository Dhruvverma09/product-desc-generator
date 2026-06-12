# HimShakti ListingAI — Product Description Generator

AI-powered e-commerce product description generator built for **HimShakti Food Processing Unit**.

## 🚀 Features

- Generate SEO-optimized product descriptions using Groq (Llama 3.1)
- Three tone modes: ✨ Premium, 🌿 Traditional, 💚 Health-Focused
- Regenerate to get alternate versions
- Copy to clipboard in one click
- Persistent history saved to MongoDB (survives page refresh)
- Delete individual history entries
- Fully responsive — works on mobile

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (via local or Atlas) |
| **AI** | Groq API (Llama 3.1 8B) |
| **Styling** | Plain CSS |

## 📁 Project Structure

```
product-desc-generator/
├── src/                    ← React frontend
│   ├── App.js
│   ├── App.css
│   ├── ApiService.js       ← Calls Express backend
│   └── index.js
├── server/                 ← Express backend
│   ├── index.js            ← Server entry point
│   ├── models/
│   │   └── Description.js  ← Mongoose schema
│   └── routes/
│       └── descriptions.js ← API routes
├── .env                    ← React env (API URL)
└── server/.env             ← Server env (MongoDB URI + Groq key)
```

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/Dhruvverma09/product-desc-generator.git
cd product-desc-generator
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

**Frontend** — create `.env` in the root folder:
```
REACT_APP_API_URL=http://localhost:5000
```

**Backend** — create `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/product-desc-generator
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Get your free Groq API key at: https://groq.com

### 5. Make sure MongoDB is running
If using local MongoDB:
```bash
# MongoDB should be running as a service on your machine
# Connection: mongodb://localhost:27017/
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 6. Start the backend server
```bash
cd server
node index.js
```
Server runs at `http://localhost:5000`

### 7. Start the frontend (in a new terminal)
```bash
npm start
```
App runs at `http://localhost:3000`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/descriptions/generate` | Generate + save description |
| `GET` | `/api/descriptions/history` | Get last 10 descriptions |
| `DELETE` | `/api/descriptions/:id` | Delete a description |

## ⚠️ Important
- Never commit your `.env` or `server/.env` files — they are in `.gitignore`
- The Groq API key is kept on the server side for security

---
Built by **Dhruv Verma**
