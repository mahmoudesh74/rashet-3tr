
import { useEffect, useMemo, useState } from "react";
import "./perfumePage.css";

import perfume1 from "../../assets/loris.png";
import perfume2 from "../../assets/libra.png";
import perfume3 from "../../assets/backarat.png";
import perfume4 from "../../assets/tomford.png";
import perfume5 from "../../assets/eclaire.png";
import perfume7 from "../../assets/lois.png";
import perfume8 from "../../assets/sovage.png";

import shopping from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg";
import IconFilter from "../../assets/IconFilter.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import rialsaody from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import { getProducts } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/wishlistSlice";

// =========================
// FALLBACK IMAGES
// =========================
const FALLBACK_IMAGES = [
  perfume1,
  perfume2,
  perfume3,
  perfume4,
  perfume5,
  perfume7,
  perfume8,
];

const PAGE_SIZE = 8;

// =========================
// HELPERS
// =========================
function getWishlistProductId(item) {
  return item?.product_id ?? item?.product?.id;
}

function getProductImage(product) {
  const image = product.image || product.images?.[0];

  if (typeof image === "string" && image.trim()) {
    return image;
  }

  return FALLBACK_IMAGES[
    Math.abs(Number(product.id) || 0) % FALLBACK_IMAGES.length
  ];
}

function getProductName(product) {
  return (
    product.name_ar ||
    product.name ||
    product.name_en ||
    "منتج"
  );
}

// =========================
// STAR RATING
// =========================
function StarRating({ rating }) {
  if (!rating) {
    return (
      <div className="catalog-stars" aria-label="لا يوجد تقييم">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src={emptyStartIcon}
            alt=""
            className="star"
          />
        ))}
      </div>
    );
  }

  const rounded = Math.max(
    0,
    Math.min(5, Math.round(Number(rating)))
  );

  return (
    <div
      className="catalog-stars"
      aria-label={`${rating} من 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={i < rounded ? star : emptyStartIcon}
          alt=""
          className="star"
        />
      ))}
    </div>
  );
}

// =========================
// PRODUCT CARD
// =========================
function PerfumeCard({
  product,
  onToggleFavorite,
  onAddToCart,
  favoriteLoading,
}) {
  const navigate = useNavigate();

  const image = getProductImage(product);
  const name = getProductName(product);

  const price = Number(product.price || 0);
  const originalPrice = Number(product.original_price || 0);

  const isNew =
    product.is_new === true ||
    product.isNew === true;

  const categoryName =
    product.category?.name_ar ||
    product.category?.name ||
    product.category?.name_en ||
    product.categories?.[0]?.name_ar ||
    product.categories?.[0]?.name ||
    product.categories?.[0]?.name_en ||
    (typeof product.category === "string"
      ? product.category
      : typeof product.categories?.[0] === "string"
        ? product.categories[0]
        : "");

  return (
    <div className="perfume-card">
      {isNew && (
        <span className="catalog-badge">جديد</span>
      )}

      <FavoriteButton
        className="fav-btn"
        isFavorite={Boolean(product.favorite)}
        onClick={() => onToggleFavorite(product)}
      />

      <div
        className="perfume-card__image"
        onClick={() =>
          navigate(`/PerfumeDetails/${product.id}`)
        }
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt={name} loading="lazy" />
      </div>

      <div className="perfumecontent">
        <h3 className="perfume-card__name">
          {product.name_en || product.name || name}
        </h3>

        <StarRating rating={product.rating} />
      </div>

      {categoryName && (
        <p className="perfume-card__category">
          {categoryName}
        </p>
      )}

      <div className="perfume-card__price">
        <span className="price-new">
          <span>{price}</span>
          <img src={rialsaody} alt="" />
        </span>

        {originalPrice > price && (
          <span className="price-old">
            <span>{originalPrice}</span>
            <img src={rialSale} alt="" />
          </span>
        )}
      </div>

      <AddToCartButton
        icon={shopping}
        onClick={() => onAddToCart(product)}
      />
    </div>
  );
}

// =========================
// MAIN PAGE
// =========================
export default function PerfumePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products);

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items ?? []
  );

  const wishlistLoading = useSelector(
    (state) => state.wishlist?.actionLoading ?? false
  );

  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // =========================
  // GET PRODUCTS + WISHLIST
  // =========================
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getWishlist());
  }, [dispatch]);

  // =========================
  // NORMALIZE WISHLIST
  // =========================
  const favoriteProductIds = useMemo(() => {
    return new Set(
      wishlistItems
        .map(getWishlistProductId)
        .filter((id) => id !== undefined && id !== null)
        .map(Number)
    );
  }, [wishlistItems]);

  // =========================
  // PRODUCTS WITH FAVORITE STATE
  // =========================
  const items = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.map((product) => ({
      ...product,
      favorite: favoriteProductIds.has(Number(product.id)),
    }));
  }, [products, favoriteProductIds]);

  // =========================
  // GET PRODUCT CATEGORY
  // =========================
  const getProductCategory = (product) => {
    if (
      product.category &&
      typeof product.category === "object"
    ) {
      return (
        product.category.name_ar ||
        product.category.name ||
        product.category.name_en ||
        ""
      );
    }

    if (typeof product.category === "string") {
      return product.category;
    }

    if (
      Array.isArray(product.categories) &&
      product.categories.length > 0
    ) {
      const first = product.categories[0];

      if (typeof first === "object") {
        return (
          first.name_ar ||
          first.name ||
          first.name_en ||
          ""
        );
      }

      return first;
    }

    return "";
  };

  // =========================
  // GET UNIQUE CATEGORIES
  // =========================
  const categories = useMemo(() => {
    const categoryMap = new Map();
    const existingNames = new Set();

    const addCategory = (category) => {
      if (!category) return;

      let id;
      let name;

      if (typeof category === "string") {
        name = category.trim();
        id = name;
      } else if (typeof category === "object") {
        name = (
          category.name_ar ||
          category.name ||
          category.name_en ||
          ""
        ).trim();

        id = category.id ?? name;
      } else {
        return;
      }

      if (!name) return;

      const normalizedName = name.toLowerCase();
      const normalizedId = String(id);

      // منع تكرار الاسم حتى لو اختلفت IDs
      if (
        existingNames.has(normalizedName) ||
        categoryMap.has(normalizedId)
      ) {
        return;
      }

      categoryMap.set(normalizedId, {
        id: normalizedId,
        name,
      });

      existingNames.add(normalizedName);
    };

    items.forEach((product) => {
      addCategory(product.category);

      if (Array.isArray(product.categories)) {
        product.categories.forEach(addCategory);
      }
    });

    return Array.from(categoryMap.values());
  }, [items]);

  // =========================
  // ADD / REMOVE WISHLIST
  // =========================
  const handleToggleFavorite = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const wishlistItem = wishlistItems.find(
      (item) =>
        Number(item.product_id ?? item.product?.id) ===
        Number(product.id)
    );

    try {
      if (wishlistItem) {
        await dispatch(
          removeFromWishlist(wishlistItem.id)
        ).unwrap();
      } else {
        await dispatch(
          addToWishlist(product.id)
        ).unwrap();
      }
    } catch (wishlistError) {
      console.error("Wishlist error:", wishlistError);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (product) => {
    try {
      await dispatch(
        addToCart({
          product_id: product.id,
          size: product.size || "100ml",
          quantity: 1,
        })
      ).unwrap();

      console.log("تمت إضافة المنتج إلى السلة");
    } catch (cartError) {
      console.error("Add to cart error:", cartError);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filtered = useMemo(() => {
    return items.filter((product) => {
      const name = [
        product.name_ar,
        product.name,
        product.name_en,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const category = getProductCategory(product);
      const price = Number(product.price || 0);
      const rating = Number(product.rating || 0);

      const matchesActiveCategory =
        !activeCategory || category === activeCategory;

      const matchesSelectedCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);

      const matchesSearch = name.includes(
        searchTerm.trim().toLowerCase()
      );

      const matchesPrice =
        price >= minPrice && price <= maxPrice;

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.round(rating));

      return (
        matchesActiveCategory &&
        matchesSelectedCategories &&
        matchesSearch &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    items,
    activeCategory,
    selectedCategories,
    searchTerm,
    minPrice,
    maxPrice,
    selectedRatings,
  ]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageItems = filtered.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  // =========================
  // CATEGORY CHECKBOX
  // =========================
  const handleCategoryCheckbox = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );

    setCurrentPage(1);
  };

  // =========================
  // RATING CHECKBOX
  // =========================
  const handleRatingCheckbox = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );

    setCurrentPage(1);
  };

  // =========================
  // CLEAR FILTERS
  // =========================
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setMinPrice(0);
    setMaxPrice(1200);
    setActiveCategory(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section className="perfume-section">
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          جاري تحميل العطور...
        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <section className="perfume-section">
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          <p>{String(error)}</p>

          <button
            type="button"
            onClick={() => dispatch(getProducts())}
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="perfume-section">
      {/* TOOLBAR */}
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
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
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

      {/* FILTER DRAWER */}
      {isFilterOpen && (
        <>
          <div
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
          />

          <aside className="filter-drawer">
            <div className="filter-header">
              <div className="filter-title">
                <h2>فلترة العطور</h2>

                <span>
                  {selectedCategories.length +
                    selectedRatings.length}{" "}
                  محددة
                </span>
              </div>

              <button
                type="button"
                className="filter-close"
                onClick={() => setIsFilterOpen(false)}
              >
                ×
              </button>
            </div>

            {/* CATEGORY */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>الفئة</span>
                <img src={arrowDown} alt="" />
              </div>

              {categories.map((category) => {
                const count = items.filter(
                  (product) =>
                    getProductCategory(product) === category.name
                ).length;

                return (
                  <label
                    className="filter-option"
                    key={category.id}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category.name
                        )}
                        onChange={() =>
                          handleCategoryCheckbox(category.name)
                        }
                      />

                      <span>{category.name}</span>
                    </div>

                    <span className="filter-count">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>

            {/* PRICE */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>نطاق السعر</span>
                <img src={arrowDown} alt="" />
              </div>

              <div className="price-slider">
                <input
                  type="range"
                  min="0"
                  max="1200"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                />
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
                  <span style={{ color: "#9CA3AF" }}>
                    إلى
                  </span>

                  <span style={{ direction: "rtl" }}>
                    {maxPrice} ر.س
                  </span>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#9CA3AF" }}>
                    من
                  </span>

                  <span style={{ direction: "rtl" }}>
                    {minPrice} ر.س
                  </span>
                </div>
              </div>
            </div>

            {/* SIZE */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>الحجم</span>
                <img src={arrowDown} alt="" />
              </div>
            </div>

            {/* RATING */}
            <div className="filter-box">
              <div className="filter-box-header">
                <span>التقييم</span>
                <img src={arrowDown} alt="" />
              </div>

              {[5, 4, 3, 2, 1].map((rating) => {
                const count = items.filter(
                  (product) =>
                    Math.round(Number(product.rating || 0)) ===
                    rating
                ).length;

                return (
                  <label
                    className="filter-option"
                    key={rating}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() =>
                          handleRatingCheckbox(rating)
                        }
                      />

                      <span>{rating} نجوم</span>
                    </div>

                    <span className="filter-count">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="filter-actions">
              <button
                type="button"
                className="apply-filter"
                onClick={() => setIsFilterOpen(false)}
              >
                تطبيق الفلتر
              </button>

              <button
                type="button"
                className="clear-filter"
                onClick={handleClearFilters}
              >
                تصفية
              </button>
            </div>
          </aside>
        </>
      )}

      {/* CATEGORY TABS */}
      <div className="catalog-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`catalog-tab${
              activeCategory === category.name ? " is-active" : ""
            }`}
            onClick={() => {
              setActiveCategory((prev) =>
                prev === category.name ? null : category.name
              );

              setCurrentPage(1);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="perfume-grid">
        {pageItems.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            لا توجد عطور مطابقة للبحث أو الفلتر.
          </div>
        ) : (
          pageItems.map((product) => (
            <PerfumeCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              favoriteLoading={wishlistLoading}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="catalog-pagination">
          <button
            type="button"
            className="catalog-page-nav"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            disabled={safeCurrentPage === totalPages}
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

          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              className={`catalog-page-num${
                safeCurrentPage === page ? " is-active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="catalog-page-nav"
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1)
              )
            }
            disabled={safeCurrentPage === 1}
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
