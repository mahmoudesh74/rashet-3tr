import { useState } from "react";
import "./productDetails.css";

// TODO: استبدل الصور دي بصور المنتج الحقيقية
import mainImage from "../../assets/groupp1.png";
import thumb1 from "../../assets/groupp2.png";
import thumb2 from "../../assets/groupp3.png";
import thumb3 from "../../assets/groupp4.png";
import thumb4 from "../../assets/groupp5.png";

import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";

// TODO: استبدل ببيانات المنتج الحقيقية القادمة من الـ API / الراوت
const PRODUCT = {
  brand: "توم فورد",
  name: "عود وود",
  rating: 4.8,
  reviewsCount: 1128,
  oldPrice: 600,
  price: 450,
  discountPercent: 20,
  description:
    "عطر يجمع بين دفء العود الغامض وانتعاش الخشب النادر، يضفي على من يرتديه إحساساً بالفخامة والثقة. مصنوع من أجود المكونات الطبيعية ويدوم لساعات طويلة.",
  sizes: ["200 مل", "100 مل", "50 مل", "30 مل"],
  defaultSize: "30 مل",
  images: [mainImage, thumb1, thumb2, thumb3, thumb4],
};

const NOTES = [
  {
    id: "base",
    title: "النوتات الأساسية",
    description: "العنبر، خشب الصندل، الفانيليا",
  },
  {
    id: "middle",
    title: "النوتات الوسطى",
    description: "العود الفاخر، خشب الورد، النيلي",
  },
  {
    id: "top",
    title: "النوتات العليا",
    description: "البرغموت، الفلفل الوردي، خشب الورد",
  },
];

const ABOUT_TEXT =
  "يعد عطر توم فورد عود وود أحد أكثر العطور تميزاً في مجموعة Private Blend، بأسلوبه الحاذق. هذا العطر بمزيجه الدخاني الغامض من العود النادر، يضفي على من يرتديه إحساساً بالفخامة والثقة. تكتمل هذه التحفة العطرية بلمسات دافئة من حبوب التونكا والعنبر، مما يمنح ثباتاً استثنائياً لا يقاوم، ضمن هذا العطر خصيصاً للباحثين عن التفرد والأناقة الكلاسيكية بلمسة عصرية جريئة.";

const RELATED_PRODUCTS = [
  { id: "sauvage", image: thumb1, name: "Sauvage | عطر سوفاج", price: 450, oldPrice: 600, rating: 4.8 },
  { id: "libre", image: thumb2, name: "Libre | عطر ليبرا", price: 450, oldPrice: 600, rating: 4.8 },
  { id: "baccarat", image: thumb3, name: "Baccarat | عطر بكرات روج", price: 450, oldPrice: 600, rating: 4.8 },
  { id: "louis-vuitton", image: thumb4, name: "Louis Vuitton | عطر لويس فيتون", price: 450, oldPrice: 600, rating: 5 },
];

function StarRating({ rating }) {
  const rounded = Math.round(rating);
  return (
    <div className="pd-stars" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <img key={i} src={i < rounded ? star : emptyStartIcon} alt="star" className="pd-star" />
      ))}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 4v6h6" />
      <path d="M20 14a8 8 0 1 1-2.34-5.66L20 10" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="1" y="7" width="13" height="9" rx="1" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

const TABS = ["النوتات العطرية", "الوصف", "تقييمات العملاء", "قد يعجبك ايضاً"];

export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(PRODUCT.images[0]);
  const [selectedSize, setSelectedSize] = useState(PRODUCT.defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="pd-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <span>الرئيسية</span>
        <span>/</span>
        <span>العطور</span>
        <span>/</span>
        <span className="pd-breadcrumb-current">التفاصيل</span>
      </div>

      {/* Hero */}
      <div className="pd-hero">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <button
              type="button"
              className="pd-fav-btn"
              aria-label={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
              onClick={() => setIsFavorite((v) => !v)}
            >
              <img src={isFavorite ? favoriteHeart : heart} alt="" />
            </button>
            <img src={activeImage} alt={PRODUCT.name} />
          </div>

          <div className="pd-gallery-thumbs">
            {PRODUCT.images.map((img, i) => (
              <button
                type="button"
                key={i}
                className={`pd-thumb${activeImage === img ? " is-active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${PRODUCT.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          <span className="pd-brand">{PRODUCT.brand}</span>
          <h1 className="pd-title">{PRODUCT.name}</h1>

          <div className="pd-rating-row">
            <span className="pd-rating-value">{PRODUCT.rating}</span>
            <StarRating rating={PRODUCT.rating} />
            <span className="pd-reviews-count">({PRODUCT.reviewsCount})</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-discount">-{PRODUCT.discountPercent}%</span>
            <span className="pd-old-price">{PRODUCT.oldPrice} ريال</span>
            <span className="pd-new-price">{PRODUCT.price} ريال</span>
          </div>

          <p className="pd-description">{PRODUCT.description}</p>

          <div className="pd-section">
            <span className="pd-section-label">الحجم</span>
            <div className="pd-size-options">
              {PRODUCT.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={`pd-size-btn${selectedSize === size ? " is-active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <span className="pd-section-label">الكمية</span>
            <div className="pd-qty-row">
              <button
                type="button"
                className="pd-add-to-cart"
                onClick={() => console.log("add to cart", { selectedSize, quantity })}
              >
                <img src={shopping} alt="" />
                <span>أضف للسلة</span>
              </button>

              <div className="pd-qty-control">
                <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="pd-trust-row">
        <div className="pd-trust-item">
          <TruckIcon />
          <div>
            <strong>شحن سريع</strong>
            <span>توصيل خلال 1-3 أيام داخل السعودية</span>
          </div>
        </div>
        <div className="pd-trust-item">
          <ReturnIcon />
          <div>
            <strong>استرجاع سهل</strong>
            <span>إرجاع مجاني خلال 7 أيام من الشراء</span>
          </div>
        </div>
        <div className="pd-trust-item">
          <ShieldIcon />
          <div>
            <strong>دفع آمن</strong>
            <span>جميع عمليات الدفع مشفرة 100%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pd-tabs-nav">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            className={`pd-tab${activeTab === tab ? " is-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="pd-tabs-content">
        {activeTab === "النوتات العطرية" && (
          <div className="pd-notes-grid">
            {NOTES.map((note) => (
              <div className="pd-note-card" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "الوصف" && (
          <p className="pd-tab-text">{PRODUCT.description}</p>
        )}

        {activeTab === "تقييمات العملاء" && (
          <p className="pd-tab-text">لا توجد تقييمات بعد — كن أول من يقيّم هذا العطر.</p>
        )}

        {activeTab === "قد يعجبك ايضاً" && (
          <p className="pd-tab-text">تصفح المنتجات المقترحة في الأسفل.</p>
        )}
      </div>

      {/* About the fragrance */}
      <div className="pd-about">
        <div className="pd-about-image">
          <img src={thumb4} alt="عن العطر" />
        </div>
        <div className="pd-about-text">
          <h2>عن العطر</h2>
          <p>{ABOUT_TEXT}</p>
        </div>
      </div>

      {/* Related products */}
      <div className="pd-related">
        <div className="pd-related-header">
          <h2>قد يعجبك ايضاً</h2>
          <button type="button" className="pd-view-all">عرض الكل</button>
        </div>

        <div className="pd-related-grid">
          {RELATED_PRODUCTS.map((p) => (
            <div className="pd-related-card" key={p.id}>
              <button type="button" className="pd-fav-btn pd-fav-btn--card" aria-label="أضف إلى المفضلة">
                <img src={heart} alt="" />
              </button>
              <div className="pd-related-card__image">
                <img src={p.image} alt={p.name} />
              </div>
              <h3>{p.name}</h3>
              <StarRating rating={p.rating} />
              <div className="pd-related-card__price">
                <span className="pd-new-price">{p.price} ريال</span>
                <span className="pd-old-price">{p.oldPrice} ريال</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}