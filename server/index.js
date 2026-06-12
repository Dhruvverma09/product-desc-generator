const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const descriptionsRouter = require('./routes/descriptions');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'https://product-desc-generator-pi.vercel.app',
  /\.vercel\.app$/   // allow all vercel preview URLs too
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (isAllowed) return callback(null, true);
    return callback(new Error('CORS not allowed for: ' + origin));
  }
}));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/descriptions', descriptionsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🌿 HimShakti ListingAI API is running!', status: 'OK' });
});

// ─── MongoDB Connection + Start Server ───────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
