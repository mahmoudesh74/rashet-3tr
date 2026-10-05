import { useEffect, useState } from "react";
import "./ShoppingBasket.css";

import trashIcon from "../../assets/delete-03.svg";
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import rialSale from "../../assets/rialSale.svg";
import rialSaoudy from "../../assets/saudi-riyal.svg";
import success from "../../assets/success.svg";
import lock from "../../assets/lock.svg";
import visa from "../../assets/visa-logo.svg";
import applePay from "../../assets/ApplePay.svg";
import mada from "../../assets/Mada_Logo.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCart,
  updateCartItem,
  deleteCartItem,
} from "../../Redux/cartSlice";

const SHIPPING_FEE = 25;

const COUPONS = {
  RASHAT10: 0.1,
};

export default function ShoppingBasket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.cart);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const increaseQty = (id) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    if (
      item.stock_quantity &&
      item.qty >= item.stock_quantity
    ) {
      return;
    }

    dispatch(
      updateCartItem({
        id: item.id,
        quantity: item.qty + 1,
      })
    );
  };

  const decreaseQty = (id) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    if (item.qty === 1) {
      dispatch(deleteCartItem(item.id));
      return;
    }

    dispatch(
      updateCartItem({
        id: item.id,
        quantity: item.qty - 1,
      })
    );
  };

  const removeItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (COUPONS[code]) {
      setAppliedCoupon({
        code,
        rate: COUPONS[code],
      });

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

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const discount = appliedCoupon
    ? Math.round(subtotal * appliedCoupon.rate)
    : 0;

  const shipping =
    items.length > 0 ? SHIPPING_FEE : 0;

  const total = subtotal - discount + shipping;

  if (loading && items.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-page-header">
          <h1>سلة التسوق</h1>
          <p>جاري تحميل السلة...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <h1>سلة التسوق</h1>

        <p>
          لديك {items.length} منتجات في السلة
        </p>
      </div>

      {error && (
        <p className="cart-coupon-error">
          {error}
        </p>
      )}

      <div className="cart-page-layout">
        {/* Cart items */}
        <div className="cart-items-list">
          {items.length === 0 ? (
            <p className="cart-empty-text">
              السلة فارغة حالياً
            </p>
          ) : (
            items.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div className="cart-item-names">
                      <h3>{item.name}</h3>

                      <span>
                        {item.brand ||
                          "عطور"}
                      </span>
                    </div>

                    <div className="cart-item-price">
                      <span className="cart-item-new-price">
                        {item.price}

                        <img
                          src={rialSaoudy}
                          alt="rialSaoudy"
                        />
                      </span>

                      {item.original_price &&
                        Number(item.original_price) >
                          Number(item.price) && (
                          <span className="cart-item-old-price">
                            {item.original_price}

                            <img
                              src={rialSale}
                              alt="rialSale"
                            />
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button
                        type="button"
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        aria-label="زيادة الكمية"
                        disabled={
                          item.stock_quantity &&
                          item.qty >=
                            item.stock_quantity
                        }
                      >
                        +
                      </button>

                      <span>{item.qty}</span>

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        aria-label="إنقاص الكمية"
                      >
                        -
                      </button>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        type="button"
                        className="cart-item-fav"
                        aria-label="أضف إلى المفضلة"
                      >
                        <img
                          src={heart}
                          alt=""
                        />
                      </button>

                      <button
                        type="button"
                        className="cart-item-remove"
                        aria-label="حذف من السلة"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        <img
                          src={trashIcon}
                          alt=""
                        />
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
          <h2 className="cart-summary-title">
            ملخص الطلب
          </h2>

          <div className="cart-coupon">
            <span className="cart-coupon-label">
              كوبون الخصم
            </span>

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

                <span>
                  {appliedCoupon.code}
                </span>
              </div>
            ) : (
              <div className="cart-coupon-input-row">
                <input
                  type="text"
                  placeholder="أدخل كود الكوبون"
                  value={couponInput}
                  onChange={(e) =>
                    setCouponInput(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={applyCoupon}
                >
                  تطبيق
                </button>
              </div>
            )}

            {appliedCoupon && (
              <p className="cart-coupon-success">
                <img
                  src={success}
                  alt=""
                />

                تم تطبيق الكوبون بنجاح
              </p>
            )}

            {couponError && (
              <p className="cart-coupon-error">
                {couponError}
              </p>
            )}
          </div>

          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span className="cart-summary-label">
                المجموع الفرعي
              </span>

              <span className="cart-summary-value">
                {subtotal} ر.س
              </span>
            </div>

            <div className="cart-summary-row">
              <span className="cart-summary-label">
                الخصم
              </span>

              <span className="cart-summary-value cart-summary-value--discount">
                -{discount} ر.س
              </span>
            </div>

            <div className="cart-summary-row">
              <span className="cart-summary-label">
                الشحن
              </span>

              <span className="cart-summary-value">
                {shipping} ر.س
              </span>
            </div>
          </div>

          <div className="cart-summary-total">
            <span className="cart-summary-total-label">
              الإجمالي
            </span>

            <span className="cart-summary-total-value">
              {total} ر.س
            </span>
          </div>

          <button
            type="button"
            className="cart-checkout-btn"
            disabled={items.length === 0}
            onClick={() =>
              navigate("/Checkout")
            }
          >
            إتمام الطلب
          </button>

          <p className="cart-secure-text">
            <img src={lock} alt="" />
            تسوق آمن ومشفر 100%
          </p>

          <div className="cart-payment-badges">
            <div className="cart-payment-badge">
              <img src={mada} alt="" />
            </div>

            <div className="cart-payment-badge">
              <img src={visa} alt="" />
            </div>

            <div className="cart-payment-badge">
              <img
                src={applePay}
                alt=""
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}