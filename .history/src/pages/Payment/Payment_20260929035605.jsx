import { useState } from "react";
import "./Payment.css";

import productImage1 from "../../assets/groupp1.png";
import productImage2 from "../../assets/groupp3.png";
import ArrowRight from "../../assets/arrow-right-02.svg";
import lock from "../../assets/lock.svg";
import visa from "../../assets/visa-logo.svg";
import applePay from "../../assets/ApplePay.svg";
import mada from "../../assets/Mada_Logo.svg";

const ITEMS = [
  { id: "tom-ford", name: "Tom Ford | عطر توم فورد", image: productImage1, price: 450, qty: 1 },
  { id: "baccarat-1", name: "Baccarat | عطر بكرات روج", image: productImage2, price: 450, qty: 1 },
];

const STEPS = ["البيانات", "الدفع", "المراجعة"];
const ACTIVE_STEP = 1; 
const FREE_SHIPPING_MIN = 1000;
const STANDARD_FEE = 25;
const DISCOUNT = 95;

const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#905B30" strokeWidth="1.6" strokeLinecap="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);

const TruckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#905B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", save: true });
  const [errors, setErrors] = useState({});

  const subtotal = ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeAvailable = subtotal >= FREE_SHIPPING_MIN;
  const [delivery, setDelivery] = useState(freeAvailable ? "free" : "standard");
  const shipping = delivery === "free" && freeAvailable ? 0 : STANDARD_FEE;
  const total = subtotal - DISCOUNT + shipping;

  const handleCard = (e) => {
    const { name, value, type, checked } = e.target;
    let next = value;
    if (name === "number") {
      next = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      const d = value.replace(/\D/g, "").slice(0, 4);
      next = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    } else if (name === "cvv") {
      next = value.replace(/\D/g, "").slice(0, 4);
    } else if (type === "checkbox") {
      next = checked;
    }
    setCard((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    if (method !== "card") return true;
    const next = {};
    if (card.number.replace(/\s/g, "").length !== 16) next.number = "رقم البطاقة غير صحيح";
    const m = /^(\d{2})\/(\d{2})$/.exec(card.expiry);
    if (!m || +m[1] < 1 || +m[1] > 12) next.expiry = "تاريخ الانتهاء غير صحيح";
    if (card.cvv.length < 3) next.cvv = "رمز التحقق غير صحيح";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log({ method, delivery, saveCard: card.save });
  };

  const goReview = () => {
    if (!validate()) return;
    
  };

  return (
    <section className="checkout-page">
      <div className="checkout-steps">
        {STEPS.map((label, i) => (
          <div className="checkout-step-wrap" key={label}>
            <div className={`checkout-step${i <= ACTIVE_STEP ? " is-active" : ""}`}>
              <span className="checkout-step-dot">{i + 1}</span>
              <span className="checkout-step-label">{label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="checkout-step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-page-layout">
        {/* Payment methods */}
        <form className="payment-methods" onSubmit={handleSubmit} noValidate>
          <label className={`payment-method${method === "apple" ? " is-selected" : ""}`}>
            <input type="radio" name="method" checked={method === "apple"} onChange={() => setMethod("apple")} />
            <span className="payment-method-name">Apple Pay</span>
            <span className="payment-method-logo"><img src={applePay} alt="" /></span>
          </label>

          <label className={`payment-method${method === "mada" ? " is-selected" : ""}`}>
            <input type="radio" name="method" checked={method === "mada"} onChange={() => setMethod("mada")} />
            <span className="payment-method-name">مدى</span>
            <span className="payment-method-logo"><img src={mada} alt="" /></span>
          </label>

          <div className={`payment-method payment-method--card${method === "card" ? " is-selected" : ""}`}>
            <label className="payment-method-head">
              <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
              <span className="payment-method-name">البطاقة البنكية</span>
              <span className="payment-method-logo"><img src={visa} alt="" /></span>
            </label>

            {method === "card" && (
              <div className="payment-card-fields">
                <div className="checkout-field">
                  <label htmlFor="number">رقم البطاقة</label>
                  <div className="checkout-input-icon payment-icon-left">
                    <input id="number" name="number" type="text" inputMode="numeric" autoComplete="cc-number" className="checkout-input-ltr" placeholder="1234 5678 9012 3456" value={card.number} onChange={handleCard} />
                    <span className="payment-input-icon"><CardIcon /></span>
                  </div>
                  {errors.number && <p className="checkout-error">{errors.number}</p>}
                </div>

                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="expiry">تاريخ الانتهاء</label>
                    <input id="expiry" name="expiry" type="text" inputMode="numeric" autoComplete="cc-exp" className="checkout-input-ltr" placeholder="MM/YY" value={card.expiry} onChange={handleCard} />
                    {errors.expiry && <p className="checkout-error">{errors.expiry}</p>}
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="cvv">رمز التحقق (CVV)</label>
                    <input id="cvv" name="cvv" type="password" inputMode="numeric" autoComplete="cc-csc" className="checkout-input-ltr" placeholder="•••" value={card.cvv} onChange={handleCard} />
                    {errors.cvv && <p className="checkout-error">{errors.cvv}</p>}
                  </div>
                </div>

                <label className="payment-save">
                  <input type="checkbox" name="save" checked={card.save} onChange={handleCard} />
                  حفظ بيانات البطاقة لعمليات الدفع المستقبلية
                </label>
              </div>
            )}
          </div>

          <label className={`payment-method${method === "cod" ? " is-selected" : ""}`}>
            <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} />
            <span className="payment-method-name">الدفع عند الاستلام</span>
            <span className="payment-method-logo payment-method-logo--plain"><TruckIcon /></span>
          </label>

          <button type="submit" className="checkout-submit-btn">
            تأكيد الطلب <img src={ArrowRight} alt="" />
          </button>
          <button type="button" className="payment-secondary-btn" onClick={goReview}>
            متابعة المراجعة
          </button>

          <p className="checkout-secure-text">
            <img src={lock} alt="" /> دفع آمن ومشفر 100%
          </p>
        </form>

        {/* Delivery method + order summary */}
        <aside className="checkout-side">
          <div className="checkout-box">
            <h2 className="checkout-box-title">طريقة التوصيل</h2>

            <label className={`checkout-delivery${delivery === "standard" ? " is-selected" : ""}`}>
              <input type="radio" name="delivery" checked={delivery === "standard"} onChange={() => setDelivery("standard")} />
              <div className="checkout-delivery-info">
                <strong>توصيل قياسي</strong>
                <span>يصل خلال 2-5 أيام عمل.</span>
              </div>
              <em>{STANDARD_FEE} ر.س</em>
            </label>

            <label className={`checkout-delivery${delivery === "free" ? " is-selected" : ""}${freeAvailable ? "" : " is-disabled"}`}>
              <input type="radio" name="delivery" disabled={!freeAvailable} checked={delivery === "free"} onChange={() => setDelivery("free")} />
              <div className="checkout-delivery-info">
                <strong>توصيل مجاني</strong>
                <span>متوفر للطلبات التي تزيد عن {FREE_SHIPPING_MIN} ر.س.</span>
              </div>
              <em>مجاناً</em>
            </label>
          </div>

          <div className="checkout-box">
            <h2 className="checkout-box-title">
              ملخص الطلب
              <span className="checkout-count">{ITEMS.length} محددة</span>
            </h2>

            <div className="checkout-thumbs">
              {ITEMS.map((item) => (
                <div className="checkout-thumb" key={item.id}>
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>

            <div className="checkout-summary-rows">
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">المجموع الفرعي</span>
                <span className="checkout-summary-value">{subtotal} ر.س</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">كوبون الخصم</span>
                <span className="checkout-summary-value">-{DISCOUNT} ر.س</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">الشحن</span>
                <span className="checkout-summary-value">{shipping} ر.س</span>
              </div>
            </div>

            <div className="checkout-summary-total">
              <span className="checkout-summary-total-label">الإجمالي</span>
              <span className="checkout-summary-total-value">{total} ر.س</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}