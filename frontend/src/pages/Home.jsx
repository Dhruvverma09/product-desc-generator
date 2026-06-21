import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

const products = [
  { title: "Himalayan Honey 500g", description: "Pure raw honey sourced from high-altitude Himalayan beehives. Rich in antioxidants and natural enzymes.", tag: "Honey" },
  { title: "Cold-Pressed Mustard Oil 1L", description: "100% natural cold-pressed mustard oil, ideal for cooking and traditional use. No preservatives added.", tag: "Oils" },
  { title: "Organic Turmeric Powder 200g", description: "Premium quality organic turmeric with high curcumin content. Perfect for health-conscious consumers.", tag: "Spices" },
  { title: "Mountain Berry Jam 300g", description: "Handcrafted berry jam made from wild Himalayan berries. No artificial flavors or colors.", tag: "Preserves" },
];

export default function Home({ darkMode, toggleTheme }) {
  const textColor = darkMode ? "#f0f0f0" : "#1a1a2e";
  const cardBg = darkMode ? "#1a1a2e" : "#fff";
  const pageBg = darkMode ? "#0f0f1a" : "#f5f5f5";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: pageBg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero darkMode={darkMode} />
      <main style={{ padding: "3rem 2rem", flex: 1 }}>
        <h2 style={{ textAlign: "center", color: textColor, marginBottom: "2rem", fontSize: "1.8rem" }}>Sample Product Listings</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {products.map((p, i) => (
            <Card key={i} title={p.title} description={p.description} tag={p.tag} darkMode={darkMode} />
          ))}
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}