
import { useState, useEffect } from "react";

import "./Payment.css";

import ArrowRight from "../../assets/arrow-right-02.svg";
import lock2 from "../../assets/lock2.svg";
import visa from "../../assets/visa-logo.svg";
import applePay from "../../assets/ApplePay.svg";
import mada from "../../assets/Mada_Logo.svg";
import creditCard from "../../assets/credit-card.svg";
import truck from "../../assets/shipping-truck-02.svg";
import successIcon from "../../assets/successIcon.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getShippingMethods } from "../../Redux/shippingSlice";
import { selectPaymentMethod } from "../../Redux/paymentSlice";

const STEPS = ["البيانات", "الدفع", "المراجعة"];

const ACTIVE_STEP = 1;

const MAX_VISIBLE = 2;

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =========================
  // Payment State
  // =========================

  const [method, setMethod] = useState("card");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    save: true,
  });

  const [errors, setErrors] = useState({});

  const [confirmed, setConfirmed] = useState(false);

  // =========================
  // Cart State
  // =========================

  const {
    items: cartItems = [],
    subtotal: cartSubtotal = 0,
    discount_amount: cartDiscount = 0,
  } = useSelector((state) => state.cart);

  // =========================
  // Shipping State
  // =========================

  const {
    methods: shippingMethods = [],
    freeShippingThreshold = 0,
    isFreeEligible = false,
    loading: shippingLoading,
    error: shippingError,
  } = useSelector((state) => state.shipping);

  // =========================
  // Payment API State
  // =========================

  const {
    loading: paymentLoading,
    error: paymentError,
  } = useSelector((state) => state.payment);

  // =========================
  // Get Shipping Methods
  // =========================

  useEffect(() => {
    dispatch(getShippingMethods());
  }, [dispatch]);

  // =========================
  // Cart Summary
  // =========================

  const subtotal = Number(cartSubtotal || 0);

  const discount = Number(cartDiscount || 0);

  // =========================
  // Delivery
  // =========================

  const [delivery, setDelivery] = useState("");

  // =========================
  // Select Default Shipping
  // =========================

  useEffect(() => {
    if (!shippingMethods.length) return;

    const freeMethod = shippingMethods.find(
      (shippingMethod) =>
        shippingMethod.is_free === true ||
        Number(shippingMethod.cost) === 0
    );

    const standardMethod = shippingMethods.find(
      (shippingMethod) =>
        shippingMethod.id === "standard"
    );

    if (isFreeEligible && freeMethod) {
      setDelivery(freeMethod.id);
    } else if (standardMethod) {
      setDelivery(standardMethod.id);
    } else {
      setDelivery(shippingMethods[0].id);
    }
  }, [shippingMethods, isFreeEligible]);

  // =========================
  // Selected Shipping
  // =========================

  const selectedShippingMethod =
    shippingMethods.find(
      (shippingMethod) =>
        shippingMethod.id === delivery
    );

  const shipping = selectedShippingMethod
    ? Number(selectedShippingMethod.cost || 0)
    : 0;

  // =========================
  // Total
  // =========================

  const total = Math.max(
    subtotal - discount + shipping,
    0
  );

  // =========================
  // Visible Products
  // =========================

  const visibleItems = cartItems.slice(
    0,
    MAX_VISIBLE
  );

  const extraCount =
    cartItems.length - MAX_VISIBLE;

  // =========================
  // Confirm Modal
  // =========================

  useEffect(() => {
    if (!confirmed) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setConfirmed(false);
      }
    };

    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        onKey
      );

      document.body.style.overflow = prev;
    };
  }, [confirmed]);

  // =========================
  // Card Handler
  // =========================

  const handleCard = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    let next = value;

    if (name === "number") {
      next = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (name === "expiry") {
      const digits = value
        .replace(/\D/g, "")
        .slice(0, 4);

      next =
        digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    } else if (name === "cvv") {
      next = value
        .replace(/\D/g, "")
        .slice(0, 4);
    } else if (type === "checkbox") {
      next = checked;
    }

    setCard((prev) => ({
      ...prev,
      [name]: next,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // Validation
  // =========================

  const validate = () => {
    if (method !== "card") return true;

    const next = {};

    if (
      card.number.replace(/\s/g, "").length !== 16
    ) {
      next.number = "رقم البطاقة غير صحيح";
    }

    const m =
      /^(\d{2})\/(\d{2})$/.exec(
        card.expiry
      );

    if (
      !m ||
      +m[1] < 1 ||
      +m[1] > 12
    ) {
      next.expiry =
        "تاريخ الانتهاء غير صحيح";
    }

    if (card.cvv.length < 3) {
      next.cvv =
        "رمز التحقق غير صحيح";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const paymentMethodMap = {
      apple: "apple_pay",
      mada: "mada",
      card: " credit_card",
      cod: "cash_on_delivery",
    };

    const paymentMethod =
      paymentMethodMap[method];

    if (!paymentMethod) {
      return;
    }

    try {
      await dispatch(
        selectPaymentMethod(paymentMethod)
      ).unwrap();

      console.log({
        method: paymentMethod,
        delivery,
        shippingMethod:
          selectedShippingMethod,
        subtotal,
        discount,
        shipping,
        total,
        saveCard: card.save,
      });

      setConfirmed(true);
    } catch (error) {
      console.log(
        "Failed to select payment method:",
        error
      );
    }
  };

  // =========================
  // Review
  // =========================

  const goReview = () => {
    navigate("/Review");
  };

  // =========================
  // Home
  // =========================

  const goHome = () => {
    setConfirmed(false);
    navigate("/");
  };

  // =========================
  // Loading
  // =========================

  if (
    shippingLoading &&
    !shippingMethods.length
  ) {
    return (
      <section className="checkout-page">
        <p>جاري تحميل طرق الشحن...</p>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      {/* =========================
          Steps
      ========================= */}

      <div className="checkout-steps">
        {STEPS.map((label, i) => (
          <div
            className="checkout-step-wrap"
            key={label}
          >
            <div
              className={`checkout-step${
                i <= ACTIVE_STEP
                  ? " is-active"
                  : ""
              }`}
            >
              <span className="checkout-step-dot">
                {i + 1}
              </span>

              <span className="checkout-step-label">
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <span className="checkout-step-line" />
            )}
          </div>
        ))}
      </div>

      <div className="checkout-page-layout">
        {/* =========================
            Payment Methods
        ========================= */}

        <form
          className="payment-methods"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Apple Pay */}

          <label
            className={`payment-method${
              method === "apple"
                ? " is-selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="method"
              checked={method === "apple"}
              onChange={() =>
                setMethod("apple")
              }
            />

            <span className="payment-method-name">
              Apple Pay
            </span>

            <span className="payment-method-logo">
              <img
                src={applePay}
                alt=""
              />
            </span>
          </label>

          {/* Mada */}

          <label
            className={`payment-method${
              method === "mada"
                ? " is-selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="method"
              checked={method === "mada"}
              onChange={() =>
                setMethod("mada")
              }
            />

            <span className="payment-method-name">
              مدى
            </span>

            <span className="payment-method-logo">
              <img
                src={mada}
                alt=""
              />
            </span>
          </label>

          {/* Card */}

          <div
            className={`payment-method payment-method--card${
              method === "card"
                ? " is-selected"
                : ""
            }`}
          >
            <label className="payment-method-head">
              <input
                type="radio"
                name="method"
                checked={method === "card"}
                onChange={() =>
                  setMethod("card")
                }
              />

              <span className="payment-method-name">
                البطاقة البنكية
              </span>

              <span className="payment-method-logo">
                <img
                  src={visa}
                  alt=""
                />
              </span>
            </label>

            {method === "card" && (
              <div className="payment-card-fields">
                {/* Card Number */}

                <div className="checkout-field">
                  <label htmlFor="number">
                    رقم البطاقة
                  </label>

                  <div className="checkout-input-icon payment-icon-left">
                    <input
                      id="number"
                      name="number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className="checkout-input"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={handleCard}
                    />

                    <span className="payment-input-icon">
                      <img
                        src={creditCard}
                        alt=""
                      />
                    </span>
                  </div>

                  {errors.number && (
                    <p className="checkout-error">
                      {errors.number}
                    </p>
                  )}
                </div>

                {/* Expiry + CVV */}

                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="expiry">
                      تاريخ الانتهاء
                    </label>

                    <input
                      id="expiry"
                      name="expiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      className="checkout-input"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={handleCard}
                    />

                    {errors.expiry && (
                      <p className="checkout-error">
                        {errors.expiry}
                      </p>
                    )}
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="cvv">
                      رمز التحقق (CVV)
                    </label>

                    <input
                      id="cvv"
                      name="cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      className="checkout-input"
                      placeholder="•••"
                      value={card.cvv}
                      onChange={handleCard}
                    />

                    {errors.cvv && (
                      <p className="checkout-error">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save Card */}

                <label className="payment-save">
                  <input
                    type="checkbox"
                    name="save"
                    checked={card.save}
                    onChange={handleCard}
                  />

                  حفظ بيانات البطاقة لعمليات
                  الدفع المستقبلية
                </label>
              </div>
            )}
          </div>

          {/* Cash On Delivery */}

          <label
            className={`payment-method${
              method === "cod"
                ? " is-selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="method"
              checked={method === "cod"}
              onChange={() =>
                setMethod("cod")
              }
            />

            <span className="payment-method-name">
              الدفع عند الاستلام
            </span>

            <span className="payment-method-logo payment-method-logo--plain">
              <img
                src={truck}
                alt="truck"
              />
            </span>
          </label>

          {/* Submit */}

          <button
            type="submit"
            className="checkout-submit-btn"
            disabled={paymentLoading}
          >
            {paymentLoading
              ? "جاري التأكيد..."
              : "تأكيد الطلب"}

            <img
              src={ArrowRight}
              alt=""
            />
          </button>

          <button
            type="button"
            className="payment-secondary-btn"
            onClick={goReview}
          >
            متابعة المراجعة
          </button>

          <p className="checkout-secure-text">
            <img
              src={lock2}
              alt=""
            />

            دفع آمن ومشفر 100%
          </p>

          {paymentError && (
            <p className="checkout-error">
              {paymentError}
            </p>
          )}
        </form>

        {/* =========================
            Delivery + Order Summary
        ========================= */}

        <aside className="checkout-side">
          {/* =========================
              Delivery Method
          ========================= */}

          <div className="checkout-box">
            <h2 className="checkout-box-title">
              طريقة التوصيل
            </h2>

            {shippingMethods.map(
              (shippingMethod) => {
                const isSelected =
                  delivery ===
                  shippingMethod.id;

                return (
                  <label
                    key={shippingMethod.id}
                    className={`checkout-delivery${
                      isSelected
                        ? " is-selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={shippingMethod.id}
                      checked={isSelected}
                      onChange={() =>
                        setDelivery(
                          shippingMethod.id
                        )
                      }
                    />

                    <div className="checkout-delivery-info">
                      <strong>
                        {
                          shippingMethod.name_ar
                        }
                      </strong>

                      <span>
                        {
                          shippingMethod.description
                        }
                      </span>
                    </div>

                    <em>
                      {shippingMethod.is_free ||
                      Number(
                        shippingMethod.cost
                      ) === 0
                        ? "مجاناً"
                        : `${shippingMethod.cost} ر.س`}
                    </em>
                  </label>
                );
              }
            )}

            {freeShippingThreshold > 0 &&
              !isFreeEligible && (
                <p className="checkout-shipping-note">
                  الشحن المجاني متاح للطلبات
                  التي تتجاوز{" "}
                  {freeShippingThreshold} ر.س
                </p>
              )}

            {shippingError && (
              <p className="checkout-error">
                {shippingError}
              </p>
            )}
          </div>

          {/* =========================
              Order Summary
          ========================= */}

          <div className="checkout-box">
            <h2 className="checkout-box-title">
              ملخص الطلب

              <span className="checkout-count">
                {cartItems.length} محددة
              </span>
            </h2>

            {/* Product Images */}

            <div className="checkout-thumbs">
              {visibleItems.map(
                (item, i) => (
                  <div
                    className="checkout-thumb"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    {extraCount > 0 &&
                      i ===
                        visibleItems.length - 1 && (
                        <span className="checkout-thumb-more">
                          +{extraCount}
                        </span>
                      )}
                  </div>
                )
              )}
            </div>

            {/* Summary */}

            <div className="checkout-summary-rows">
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">
                  المجموع الفرعي
                </span>

                <span className="checkout-summary-value">
                  {subtotal} ر.س
                </span>
              </div>

              <div className="checkout-summary-row">
                <span className="checkout-summary-label">
                  كوبون الخصم
                </span>

                <span className="checkout-summary-value">
                  -{discount} ر.س
                </span>
              </div>

              <div className="checkout-summary-row">
                <span className="checkout-summary-label">
                  الشحن
                </span>

                <span className="checkout-summary-value">
                  {shipping === 0
                    ? "مجاناً"
                    : `${shipping} ر.س`}
                </span>
              </div>
            </div>

            {/* Total */}

            <div className="checkout-summary-total">
              <span className="checkout-summary-total-label">
                الإجمالي
              </span>

              <span className="checkout-summary-total-value">
                {total} ر.س
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* =========================
          Success Modal
      ========================= */}

      {confirmed && (
        <div
          className="review-modal-overlay"
          onClick={() =>
            setConfirmed(false)
          }
        >
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="review-modal-close"
              aria-label="إغلاق"
              onClick={() =>
                setConfirmed(false)
              }
            >
              ×
            </button>

            <img
              src={successIcon}
              alt="successIcon"
            />

            <h2 id="review-modal-title">
              تم تأكيد طلبك بنجاح
            </h2>

            <p>
              شكراً لتسوقك من رشة عطر
            </p>

            <button
              type="button"
              className="review-modal-btn"
              onClick={goHome}
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
