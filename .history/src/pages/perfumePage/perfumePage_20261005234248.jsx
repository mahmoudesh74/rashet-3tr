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
import saudiRiyal from "../../assets/saudi-riyal.svg";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

import { getProducts } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";


// ======================================================
// FALLBACK IMAGES
// ======================================================

const FALLBACK_IMAGES = [
  perfume1,
  perfume2,
  perfume3,
  perfume4,
  perfume5,
  perfume7,
  perfume8,
];


// ======================================================
// GET PRODUCT IMAGE
// ======================================================

function getProductImage(product) {
  // الصورة الأساسية القادمة من API
  if (product?.image) {
    return product.image;
  }

  // لو مفيش image نستخدم أول صورة من images
  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    const firstImage = product.images[0];

    // لو API رجع string
    if (typeof firstImage === "string") {
      return firstImage;
    }

    // الشكل الحالي للـ API
    if (firstImage?.url) {
      return firstImage.url;
    }
  }

  // Fallback
  const id = Number(product?.id || 0);

  return FALLBACK_IMAGES[
    id % FALLBACK_IMAGES.length
  ];
}


// ======================================================
// GET PRODUCT NAME
// ======================================================

function getProductName(product) {
  return (
    product?.name_ar ||
    product?.name ||
    product?.name_en ||
    "منتج"
  );
}


// ======================================================
// GET PRODUCT CATEGORY
// ======================================================

function getProductCategory(product) {
  if (!product) {
    return "";
  }

  // category: "نسائية"
  if (
    typeof product.category === "string" &&
    product.category.trim()
  ) {
    return product.category.trim();
  }

  // category object
  if (product.category?.name_ar) {
    return product.category.name_ar;
  }

  if (product.category?.name) {
    return product.category.name;
  }

  // categories array
  if (
    Array.isArray(product.categories) &&
    product.categories.length > 0
  ) {
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


// ======================================================
// STAR RATING
// ======================================================
// الـ API الحالي لا يحتوي rating.
// لذلك لا نعرض Rating في المنتج.


function FavoriteButton({
  isFavorite,
  onClick,
}) {
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


// ======================================================
// PRODUCT CARD
// ======================================================

function PerfumeCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) {
  const navigate = useNavigate();

  const image = getProductImage(product);

  const name = getProductName(product);

  const category =
    getProductCategory(product);

  const price = Number(
    product?.price || 0
  );

  const originalPrice = Number(
    product?.original_price || 0
  );

  const isNew =
    product?.is_new === true;

  const hasDiscount =
    originalPrice > price;

  const handleCardClick = () => {
    navigate(
      `/PerfumeDetails/${product.id}`
    );
  };

  const handleFavoriteClick = (
    event
  ) => {
    event.stopPropagation();

    onToggleFavorite(product.id);
  };

  const handleAddToCartClick = (
    event
  ) => {
    event.stopPropagation();

    onAddToCart(product.id);
  };

  return (
    <div className="perfume-card">

      {/* ================= IMAGE ================= */}

      <div
        className="perfume-card-image-wrapper"
        onClick={handleCardClick}
      >

        <img
          src={image}
          alt={name}
          className="perfume-card-image"
        />

        {isNew && (
          <span className="new-badge">
            جديد
          </span>
        )}

        <div
          className="perfume-card-favorite"
          onClick={
            handleFavoriteClick
          }
        >
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => {}}
          />
        </div>
      </div>


      {/* ================= CONTENT ================= */}

      <div className="perfume-card-content">

        {/* Category */}

        {category && (
          <div className="perfume-card-category">
            {category}
          </div>
        )}


        {/* Name */}

        <h3
          className="perfume-card-title"
          onClick={handleCardClick}
        >
          {name}
        </h3>


        {/* Brand */}

        {product?.brand && (
          <div className="perfume-card-brand">
            {product.brand}
          </div>
        )}


        {/* Price */}

        <div className="perfume-card-price-row">

          <div className="perfume-card-prices">

            {/* Old Price */}

            {hasDiscount && (
              <span className="old-price">

                {originalPrice}

                <img
                  src={saudiRiyal}
                  alt=""
                />

              </span>
            )}


            {/* Current Price */}

            <span className="current-price">

              {price}

              <img
                src={saudiRiyal}
                alt=""
              />

            </span>

          </div>


          {/* Small Cart Button */}

          <button
            type="button"
            className="card-cart-btn"
            onClick={
              handleAddToCartClick
            }
            aria-label="أضف إلى السلة"
          >
            <img
              src={shoppingCart}
              alt=""
            />
          </button>

        </div>


        {/* Add To Cart */}

        <AddToCartButton
          text="أضف إلى السلة"
          icon={shoppingCart}
          onClick={
            handleAddToCartClick
          }
          className="perfume-add-cart-btn"
        />

      </div>
    </div>
  );
}


// ======================================================
// MAIN PAGE
// ======================================================

export default function PerfumePage() {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );


  // ====================================================
  // STATES
  // ====================================================

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


  // ====================================================
  // GET PRODUCTS
  // ====================================================

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  // ====================================================
  // CATEGORIES
  // ====================================================

  const categories = useMemo(() => {
    const categoryMap = new Map();

    if (!Array.isArray(products)) {
      return [];
    }

    products.forEach((product) => {
      const category =
        getProductCategory(product);

      // المنتجات بدون category
      const categoryName =
        category || "غير مصنف";

      if (
        !categoryMap.has(categoryName)
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
    });

    return Array.from(
      categoryMap.values()
    );
  }, [products]);


  // ====================================================
  // TOGGLE FAVORITE
  // ====================================================

  const handleToggleFavorite = (
    id
  ) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  // ====================================================
  // ADD TO CART
  // ====================================================

  const handleAddToCart = async (
    productId
  ) => {
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


  // ====================================================
  // MAIN CATEGORY
  // ====================================================

  const handleCategoryClick = (
    category
  ) => {
    if (
      activeCategory === category
    ) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }

    setCurrentPage(1);
  };


  // ====================================================
  // FILTER CATEGORY
  // ====================================================

  const handleCategoryCheckbox = (
    category
  ) => {
    setSelectedCategories(
      (prev) => {
        if (
          prev.includes(category)
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


  // ====================================================
  // FILTER PRODUCTS
  // ====================================================

  const filteredProducts =
    useMemo(() => {
      if (
        !Array.isArray(products)
      ) {
        return [];
      }

      return products.filter(
        (product) => {
          const productName =
            getProductName(
              product
            ).toLowerCase();

          const productCategory =
            getProductCategory(
              product
            ) || "غير مصنف";

          const productPrice =
            Number(
              product?.price || 0
            );


          // ================= SEARCH =================

          const matchesSearch =
            !searchTerm.trim() ||
            productName.includes(
              searchTerm
                .trim()
                .toLowerCase()
            );


          // ================= MAIN CATEGORY =================

          const matchesActiveCategory =
            !activeCategory ||
            productCategory ===
              activeCategory;


          // ================= FILTER CATEGORY =================

          const matchesCategories =
            selectedCategories.length ===
              0 ||
            selectedCategories.includes(
              productCategory
            );


          // ================= PRICE =================

          const matchesPrice =
            productPrice >=
              minPrice &&
            productPrice <=
              maxPrice;


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


  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages =
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    );


  const paginatedProducts =
    useMemo(() => {
      const startIndex =
        (currentPage - 1) *
        productsPerPage;

      return filteredProducts.slice(
        startIndex,
        startIndex +
          productsPerPage
      );
    }, [
      filteredProducts,
      currentPage,
    ]);


  // ====================================================
  // RESET FILTERS
  // ====================================================

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


  // ====================================================
  // SEARCH CHANGE
  // ====================================================

  const handleSearchChange = (
    event
  ) => {
    setSearchTerm(
      event.target.value
    );

    setCurrentPage(1);
  };


  // ====================================================
  // PAGE CHANGE
  // ====================================================

  const handlePageChange = (
    page
  ) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className="perfume-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="perfume-page-header">

        <div>
          <h1>
            العطور
          </h1>

          <p>
            اكتشف مجموعتنا المميزة
            من العطور
          </p>
        </div>


        {/* SEARCH */}

        <div className="perfume-search">

          <input
            type="text"
            placeholder="ابحث عن عطر..."
            value={searchTerm}
            onChange={
              handleSearchChange
            }
          />

        </div>

      </div>


      {/* ==================================================
          CATEGORIES
      ================================================== */}

      <div className="perfume-categories">

        {/* ALL */}

        <button
          type="button"
          className={
            activeCategory === null
              ? "active"
              : ""
          }
          onClick={() => {
            setActiveCategory(
              null
            );

            setCurrentPage(1);
          }}
        >
          الكل
        </button>


        {/* API CATEGORIES */}

        {categories.map(
          (category) => (
            <button
              key={category.name}
              type="button"
              className={
                activeCategory ===
                category.name
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
                {" "}
                ({category.count})
              </span>
            </button>
          )
        )}

      </div>


      {/* ==================================================
          TOOLBAR
      ================================================== */}

      <div className="perfume-toolbar">

        <div className="products-count">
          {filteredProducts.length}{" "}
          منتج
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


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="products-error">
          {error}
        </div>
      )}


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (
        <div className="products-loading">
          جاري تحميل المنتجات...
        </div>
      ) : paginatedProducts.length ===
        0 ? (
        <div className="no-products">

          لا توجد منتجات مطابقة
          للبحث أو الفلترة

        </div>
      ) : (
        <div className="perfume-products-grid">

          {paginatedProducts.map(
            (product) => (
              <PerfumeCard
                key={product.id}
                product={product}
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


      {/* ==================================================
          PAGINATION
      ================================================== */}

      {!loading &&
        totalPages > 1 && (
          <div className="pagination">

            {/* PREVIOUS */}

            <button
              type="button"
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
              السابق
            </button>


            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
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
                  handlePageChange(
                    page
                  )
                }
              >
                {page}
              </button>
            ))}


            {/* NEXT */}

            <button
              type="button"
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
              التالي
            </button>

          </div>
        )}


      {/* ==================================================
          FILTER DRAWER
      ================================================== */}

      {isFilterOpen && (
        <>

          {/* Overlay */}

          <div
            className="filter-overlay"
            onClick={() =>
              setIsFilterOpen(
                false
              )
            }
          />


          {/* Drawer */}

          <aside className="filter-drawer">

            {/* Header */}

            <div className="filter-header">

              <h2>
                الفلترة
              </h2>

              <button
                type="button"
                onClick={() =>
                  setIsFilterOpen(
                    false
                  )
                }
              >
                ×
              </button>

            </div>


            {/* ==================================================
                CATEGORY FILTER
            ================================================== */}

            <div className="filter-section">

              <h3>
                التصنيف
              </h3>


              {categories.map(
                (category) => (
                  <label
                    key={
                      category.name
                    }
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
                      {
                        category.name
                      }
                    </span>

                    <small>
                      (
                      {
                        category.count
                      }
                      )
                    </small>

                  </label>
                )
              )}

            </div>


            {/* ==================================================
                PRICE FILTER
            ================================================== */}

            <div className="filter-section">

              <h3>
                السعر
              </h3>


              <div className="price-inputs">

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(
                    event
                  ) => {
                    setMinPrice(
                      Number(
                        event.target
                          .value
                      )
                    );

                    setCurrentPage(
                      1
                    );
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
                  placeholder="إلى"
                />

              </div>

            </div>


            {/* ==================================================
                FILTER ACTIONS
            ================================================== */}

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
                  setIsFilterOpen(
                    false
                  )
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