import { useState } from "react";
import "./perfumePage.css";
import perfume1 from "../../assets/groupp1.png";
import perfume2 from "../../assets/groupp2.png";
import perfume3 from "../../assets/groupp3.png";
import perfume4 from "../../assets/groupp4.png";
import perfume5 from "../../assets/groupp5.png";
import perfume6 from "../../assets/groupp6.png";
import perfume7 from "../../assets/groupp7.png";
import perfume8 from "../../assets/groupp1.png";
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg";
import IconFilter from "../../assets/IconFilter.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";

const CATEGORIES = ["رجالي", "نسائية", "يونيسكس"];

const PERFUME_PRODUCTS = [
  {
    id: "tom-ford-oud",
    image: perfume1,
    name: "Tom Ford | عطر توم فورد عود",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "baccarat",
    image: perfume2,
    name: "Baccarat | عطر بكرات روج",
    category: "يونيسكس",
    family: "عطور فرنسية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "libre",
    image: perfume3,
    name: "Libre | عطر ليبرا",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
    bestSeller: false,
  },
  {
    id: "loris-1",
    image: perfume4,
    name: "Loris | عطر لوريس",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: false,
  },
  {
    id: "sauvage",
    image: perfume5,
    name: "Sauvage | عطر سوفاج",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "louis-vuitton",
    image: perfume6,
    name: "Louis Vuitton | عطر لويس فيتون",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: true,
  },
  {
    id: "loris-2",
    image: perfume7,
    name: "Loris | عطر لوريس",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: false,
  },
  {
    id: "lattafa-eclaire1",
    image: perfume8,
    name: "Lattafa Eclaire | عطر لاتافا اكلير",
    category: "نسائية",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: true,
    bestSeller: false,
  },
    {
    id: "tom-ford-oud1",
    image: perfume1,
    name: "Tom Ford | عطر توم فورد عود",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "baccarat1",
    image: perfume2,
    name: "Baccarat | عطر بكرات روج",
    category: "يونيسكس",
    family: "عطور فرنسية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "libre1",
    image: perfume3,
    name: "Libre | عطر ليبرا",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
    bestSeller: false,
  },
  {
    id: "loris-11",
    image: perfume4,
    name: "Loris | عطر لوريس",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: false,
  },
  {
    id: "sauvage1",
    image: perfume5,
    name: "Sauvage | عطر سوفاج",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: false,
    bestSeller: true,
  },
  {
    id: "louis-vuitton1",
    image: perfume6,
    name: "Louis Vuitton | عطر لويس فيتون",
    category: "رجالي",
    family: "عطور فرنسية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: true,
  },
  {
    id: "loris-21",
    image: perfume7,
    name: "Loris | عطر لوريس",
    category: "رجالي",
    family: "عطور شرقية",
    rating: 5,
    oldPrice: 600,
    price: 450,
    favorite: true,
    isNew: true,
    bestSeller: false,
  },
  {
    id: "lattafa-eclaire1",
    image: perfume8,
    name: "Lattafa Eclaire | عطر لاتافا اكلير",
    category: "نسائية",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: true,
    bestSeller: false,
  },
   {
    id: "lattafa-eclaire1",
    image: perfume8,
    name: "Lattafa Eclaire | عطر لاتافا اكلير",
    category: "نسائية",
    family: "عطور شرقية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
    isNew: true,
    bestSeller: false,
  },
];

const PAGE_SIZE = 8;

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
      <p className="perfume-card__category">{product.family}</p>

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

export default function PerfumePage() {
  const [items, setItems] = useState(PERFUME_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    );
  };

  const filtered = items.filter((p) => {
    const matchesCategory = !activeCategory || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <div
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          <aside className="filter-drawer">
            <div className="filter-header">
              <div className="filter-title">
                <h2>فلترة العطور</h2>
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

            {/* الفئة */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>الفئة</span>
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

            {/* السعر */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>نطاق السعر</span>
                <img src={arrowDown} alt="" />
              </div>

              <div className="price-slider">
                <input type="range" />
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
                  <span style={{ color: "#9CA3AF" }}>الي</span>
                  <span style={{ direction: "rtl" }}>1200 ر.س</span>
                </div>
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#9CA3AF" }}>من</span>
                  <span style={{ direction: "rtl" }}>200 ر.س</span>
                </div>
              </div>
            </div>

            {/* الحجم */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>الحجم</span>
                <img src={arrowDown} alt="" />
              </div>
            </div>

            {/* التقييم */}
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
              setActiveCategory((prev) => (prev === cat ? null : cat));
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