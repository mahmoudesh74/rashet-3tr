import { useState } from "react";
import "./PerfumeDetails.css";


import companyCharge from "../../assets/fastCharge.svg"
import heart from "../../assets/Vector.png";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import savePay from "../../assets/savePay.svg"
import easyReturn from "../../assets/easyReturn.svg"
import rialSaody from "../../assets/saudi-riyal.svg"
import rialSale from "../../assets/rialSale.svg"
import tomfordDetails from "../../assets/tomfordDetails.png"
import tomford1 from "../../assets/tomford1.png"
import tomford2 from "../../assets/tomford2.png"
import tomford3 from "../../assets/tomford3.png"
import imgNote1 from "../../assets/imgNote1.jpg"
import imgNote2 from "../../assets/imgNote2.jpg"
import imgNote3 from "../../assets/imgNote3.jpg"
import aboutPerfumeImg from "../../assets/aboutPerfumeImg.png"
import PerfumeSection from "../../components/PerfumeSection/PerfumeSection"
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import FirstWhoKnow from "../../components/firstWhoKnow/firstWhoKnow";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";




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
  images: [tomfordDetails, tomford1, tomford2, tomford3],
};

const NOTES = [
  {
    id: "base",
    title: "النوتات الأساسية",
    description: "العنبر، خشب الصندل، الفانيليا",
    image:imgNote1,
  },
  {
    id: "middle",
    title: "النوتات الوسطى",
    description: "العود الفاخر، خشب الورد، النيلي",
    image:imgNote2,

  },
  {
    id: "top",
    title: "النوتات العليا",
    description: "البرغموت، الفلفل الوردي، خشب الورد",
    image:imgNote3,

  },
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
            style={{width:50,height:50}}
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
                <button 
                className="pd-qty-control-btn"

                 type="button"  onClick={() => setQuantity((q) => q + 1)}>+</button>
                <span>{quantity}</span>
                <button
                className="pd-qty-control-btn"
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
              </div>
            <AddToCartButton />

             
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
                <div className="pd-note-card-img">
                    <img src={note.image} alt="" />

                </div>
                <div className="pd-note-card-head">
                    <h3>{note.title}</h3>
                <p>{note.description}</p>

                </div>
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
           <div className="pd-about-text">
          <h2>عن العطر</h2>
          <p>يُعد عطر عود وود من توم فورد أحد أكثر العطور تميزاً في مجموعة Private Blend. يأسرك هذا العطر بمزيجه الدخاني الغامض من العود النادر، يُضفي خشب الورد الفاخر والهيل لمسة من التوابل الدخانية التي تمهد الطريق لمزيج غني من خشب الصندل ونجيل الهند.</p>
       <br />
       <p>تكتمل هذه التحفة العطرية بلمسات دافئة من حبوب التونكا والعنبر، مما يمنحه ثباتاً استثنائياً وجاذبية لا تُقاوم. صُمم هذا العطر خصيصاً للباحثين عن التفرد والأناقة الكلاسيكية بلمسة عصرية جريئة.</p>
        </div>
        <div className="pd-about-image">
          <img src={aboutPerfumeImg} alt="عن العطر" />
        </div>
     
      </div>

     
            <PerfumeSection title="قد يعجبك ايضا" />
            <CustomerReviews/>
            <FirstWhoKnow/>
    </section>
  );
}