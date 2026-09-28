import { useState } from "react";
import "./PerfumeSection.css";

import loris from "../../assets/perfume1.png";
import libre from "../../assets/perfume2.png";
import baccarat from "../../assets/perfume3.png";
import tomford from "../../assets/perfume4.png";
import arrowLeft from "../../assets/arrowLeft.svg"



const DEFAULT_PRODUCTS = [
  {
    id: "tom-ford-oud-wood",
    image: tomford,
    name: "Tom ford |عطر توم فود",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
  {
    id: "baccarat-rouge-540",
    image: baccarat,
    name: "Baccarat | عطر بكرات",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
  {
    id: "ysl-libre",
    image: libre,
    name: "Libre | عطر ليبرا",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
  },
  {
    id: "loris-bronze-wood",
    image: loris,
    name: "Loris | عطر لوريس",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
];

function PerfumeCard({ product, onToggleFavorite, onAddToCart }) {
  return (
    <div className="perfume-card">
      <button
        type="button"
        className={`fav-btn${product.favorite ? " is-active" : ""}`}
        aria-label={product.favorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
        onClick={() => onToggleFavorite(product.id)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.4 1.6 7 4.4 5.6 6.6 4.5 9 5.2 12 8c3-2.8 5.4-3.5 7.6-2.4C22.4 7 23 10.4 21.3 12.9 18.7 16.65 12 21 12 21z" />
        </svg>
      </button>

      <div className="perfume-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="perfume-card__rating">
        <svg viewBox="0 0 20 20">
          <polygon points="10,1 12.6,7 19,7.5 14,11.8 15.5,18 10,14.5 4.5,18 6,11.8 1,7.5 7.4,7" />
        </svg>
        <span>{product.rating}</span>
      </div>

      <h3 className="perfume-card__name">{product.name}</h3>
      <p className="perfume-card__category">{product.category}</p>

      <div className="perfume-card__price">
        <span className="price-old">
          {product.oldPrice} 
        </span>
        <span className="price-new">
          {product.price}         </span>
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={() => onAddToCart(product.id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        أضف إلى السلة
      </button>
    </div>
  );
}

export default function PerfumeSection({
  title = "العطور",

  products = DEFAULT_PRODUCTS,
  onAddToCart = () => {},
}) {
  const [items, setItems] = useState(products);

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  return (
    <section className="perfume-section" dir="rtl">
      <div className="perfume-section__head">
        <h2>{title}</h2>

         <div
                  className="GroupSectionButton"
                  
                  style={{ cursor: "pointer" }}
                >
                  <p>عرض الكل</p>
                  <div>
                    <img src={arrowLeft} alt="arrowLeft" />
                  </div>
                </div>
      </div>

      {/* Fixed 4-column grid: a 5th (or 9th, 13th...) card wraps to a new row automatically */}
      <div className="perfume-grid">
        {items.map((product) => (
          <PerfumeCard
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
