import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./LoginPage.css";
import GoogleIcon from "../../assets/Icon-google.svg";
import IconPassword from "../../assets/Icon-password.svg";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  remember: z.boolean().optional(),
});

export default function LoginForm({ onClose = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    console.log(data); // TODO: ابعت البيانات للـ API هنا
  };

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

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="email" className="field-label">
            بريد إلكتروني
          </label>
          <input
            id="email"
            type="email"
            className={`text-input${errors.email ? " is-invalid" : ""}`}
            placeholder="example@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password" className="field-label">
            كلمة المرور
          </label>
          <div className="password-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`text-input${errors.password ? " is-invalid" : ""}`}
              placeholder="أدخل كلمة المرور"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
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
                <img src={IconPassword} alt="" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="field-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="form-row">
          <a href="#" className="forgot-link">
            نسيت كلمة المرور
          </a>
          <label className="remember-label">
            <input
              type="checkbox"
              className="remember-checkbox"
              {...register("remember")}
            />
            تذكرني ؟
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          تسجيل الدخول
        </button>
      </form>

      <p className="footer-text">ليس لديك حساب؟ سجل الآن</p>
    </div>
  );
}