import React, { useState } from 'react';
import './App.css';
import { generateDescription } from './GroqService';

const TONES = [
  { id: 'premium', label: '✨ Premium', desc: 'Luxury & exclusivity' },
  { id: 'traditional', label: '🌿 Traditional', desc: 'Heritage & authenticity' },
  { id: 'health', label: '💚 Health-Focused', desc: 'Wellness & nutrition' },
];

const SAMPLE_PRODUCTS = [
  {
    productName: "Himalayan Millet Crunch Bar",
    ingredients: "Finger millet, jaggery, sesame seeds, ghee",
    weight: "200g (Pack of 4)",
    features: "No refined sugar, high fiber, traditional recipe, gluten-free"
  },
  {
    productName: "Kumaoni Garlic Pickle",
    ingredients: "Wild Himalayan garlic, mustard oil, fenugreek, turmeric",
    weight: "250g",
    features: "Stone-ground spices, no preservatives, aged 30 days, handmade"
  }
];

export default function App() {
  const [form, setForm] = useState({
    productName: '',
    ingredients: '',
    weight: '',
    features: '',
    tone: 'traditional',
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const loadSample = (sample) => {
    setForm(prev => ({ ...prev, ...sample }));
    setOutput('');
    setError('');
  };

  const isFormValid = form.productName.trim() && form.ingredients.trim() && form.weight.trim() && form.features.trim();

  const handleGenerate = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const result = await generateDescription(form);
      setOutput(result);
      setHistory(prev => [{ ...form, output: result, id: Date.now() }, ...prev.slice(0, 4)]);
    } catch (err) {
      if (err.message === 'API_KEY_MISSING') {
        setError('Groq API key not found. Add REACT_APP_GROQ_API_KEY in your .env file and restart the app.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!isFormValid) return;
    handleGenerate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setForm({ productName: '', ingredients: '', weight: '', features: '', tone: 'traditional' });
    setOutput('');
    setError('');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-leaf">🌿</span>
            <div>
              <h1 className="brand-name">HimShakti ListingAI</h1>
              <p className="brand-tagline">AI-Powered Product Description Generator</p>
            </div>
          </div>
          <div className="header-badge">TBI-GEU · SIP 2026</div>
        </div>
      </header>

      <main className="main">
        <div className="layout">

          {/* LEFT: Form */}
          <section className="form-section">
            <div className="section-header">
              <h2>Product Details</h2>
              <p>Fill in your product info to generate a compelling e-commerce description</p>
            </div>

            {/* Sample loader */}
            <div className="sample-row">
              <span className="sample-label">Try a sample:</span>
              {SAMPLE_PRODUCTS.map((s, i) => (
                <button key={i} className="sample-btn" onClick={() => loadSample(s)}>
                  {s.productName.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Product Name <span className="req">*</span></label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="e.g. Himalayan Millet Crunch Bar"
                />
              </div>

              <div className="field">
                <label>Key Ingredients <span className="req">*</span></label>
                <input
                  type="text"
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  placeholder="e.g. Finger millet, jaggery, sesame seeds"
                />
              </div>

              <div className="field">
                <label>Weight / Size <span className="req">*</span></label>
                <input
                  type="text"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 200g, Pack of 4, 500ml"
                />
              </div>

              <div className="field full">
                <label>Features / USPs <span className="req">*</span></label>
                <textarea
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. No preservatives, handmade, high protein, traditional recipe, gluten-free"
                />
              </div>

              {/* Tone Selector */}
              <div className="field full">
                <label>Description Tone</label>
                <div className="tone-grid">
                  {TONES.map(t => (
                    <button
                      key={t.id}
                      className={`tone-btn ${form.tone === t.id ? 'active' : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, tone: t.id }))}
                    >
                      <span className="tone-label">{t.label}</span>
                      <span className="tone-desc">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-generate" onClick={handleGenerate} disabled={loading || !isFormValid}>
                {loading ? (
                  <><span className="spinner" /> Generating...</>
                ) : (
                  '✦ Generate Description'
                )}
              </button>
              <button className="btn-clear" onClick={handleClear}>Clear</button>
            </div>
          </section>

          {/* RIGHT: Output */}
          <section className="output-section">
            <div className="section-header">
              <h2>Generated Description</h2>
              <p>Ready to copy directly into Amazon, Flipkart, or any e-commerce listing</p>
            </div>

            {error && (
              <div className="error-box">
                <span>⚠️</span> {error}
              </div>
            )}

            {!output && !loading && !error && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>Your AI-generated description will appear here</p>
                <span>Fill in product details and click Generate</span>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="loading-dots">
                  <span /><span /><span />
                </div>
                <p>Crafting your description...</p>
              </div>
            )}

            {output && !loading && (
              <div className="output-card">
                <div className="output-meta">
                  <span className="tone-tag">{TONES.find(t => t.id === form.tone)?.label}</span>
                  <span className="word-count">{output.split(' ').length} words</span>
                </div>
                <div className="output-text">{output}</div>
                <div className="output-actions">
                  <button className="btn-copy" onClick={handleCopy}>
                    {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
                  </button>
                  <button className="btn-regen" onClick={handleRegenerate} disabled={loading}>
                    🔄 Regenerate
                  </button>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 1 && (
              <div className="history-section">
                <h3>Previous Generations</h3>
                {history.slice(1).map(item => (
                  <div key={item.id} className="history-item" onClick={() => setOutput(item.output)}>
                    <span className="history-name">{item.productName}</span>
                    <span className="history-tone">{TONES.find(t => t.id === item.tone)?.label}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built for <strong>HimShakti Food Processing Unit</strong> · TBI-GEU Summer Internship Program 2026 · AI-02</p>
        <p className="disclaimer">AI-generated descriptions should be reviewed before publishing. Results may vary.</p>
      </footer>
    </div>
  );
}
