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

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Hero />
      <main style={styles.main}>
        <h2 style={styles.heading}>Sample Product Listings</h2>
        <div style={styles.grid}>
          {products.map((p, i) => (
            <Card key={i} title={p.title} description={p.description} tag={p.tag} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  main: { padding: "3rem 2rem", backgroundColor: "#f5f5f5", flex: 1 },
  heading: { textAlign: "center", color: "#1a1a2e", marginBottom: "2rem", fontSize: "1.8rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" },
};
