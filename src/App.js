import React, { useState, useEffect } from 'react';
import './App.css';
import { generateAndSave, getHistory, deleteDescription } from './ApiService';

const TONES = [
  { id: 'premium', label: '✨ Premium', sub: 'Luxury & exclusivity' },
  { id: 'traditional', label: '🌿 Traditional', sub: 'Heritage & authenticity' },
  { id: 'health', label: '💚 Health-Focused', sub: 'Wellness & nutrition' },
];

const SAMPLES = [
  {
    productName: 'Himalayan Millet Crunch Bar',
    ingredients: 'Finger millet, jaggery, sesame seeds, ghee',
    weight: '200g (Pack of 4)',
    features: 'No refined sugar, high fiber, traditional recipe, gluten-free',
  },
  {
    productName: 'Kumaoni Garlic Pickle',
    ingredients: 'Wild Himalayan garlic, mustard oil, fenugreek, turmeric',
    weight: '250g',
    features: 'Stone-ground spices, no preservatives, aged 30 days, handmade',
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function App() {
  const [productName, setProductName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [weight, setWeight] = useState('');
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('traditional');

  const [output, setOutput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const isValid = productName.trim() && ingredients.trim() && weight.trim() && features.trim();

  // load history from MongoDB when page opens
  useEffect(() => {
    getHistory()
      .then((data) => setHistory(data))
      .catch((err) => console.log('Could not load history:', err.message))
      .finally(() => setHistoryLoading(false));
  }, []);

  function loadSample(s) {
    setProductName(s.productName);
    setIngredients(s.ingredients);
    setWeight(s.weight);
    setFeatures(s.features);
    setOutput('');
    setError('');
  }

  function clearForm() {
    setProductName('');
    setIngredients('');
    setWeight('');
    setFeatures('');
    setTone('traditional');
    setOutput('');
    setError('');
    setCurrentId(null);
  }

  async function handleGenerate() {
    if (!isValid) return;
    setLoading(true);
    setError('');
    setOutput('');
    setCurrentId(null);
    try {
      const result = await generateAndSave({ productName, ingredients, weight, features, tone });
      setOutput(result.generatedDescription);
      setWordCount(result.wordCount);
      setCurrentId(result._id);
      // refresh history from DB
      const updated = await getHistory();
      setHistory(updated);
    } catch (err) {
      setError('Something went wrong: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteDescription(id);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (id === currentId) {
        setOutput('');
        setCurrentId(null);
      }
    } catch (err) {
      console.log('Delete failed:', err.message);
    } finally {
      setDeletingId(null);
    }
  }

  function loadFromHistory(item) {
    setOutput(item.generatedDescription);
    setWordCount(item.wordCount);
    setCurrentId(item._id);
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div>
          <h1>🌿 HimShakti ListingAI</h1>
          <p>AI-Powered Product Description Generator</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container">

        {/* Left side - Form */}
        <div className="card">
          <h2>Product Details</h2>
          <p>Fill in the product information below to generate a description</p>

          {/* Sample products */}
          <div className="sample-row">
            <span>Try a sample:</span>
            {SAMPLES.map((s, i) => (
              <button key={i} className="sample-btn" onClick={() => loadSample(s)}>
                {s.productName.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          {/* Form fields */}
          <div className="form-group">
            <label>Product Name <span>*</span></label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Himalayan Millet Crunch Bar"
            />
          </div>

          <div className="form-group">
            <label>Key Ingredients <span>*</span></label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. Finger millet, jaggery, sesame seeds"
            />
          </div>

          <div className="form-group">
            <label>Weight / Size <span>*</span></label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 200g, Pack of 4, 500ml"
            />
          </div>

          <div className="form-group">
            <label>Features / USPs <span>*</span></label>
            <textarea
              rows={3}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g. No preservatives, handmade, high protein, gluten-free"
            />
          </div>

          {/* Tone Selector */}
          <div className="tone-label-text">Select Tone</div>
          <div className="tone-options">
            {TONES.map((t) => (
              <button
                key={t.id}
                className={`tone-option ${tone === t.id ? 'selected' : ''}`}
                onClick={() => setTone(t.id)}
              >
                <span className="tone-name">{t.label}</span>
                <span className="tone-sub">{t.sub}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="btn-row">
            <button className="btn-generate" onClick={handleGenerate} disabled={loading || !isValid}>
              {loading ? 'Generating...' : 'Generate Description'}
            </button>
            <button className="btn-clear" onClick={clearForm}>Clear</button>
          </div>
        </div>

        {/* Right side - Output */}
        <div className="card">
          <h2>Generated Description</h2>
          <p>Copy the result and paste it into your product listing</p>

          {/* Error */}
          {error && <div className="error-msg">⚠️ {error}</div>}

          {/* Empty state */}
          {!output && !loading && !error && (
            <div className="output-placeholder">
              <div className="icon">📄</div>
              <p>Your generated description will appear here.</p>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>Fill the form on the left and click Generate.</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-box">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Generating description, please wait...</p>
            </div>
          )}

          {/* Result */}
          {output && !loading && (
            <div>
              <div className="result-box">
                <div className="result-meta">
                  <span className="tone-tag">
                    {TONES.find((t) => t.id === tone)?.label}
                  </span>
                  <span className="word-count">{wordCount} words</span>
                </div>
                <div className="result-text">{output}</div>
              </div>
              <div className="result-actions">
                <button className="btn-copy" onClick={handleCopy}>
                  {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
                </button>
                <button className="btn-regen" onClick={handleGenerate} disabled={loading}>
                  🔄 Regenerate
                </button>
              </div>
            </div>
          )}

          {/* History from MongoDB */}
          <div className="history-box">
            <h3>
              Saved History
              <span className="history-count">{history.length} saved</span>
            </h3>

            {historyLoading && <p className="history-loading">Loading history from database...</p>}

            {!historyLoading && history.length === 0 && (
              <p className="history-empty">No descriptions saved yet.</p>
            )}

            {!historyLoading && history.map((item) => (
              <div
                key={item._id}
                className={`history-item ${item._id === currentId ? 'active' : ''}`}
                onClick={() => loadFromHistory(item)}
              >
                <div className="history-item-top">
                  <span className="history-name">{item.productName}</span>
                  <span className="history-tone">
                    {TONES.find((t) => t.id === item.tone)?.label}
                  </span>
                </div>
                <div className="history-item-bottom">
                  <span className="history-date">{formatDate(item.createdAt)}</span>
                  <span className="history-words">{item.wordCount}w</span>
                  <button
                    className="btn-delete"
                    onClick={(e) => handleDelete(item._id, e)}
                    disabled={deletingId === item._id}
                    title="Delete"
                  >
                    {deletingId === item._id ? '...' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2026 HimShakti ListingAI. All rights reserved.</p>
      </div>
    </div>
  );
}
