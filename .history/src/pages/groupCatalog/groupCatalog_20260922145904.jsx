import { useState } from "react";
import "../../components/PerfumeSection/PerfumeSection.css"; 
import "./groupCatalog.css"; 


import groupp1 from "../../assets/groupp1.png";
import groupp2 from "../../assets/groupp2.png";
import groupp3 from "../../assets/groupp3.png";
import groupp4 from "../../assets/groupp4.png";

import groupp5 from "../../assets/groupp5.svg";
import groupp6 from "../../assets/groupp6.svg";
import groupp7 from "../../assets/groupp7-cart-02.svg";
import heart from "../../assets/heart.svg"
import favoriteHeart from "../../assets/favoriteHeart.svg"
import shopping from "../../assets/shopping-cart-02.svg"

const CATEGORIES = [
  "المجموعة الكاملة",
  "مجموعة الفخامة",
  "مجموعة الصيف",
  "يونيسكس",
  "نسائية",
  "رجالي",
];


const PRODUCTS = [
  { id: "jadore", image: groupp2, name: "J'adore | عطر جادور", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: true, isNew: false },
  { id: "baccarat-rouge", image: groupp3, name: "Baccarat | عطر بكرات روج", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: true, isNew: false },
  { id: "libre", image: groupp4, name: "Libre | عطر ليبرا", category: "عطور رجالية", rating: 4.8, oldPrice: 600, price: 450, favorite: false, isNew: false },
  { id: "lattafa-eclaire", image: groupp1, name: "Lattafa Eclaire | عطر اكلير", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: false, isNew: true },
  { id: "coco-si", image: groupp5, name: "عطر سي", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: true, isNew: false },
  { id: "miss-dior", image: groupp6, name: "Miss Dior | عطر ميس ديور", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: false, isNew: false },
  { id: "good-girl", image: groupp7, name: "Good Girl | عطر جود جيرل", category: "عطور نسائية", rating: 4.8, oldPrice: 600, price: 450, favorite: false, isNew: true },
];

const PAGE_SIZE = 7;

function StarRating({ rating }) {
  const rounded = Math.round(rating);
  return (
    <div className="catalog-stars" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={i < rounded ? "star star--filled" : "star star--empty"}
        >
          <polygon points="10,1 12.6,7 19,7.5 14,11.8 15.5,18 10,14.5 4.5,18 6,11.8 1,7.5 7.4,7" />
        </svg>
      ))}
    </div>
  );
}

function PerfumeCard({ product, onToggleFavorite, onAddToCart }) {
  return (
    <div className="perfume-card">
      {product.isNew && <span className="catalog-badge">جديد</span>}

      <button
        type="button"
        className={`fav-btn${product.favorite ? " is-active" : ""}`}
        aria-label={product.favorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
        onClick={() => onToggleFavorite(product.id)}
      >
        <img src={product.favorite ? favoriteHeart : heart} alt="" />
      </button>

      <div className="perfume-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="perfumecontent">
        <h3 className="perfume-card__name">{product.name}</h3>
        <StarRating rating={product.rating} />
      </div>
      <p className="perfume-card__category">{product.category}</p>

      <div className="perfume-card__price">
        <span className="price-new">{product.price} ریال</span>
        <span className="price-old">{product.oldPrice} ریال</span>
      </div>

      <button
        type="button"
        className="perfume-add-btn"
        onClick={() => onAddToCart(product.id)}
      >
        <div className="perfumecartImg">
          <img src={shopping} alt="shopping" />
        </div>
        <span>أضف إلى السلة</span>
      </button>
    </div>
  );
}

export default function GroupCatalog() {
  const [items, setItems] = useState(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  const filtered = items.filter((p) => {
    const matchesCategory =
      activeCategory === "المجموعة الكاملة" || p.category.includes(activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className="perfume-section">
  
      <div className="catalog-toolbar">
       

        <div className="catalog-search-group">
            
          <button type="button" className="catalog-filter-btn" aria-label="فلاتر">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="9" cy="6" r="1.8" fill="currentColor" />
              <circle cx="16" cy="12" r="1.8" fill="currentColor" />
              <circle cx="11" cy="18" r="1.8" fill="currentColor" />
            </svg>
          </button>
          <div className="catalog-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="ابحث في العطور..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          

          
        </div>
         <div className="catalog-sort">
          <button type="button" className="catalog-sort__btn">
            الأحدث
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <span>ترتيب حسب:</span>

        </div>
      </div>

    
      <div className="catalog-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`catalog-tab${activeCategory === cat ? " is-active" : ""}`}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

   
      <div className="perfume-grid">
        {pageItems.map((product) => (
          <PerfumeCard
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={(id) => console.log("added to cart:", id)}
          />
        ))}
      </div>

   
      {totalPages > 1 && (
        <div className="catalog-pagination">
          <button
            type="button"
            className="catalog-page-nav"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="التالي"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`catalog-page-num${currentPage === page ? " is-active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="catalog-page-nav"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="السابق"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
