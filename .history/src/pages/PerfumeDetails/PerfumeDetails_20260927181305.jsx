import { useState } from "react";
import "./PerfumeDetails.css";

import mainImage from "../../assets/groupp1.png";
import thumb1 from "../../assets/groupp2.png";
import thumb2 from "../../assets/groupp3.png";
import thumb3 from "../../assets/groupp4.png";
import thumb4 from "../../assets/groupp5.png";
import companyCharge from "../../assets/fastCharge.svg"
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import savePay from "../../assets/savePay.svg"
import easyReturn from "../../assets/easyReturn.svg"
import rialSaody from "../../assets/saudi-riyal.svg"
import rialSale from "../../assets/rialSale.svg"

const PRODUCT = {
  brand: "توم فورد",
  name: "عود وود",
  rating: 4.8,
  reviewsCount: 128,
  oldPrice: 600,
  price: 450,
  discountPercent: 20,
  description:
    "عطر يجمع بين دفء العود الغامض وانتعاش الخشب النادر، يضفي على من يرتديه إحساساً بالفخامة والثقة. مصنوع من أجود المكونات الطبيعية ويدوم لساعات طويلة.",
  sizes: ["30 مل", "50 مل",  "100 مل","200 مل"],
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
      <div>
        <h2 className="pd-breadcrumb-head">العطور</h2>
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
            <StarRating rating={PRODUCT.rating} />

            <span className="pd-rating-value">{PRODUCT.rating}</span>
            <span className="pd-reviews-count">({PRODUCT.reviewsCount})</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-new-price">{PRODUCT.price} <img src={rialSaody} alt="" /></span>

            <span className="pd-old-price"><img src={rialSale} alt="" /></span>
            <span className="pd-discount">-{PRODUCT.discountPercent}%</span>

          </div>
          <p className="pd-discount-des">شامل ضريبة القيمة المضافة</p>

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
                 <div className="pd-qty-control">
                <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
                <span>{quantity}</span>
                <button
                className="pd-qty-control"
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
              </div>
              <button
                type="button"
                className="pd-add-to-cart"
                onClick={() => console.log("add to cart", { selectedSize, quantity })}
              >
                <img src={shopping} alt="" />
                <span>أضف للسلة</span>
              </button>

             
            </div>
          </div>
           {/* Trust badges */}
      <div className="pd-trust-row">
        <div className="pd-trust-item">
         <img src={companyCharge} alt="" />
          <div>
            <strong>شحن سريع</strong>
            <span>توصيل خلال 1-3 أيام داخل السعودية</span>
          </div>
        </div>
        <div className="pd-trust-item">
          <img src={easyReturn} alt="" />
          <div>
            <strong>استرجاع سهل</strong>
            <span>إرجاع مجاني خلال 7 أيام من الشراء</span>
          </div>
        </div>
        <div className="pd-trust-item">
          <img src={savePay} alt="" />
          <div>
            <strong>دفع آمن</strong>
            <span>جميع عمليات الدفع مشفرة 100%</span>
          </div>
        </div>
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