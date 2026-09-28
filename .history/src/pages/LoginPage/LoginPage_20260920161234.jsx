import { useState } from "react";
import "./LoginPage.css";
import GoogleIcon from "../../assets/Icon-google.svg"

export default function LoginForm({ onClose = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div dir="rtl" className="login-card">
      <button
        type="button"
        className="login-close"
        onClick={onClose}
        aria-label="إغلاق"
      >
        ×
      </button>

      <h1 className="login-title">أهلا بعودتك !</h1>
      <p className="login-subtitle">سجّل الدخول إلى حسابك للمتابعة</p>

      <button
        type="button"
        className="google-btn"
        onClick={() => alert("تسجيل الدخول باستخدام جوجل")}
      >
        تسجيل الدخول باستخدام جوجل
       <img src={GoogleIcon} alt="" />

      </button>

      <div className="divider">
        <div className="divider-line" />
        أو
        <div className="divider-line" />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="email" className="field-label">
            بريد إلكتروني
          </label>
          <input
            id="email"
            type="email"
            className="text-input"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password" className="field-label">
            كلمة المرور
          </label>
          <div className="password-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="text-input"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="form-row">
          <label className="remember-label">
            <input
              type="checkbox"
              className="remember-checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            تذكرني ؟
          </label>
          <a href="#" className="forgot-link">
            نسيت كلمة المرور
          </a>
        </div>

        <button type="submit" className="submit-btn">
          تسجيل الدخول
        </button>
      </form>

      <p className="footer-text">
        ليس لديك حساب؟ <a href="#">سجل الآن</a>
      </p>
    </div>
  );
}
