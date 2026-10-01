import { useState } from "react";
import "./Checkout.css";

import productImage1 from "../../assets/groupp1.png";
import productImage2 from "../../assets/groupp3.png";
import checkMail from "../../assets/checkMail.svg";

import ArrowRight from "../../assets/arrow-right-02.svg";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "tom-ford", name: "Tom Ford | عطر توم فورد", image: productImage1, price: 450, qty: 1 },
  { id: "baccarat-1", name: "Baccarat | عطر بكرات روج", image: productImage2, price: 450, qty: 1 },
];

const STEPS = ["معلومات التوصيل", "الدفع", "المراجعة"];
const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"];
const FREE_SHIPPING_MIN = 1000;
const STANDARD_FEE = 25;
const DISCOUNT = 95;
const MAX_VISIBLE = 1; 

export default function Checkout() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const subtotal = ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeAvailable = subtotal >= FREE_SHIPPING_MIN;
  const [delivery, setDelivery] = useState(freeAvailable ? "free" : "standard");
  const shipping = delivery === "free" && freeAvailable ? 0 : STANDARD_FEE;
  const total = subtotal - DISCOUNT + shipping;

  const visibleItems = ITEMS.slice(0, MAX_VISIBLE);
  const extraCount = ITEMS.length - MAX_VISIBLE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "الاسم الكامل مطلوب";
    if (!/^5\d{8}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "رقم الجوال غير صحيح";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "البريد الإلكتروني غير صحيح";
    if (!form.city) next.city = "اختر المدينة";
    if (!form.district.trim()) next.district = "اسم الحي مطلوب";
    if (!form.address.trim()) next.address = "العنوان مطلوب";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log({ ...form, delivery });
    navigate("/Payment");
  };

  return (
    <section className="checkout-page">
      <div className="checkout-steps">
        {STEPS.map((label, i) => (
          <div className="checkout-step-wrap" key={label}>
            <div className={`checkout-step${i === 0 ? " is-active" : ""}`}>
              <span className="checkout-step-dot">{i + 1}</span>
              <span className="checkout-step-label">{label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="checkout-step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-page-layout">
        {/* Delivery form */}
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="checkout-field">
            <label htmlFor="fullName">الاسم الكامل</label>
            <input id="fullName" name="fullName" type="text" placeholder="الاسم الكامل" value={form.fullName} onChange={handleChange} />
            {errors.fullName && <p className="checkout-error">{errors.fullName}</p>}
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">رقم الجوال</label>
            <div className="checkout-phone">
              <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="5X XXX XXXX" value={form.phone} onChange={handleChange} />
              <span className="checkout-phone-code">+966</span>
            </div>
            {errors.phone && <p className="checkout-error">{errors.phone}</p>}
          </div>

          <div className="checkout-field">
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className="checkout-input-icon">
              <input
                id="email"
                name="email"
                type="email"
                className="checkout-input-ltr"
                placeholder="example@domain.com"
                value={form.email}
                onChange={handleChange}
              />
              <img src={checkMail} alt="" />
            </div>
            {errors.email && <p className="checkout-error">{errors.email}</p>}
          </div>

          <div className="checkout-row">
            <div className="checkout-field">
              <label htmlFor="city">المدينة</label>
              <select id="city" name="city" value={form.city} onChange={handleChange}>
                <option value="">اختر المدينة</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.city && <p className="checkout-error">{errors.city}</p>}
            </div>

            <div className="checkout-field">
              <label htmlFor="district">الحي</label>
              <input id="district" name="district" type="text" placeholder="اسم الحي" value={form.district} onChange={handleChange} />
              {errors.district && <p className="checkout-error">{errors.district}</p>}
            </div>
          </div>

          <div className="checkout-field">
            <label htmlFor="address">العنوان بالتفصيل</label>
            <input id="address" name="address" type="text" placeholder="اسم الشارع، رقم المبنى، رقم الشقة" value={form.address} onChange={handleChange} />
            {errors.address && <p className="checkout-error">{errors.address}</p>}
          </div>

          <div className="checkout-field">
            <label htmlFor="notes">ملاحظات التوصيل (اختياري)</label>
            <textarea id="notes" name="notes" rows={4} placeholder="أي تعليمات خاصة بمندوب التوصيل..." value={form.notes} onChange={handleChange} />
          </div>

          <button type="submit" className="checkout-submit-btn">
            متابعة للشحن <img src={ArrowRight} alt="ArrowRight" />
          </button>
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
              {visibleItems.map((item, i) => (
                <div className="checkout-thumb" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  {extraCount > 0 && i === visibleItems.length - 1 && (
                    <span className="checkout-thumb-more">+{extraCount}</span>
                  )}
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