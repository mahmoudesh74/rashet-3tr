import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";

import "../LoginPage/LoginPage.css";
import { getCart } from "../../Redux/cartSlice";
import IconPassword from "../../assets/Icon-password.svg";

import { registerUser } from "../../Redux/authSlice";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "الاسم مطلوب")
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),

  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),

  phone: z
    .string()
    .trim()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^\+?\d{9,15}$/, "رقم الهاتف غير صحيح"),

  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

export default function RegisterForm({
  onClose = () => {},
  onSwitchToLogin = () => {},
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        })
      ).unwrap();

      // لو الباك إند رجّع توكن يبقى اليوزر دخل تلقائي
      if (result?.token) {
        dispatch(getCart());
        onClose();
      } else {
        // غير كده نوديه لصفحة تسجيل الدخول
        onSwitchToLogin();
      }
    } catch (err) {
      setApiError(typeof err === "string" ? err : "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
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

      <h1 className="login-title">إنشاء حساب جديد</h1>

      <p className="login-subtitle">أنشئ حسابك للمتابعة</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="field">
          <label htmlFor="register-name" className="field-label">
            الاسم
          </label>

          <input
            id="register-name"
            type="text"
            className={`text-input${errors.name ? " is-invalid" : ""}`}
            placeholder="أدخل اسمك"
            aria-invalid={!!errors.name}
            {...register("name")}
          />

          {errors.name && (
            <p className="field-error" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="field">
          <label htmlFor="register-email" className="field-label">
            بريد إلكتروني
          </label>

          <input
            id="register-email"
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

        {/* Phone */}
        <div className="field">
          <label htmlFor="register-phone" className="field-label">
            رقم الهاتف
          </label>

          <input
            id="register-phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            style={{ textAlign: "right" }}
            className={`text-input${errors.phone ? " is-invalid" : ""}`}
            placeholder="05xxxxxxxx"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />

          {errors.phone && (
            <p className="field-error" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="field">
          <label htmlFor="register-password" className="field-label">
            كلمة المرور
          </label>

          <div className="password-wrap">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              className={`text-input${errors.password ? " is-invalid" : ""}`}
              placeholder="أدخل كلمة المرور"
              aria-invalid={!!errors.password}
              {...register("password")}
            />

            <button
              type="button"
              className="toggle-eye"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
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

        {/* API Error */}
        {apiError && (
          <p className="field-error login-api-error" role="alert">
            {apiError}
          </p>
        )}

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>

      <p className="footer-text">
        لديك حساب بالفعل؟{" "}
        <button
          type="button"
          className="footer-link"
          onClick={onSwitchToLogin}
        >
          سجل الدخول
        </button>
      </p>
    </div>
  );
}