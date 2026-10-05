import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./perfumePage.css";

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
import saudiRiyal from "../../assets/saudi-riyal.svg";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

import { getProducts } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";


// =====================================================
// FALLBACK IMAGES
// =====================================================

const FALLBACK_IMAGES = [
  perfume1,
  perfume2,
  perfume3,
  perfume4,
  perfume5,
  perfume7,
  perfume8,
];


// =====================================================
// GET IMAGE
// =====================================================

function getProductImage(product) {
  if (product?.image) {
    return product.image;
  }

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    const firstImage = product.images[0];

    if (typeof firstImage === "string") {
      return firstImage;
    }

    if (firstImage?.url) {
      return firstImage.url;
    }
  }

  const id = Number(product?.id || 0);

  return FALLBACK_IMAGES[
    id % FALLBACK_IMAGES.length
  ];
}


// =====================================================
// GET NAME
// =====================================================

function getProductName(product) {
  return (
    product?.name_ar ||
    product?.name ||
    product?.name_en ||
    "منتج"
  );
}


// =====================================================
// GET CATEGORY
// =====================================================

function getProductCategory(product) {
  if (!product) {
    return "";
  }

  if (
    typeof product.category === "string" &&
    product.category.trim()
  ) {
    return product.category.trim();
  }

  if (product.category?.name_ar) {
    return product.category.name_ar;
  }

  if (
    Array.isArray(product.categories) &&
    product.categories.length > 0
  ) {
    const category =
      product.categories[0];

    if (typeof category === "string") {
      return category;
    }

    return category?.name_ar || "";
  }

  return "";
}


// =====================================================
// FAVORITE BUTTON
// =====================================================

function FavoriteButton({
  isFavorite,
  onClick,
}) {
  return (
    <button
      type="button"
      className="favorite-btn"
      onClick={onClick}
    >
      <img
        src={
          isFavorite
            ? favoriteHeart
            : heart
        }
        alt=""
      />
    </button>
  );
}


// =====================================================
// PRODUCT CARD
// =====================================================

function PerfumeCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) {
  const navigate = useNavigate();

  const image =
    getProductImage(product);

  const name =
    getProductName(product);

  const category =
    getProductCategory(product);

  const price =
    Number(product?.price || 0);

  const originalPrice =
    Number(
      product?.original_price || 0
    );

  const isNew =
    product?.is_new === true;

  const hasDiscount =
    originalPrice > price;


  // ===================================================
  // DETAILS
  // ===================================================

  const handleProductClick = () => {
    navigate(
      `/PerfumeDetails/${product.id}`
    );
  };


  // ===================================================
  // FAVORITE
  // ===================================================

  const handleFavorite = (
    event
  ) => {
    event.stopPropagation();

    onToggleFavorite(product.id);
  };


  // ===================================================
  // CART
  // ===================================================

  const handleAddToCart = (
    event
  ) => {
    event.stopPropagation();

    onAddToCart(product.id);
  };


  return (
    <div className="perfume-card">

      {/* ================= IMAGE ================= */}

      <div
        className="perfume-card__image"
        onClick={
          handleProductClick
        }
      >

        <img
          src={image}
          alt={name}
        />


        {/* NEW */}

        {isNew && (
          <span className="catalog-badge">
            جديد
          </span>
        )}


        {/* FAVORITE */}

        <div
          className="perfume-card__favorite"
          onClick={
            handleFavorite
          }
        >
          <FavoriteButton
            isFavorite={
              isFavorite
            }
            onClick={() => {}}
          />
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="perfume-card__content">

        {/* CATEGORY */}

        {category && (
          <div className="perfume-card__category">
            {category}
          </div>
        )}


        {/* NAME */}

        <h3
          className="perfume-card__title"
          onClick={
            handleProductClick
          }
        >
          {name}
        </h3>


        {/* BRAND */}

        {product?.brand && (
          <div className="perfume-card__brand">
            {product.brand}
          </div>
        )}


        {/* ================= PRICE ================= */}

        <div className="perfume-card__price">

          {/* NEW PRICE */}

          <span className="price-new">

            {price}

            <img
              src={saudiRiyal}
              alt=""
            />

          </span>


          {/* OLD PRICE */}

          {hasDiscount && (
            <span className="price-old">

              {originalPrice}

              <img
                src={saudiRiyal}
                alt=""
              />

            </span>
          )}

        </div>


        {/* ================= ADD CART ================= */}

        <AddToCartButton
          text="أضف إلى السلة"
          icon={shoppingCart}
          onClick={
            handleAddToCart
          }
        />

      </div>

    </div>
  );
}


// =====================================================
// MAIN PAGE
// =====================================================

export default function PerfumePage() {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );


  // ===================================================
  // STATES
  // ===================================================

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


  const productsPerPage = 12;


  // ===================================================
  // GET PRODUCTS
  // ===================================================

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  // ===================================================
  // CATEGORIES
  // ===================================================

  const categories = useMemo(() => {
    const categoryMap =
      new Map();

    if (
      !Array.isArray(products)
    ) {
      return [];
    }

    products.forEach(
      (product) => {
        const category =
          getProductCategory(
            product
          );

        const categoryName =
          category ||
          "غير مصنف";

        if (
          !categoryMap.has(
            categoryName
          )
        ) {
          categoryMap.set(
            categoryName,
            {
              name: categoryName,
              count: 0,
            }
          );
        }

        categoryMap.get(
          categoryName
        ).count += 1;
      }
    );

    return Array.from(
      categoryMap.values()
    );
  }, [products]);


  // ===================================================
  // FAVORITE
  // ===================================================

  const handleToggleFavorite = (
    id
  ) => {
    setFavorites(
      (prev) => ({
        ...prev,
        [id]: !prev[id],
      })
    );
  };


  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAddToCart = async (
    productId
  ) => {
    try {
      await dispatch(
        addToCart({
          product_id:
            productId,
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


  // ===================================================
  // CATEGORY CLICK
  // ===================================================

  const handleCategoryClick = (
    category
  ) => {
    if (
      activeCategory ===
      category
    ) {
      setActiveCategory(null);
    } else {
      setActiveCategory(
        category
      );
    }

    setCurrentPage(1);
  };


  // ===================================================
  // CATEGORY CHECKBOX
  // ===================================================

  const handleCategoryCheckbox =
    (category) => {
      setSelectedCategories(
        (prev) => {
          if (
            prev.includes(
              category
            )
          ) {
            return prev.filter(
              (item) =>
                item !== category
            );
          }

          return [
            ...prev,
            category,
          ];
        }
      );

      setCurrentPage(1);
    };


  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredProducts =
    useMemo(() => {
      if (
        !Array.isArray(products)
      ) {
        return [];
      }

      return products.filter(
        (product) => {
          const name =
            getProductName(
              product
            ).toLowerCase();

          const category =
            getProductCategory(
              product
            ) || "غير مصنف";

          const price =
            Number(
              product?.price || 0
            );


          // SEARCH

          const matchesSearch =
            !searchTerm.trim() ||
            name.includes(
              searchTerm
                .trim()
                .toLowerCase()
            );


          // ACTIVE CATEGORY

          const matchesActiveCategory =
            !activeCategory ||
            category ===
              activeCategory;


          // CHECKBOX CATEGORY

          const matchesCategories =
            selectedCategories.length ===
              0 ||
            selectedCategories.includes(
              category
            );


          // PRICE

          const matchesPrice =
            price >= minPrice &&
            price <= maxPrice;


          return (
            matchesSearch &&
            matchesActiveCategory &&
            matchesCategories &&
            matchesPrice
          );
        }
      );
    }, [
      products,
      searchTerm,
      activeCategory,
      selectedCategories,
      minPrice,
      maxPrice,
    ]);


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    );


  const paginatedProducts =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        productsPerPage;

      return filteredProducts.slice(
        start,
        start +
          productsPerPage
      );
    }, [
      filteredProducts,
      currentPage,
    ]);


  // ===================================================
  // RESET
  // ===================================================

  const handleResetFilters =
    () => {
      setSelectedCategories(
        []
      );

      setMinPrice(0);

      setMaxPrice(1200);

      setActiveCategory(null);

      setSearchTerm("");

      setCurrentPage(1);
    };


  // ===================================================
  // PAGE
  // ===================================================

  const handlePageChange = (
    page
  ) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="perfume-section">

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="catalog-toolbar">

        {/* SORT */}

        <div className="catalog-sort">

          <span>
            ترتيب حسب:
          </span>

          <button
            type="button"
            className="catalog-sort__btn"
          >
            الأحدث

            <img
              src={arrowDown}
              alt=""
            />
          </button>

        </div>


        {/* SEARCH + FILTER */}

        <div className="catalog-search-group">

          <div className="catalog-search">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-3.5-3.5" />
            </svg>

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


          <button
            type="button"
            className="catalog-filter-btn"
            onClick={() =>
              setIsFilterOpen(true)
            }
          >
            <img
              src={iconFilter}
              alt=""
            />
          </button>

        </div>

      </div>


      {/* =================================================
          CATEGORY TABS
      ================================================= */}

      <div className="catalog-tabs">

        <button
          type="button"
          className={`catalog-tab ${
            activeCategory === null
              ? "is-active"
              : ""
          }`}
          onClick={() => {
            setActiveCategory(
              null
            );

            setCurrentPage(1);
          }}
        >
          الكل
        </button>


        {categories.map(
          (category) => (
            <button
              key={
                category.name
              }
              type="button"
              className={`catalog-tab ${
                activeCategory ===
                category.name
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryClick(
                  category.name
                )
              }
            >
              {category.name}
            </button>
          )
        )}

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="products-error">
          {error}
        </div>
      )}


      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (
        <div className="products-loading">
          جاري تحميل المنتجات...
        </div>
      ) : paginatedProducts.length ===
        0 ? (
        <div className="no-products">
          لا توجد منتجات مطابقة
        </div>
      ) : (
        <div className="perfume-products-grid">

          {paginatedProducts.map(
            (product) => (
              <PerfumeCard
                key={
                  product.id
                }
                product={
                  product
                }
                isFavorite={
                  favorites[
                    product.id
                  ] || false
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


      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading &&
        totalPages > 1 && (
          <div className="catalog-pagination">

            {/* PREVIOUS */}

            <button
              type="button"
              className="catalog-page-nav"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  Math.max(
                    currentPage - 1,
                    1
                  )
                )
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>


            {/* NUMBERS */}

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  className={`catalog-page-num ${
                    currentPage ===
                    page
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePageChange(
                      page
                    )
                  }
                >
                  {page}
                </button>
              )
            )}


            {/* NEXT */}

            <button
              type="button"
              className="catalog-page-nav"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  Math.min(
                    currentPage + 1,
                    totalPages
                  )
                )
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

          </div>
        )}


      {/* =================================================
          FILTER DRAWER
      ================================================= */}

      {isFilterOpen && (
        <>

          <div
            className="filter-overlay"
            onClick={() =>
              setIsFilterOpen(
                false
              )
            }
          />


          <aside className="filter-drawer">

            {/* HEADER */}

            <div className="filter-header">

              <div className="filter-title">

                <h2>
                  الفلترة
                </h2>

                <span>
                  {filteredProducts.length}
                </span>

              </div>


              <button
                type="button"
                className="filter-close"
                onClick={() =>
                  setIsFilterOpen(
                    false
                  )
                }
              >
                ×
              </button>

            </div>


            {/* CATEGORY */}

            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  التصنيف
                </span>

              </div>


              {categories.map(
                (category) => (
                  <label
                    key={
                      category.name
                    }
                    className="filter-option"
                  >

                    <div>

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
                        {
                          category.name
                        }
                      </span>

                    </div>


                    <span className="filter-count">
                      (
                      {
                        category.count
                      }
                      )
                    </span>

                  </label>
                )
              )}

            </div>


            {/* PRICE */}

            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  السعر
                </span>

              </div>


              <div className="price-slider">

                <input
                  type="range"
                  min="0"
                  max="1200"
                  value={
                    maxPrice
                  }
                  onChange={(
                    event
                  ) => {
                    setMaxPrice(
                      Number(
                        event.target
                          .value
                      )
                    );

                    setCurrentPage(
                      1
                    );
                  }}
                />

              </div>


              <div className="price-values">

                <span>
                  {minPrice} ر.س
                </span>

                <span>
                  {maxPrice} ر.س
                </span>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="filter-actions">

              <button
                type="button"
                className="apply-filter"
                onClick={() =>
                  setIsFilterOpen(
                    false
                  )
                }
              >
                تطبيق
              </button>


              <button
                type="button"
                className="clear-filter"
                onClick={
                  handleResetFilters
                }
              >
                إعادة تعيين
              </button>

            </div>

          </aside>

        </>
      )}

    </section>
  );
}