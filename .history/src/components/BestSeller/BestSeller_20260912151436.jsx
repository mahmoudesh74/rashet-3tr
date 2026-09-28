import "./BestSellers.css";

const products = [
  {
    id: 1,
    badge: "الأفضل مبيعا",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Attar | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    gradient: ["#EAD9B8", "#B98A52"],
  },
  {
    id: 2,
    badge: "جديد",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Rose of Oman | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    gradient: ["#4A3B2A", "#1E1812"],
  },
  {
    id: 3,
    badge: "الأفضل مبيعا",
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Attar | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    gradient: ["#E7DCC8", "#C7A874"],
  },
];

function ProductMedia({ gradient, id }) {
  const gradId = `bs-grad-${id}`;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${gradId})`} />
      <rect x="160" y="140" width="90" height="210" rx="10" fill="#2B241C" opacity="0.85" />
      <rect x="175" y="112" width="60" height="36" rx="6" fill="#D9BE8E" />
    </svg>
  );
}

function ProductCard({ product }) {
  return (
    <article className="bs-card">
      <div className="bs-card-media">
        <ProductMedia gradient={product.gradient} id={product.id} />
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