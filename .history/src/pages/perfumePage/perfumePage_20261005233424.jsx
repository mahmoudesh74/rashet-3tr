import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./perfumePage.css";

// Assets
import perfume1 from "../../assets/loris.png";
import perfume2 from "../../assets/libra.png";
import perfume3 from "../../assets/backarat.png";
import perfume4 from "../../assets/tomford.png";
import perfume5 from "../../assets/eclaire.png";
import perfume7 from "../../assets/lois.png";
import perfume8 from "../../assets/sovage.png";

import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shoppingCart from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg";
import iconFilter from "../../assets/IconFilter.svg";
import ratingIcon from "../../assets/rattingIcon.svg";
import emptyStarIcon from "../../assets/emptyStarIcon.svg";
import saudiRiyal from "../../assets/saudi-riyal.svg";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

import { getProducts } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";

const FALLBACK_IMAGES = [
  perfume1,
  perfume2,
  perfume3,
  perfume4,
  perfume5,
  perfume7,
  perfume8,
];

// --------------------------------------------------
// Star Rating
// --------------------------------------------------

function StarRating({ rating }) {
  const value = Number(rating || 0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= Math.round(value) ? ratingIcon : emptyStarIcon}
          alt=""
        />
      ))}
    </div>
  );
}

// --------------------------------------------------
// Favorite Button
// --------------------------------------------------

function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      type="button"
      className="favorite-btn"
      onClick={onClick}
      aria-label={
        isFavorite
          ? "إزالة من المفضلة"
          : "إضافة إلى المفضلة"
      }
    >
      <img
        src={isFavorite ? favoriteHeart : heart}
        alt=""
      />
    </button>
  );
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getProductCategory(product) {
  if (!product) return "";

  if (typeof product.category === "string") {
    return product.category;
  }

  if (product.category?.name_ar) {
    return product.category.name_ar;
  }

  if (product.category?.name) {
    return product.category.name;
  }

  if (Array.isArray(product.categories)) {
    const category = product.categories[0];

    if (typeof category === "string") {
      return category;
    }

    return (
      category?.name_ar ||
      category?.name ||
      ""
    );
  }

  return "";
}

function getProductImage(product) {
  if (product?.image) {
    return product.image;
  }

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    return product.images[0];
  }

  const id = Number(product?.id || 0);

  return FALLBACK_IMAGES[
    id % FALLBACK_IMAGES.length
  ];
}

function getProductName(product) {
  return (
    product?.name_ar ||
    product?.name ||
    product?.name_en ||
    "منتج"
  );
}

// --------------------------------------------------
// Product Card
// --------------------------------------------------

function PerfumeCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) {
  const navigate = useNavigate();

  const image = getProductImage(product);

  const name = getProductName(product);

  const category = getProductCategory(product);

  const price = Number(product?.price || 0);

  const originalPrice = Number(
    product?.original_price || 0
  );

  const rating = Number(
    product?.rating || 0
  );

  const handleCardClick = () => {
    navigate(`/PerfumeDetails/${product.id}`);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleAddClick = (event) => {
    event.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <div className="perfume-card">
      <div
        className="perfume-card-image-wrapper"
        onClick={handleCardClick}
      >
        <img
          src={image}
          alt={name}
          className="perfume-card-image"
        />

        {product?.is_new && (
          <span className="new-badge">
            جديد
          </span>
        )}

        <div
          className="perfume-card-favorite"
          onClick={handleFavoriteClick}
        >
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="perfume-card-content">
        <div className="perfume-card-category">
          {category}
        </div>

        <h3
          className="perfume-card-title"
          onClick={handleCardClick}
        >
          {name}
        </h3>

        <div className="perfume-card-rating">
          <StarRating rating={rating} />

          <span>
            {rating > 0 ? rating.toFixed(1) : "لا يوجد تقييم"}
          </span>
        </div>

        <div className="perfume-card-price-row">
          <div className="perfume-card-prices">
            {originalPrice > price && (
              <span className="old-price">
                {originalPrice}
                <img
                  src={saudiRiyal}
                  alt=""
                />
              </span>
            )}

            <span className="current-price">
              {price}
              <img
                src={saudiRiyal}
                alt=""
              />
            </span>
          </div>

          <button
            type="button"
            className="card-cart-btn"
            onClick={handleAddClick}
          >
            <img
              src={shoppingCart}
              alt=""
            />
          </button>
        </div>

        <AddToCartButton
          text="أضف إلى السلة"
          icon={shoppingCart}
          onClick={handleAddClick}
          className="perfume-add-cart-btn"
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// Main Page
// --------------------------------------------------

export default function PerfumePage() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );

  const [favorites, setFavorites] =
    useState({});

  const [activeCategory, setActiveCategory] =
    useState(null);

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(1200);

  const [selectedRatings, setSelectedRatings] =
    useState([]);

  const productsPerPage = 12;

  // --------------------------------------------------
  // Get Products
  // --------------------------------------------------

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // --------------------------------------------------
  // Categories
  // --------------------------------------------------

  const categories = useMemo(() => {
    const categoryMap = new Map();

    if (!Array.isArray(products)) {
      return [];
    }

    products.forEach((product) => {
      const category = getProductCategory(product);

      if (category && !categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          count: 0,
        });
      }

      if (category) {
        categoryMap.get(category).count += 1;
      }
    });

    return Array.from(categoryMap.values());
  }, [products]);

  // --------------------------------------------------
  // Toggle Favorite
  // --------------------------------------------------

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --------------------------------------------------
  // Add To Cart
  // --------------------------------------------------

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(
        addToCart({
          product_id: productId,
          size: "100ml",
          quantity: 1,
        })
      ).unwrap();

      console.log(
        "تمت إضافة المنتج إلى السلة"
      );
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );
    }
  };

  // --------------------------------------------------
  // Category
  // --------------------------------------------------

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }

    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Checkbox Categories
  // --------------------------------------------------

  const handleCategoryCheckbox = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(
          (item) => item !== category
        );
      }

      return [...prev, category];
    });

    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Rating
  // --------------------------------------------------

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) => {
      if (prev.includes(rating)) {
        return prev.filter(
          (item) => item !== rating
        );
      }

      return [...prev, rating];
    });

    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Filtered Products
  // --------------------------------------------------

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.filter((product) => {
      const productName =
        getProductName(product).toLowerCase();

      const productCategory =
        getProductCategory(product);

      const productPrice = Number(
        product?.price || 0
      );

      const productRating = Number(
        product?.rating || 0
      );

      // Search
      const matchesSearch =
        !searchTerm.trim() ||
        productName.includes(
          searchTerm.trim().toLowerCase()
        );

      // Main category
      const matchesActiveCategory =
        !activeCategory ||
        productCategory === activeCategory;

      // Filter categories
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          productCategory
        );

      // Price
      const matchesPrice =
        productPrice >= minPrice &&
        productPrice <= maxPrice;

      // Rating
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(
          Math.round(productRating)
        );

      return (
        matchesSearch &&
        matchesActiveCategory &&
        matchesCategories &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    products,
    activeCategory,
    selectedCategories,
    searchTerm,
    minPrice,
    maxPrice,
    selectedRatings,
  ]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      productsPerPage;

    return filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );
  }, [
    filteredProducts,
    currentPage,
  ]);

  // --------------------------------------------------
  // Reset Filters
  // --------------------------------------------------

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setMinPrice(0);
    setMaxPrice(1200);
    setActiveCategory(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <section className="perfume-page">

      {/* Header */}

      <div className="perfume-page-header">
        <div>
          <h1>العطور</h1>

          <p>
            اكتشف مجموعتنا المميزة من العطور
          </p>
        </div>

        <div className="perfume-search">
          <input
            type="text"
            placeholder="ابحث عن عطر..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(
                event.target.value
              );
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Categories */}

      <div className="perfume-categories">

        <button
          type="button"
          className={
            activeCategory === null
              ? "active"
              : ""
          }
          onClick={() => {
            setActiveCategory(null);
            setCurrentPage(1);
          }}
        >
          الكل
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={
              activeCategory === category.name
                ? "active"
                : ""
            }
            onClick={() =>
              handleCategoryClick(
                category.name
              )
            }
          >
            {category.name}

            <span>
              ({category.count})
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}

      <div className="perfume-toolbar">

        <div className="products-count">
          {filteredProducts.length} منتج
        </div>

        <button
          type="button"
          className="filter-open-btn"
          onClick={() =>
            setIsFilterOpen(true)
          }
        >
          <img
            src={iconFilter}
            alt=""
          />

          فلترة

          <img
            src={arrowDown}
            alt=""
          />
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="products-error">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="products-loading">
          جاري تحميل المنتجات...
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="no-products">
          لا توجد منتجات مطابقة للبحث
        </div>
      ) : (
        <div className="perfume-products-grid">
          {paginatedProducts.map(
            (product) => (
              <PerfumeCard
                key={product.id}
                product={product}
                isFavorite={
                  favorites[product.id] ||
                  false
                }
                onToggleFavorite={
                  handleToggleFavorite
                }
                onAddToCart={
                  handleAddToCart
                }
              />
            )
          )}
        </div>
      )}

      {/* Pagination */}

      {!loading &&
        totalPages > 1 && (
          <div className="pagination">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(
                      prev - 1,
                      1
                    )
                )
              }
            >
              السابق
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                )
              }
            >
              التالي
            </button>

          </div>
        )}

      {/* Filter Drawer */}

      {isFilterOpen && (
        <>
          <div
            className="filter-overlay"
            onClick={() =>
              setIsFilterOpen(false)
            }
          />

          <aside className="filter-drawer">

            <div className="filter-header">

              <h2>
                الفلترة
              </h2>

              <button
                type="button"
                onClick={() =>
                  setIsFilterOpen(false)
                }
              >
                ×
              </button>

            </div>

            {/* Categories */}

            <div className="filter-section">

              <h3>
                التصنيف
              </h3>

              {categories.map(
                (category) => (
                  <label
                    key={category.name}
                    className="filter-checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        category.name
                      )}
                      onChange={() =>
                        handleCategoryCheckbox(
                          category.name
                        )
                      }
                    />

                    <span>
                      {category.name}
                    </span>

                    <small>
                      ({category.count})
                    </small>
                  </label>
                )
              )}

            </div>

            {/* Price */}

            <div className="filter-section">

              <h3>
                السعر
              </h3>

              <div className="price-inputs">

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => {
                    setMinPrice(
                      Number(
                        event.target.value
                      )
                    );
                    setCurrentPage(1);
                  }}
                  placeholder="من"
                />

                <span>
                  -
                </span>

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => {
                    setMaxPrice(
                      Number(
                        event.target.value
                      )
                    );
                    setCurrentPage(1);
                  }}
                  placeholder="إلى"
                />

              </div>

            </div>

            {/* Rating */}

            <div className="filter-section">

              <h3>
                التقييم
              </h3>

              {[5, 4, 3, 2, 1].map(
                (rating) => {

                  const count =
                    Array.isArray(products)
                      ? products.filter(
                          (product) =>
                            Math.round(
                              Number(
                                product?.rating ||
                                  0
                              )
                            ) ===
                            rating
                        ).length
                      : 0;

                  return (
                    <label
                      key={rating}
                      className="filter-rating"
                    >

                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(
                          rating
                        )}
                        onChange={() =>
                          handleRatingChange(
                            rating
                          )
                        }
                      />

                      <StarRating
                        rating={rating}
                      />

                      <span>
                        ({count})
                      </span>

                    </label>
                  );
                }
              )}

            </div>

            {/* Actions */}

            <div className="filter-actions">

              <button
                type="button"
                className="reset-filter"
                onClick={
                  handleResetFilters
                }
              >
                إعادة تعيين
              </button>

              <button
                type="button"
                className="apply-filter"
                onClick={() =>
                  setIsFilterOpen(false)
                }
              >
                تطبيق
              </button>

            </div>

          </aside>
        </>
      )}

    </section>
  );
}