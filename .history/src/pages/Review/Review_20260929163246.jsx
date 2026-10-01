import { useState, useEffect } from "react";
import "./Review.css";

import productImage1 from "../../assets/groupp1.png";
import productImage2 from "../../assets/groupp3.png";
import ArrowRight from "../../assets/arrow-right-02.svg";
import successIcon from "../../assets/successIcon.svg"
import Basket from "../../assets/basket.svg"
import locationIcon from "../../assets/locationIcon.svg"
import truck from "../../assets/shipping-truck-02.svg"
import credit from "../../assets/credit-card.svg"
const ITEMS = [
  { id: "tom-ford", name: "Tom Ford | عطر توم فورد", size: "50 مل", image: productImage1, price: 450, qty: 1 },
  { id: "baccarat-1", name: "Baccarat | عطر بكرات روج", size: "100 مل", image: productImage2, price: 450, qty: 1 },
];

const STEPS = ["البيانات", "الدفع", "المراجعة"];
const SUBTOTAL_DISCOUNT = 95;
const SHIPPING = 25;



const INFO = [
  { id: "address", icon: truck, title: "عنوان التوصيل", text: "الرياض، المملكة العربية السعودية" },
  { id: "payment", icon: credit, title: "طريقة الدفع", text: "Visa •••• 3456" },
  { id: "shipping", icon: locationIcon, title: "طريقة الشحن", text: "الشحن السريع ( 2 - 3 أيام عمل )" },
];



export default function Review() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    const onKey = (e) => e.key === "Escape" && setConfirmed(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [confirmed]);

  const subtotal = ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - SUBTOTAL_DISCOUNT + SHIPPING;

  const handleEdit = (id) => {
    console.log("edit", id);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const goHome = () => {
    setConfirmed(false);
    // TODO: navigate("/")
  };

  return (
    <section className="checkout-page">
      <div className="checkout-steps">
        {STEPS.map((label, i) => (
          <div className="checkout-step-wrap" key={label}>
            <div className="checkout-step is-active">
              <span className="checkout-step-dot">{i + 1}</span>
              <span className="checkout-step-label">{label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="checkout-step-line" />}
          </div>
        ))}
      </div>

      <div className="review-header">
        <h1>مراجعة الطلب</h1>
        <p>تأكد من تفاصيل طلبك قبل التأكيد.</p>
      </div>

      <div className="checkout-page-layout review-layout">
        <div className="review-main">
          {/* Cart items */}
          <div className="checkout-box review-cart">
            <h2 className="review-cart-title">
             <img src={Basket} alt="Basket" /> السلة ({ITEMS.length})
            </h2>

            {ITEMS.map((item) => (
              <div className="review-item" key={item.id}>
                <div className="review-item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="review-item-qty">{item.qty}</span>
                </div>
                <div className="review-item-names">
                  <h3>{item.name}</h3>
                  <span>{item.size}</span>
                </div>
                <span className="review-item-price">{item.price} ر.س</span>
              </div>
            ))}
          </div>

          {/* Address / payment / shipping */}
          <div className="checkout-box review-info">
            {INFO.map((row) => (
              <div className="review-info-row" key={row.id}>
                <div className="review-info">
                  <img className="review-info-icon" src={row.icon} alt=""></img>
                </div>
                <div className="review-info-text">
                  <strong>{row.title}</strong>
                  <span>{row.text}</span>
                </div>
                <button type="button" className="review-edit-btn" onClick={() => handleEdit(row.id)}>
                  تعديل ‹
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <aside className="checkout-side">
          <div className="checkout-box">
            <h2 className="checkout-box-title">
              ملخص الطلب
              <span className="checkout-count">{ITEMS.length} محددة</span>
            </h2>

            <div className="checkout-summary-rows">
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">المجموع الفرعي</span>
                <span className="checkout-summary-value">{subtotal} ر.س</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">كوبون الخصم</span>
                <span className="checkout-summary-value">-{SUBTOTAL_DISCOUNT} ر.س</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">الشحن</span>
                <span className="checkout-summary-value">{SHIPPING} ر.س</span>
              </div>
            </div>

            <div className="checkout-summary-total">
              <span className="checkout-summary-total-label">الإجمالي</span>
              <span className="checkout-summary-total-value">{total} ر.س</span>
            </div>

            <button type="button" className="checkout-submit-btn" onClick={handleConfirm}>
              تأكيد الطلب <img src={ArrowRight} alt="" />
            </button>
          </div>
        </aside>
      </div>

      {confirmed && (
        <div className="review-modal-overlay" onClick={() => setConfirmed(false)}>
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="review-modal-close" aria-label="إغلاق" onClick={() => setConfirmed(false)}>
              ×
            </button>
            <img src={successIcon} alt="successIcon" />
            <h2 id="review-modal-title">تم تأكيد طلبك بنجاح</h2>
            <p>شكراً لتسوقك من رشة عطر</p>
            <button type="button" className="review-modal-btn" onClick={goHome}>
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}
    </section>
  );
}