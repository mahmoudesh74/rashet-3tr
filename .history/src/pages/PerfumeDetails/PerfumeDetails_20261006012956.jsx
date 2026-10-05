import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./PerfumeDetails.css";

import companyCharge from "../../assets/fastCharge.svg";

import shopping from "../../assets/shopping-cart-02.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import savePay from "../../assets/savePay.svg";
import easyReturn from "../../assets/easyReturn.svg";
import rialSaody from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import tomfordDetails from "../../assets/tomfordDetails.png";
import tomford1 from "../../assets/tomford1.png";
import tomford2 from "../../assets/tomford2.png";
import tomford3 from "../../assets/tomford3.png";

import imgNote1 from "../../assets/imgNote1.jpg";
import imgNote2 from "../../assets/imgNote2.jpg";
import imgNote3 from "../../assets/imgNote3.jpg";

import aboutPerfumeImg from "../../assets/aboutPerfumeImg.png";

import PerfumeSection from "../../components/PerfumeSection/PerfumeSection";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import FirstWhoKnow from "../../components/firstWhoKnow/firstWhoKnow";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import { getProductDetails } from "../../Redux/productDetailsSlice";
import { addToCart } from "../../Redux/cartSlice";


// ==============================
// Fallback Images
// ==============================

const FALLBACK_IMAGES = [
  tomfordDetails,
  tomford1,
  tomford2,
  tomford3,
];


// ==============================
// Star Rating
// ==============================

function StarRating({ rating }) {
  if (!rating) {
    return null;
  }

  const rounded = Math.round(Number(rating));

  return (
    <div
      className="pd-stars"
      aria-label={`${rating} من 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={
            i < rounded
              ? star
              : emptyStartIcon
          }
          alt="star"
          className="pd-star"
        />
      ))}
    </div>
  );
}


// ==============================
// Product Details Page
// ==============================

export default function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    product,
    loading,
    error,
  } = useSelector(
    (state) => state.productDetails
  );

  const [activeImage, setActiveImage] = useState("");

  const [selectedSize, setSelectedSize] =
    useState("100ml");

  const [quantity, setQuantity] =
    useState(1);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const notesRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const recommendedRef = useRef(null);


  // ==============================
  // Get Product
  // ==============================

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);


  // ==============================
  // Product Images
  // ==============================

  const productImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const images = [];

    // image الأساسي
    if (product.image) {
      images.push(product.image);
    }

    // images array
    if (Array.isArray(product.images)) {
      product.images.forEach((item) => {
        if (
          item?.url &&
          !images.includes(item.url)
        ) {
          images.push(item.url);
        }
      });
    }

    // لو مفيش صور من API
    if (images.length === 0) {
      return FALLBACK_IMAGES;
    }

    return images;
  }, [product]);


  // ==============================
  // Set First Image
  // ==============================

  useEffect(() => {
    if (productImages.length > 0) {
      setActiveImage(productImages[0]);
    }
  }, [productImages]);


  // ==============================
  // Product Data
  // ==============================

  const productName =
    product?.name_ar ||
    product?.name ||
    product?.name_en ||
    "منتج";

  const productBrand =
    product?.brand || "";

  const productCategory =
    product?.category ||
    product?.categories?.[0]?.name_ar ||
    "غير مصنف";

  const productDescription =
    product?.description_ar ||
    product?.description_en ||
    "لا يوجد وصف متاح لهذا المنتج.";

  const price =
    Number(product?.price || 0);

  const originalPrice =
    Number(product?.original_price || 0);

  const stockQuantity =
    Number(product?.stock_quantity || 0);

  const isInStock =
    product?.is_in_stock === true &&
    stockQuantity > 0;


  // ==============================
  // Discount
  // ==============================

  const discountPercent =
    originalPrice > price && price > 0
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;


  // ==============================
  // Add To Cart
  // ==============================

  const handleAddToCart = async () => {
    if (!product || !isInStock) {
      return;
    }

    try {
      await dispatch(
        addToCart({
          product_id: product.id,
          size: selectedSize,
          quantity,
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


  // ==============================
  // Quantity
  // ==============================

  const increaseQuantity = () => {
    if (!isInStock) {
      return;
    }

    setQuantity((q) => {
      if (q >= stockQuantity) {
        return q;
      }

      return q + 1;
    });
  };


  const decreaseQuantity = () => {
    setQuantity((q) =>
      Math.max(1, q - 1)
    );
  };


  // ==============================
  // Scroll
  // ==============================

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <section
        className="pd-page"
        dir="rtl"
      >
        <div className="pd-loading">
          جاري تحميل تفاصيل المنتج...
        </div>
      </section>
    );
  }


  // ==============================
  // Error
  // ==============================

  if (error) {
    return (
      <section
        className="pd-page"
        dir="rtl"
      >
        <div className="pd-error">
          <h2>
            حدث خطأ أثناء تحميل المنتج
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                getProductDetails(id)
              )
            }
          >
            حاول مرة أخرى
          </button>
        </div>
      </section>
    );
  }


  // ==============================
  // No Product
  // ==============================

  if (!product) {
    return (
      <section
        className="pd-page"
        dir="rtl"
      >
        <div className="pd-error">
          <h2>
            لم يتم العثور على المنتج
          </h2>
        </div>
      </section>
    );
  }


  // ==============================
  // Render
  // ==============================

  return (
    <section
      className="pd-page"
      dir="rtl"
    >

      {/* =================================
          Breadcrumb
      ================================== */}

      <div className="pd-breadcrumb">

        <span>
          الرئيسية
        </span>

        <span>/</span>

        <span>
          العطور
        </span>

        <span>/</span>

        <span className="pd-breadcrumb-current">
          التفاصيل
        </span>

      </div>


      <div>
        <h2 className="pd-breadcrumb-head">
          العطور
        </h2>
      </div>


      {/* =================================
          Hero
      ================================== */}

      <div className="pd-hero">


        {/* =================================
            Gallery
        ================================== */}

        <div className="pd-gallery">

          <div className="pd-gallery-main">

            <FavoriteButton
              className="pd-fav-btn"
              isFavorite={isFavorite}
              onClick={() =>
                setIsFavorite(
                  (v) => !v
                )
              }
            />

            {product.is_new && (
              <span className="pd-new-badge">
                جديد
              </span>
            )}

            <img
              src={
                activeImage ||
                FALLBACK_IMAGES[0]
              }
              alt={productName}
              onError={(e) => {
                e.currentTarget.src =
                  FALLBACK_IMAGES[0];
              }}
            />

          </div>


          {/* =================================
              Thumbnails
          ================================== */}

          <div className="pd-gallery-thumbs">

            {productImages.map(
              (img, i) => (
                <button
                  type="button"
                  key={`${img}-${i}`}
                  className={`pd-thumb${
                    activeImage === img
                      ? " is-active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveImage(img)
                  }
                >

                  <img
                    src={img}
                    alt={`${productName} ${
                      i + 1
                    }`}
                    onError={(e) => {
                      e.currentTarget.src =
                        FALLBACK_IMAGES[
                          i %
                            FALLBACK_IMAGES.length
                        ];
                    }}
                  />

                </button>
              )
            )}

          </div>

        </div>


        {/* =================================
            Product Info
        ================================== */}

        <div className="pd-info">


          {/* Brand */}

          <span className="pd-brand">
            {productBrand}
          </span>


          {/* Name */}

          <h1 className="pd-title">
            {productName}
          </h1>


          {/* Rating */}

          {product.rating ? (
            <div className="pd-rating-row">

              <StarRating
                rating={product.rating}
              />

              <span className="pd-rating-value">
                {product.rating}
              </span>

              {product.reviews_count && (
                <span className="pd-reviews-count">
                  ({product.reviews_count})
                </span>
              )}

            </div>
          ) : null}


          {/* =================================
              Price
          ================================== */}

          <div className="pd-price-row">

            <span className="pd-new-price">

              <span>
                {price}
              </span>

              <img
                src={rialSaody}
                alt=""
              />

            </span>


            {originalPrice > price && (
              <span className="pd-old-price">

                <span>
                  {/* {originalPrice} */}
                </span>

                <img
                  src={rialSale}
                  alt=""
                />

              </span>
            )}


            {discountPercent > 0 && (
              <span className="pd-discount">
                -{discountPercent}%
              </span>
            )}

          </div>


          <p className="pd-discount-des">
            شامل ضريبة القيمة المضافة
          </p>


          {/* =================================
              Description
          ================================== */}

          <p className="pd-description">
            {productDescription}
          </p>


          {/* =================================
              Category
          ================================== */}

          <div className="pd-section">

            <span className="pd-section-label">
              التصنيف
            </span>

            <div className="pd-size-options">

              <button
                type="button"
                className="pd-size-btn is-active"
              >
                {productCategory}
              </button>

            </div>

          </div>


          {/* =================================
              Size
          ================================== */}

          <div className="pd-section">

            <span className="pd-section-label">
              الحجم
            </span>

            <div className="pd-size-options">

              <button
                type="button"
                className="pd-size-btn is-active"
                onClick={() =>
                  setSelectedSize(product.quantity)
                }
              >
                100 مل
              </button>

            </div>

          </div>


          {/* =================================
              Quantity
          ================================== */}

          <div className="pd-section">

            <span className="pd-section-label">
              الكمية
            </span>


            <div className="pd-qty-row">

              <div className="pd-qty-control">

                <button
                  className="pd-qty-control-btn"
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  disabled={
                    !isInStock ||
                    quantity >=
                      stockQuantity
                  }
                >
                  +
                </button>


                <span>
                  {quantity}
                </span>


                <button
                  className="pd-qty-control-btn"
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    quantity <= 1
                  }
                >
                  -
                </button>

              </div>


              <AddToCartButton
                icon={shopping}
                onClick={
                  handleAddToCart
                }
              />

            </div>

          </div>


          {/* =================================
              Stock
          ================================== */}

          <div
            className={`pd-stock-status ${
              isInStock
                ? "is-in-stock"
                : "is-out-stock"
            }`}
          >
            {isInStock
              ? `متوفر في المخزون (${stockQuantity})`
              : "غير متوفر حاليًا"}
          </div>


          {/* =================================
              Trust
          ================================== */}

          <div className="pd-trust-row">


            <div className="pd-trust-item">

              <img
                src={companyCharge}
                alt=""
              />

              <div>

                <strong>
                  شحن سريع
                </strong>

                <span>
                  توصيل خلال 1-3 أيام داخل السعودية
                </span>

              </div>

            </div>


            <div className="pd-trust-item">

              <img
                src={easyReturn}
                alt=""
              />

              <div>

                <strong>
                  استرجاع سهل
                </strong>

                <span>
                  إرجاع مجاني خلال 7 أيام من الشراء
                </span>

              </div>

            </div>


            <div className="pd-trust-item">

              <img
                src={savePay}
                alt=""
              />

              <div>

                <strong>
                  دفع آمن
                </strong>

                <span>
                  جميع عمليات الدفع مشفرة 100%
                </span>

              </div>

            </div>


          </div>

        </div>

      </div>


      {/* =================================
          Tabs
      ================================== */}

      <div className="pd-tabs-nav">


        <button
          type="button"
          className="pd-tab is-active"
          onClick={() =>
            scrollToSection(notesRef)
          }
        >
          النوتات العطرية
        </button>


        <button
          type="button"
          className="pd-tab"
          onClick={() =>
            scrollToSection(aboutRef)
          }
        >
          الوصف
        </button>


        <button
          type="button"
          className="pd-tab"
          onClick={() =>
            scrollToSection(reviewsRef)
          }
        >
          تقييمات العملاء
        </button>


        <button
          type="button"
          className="pd-tab"
          onClick={() =>
            scrollToSection(
              recommendedRef
            )
          }
        >
          قد يعجبك ايضاً
        </button>

      </div>


      {/* =================================
          Notes
      ================================== */}

      <div
        className="pd-tabs-content"
        ref={notesRef}
      >

        <div className="pd-notes-grid">


          {product.notes_top && (
            <div className="pd-note-card">

              <div className="pd-note-card-img">

                <img
                  src={imgNote3}
                  alt="النوتات العليا"
                />

              </div>

              <div className="pd-note-card-head">

                <h3>
                  النوتات العليا
                </h3>

                <p>
                  {product.notes_top}
                </p>

              </div>

            </div>
          )}


          {product.notes_heart && (
            <div className="pd-note-card">

              <div className="pd-note-card-img">

                <img
                  src={imgNote2}
                  alt="النوتات الوسطى"
                />

              </div>

              <div className="pd-note-card-head">

                <h3>
                  النوتات الوسطى
                </h3>

                <p>
                  {product.notes_heart}
                </p>

              </div>

            </div>
          )}


          {product.notes_base && (
            <div className="pd-note-card">

              <div className="pd-note-card-img">

                <img
                  src={imgNote1}
                  alt="النوتات الأساسية"
                />

              </div>

              <div className="pd-note-card-head">

                <h3>
                  النوتات الأساسية
                </h3>

                <p>
                  {product.notes_base}
                </p>

              </div>

            </div>
          )}


          {!product.notes_top &&
            !product.notes_heart &&
            !product.notes_base && (
              <p>
                لا توجد معلومات عن النوتات العطرية
                لهذا المنتج.
              </p>
            )}

        </div>

      </div>


      {/* =================================
          About
      ================================== */}

      <div
        className="pd-about"
        ref={aboutRef}
      >

        <div className="pd-about-text">

          <h2>
            عن العطر
          </h2>

          <p>
            {productDescription}
          </p>

        </div>


        <div className="pd-about-image">

          <img
            src={aboutPerfumeImg}
            alt="عن العطر"
          />

        </div>

      </div>


      {/* =================================
          Recommended
      ================================== */}

      <div
        ref={recommendedRef}
        className="pd-recommended-section"
      >

        <PerfumeSection
          title="قد يعجبك ايضا"
        />

      </div>


      {/* =================================
          Reviews
      ================================== */}

      <div
        ref={reviewsRef}
        className="pd-reviews-section"
      >

        <CustomerReviews />

      </div>


      {/* =================================
          First Who Know
      ================================== */}

      <FirstWhoKnow />

    </section>
  );
}