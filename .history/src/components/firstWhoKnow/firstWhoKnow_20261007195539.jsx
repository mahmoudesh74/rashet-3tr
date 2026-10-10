import "./firstWhoKnow.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import mail from "../../assets/mail.svg";
import whoKnowImage from "../../assets/whoKnow.png";

import { subscribeNewsletter } from "../../Redux/newsletterSlice";

export default function FirstWhoKnow() {
  const dispatch = useDispatch();

  const {
    loading,
    success,
    error,
  } = useSelector((state) => state.newsletter);

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthError("");

    if (!isAuthenticated) {
      setAuthError(
        "يجب تسجيل الدخول أولاً للاشتراك في النشرة البريدية"
      );
      return;
    }

    if (!email.trim()) return;

    try {
      await dispatch(
        subscribeNewsletter(email.trim())
      ).unwrap();

      // مسح الإيميل بعد نجاح الاشتراك
      setEmail("");

      // مسح أي Error قديم
      setAuthError("");
    } catch (error) {
      console.log(
        "Newsletter Subscribe Error:",
        error
      );
    }
  };

  return (
    <div className="firstWhoKnow">
      <div className="firstWhoKnowContent">
        <h2>كن أول من يعرف</h2>

        <div className="firstWhoKnowContentText">
          <p>
            اشترك في نشرتنا البريدية للحصول على عروض حصرية واكتشاف أحدث
            إضافاتنا من العطور الفاخرة.
          </p>
        </div>

        <form
          className="newsletter-section__form"
          onSubmit={handleSubmit}
        >
          <div className="newsletter-section__input-wrap">
            <img
              src={mail}
              alt=""
              className="mailIcon"
            />

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              required
              className="newsletter-section__input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAuthError("");
              }}
            />
          </div>

          <button
            type="submit"
            className="newsletter-section__btn"
            disabled={loading}
          >
            {loading
              ? "جاري الاشتراك..."
              : "اشترك الآن"}
          </button>
        </form>

        {authError && (
          <p className="formError">
            {authError}
          </p>
        )}

        {success && (
          <p className="formSuccess">
            تم الاشتراك في النشرة البريدية بنجاح
          </p>
        )}

        {error && (
          <p className="formError">
            {error}
          </p>
        )}
      </div>

      <div className="firstWhoKnowImg">
        <img
          src={whoKnowImage}
          alt=""
          className="firstWhoKnowImg__img"
        />
      </div>
    </div>
  );
}