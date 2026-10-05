
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./groupCatalog.css";

import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import arrowDown from "../../assets/arrow-down.svg";
import IconFilter from "../../assets/IconFilter.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import rialsaody from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import {
  getCategories,
  getCategoryById,
} from "../../Redux/categorySlice";

const PAGE_SIZE = 7;

function StarRating({ rating = 0 }) {
  const rounded = Math.round(rating);

  return (
    <div
      className="catalog-stars"
      aria-label={`${rating} من 5`}
    >
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

function PerfumeCard({
  product,
  onToggleFavorite,
  onAddToCart,
}) {
  return (
    <div className="perfume-card">
      {/* New Badge */}
      {product.isNew && (
        <span className="catalog-badge">
          جديد
        </span>
      )}

      {/* Favorite */}
      <button
        type="button"
        className={`fav-btn${
          product.favorite ? " is-active" : ""
        }`}
        aria-label={
          product.favorite
            ? "إزالة من المفضلة"
            : "أضف إلى المفضلة"
        }
        onClick={() =>
          onToggleFavorite(product.id)
        }
      >
        <img
          src={
            product.favorite
              ? favoriteHeart
              : heart
          }
          alt=""
        />
      </button>

      {/* Product Image */}
      <div className="perfume-card__image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Product Name + Rating */}
      <div className="perfumecontent">
        <h3 className="perfume-card__name">
          {product.name}
        </h3>

        <StarRating
          rating={product.rating}
        />
      </div>

      {/* Category */}
      <p className="perfume-card__category">
        {product.category}
      </p>

      {/* Price */}
      <div className="perfume-card__price">
        {/* New Price */}
        <span className="price-new">
          <span>
            {product.price}
          </span>

          <img
            src={rialsaody}
            alt=""
          />
        </span>

        {/* Old Price */}
        <span className="price-old">
          

          <img
            src={rialSale}
            alt=""
          />
        </span>
      </div>

      {/* Add To Cart */}
      <button
        type="button"
        className="perfume-add-btn"
        onClick={() =>
          onAddToCart(product.id)
        }
      >
        <div className="perfumecartImg">
          <img
            src={shopping}
            alt="shopping"
          />
        </div>

        <span>
          أضف إلى السلة
        </span>
      </button>
    </div>
  );
}

export default function GroupCatalog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    categories,
    category,
    categoryLoading,
    categoryError,
  } = useSelector(
    (state) => state.categories
  );

  const [favorites, setFavorites] =
    useState({});

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  /*
   * Get all categories
   */
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  /*
   * Get selected category
   */
  useEffect(() => {
    if (!id) return;

    dispatch(
      getCategoryById(id)
    );


    
  }, [dispatch, id]);


  const items =
    category?.products?.map(
      (product) => ({
        id: product.id,

        image: product.image,

        name:
          product.name_ar ||
          product.name,

        category:
          product.category,

        price:
          product.price,

        originalPrice:
          product.original_price,

        rating:
          product.rating || 0,

        favorite:
          !!favorites[product.id],

        isNew:
          product.is_new,

        stockQuantity:
          product.stock_quantity,

        isInStock:
          product.is_in_stock,
      })
    ) || [];

  /*
   * Toggle Favorite
   */
  const handleToggleFavorite = (
    productId
  ) => {
    setFavorites((prev) => ({
      ...prev,

      [productId]:
        !prev[productId],
    }));
  };

  /*
   * Search
   *
   * Category filtering is NOT done here.
   * The API already returns products
   * belonging to the selected category.
   */
  const filtered = items.filter(
    (product) => {
      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return matchesSearch;
    }
  );

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length /
        PAGE_SIZE
    )
  );

  const pageItems =
    filtered.slice(
      (currentPage - 1) *
        PAGE_SIZE,

      currentPage *
        PAGE_SIZE
    );

  /*
   * Current category ID
   */
  const currentCategoryId =
    Number(id);

  /*
   * Loading
   */
  if (categoryLoading) {
    return (
      <section className="perfume-section">
        <div className="catalog-loading">
          جاري تحميل المنتجات...
        </div>
      </section>
    );
  }

  /*
   * Error
   */
  if (categoryError) {
    return (
      <section className="perfume-section">
        <div className="catalog-error">
          {categoryError}
        </div>
      </section>
    );
  }

  return (
    <section className="perfume-section">

      {/* =========================
          Toolbar
      ========================== */}
      <div className="catalog-toolbar">

        <div className="catalog-search-group">

          {/* Filter Button */}
          <button
            type="button"
            className="catalog-filter-btn"
            aria-label="فلاتر"
            onClick={() =>
              setIsFilterOpen(true)
            }
          >
            <img
              src={IconFilter}
              alt=""
            />
          </button>

          {/* Search */}
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
                setSearchTerm(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            />

          </div>
        </div>

        {/* Sort */}
        <div className="catalog-sort">

          <button
            type="button"
            className="catalog-sort__btn"
          >
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

          <span>
            ترتيب حسب:
          </span>

        </div>
      </div>

      {/* =========================
          Filter Drawer
      ========================== */}
      {isFilterOpen && (
        <>
          {/* Overlay */}
          <div
            className="filter-overlay"
            onClick={() =>
              setIsFilterOpen(false)
            }
          />

          {/* Drawer */}
          <aside className="filter-drawer">

            {/* Header */}
            <div className="filter-header">

              <div className="filter-title">

                <h2>
                  فلترة المنتجات
                </h2>

                <span>
                  {filtered.length} منتج
                </span>

              </div>

              <button
                type="button"
                className="filter-close"
                onClick={() =>
                  setIsFilterOpen(false)
                }
              >
                ×
              </button>

            </div>

            {/* Categories */}
            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  التصنيفات
                </span>

                <img
                  src={arrowDown}
                  alt=""
                />

              </div>

              {categories.map(
                (categoryItem) => (
                  <label
                    className="filter-option"
                    key={categoryItem.id}
                  >

                    <div>

                      <input
                        type="checkbox"
                        checked={
                          currentCategoryId ===
                          Number(
                            categoryItem.id
                          )
                        }
                        onChange={() => {
                          navigate(
                            `/GroupCatalog/${categoryItem.id}`
                          );

                          setIsFilterOpen(
                            false
                          );
                        }}
                      />

                      <span>
                        {categoryItem.name_ar}
                      </span>

                    </div>

                    <span className="filter-count">
                      (
                      {categoryItem.products_count ||
                        0}
                      )
                    </span>

                  </label>
                )
              )}

            </div>

            {/* Price */}
            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  نطاق السعر
                </span>

                <img
                  src={arrowDown}
                  alt=""
                />

              </div>

              <div className="price-slider">

                <input
                  type="range"
                  min="0"
                  max="2500"
                />

              </div>

              <div className="price-values">

                <div
                  style={{
                    flexDirection:
                      "column",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >

                  <span
                    style={{
                      color:
                        "#9CA3AF",
                    }}
                  >
                    الي
                  </span>

                  <span
                    style={{
                      direction:
                        "rtl",
                    }}
                  >
                    2500 ر.س
                  </span>

                </div>

                <div
                  style={{
                    flexDirection:
                      "column",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >

                  <span
                    style={{
                      color:
                        "#9CA3AF",
                    }}
                  >
                    من
                  </span>

                  <span
                    style={{
                      direction:
                        "rtl",
                    }}
                  >
                    200 ر.س
                  </span>

                </div>

              </div>
            </div>

            {/* Size */}
            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  الحجم
                </span>

                <img
                  src={arrowDown}
                  alt=""
                />

              </div>

            </div>

            {/* Rating */}
            <div className="filter-box">

              <div className="filter-box-header">

                <span>
                  التقييم
                </span>

                <img
                  src={arrowDown}
                  alt=""
                />

              </div>

              {[5, 4, 3, 2, 1].map(
                (rating) => (
                  <label
                    className="filter-option"
                    key={rating}
                  >

                    <div>

                      <input
                        type="checkbox"
                      />

                      <span>
                        {rating} نجوم
                      </span>

                    </div>

                    <span className="filter-count">
                      (0)
                    </span>

                  </label>
                )
              )}

            </div>

            {/* Actions */}
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
                تطبيق الفلتر
              </button>

              <button
                type="button"
                className="clear-filter"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                تصفية
              </button>

            </div>

          </aside>
        </>
      )}

      {/* =========================
          Category Tabs
      ========================== */}
      <div className="catalog-tabs">

        {categories.map(
          (categoryItem) => (
            <button
              key={categoryItem.id}
              type="button"
              className={`catalog-tab${
                currentCategoryId ===
                Number(
                  categoryItem.id
                )
                  ? " is-active"
                  : ""
              }`}
              onClick={() => {
                navigate(
                  `/GroupCatalog/${categoryItem.id}`
                );
              }}
            >
              {categoryItem.name_ar}
            </button>
          )
        )}

      </div>

      {/* =========================
          Products
      ========================== */}
      <div className="perfume-grid">

        {pageItems.length > 0 ? (

          pageItems.map(
            (product) => (
              <PerfumeCard
                key={product.id}
                product={product}
                onToggleFavorite={
                  handleToggleFavorite
                }
                onAddToCart={(productId) =>
                  console.log(
                    "added to cart:",
                    productId
                  )
                }
              />
            )
          )

        ) : (

          <div className="catalog-empty">
            {searchTerm
              ? "لا توجد منتجات تطابق البحث"
              : "لا توجد منتجات في هذا التصنيف"}
          </div>

        )}

      </div>

      {/* =========================
          Pagination
      ========================== */}
      {totalPages > 1 && (
        <div className="catalog-pagination">

          {/* Next */}
          <button
            type="button"
            className="catalog-page-nav"
            onClick={() =>
              setCurrentPage(
                (p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
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

          {/* Pages */}
          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => i + 1
          ).map((page) => (

            <button
              key={page}
              type="button"
              className={`catalog-page-num${
                currentPage === page
                  ? " is-active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}

          {/* Previous */}
          <button
            type="button"
            className="catalog-page-nav"
            onClick={() =>
              setCurrentPage(
                (p) =>
                  Math.max(
                    1,
                    p - 1
                  )
              )
            }
            disabled={
              currentPage === 1
            }
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
