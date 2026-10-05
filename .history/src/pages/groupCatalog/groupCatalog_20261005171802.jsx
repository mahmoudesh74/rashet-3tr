import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./groupCatalog.css";

import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shoppingCart from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg";
import IconFilter from "../../assets/IconFilter.svg";
import rattingIcon from "../../assets/rattingIcon.svg";
import emptyStarIcon from "../../assets/emptyStarIcon.svg";
import saudiRiyal from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import { getCategories, getCategoryById } from "../../Redux/categorySlice";

const PAGE_SIZE = 7;

/* =========================
   Star Rating
========================= */

function StarRating({ rating = 0 }) {
  const roundedRating = Math.round(Number(rating) || 0);

  return (
    <div className="product-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= roundedRating ? rattingIcon : emptyStarIcon}
          alt=""
          className="rating-star"
        />
      ))}
    </div>
  );
}

/* =========================
   Product Card
========================= */

function PerfumeCard({
  product,
  onFavorite,
  onAddToCart,
}) {
  return (
    <div className="perfume-card">
      <div className="perfume-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="perfume-card-image"
        />

        {product.isNew && (
          <span className="new-badge">جديد</span>
        )}

        <button
          type="button"
          className="favorite-button"
          onClick={() => onFavorite(product.id)}
        >
          <img
            src={product.favorite ? favoriteHeart : heart}
            alt="favorite"
          />
        </button>
      </div>

      <div className="perfume-card-content">
        <div className="perfume-card-category">
          {product.category}
        </div>

        <h3 className="perfume-card-title">
          {product.name}
        </h3>

        <StarRating rating={product.rating} />

        <div className="perfume-card-price">
          <div className="current-price">
            <span>{product.price}</span>
            <img src={saudiRiyal} alt="ريال" />
          </div>

          {product.originalPrice &&
            Number(product.originalPrice) > Number(product.price) && (
              <div className="old-price">
                <span>{product.originalPrice}</span>
                <img src={rialSale} alt="ريال" />
              </div>
            )}
        </div>

        <button
          type="button"
          className="add-to-cart-button"
          onClick={() => onAddToCart(product.id)}
          disabled={product.isInStock === false}
        >
          <img src={shoppingCart} alt="" />

          {product.isInStock === false
            ? "غير متوفر"
            : "أضف للسلة"}
        </button>
      </div>
    </div>
  );
}

/* =========================
   Group Catalog
========================= */

export default function GroupCatalog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
    category,
    categoryLoading,
    categoryError,
  } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [favorites, setFavorites] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const currentCategoryId = Number(id);

  /* =========================
     Get Categories
  ========================= */

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  /* =========================
     Get Selected Category
  ========================= */

  useEffect(() => {
    if (!id) return;

    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  /* =========================
     Products
  ========================= */

  const items =
    category?.products?.map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name_ar || product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.original_price,
      rating: product.rating || 0,
      favorite: !!favorites[product.id],
      isNew: product.is_new,
      stockQuantity: product.stock_quantity,
      isInStock: product.is_in_stock,
    })) || [];

  /* =========================
     Search
  ========================= */

  const filtered = items.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return name.includes(search);
  });

  /* =========================
     Pagination
  ========================= */

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const currentProducts = filtered.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  /* =========================
     Favorite
  ========================= */

  const handleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  /* =========================
     Add To Cart
  ========================= */

  const handleAddToCart = (productId) => {
    console.log("added to cart:", productId);
  };

  /* =========================
     Change Category
  ========================= */

  const handleCategoryChange = (categoryId) => {
    setCurrentPage(1);
    setSearchTerm("");

    navigate(`/GroupCatalog/${categoryId}`);
  };

  /* =========================
     Search Change
  ========================= */

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  /* =========================
     Loading
  ========================= */

  if (loading || categoryLoading) {
    return (
      <section className="GroupCatalog">
        <div className="catalog-loading">
          جاري تحميل البيانات...
        </div>
      </section>
    );
  }

  /* =========================
     Error
  ========================= */

  if (error || categoryError) {
    return (
      <section className="GroupCatalog">
        <div className="catalog-error">
          {error || categoryError}
        </div>
      </section>
    );
  }

  /* =========================
     Render
  ========================= */

  return (
    <section className="GroupCatalog">

      {/* =========================
          Header
      ========================= */}

      <div className="catalog-header">

        <div className="catalog-header-text">
          <h1>
            {category?.name_ar || "المجموعات"}
          </h1>

          {category?.description_ar && (
            <p>
              {category.description_ar}
            </p>
          )}
        </div>

      </div>

      {/* =========================
          Categories Tabs
      ========================= */}

      <div className="catalog-tabs">

        {categories.map((categoryItem) => (
          <button
            key={categoryItem.id}
            type="button"
            className={`catalog-tab${
              currentCategoryId === Number(categoryItem.id)
                ? " is-active"
                : ""
            }`}
            onClick={() => {
              handleCategoryChange(categoryItem.id);
            }}
          >
            {categoryItem.name_ar}
          </button>
        ))}

      </div>

      {/* =========================
          Toolbar
      ========================= */}

      <div className="catalog-toolbar">

        <div className="catalog-toolbar-right">

          <button
            type="button"
            className="filter-button"
            onClick={() => setIsFilterOpen(true)}
          >
            <img src={IconFilter} alt="" />
            <span>تصفية</span>
          </button>

          <div className="sort-wrapper">

            <button
              type="button"
              className="sort-button"
              onClick={() =>
                setIsSortOpen((prev) => !prev)
              }
            >
              <span>ترتيب حسب</span>

              <img
                src={arrowDown}
                alt=""
              />
            </button>

            {isSortOpen && (
              <div className="sort-menu">

                <button type="button">
                  الأحدث
                </button>

                <button type="button">
                  السعر من الأقل للأعلى
                </button>

                <button type="button">
                  السعر من الأعلى للأقل
                </button>

                <button type="button">
                  الأعلى تقييماً
                </button>

              </div>
            )}

          </div>

        </div>

        <div className="catalog-search">
          <input
            type="text"
            placeholder="ابحث عن عطر..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

      </div>

      {/* =========================
          Products Count
      ========================= */}

      <div className="catalog-products-count">
        <span>
          {filtered.length} منتجات
        </span>
      </div>

      {/* =========================
          Products
      ========================= */}

      {currentProducts.length > 0 ? (
        <div className="perfume-grid">

          {currentProducts.map((product) => (
            <PerfumeCard
              key={product.id}
              product={product}
              onFavorite={handleFavorite}
              onAddToCart={handleAddToCart}
            />
          ))}

        </div>
      ) : (
        <div className="catalog-empty">

          {searchTerm
            ? "لا توجد منتجات تطابق البحث"
            : "لا توجد منتجات في هذا التصنيف"}

        </div>
      )}

      {/* =========================
          Pagination
      ========================= */}

      {totalPages > 1 && (
        <div className="catalog-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
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
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            التالي
          </button>

        </div>
      )}

      {/* =========================
          Filter Overlay
      ========================= */}

      {isFilterOpen && (
        <div
          className="filter-overlay"
          onClick={() => setIsFilterOpen(false)}
        >

          <aside
            className="filter-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="filter-header">

              <h2>
                تصفية المنتجات
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

            {/* =========================
                Categories
            ========================= */}

            <div className="filter-section">

              <h3>
                التصنيفات
              </h3>

              <div className="filter-options">

                {categories.map((categoryItem) => (
                  <label
                    key={categoryItem.id}
                    className="filter-option"
                  >

                    <input
                      type="checkbox"
                      checked={
                        currentCategoryId ===
                        Number(categoryItem.id)
                      }
                      onChange={() => {
                        handleCategoryChange(
                          categoryItem.id
                        );

                        setIsFilterOpen(false);
                      }}
                    />

                    <span>
                      {categoryItem.name_ar}
                    </span>

                    <small>
                      {categoryItem.products_count || 0}
                    </small>

                  </label>
                ))}

              </div>

            </div>

            {/* =========================
                Price
            ========================= */}

            <div className="filter-section">

              <h3>
                السعر
              </h3>

              <div className="price-range-values">

                <span>
                  200 ر.س
                </span>

                <span>
                  2500 ر.س
                </span>

              </div>

              <input
                type="range"
                min="200"
                max="2500"
                defaultValue="2500"
              />

            </div>

            {/* =========================
                Size
            ========================= */}

            <div className="filter-section">

              <h3>
                الحجم
              </h3>

              <div className="size-options">

                <button type="button">
                  30 ML
                </button>

                <button type="button">
                  50 ML
                </button>

                <button type="button">
                  75 ML
                </button>

                <button type="button">
                  100 ML
                </button>

              </div>

            </div>

            {/* =========================
                Rating
            ========================= */}

            <div className="filter-section">

              <h3>
                التقييم
              </h3>

              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="rating-filter-option"
                >

                  <input
                    type="checkbox"
                    value={rating}
                  />

                  <StarRating
                    rating={rating}
                  />

                  <span>
                    ({0})
                  </span>

                </label>
              ))}

            </div>

            {/* =========================
                Filter Actions
            ========================= */}

            <div className="filter-actions">

              <button
                type="button"
                className="apply-filter-button"
                onClick={() =>
                  setIsFilterOpen(false)
                }
              >
                تطبيق
              </button>

              <button
                type="button"
                className="clear-filter-button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                مسح الكل
              </button>

            </div>

          </aside>

        </div>
      )}

    </section>
  );
}