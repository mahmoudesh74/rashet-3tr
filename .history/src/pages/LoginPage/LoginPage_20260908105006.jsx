import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div dir="rtl" className="login-page">
      <div className="login-card">
        <h1 className="login-title">أهلا بعودتك !</h1>
        <p className="login-subtitle">سجّل الدخول إلى حسابك للمتابعة</p>

        <button
          type="button"
          className="google-btn"
          onClick={() => alert("تسجيل الدخول باستخدام جوجل")}
        >
          <svg viewBox="0 0 24 24" className="google-icon">
            <path
              fill="#4285F4"
              d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.61c-.13 1.07-.86 2.68-2.48 3.76l-.02.15 3.6 2.72.25.02c2.29-2.06 3.56-5.09 3.56-8.32"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.05 7.94-2.87l-3.78-2.86c-1.02.68-2.38 1.16-4.16 1.16-3.18 0-5.88-2.06-6.84-4.91l-.14.01-3.75 2.82-.05.13C3.21 21.4 7.28 24 12 24"
            />
            <path
              fill="#FBBC05"
              d="M5.16 14.52A6.96 6.96 0 0 1 4.77 12c0-.88.16-1.73.38-2.52l-.01-.16-3.8-2.86-.12.06A11.94 11.94 0 0 0 0 12c0 1.93.47 3.76 1.29 5.38z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c2.26 0 3.78.94 4.65 1.72l3.39-3.24C17.94 1.24 15.24 0 12 0 7.28 0 3.21 2.6 1.22 6.62l3.94 3.06C6.12 6.81 8.82 4.75 12 4.75"
            />
          </svg>
          تسجيل الدخول باستخدام جوجل
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
    </div>
  );
}