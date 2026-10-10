
import { useEffect, useState } from "react";
import "./Checkout.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  saveShippingAddress,
} from "../../Redux/checkoutSlice";

import {
  getShippingMethods,
} from "../../Redux/shippingSlice";

const STEPS = [
  "معلومات التوصيل",
  "الدفع",
  "المراجعة",
];

const CITIES = [
  "الرياض",
  "جدة",
  "الدمام",
  "مكة",
  "المدينة المنورة",
];

const MAX_VISIBLE = 2;

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =========================
     Redux
  ========================= */

  const {
    items: cartItems = [],
    subtotal: cartSubtotal = 0,
    discount_amount: cartDiscount = 0,
  } = useSelector((state) => state.cart);

  const {
    loading: checkoutLoading,
    error: checkoutError,
    success: checkoutSuccess,
  } = useSelector((state) => state.checkout);

  const {
    methods = [],
    loading: shippingLoading,
    error: shippingError,
    isFreeEligible,
  } = useSelector((state) => state.shipping);

  /* =========================
     Local State
  ========================= */

  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    notes: "",
  });

  const [delivery, setDelivery] = useState("");

  const [errors, setErrors] = useState({});

  /* =========================
     Fetch Shipping Methods
  ========================= */

  useEffect(() => {
    dispatch(getShippingMethods());
  }, [dispatch]);

  /* =========================
     Select Default Shipping
  ========================= */

  useEffect(() => {
    if (!methods.length) return;

    if (isFreeEligible) {
      const freeMethod =
        methods.find(
          (method) =>
            method.is_free === true ||
            Number(method.cost) === 0
        ) || methods[0];

      setDelivery(freeMethod.id);
    } else {
      const standardMethod =
        methods.find(
          (method) => method.id === "standard"
        ) || methods[0];

      setDelivery(standardMethod.id);
    }
  }, [methods, isFreeEligible]);

  /* =========================
     Form Change
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================
     Validate Form
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (!form.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (
      !/^\S+@\S+\.\S+$/.test(form.email)
    ) {
      newErrors.email =
        "يرجى إدخال بريد إلكتروني صحيح";
    }

    if (!form.city) {
      newErrors.city = "اختر المدينة";
    }

    if (!form.district.trim()) {
      newErrors.district = "الحي مطلوب";
    }

    if (!form.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }

    if (!delivery) {
      newErrors.delivery =
        "يرجى اختيار طريقة الشحن";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     Shipping
  ========================= */

  const selectedShippingMethod = methods.find(
    (method) => method.id === delivery
  );

  const shipping = selectedShippingMethod
    ? Number(selectedShippingMethod.cost || 0)
    : 0;

  /* =========================
     Cart Totals
  ========================= */

  const subtotal = Number(cartSubtotal || 0);

  const discount = Number(
    cartDiscount || 0
  );

  const total = Math.max(
    subtotal - discount + shipping,
    0
  );

  /* =========================
     Visible Cart Items
  ========================= */

  const visibleItems = cartItems.slice(
    0,
    MAX_VISIBLE
  );

  const extraCount =
    cartItems.length - MAX_VISIBLE;

  /* =========================
     Submit Shipping
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const shippingData = {
      customer_name: form.fullName,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_city: form.city,
      shipping_district: form.district,
      shipping_street: form.address,
      shipping_notes: form.notes,
    };

    const result = await dispatch(
      saveShippingAddress(shippingData)
    );

    if (saveShippingAddress.fulfilled.match(result)) {
      navigate("/Payment");
    }
  };

  /* =========================
     Empty Cart
  ========================= */

  if (!cartItems.length) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>السلة فارغة</h2>

          <p>
            لا توجد منتجات في السلة لإتمام الطلب
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            العودة للتسوق
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     JSX
  ========================= */

  return (
    <div className="checkout-page" dir="rtl">
      {/* =========================
          Header
      ========================= */}

      <div className="checkout-header">
        <h1>إتمام الطلب</h1>

        <div className="checkout-steps">
          {STEPS.map((step, index) => (
            <div
              key={step}
              className={`checkout-step ${
                index === currentStep
                  ? "active"
                  : ""
              } ${
                index < currentStep
                  ? "completed"
                  : ""
              }`}
            >
              <div className="step-number">
                {index + 1}
              </div>

              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          Main
      ========================= */}

      <div className="checkout-container">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          {/* =========================
              Delivery Information
          ========================= */}

          <section className="checkout-section">
            <div className="section-header">
              <h2>معلومات التوصيل</h2>

              <p>
                أدخل بيانات التوصيل الخاصة بك
              </p>
            </div>

            {/* Full Name */}

            <div className="checkout-field">
              <label htmlFor="fullName">
                الاسم بالكامل
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="أدخل الاسم بالكامل"
              />

              {errors.fullName && (
                <span className="field-error">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Phone */}

            <div className="checkout-field">
              <label htmlFor="phone">
                رقم الهاتف
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="أدخل رقم الهاتف"
              />

              {errors.phone && (
                <span className="field-error">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Email */}

            <div className="checkout-field">
              <label htmlFor="email">
                البريد الإلكتروني
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />

              {errors.email && (
                <span className="field-error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* City */}

            <div className="checkout-field">
              <label htmlFor="city">
                المدينة
              </label>

              <select
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
              >
                <option value="">
                  اختر المدينة
                </option>

                {CITIES.map((city) => (
                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>
                ))}
              </select>

              {errors.city && (
                <span className="field-error">
                  {errors.city}
                </span>
              )}
            </div>

            {/* District */}

            <div className="checkout-field">
              <label htmlFor="district">
                الحي
              </label>

              <input
                id="district"
                name="district"
                type="text"
                value={form.district}
                onChange={handleChange}
                placeholder="مثال: الملقا"
              />

              {errors.district && (
                <span className="field-error">
                  {errors.district}
                </span>
              )}
            </div>

            {/* Address */}

            <div className="checkout-field">
              <label htmlFor="address">
                العنوان
              </label>

              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="أدخل عنوان التوصيل"
              />

              {errors.address && (
                <span className="field-error">
                  {errors.address}
                </span>
              )}
            </div>

            {/* Notes */}

            <div className="checkout-field">
              <label htmlFor="notes">
                ملاحظات إضافية
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="أي ملاحظات خاصة بالتوصيل..."
                rows="4"
              />
            </div>
          </section>

          {/* =========================
              Shipping Methods
          ========================= */}

          <section className="checkout-section">
            <div className="section-header">
              <h2>طريقة الشحن</h2>

              <p>
                اختر طريقة التوصيل المناسبة لك
              </p>
            </div>

            {shippingLoading ? (
              <div className="shipping-loading">
                جاري تحميل طرق الشحن...
              </div>
            ) : shippingError ? (
              <div className="shipping-error">
                {shippingError}
              </div>
            ) : (
              <div className="shipping-methods">
                {methods.map((method) => (
                  <label
                    key={method.id}
                    className={`shipping-method ${
                      delivery === method.id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={method.id}
                      checked={
                        delivery === method.id
                      }
                      onChange={(e) =>
                        setDelivery(
                          e.target.value
                        )
                      }
                    />

                    <div className="shipping-method-content">
                      <div className="shipping-method-title">
                        <span>
                          {method.name_ar}
                        </span>

                        <strong>
                          {Number(method.cost) === 0
                            ? "مجاني"
                            : `${method.cost} ر.س`}
                        </strong>
                      </div>

                      <p>
                        {method.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {errors.delivery && (
              <span className="field-error">
                {errors.delivery}
              </span>
            )}
          </section>

          {/* =========================
              Submit
          ========================= */}

          {checkoutError && (
            <div className="checkout-error">
              {checkoutError}
            </div>
          )}

          <button
            type="submit"
            className="checkout-submit"
            disabled={
              checkoutLoading ||
              shippingLoading
            }
          >
            {checkoutLoading
              ? "جاري الحفظ..."
              : "المتابعة إلى الدفع"}
          </button>
        </form>

        {/* =========================
            Order Summary
        ========================= */}

        <aside className="order-summary">
          <div className="summary-header">
            <h2>ملخص الطلب</h2>

            <span>
              {cartItems.length} منتج
            </span>
          </div>

          {/* Products */}

          <div className="summary-items">
            {visibleItems.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >
                <div className="summary-item-image">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <div className="summary-no-image">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                <div className="summary-item-info">
                  <h3>{item.name}</h3>

                  {item.brand && (
                    <span className="summary-brand">
                      {item.brand}
                    </span>
                  )}

                  {item.size && (
                    <span className="summary-size">
                      الحجم: {item.size}
                    </span>
                  )}

                  <div className="summary-item-bottom">
                    <span>
                      الكمية:{" "}
                      {item.qty ?? item.quantity ?? 1}
                    </span>

                    <strong>
                      {Number(
                        item.price ??
                          item.unit_price ??
                          0
                      )}{" "}
                      ر.س
                    </strong>
                  </div>
                </div>
              </div>
            ))}

            {extraCount > 0 && (
              <div className="summary-more">
                + {extraCount} منتجات أخرى
              </div>
            )}
          </div>

          {/* Totals */}

          <div className="summary-totals">
            <div className="summary-row">
              <span>المجموع الفرعي</span>

              <strong>
                {subtotal.toFixed(2)} ر.س
              </strong>
            </div>

            <div className="summary-row discount-row">
              <span>الخصم</span>

              <strong>
                - {discount.toFixed(2)} ر.س
              </strong>
            </div>

            <div className="summary-row">
              <span>الشحن</span>

              <strong>
                {shipping === 0
                  ? "مجاني"
                  : `${shipping.toFixed(2)} ر.س`}
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>الإجمالي</span>

              <strong>
                {total.toFixed(2)} ر.س
              </strong>
            </div>
          </div>

          {/* Shipping Info */}

          {selectedShippingMethod && (
            <div className="selected-shipping-info">
              <span>
                طريقة الشحن:
              </span>

              <strong>
                {selectedShippingMethod.name_ar}
              </strong>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
