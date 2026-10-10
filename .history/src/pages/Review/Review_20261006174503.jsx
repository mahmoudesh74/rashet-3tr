```jsx
import { useState, useEffect } from "react";
import "./Review.css";

import ArrowRight from "../../assets/arrow-right-02.svg";
import successIcon from "../../assets/successIcon.svg";
import Basket from "../../assets/basket.svg";
import locationIcon from "../../assets/locationIcon.svg";
import truck from "../../assets/shipping-truck-02.svg";
import credit from "../../assets/credit-card.svg";
import arrowLeft from "../../assets/arrowLeft-b-s.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { confirmOrder } from "../../Redux/orderSlice";

const STEPS = ["البيانات", "الدفع", "المراجعة"];

export default function Review() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmed, setConfirmed] = useState(false);

  // =========================
  // Checkout
  // =========================

  const { shippingAddress } = useSelector(
    (state) => state.checkout
  );

  // =========================
  // Payment
  // =========================

  const {
    paymentMethod,
    label: paymentLabel,
  } = useSelector((state) => state.payment);

  // =========================
  // Shipping
  // =========================

  const {
    methods: shippingMethods = [],
    selectedMethodId,
  } = useSelector((state) => state.shipping);

  // =========================
  // Cart
  // =========================

  const {
    items: cartItems = [],
    subtotal: cartSubtotal = 0,
    discount_amount: cartDiscount = 0,
  } = useSelector((state) => state.cart);

  // =========================
  // Order
  // =========================

  const {
    order,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);

  // =========================
  // Modal
  // =========================

  useEffect(() => {
    if (!confirmed) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setConfirmed(false);
      }
    };

    document.addEventListener("keydown", onKey);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        onKey
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [confirmed]);

  // =========================
  // Summary
  // =========================

  const subtotal = Number(cartSubtotal || 0);
  const discount = Number(cartDiscount || 0);

  // =========================
  // Shipping Method
  // =========================

  /*
    طريقة الشحن المختارة موجودة في Redux
    داخل shipping.selectedMethodId

    مثال:
    standard
    express
  */

  const selectedShippingId =
    selectedMethodId || "standard";

  const shippingMethod =
    shippingMethods.find(
      (method) =>
        method.id === selectedShippingId
    ) ||
    shippingMethods.find(
      (method) =>
        method.id === "standard"
    ) ||
    shippingMethods[0];

  const shipping = shippingMethod
    ? Number(shippingMethod.cost || 0)
    : 0;

  // =========================
  // Total
  // =========================

  const total = Math.max(
    subtotal - discount + shipping,
    0
  );

  // =========================
  // Payment Label
  // =========================

  const getPaymentLabel = () => {
    if (paymentLabel) {
      return paymentLabel;
    }

    switch (paymentMethod) {
      case "apple_pay":
        return "Apple Pay";

      case "mada":
        return "مدى";

      case "credit_card":
        return "البطاقة البنكية";

      case "card":
        return "البطاقة البنكية";

      case "cash_on_delivery":
        return "الدفع عند الاستلام";

      case "cod":
        return "الدفع عند الاستلام";

      default:
        return "لم يتم اختيار طريقة الدفع";
    }
  };

  // =========================
  // Address
  // =========================

  const getShippingAddress = () => {
    if (!shippingAddress) {
      return "لم يتم إدخال عنوان التوصيل";
    }

    const parts = [
      shippingAddress.shipping_city,
      shippingAddress.shipping_district,
      shippingAddress.shipping_street,
    ].filter(Boolean);

    if (!parts.length) {
      return "لم يتم إدخال عنوان التوصيل";
    }

    return parts.join("، ");
  };

  // =========================
  // Information
  // =========================

  const INFO = [
    {
      id: "address",
      icon: locationIcon,
      title: "عنوان التوصيل",
      text: getShippingAddress(),
    },
    {
      id: "payment",
      icon: credit,
      title: "طريقة الدفع",
      text: getPaymentLabel(),
    },
    {
      id: "shipping",
      icon: truck,
      title: "طريقة الشحن",
      text:
        shippingMethod?.name_ar ||
        "لم يتم اختيار طريقة الشحن",
    },
  ];

  // =========================
  // Edit
  // =========================

  const handleEdit = (id) => {
    if (id === "address") {
      navigate("/checkout");
      return;
    }

    if (
      id === "payment" ||
      id === "shipping"
    ) {
      navigate("/Payment");
    }
  };

  // =========================
  // Confirm Order
  // =========================

  const handleConfirm = async () => {
    // =========================
    // Validate Customer Data
    // =========================

    if (!shippingAddress) {
      console.log(
        "Customer shipping data is missing"
      );

      return;
    }

    // =========================
    // Validate Payment
    // =========================

    if (!paymentMethod) {
      console.log(
        "Payment method is missing"
      );

      return;
    }

    // =========================
    // Validate Shipping
    // =========================

    if (!selectedShippingId) {
      console.log(
        "Shipping method is missing"
      );

      return;
    }

    // =========================
    // Validate Cart
    // =========================

    if (!cartItems.length) {
      console.log("Cart is empty");

      return;
    }

    // =========================
    // Prepare Items
    // =========================

    const items = cartItems.map((item) => ({
      product_id: item.product_id,

      size: item.size,

      quantity:
        item.quantity ||
        item.qty ||
        1,
    }));

    // =========================
    // Prepare Order Data
    // =========================

    const orderData = {
      customer_name:
        shippingAddress.customer_name,

      customer_email:
        shippingAddress.customer_email,

      customer_phone:
        shippingAddress.customer_phone,

      shipping_city:
        shippingAddress.shipping_city,

      shipping_district:
        shippingAddress.shipping_district,

      shipping_street:
        shippingAddress.shipping_street,

      // طريقة الشحن من Redux
      shipping_method:
        selectedShippingId,

      // طريقة الدفع من Redux
      payment_method:
        paymentMethod,

      items,
    };

    // =========================
    // Debug
    // =========================

    console.log(
      "Selected Shipping:",
      selectedShippingId
    );

    console.log(
      "Selected Shipping Method:",
      shippingMethod
    );

    console.log(
      "Order Data:",
      orderData
    );

    // =========================
    // Confirm Order
    // =========================

    try {
      const result = await dispatch(
        confirmOrder(orderData)
      ).unwrap();

      console.log(
        "Order Confirmed:",
        result
      );

      setConfirmed(true);
    } catch (error) {
      console.log(
        "Order Confirmation Failed:",
        error
      );
    }
  };

  // =========================
  // Home
  // =========================

  const goHome = () => {
    setConfirmed(false);
    navigate("/");
  };

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
            <div className="checkout-step is-active">
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

      {/* =========================
          Header
      ========================= */}

      <div className="review-header">
        <h1>مراجعة الطلب</h1>

        <p>
          تأكد من تفاصيل طلبك قبل التأكيد.
        </p>
      </div>

      <div className="checkout-page-layout review-layout">

        <div className="review-main">

          {/* =========================
              Cart
          ========================= */}

          <div className="checkout-box review-cart">

            <h2 className="review-cart-title">
              <img
                src={Basket}
                alt="Basket"
              />

              السلة ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <div
                className="review-item"
                key={item.id}
              >

                <div className="review-item-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="review-item-qty">
                    {item.quantity ||
                      item.qty ||
                      1}
                  </span>

                </div>

                <div className="review-item-names">

                  <h3>
                    {item.name}
                  </h3>

                  <span>
                    {item.size || ""}
                  </span>

                </div>

                <span className="review-item-price">
                  {Number(
                    item.unit_price ??
                      item.price ??
                      0
                  )}{" "}
                  ر.س
                </span>

              </div>
            ))}

            {!cartItems.length && (
              <p className="checkout-error">
                السلة فارغة
              </p>
            )}

          </div>

          {/* =========================
              Info
          ========================= */}

          <div className="checkout-box review-info">

            {INFO.map((row) => (
              <div
                className="review-info-row"
                key={row.id}
              >

                <div className="review-info-img">
                  <img
                    className="review-info-icon"
                    src={row.icon}
                    alt=""
                  />
                </div>

                <div className="review-info-text">

                  <strong>
                    {row.title}
                  </strong>

                  <span>
                    {row.text}
                  </span>

                </div>

                <button
                  type="button"
                  className="review-edit-btn"
                  onClick={() =>
                    handleEdit(row.id)
                  }
                >

                  <img
                    src={arrowLeft}
                    alt="arrowLeft"
                    style={{
                      width: 10,
                      height: 10,
                    }}
                  />

                  تعديل

                </button>

              </div>
            ))}

          </div>

        </div>

        {/* =========================
            Order Summary
        ========================= */}

        <aside className="checkout-side">

          <div className="checkout-box">

            <h2 className="checkout-box-title">

              ملخص الطلب

              <span className="checkout-count">
                {cartItems.length} محددة
              </span>

            </h2>

            <div className="checkout-summary-rows">

              {/* Subtotal */}

              <div className="checkout-summary-row">

                <span className="checkout-summary-label">
                  المجموع الفرعي
                </span>

                <span className="checkout-summary-value">
                  {subtotal} ر.س
                </span>

              </div>

              {/* Discount */}

              <div className="checkout-summary-row">

                <span className="checkout-summary-label">
                  كوبون الخصم
                </span>

                <span className="checkout-summary-value">
                  -{discount} ر.س
                </span>

              </div>

              {/* Shipping */}

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

            {/* Error */}

            {orderError && (
              <p className="checkout-error">
                {orderError}
              </p>
            )}

            {/* Confirm */}

            <button
              type="button"
              className="checkout-submit-btn"
              onClick={handleConfirm}
              disabled={orderLoading}
            >

              {orderLoading
                ? "جاري تأكيد الطلب..."
                : "تأكيد الطلب"}

              <img
                src={ArrowRight}
                alt=""
              />

            </button>

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
              {order?.order_number
                ? `رقم الطلب: ${order.order_number}`
                : "شكراً لتسوقك من رشة عطر"}
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
```
