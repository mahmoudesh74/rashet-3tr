import "./BestSeller.css";

import product1 from "../../assets/download.png";
import product2 from "../../assets/d2.png";
import product3 from "../../assets/d3.png";

const products = [
  {
    id: 1,
    badge: "الأفضل مبيعا",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Attar | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product1,
  },
  {
    id: 2,
    badge: "جديد",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Rose of Oman | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product2,
  },
  {
    id: 3,
    badge: "الأفضل مبيعا",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Acqua Di Gio | عطر رجالي",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product3,
  },
];

function ProductCard({ product }) {
  return (
    <article className="bs-card">
      <div className="bs-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="bs-badge">{product.badge}</span>
        <button className="bs-fav" aria-label="أضف للمفضلة">
          ♡
        </button>
      </div>

      <div className="bs-card-body">
        <span className="bs-kicker">{product.kicker}</span>
        <h3>{product.name}</h3>
        <span className="bs-cat">{product.category}</span>

        <div className="bs-price-row">
          <span className="bs-price-old">{product.oldPrice} ﷼</span>
          <span className="bs-price-new">{product.newPrice} ﷼</span>
        </div>

        <button className="bs-add-btn">أضف إلى السلة 🛒</button>
      </div>
    </article>
  );
}

export default function BestSellers() {
  return (
    <section className="bs-section" dir="rtl">
      <div className="bs-section-head">
        <h2>الأكثر مبيعا</h2>
        <div className="bs-nav-arrows">
          <button aria-label="السابق">‹</button>
          <button aria-label="التالي">›</button>
        </div>
      </div>

      <div className="bs-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}