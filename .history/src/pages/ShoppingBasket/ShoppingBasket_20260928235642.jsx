import { useState } from "react";
import "./ShoppingBasket.css";

import productImage1 from "../../assets/groupp1.png";
import productImage2 from "../../assets/groupp3.png";

import trashIcon from "../../assets/delete-03.svg"; 
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import rialSale from "../../assets/rialSale.svg"
import rialSaoudy from "../../assets/saudi-riyal.svg"
import success from "../../assets/success.svg"
const INITIAL_ITEMS = [
  {
    id: "tom-ford",
    name: "Tom Ford | عطر توم فورد",
    category: "عطور رجالية",
    image: productImage1,
    price: 450,
    oldPrice: 600,
    qty: 3,
    favorite: false,
  },
  {
    id: "baccarat-1",
    name: "Baccarat | عطر بكرات روج",
    category: "عطور نسائية",
    image: productImage2,
    price: 450,
    oldPrice: 600,
    qty: 2,
    favorite: false,
  },
  {
    id: "baccarat-2",
    name: "Baccarat | عطر بكرات روج",
    category: "عطور نسائية",
    image: productImage2,
    price: 450,
    oldPrice: 600,
    qty: 1,
    favorite: true,
  },
  {
    id: "baccarat-3",
    name: "Baccarat | عطر بكرات روج",
    category: "عطور نسائية",
    image: productImage2,
    price: 450,
    oldPrice: 600,
    qty: 1,
    favorite: false,
  },
];

const SHIPPING_FEE = 25;
const COUPONS = {
  RASHAT10: 0.1, 
};

export default function ShoppingBasket() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon({ code, rate: COUPONS[code] });
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("الكوبون غير صحيح");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.rate) : 0;
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal - discount + shipping;

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <h1>سلة التسوق</h1>
        <p>لديك {items.length} منتجات في السلة</p>
      </div>

      <div className="cart-page-layout">
          {/* Cart items */}
        <div className="cart-items-list">
          {items.length === 0 ? (
            <p className="cart-empty-text">السلة فارغة حالياً</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-top">
                     <div className="cart-item-names">
                      <h3>{item.name}</h3>
                      <span>{item.category}</span>
                    </div>
                    <div className="cart-item-price">
                       <span className="cart-item-new-price">
                        {item.price} <img src={rialSaoudy} alt="rialSaoudy" />
                      </span>
                      <span className="cart-item-old-price">
                       <img src={rialSale} alt="rialSale" />
                      </span>
                     
                    </div>
                   
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        aria-label="إنقاص الكمية"
                      >
                        -
                      </button>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        type="button"
                        className={`cart-item-fav${item.favorite ? " is-active" : ""}`}
                        aria-label="أضف إلى المفضلة"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <img src={item.favorite ? favoriteHeart : heart} alt="" />
                      </button>
                      <button
                        type="button"
                        className="cart-item-remove"
                        aria-label="حذف من السلة"
                        onClick={() => removeItem(item.id)}
                      >
                        <img src={trashIcon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Order summary */}
        <aside className="cart-summary">
          <h2 className="cart-summary-title">ملخص الطلب</h2>

          <div className="cart-coupon">
            <span className="cart-coupon-label">كوبون الخصم</span>

            {appliedCoupon ? (
              <div className="cart-coupon-applied">
                <button
                  type="button"
                  className="cart-coupon-remove"
                  onClick={removeCoupon}
                  aria-label="إزالة الكوبون"
                >
                  ×
                </button>
                <span>{appliedCoupon.code}</span>
              </div>
            ) : (
              <div className="cart-coupon-input-row">
                <input
                  type="text"
                  placeholder="أدخل كود الكوبون"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="button" onClick={applyCoupon}>
                  تطبيق
                </button>
              </div>
            )}

            {appliedCoupon && (
              <p className="cart-coupon-success">
                <img src={success} alt="" /> تم تطبيق الكوبون بنجاح
              </p>
            )}
            {couponError && <p className="cart-coupon-error">{couponError}</p>}
          </div>

          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span className="cart-summary-label">المجموع الفرعي</span>

              <span className="cart-summary-value">{subtotal} ر.س</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">الخصم</span>

              <span className="cart-summary-value cart-summary-value--discount">
                -{discount} ر.س
              </span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">الشحن</span>

              <span className="cart-summary-value">{shipping} ر.س</span>
            </div>
          </div>

          <div className="cart-summary-total">
            <span className="cart-summary-total-label">الإجمالي</span>

            <span className="cart-summary-total-value">{total} ر.س</span>
          </div>

          <button
            type="button"
            className="cart-checkout-btn"
            disabled={items.length === 0}
          >
            إتمام الطلب
          </button>

          <p className="cart-secure-text">🔒 تسوق آمن ومشفر 100%</p>

          <div className="cart-payment-badges">
            <span className="cart-payment-badge">Apple Pay</span>
            <span className="cart-payment-badge">VISA</span>
            <span className="cart-payment-badge">mada</span>
          </div>
        </aside>

      
      </div>
    </section>
  );
}