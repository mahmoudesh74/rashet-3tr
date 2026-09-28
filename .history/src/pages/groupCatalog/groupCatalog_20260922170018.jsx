import { useState } from "react";

import "./groupCatalog.css";

import groupp1 from "../../assets/groupp1.png";
import groupp2 from "../../assets/groupp2.png";
import groupp3 from "../../assets/groupp3.png";
import groupp4 from "../../assets/groupp4.png";

import groupp5 from "../../assets/groupp5.png";
import groupp6 from "../../assets/groupp6.png";
import groupp7 from "../../assets/groupp7.png";
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg"
import IconFilter from "../../assets/IconFilter.svg"
import star from "../../assets/rattingIcon.svg"
import emptyStartIcon from "../../assets/emptyStarIcon.svg"
const CATEGORIES = [
  "رجالي",
  "نسائية",
  "يونيسكس",
  "مجموعة الصيف",

  "مجموعة الفخامة",

  "المجموعة الكاملة",
];

const GroupPRODUCTS = [
  {
    id: "jadore",
    image: groupp2,
    name: "J'adore | عطر جادور",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
  },
  {
    id: "baccarat-rouge",
    image: groupp3,
    name: "Baccarat | عطر بكرات روج",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
  },
  {
    id: "libre",
    image: groupp4,
    name: "Libre | عطر ليبرا",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
  },
  {
    id: "lattafa-eclaire",
    image: groupp1,
    name: "Lattafa Eclaire | عطر اكلير",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: true,
  },
  {
    id: "coco-si",
    image: groupp5,
    name: "عطر سي",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
  },
  {
    id: "miss-dior",
    image: groupp6,
    name: "Miss Dior | عطر ميس ديور",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
  },
  {
    id: "good-girl",
    image: groupp7,
    name: "Good Girl | عطر جود جيرل",
    category: "عطور نسائية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: true,
  },
];

const PAGE_SIZE = 7;

function StarRating({ rating }) {
  const rounded = Math.round(rating);

  return (
    <div className="catalog-stars" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={i < rounded ? star : emptyStartIcon}
          alt="star"
          className="star"
        />
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
const handleRatingChange = (rating) => {
  setSelectedRatings((prev) =>
    prev.includes(rating)
      ? prev.filter((r) => r !== rating)
      : [...prev, rating]
  );
};
export default function GroupCatalog() {
  const [items, setItems] = useState(GroupPRODUCTS);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    );
  };

const filtered = items.filter((p) => {
  const matchesCategory =
    activeCategory === "المجموعة الكاملة" ||
    p.category.includes(activeCategory);

  const matchesSearch = p.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesRating =
    selectedRatings.length === 0 ||
    selectedRatings.some((rating) => Math.round(p.rating) === rating);

  return matchesCategory && matchesSearch && matchesRating;
});

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <section className="perfume-section">
      <div className="catalog-toolbar">
        <div className="catalog-search-group">
          <button
            type="button"
            className="catalog-filter-btn"
            aria-label="فلاتر"
            onClick={() => setIsFilterOpen(true)}
          >
          <img src={IconFilter} alt="" />
          </button>
          <div className="catalog-search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <span>ترتيب حسب:</span>
        </div>
      </div>
      {isFilterOpen && (
        <>
          {/* الخلفية */}
          <div
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Drawer */}
          <aside className="filter-drawer">
            {/* Header */}
            <div className="filter-header">
              <div className="filter-title">
                <h2>فلترة المنتجات</h2>
                <span>3 محددة</span>
              </div>

              <button
                type="button"
                className="filter-close"
                onClick={() => setIsFilterOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Categories */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>التصنيفات</span>
                <img src={arrowDown} alt="" />
              </div>

              {CATEGORIES.map((category) => (
                <label className="filter-option" key={category}>
                  <div>
                    <input type="checkbox" />

                    <span>{category}</span>
                  </div>
                  <span className="filter-count">
                    {category === "رجالي" ? "(48)" : "(18)"}
                  </span>
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>نطاق السعر</span>
                               <img src={arrowDown} alt="" />

              </div>

              <div className="price-slider">
                <input type="range"  />
              </div>

              <div className="price-values">
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#9CA3AF"}}>الي</span>
                  <span style={{direction:"rtl"}}>2500 ر.س</span>
                </div>
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <span style={{ color: "#9CA3AF",  }}>من</span>
                  <span style={{direction:"rtl"}}>200 ر.س</span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>الحجم</span>
                                <img src={arrowDown} alt="" />

              </div>
            </div>

            {/* Rating */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>التقييم</span>
                               <img src={arrowDown} alt="" />

              </div>

              {[5, 4, 3, 2, 1].map((rating) => (
                <label className="filter-option" key={rating}>
                  <div>
                  <input type="checkbox" />

                    <span>{rating} نجوم</span>
                  </div>
                    <span className="filter-count">(48)</span>

                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="filter-actions">
              <button
                type="button"
                className="apply-filter"
                onClick={() => setIsFilterOpen(false)}
              >
                تطبيق الفلتر
              </button>

              <button type="button" className="clear-filter">
                تصفية
              </button>
            </div>
          </aside>
        </>
      )}

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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
