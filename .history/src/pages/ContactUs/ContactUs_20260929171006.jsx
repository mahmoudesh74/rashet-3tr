import "./contactUs.css";
import { useState } from "react";
import locationIcon from "../../assets/locationIcon.svg";
import phoneIcon from "../../assets/phone.svg";
import mailIcon from "../../assets/e-mailIcon.svg";
import mailFormIcon from "../../assets/mail.svg";
import instagramIcon from "../../assets/instgram.svg";
import whatsappIcon from "../../assets/whatsapp.svg";
import contactSideImg from "../../assets/Ellipse 794.png";
import contactSideImg1 from "../../assets/Ellipse 793.png";

const topicsOptions = [
  { id: "privacy", label: "استفسار حول الخصوصية" },
  { id: "replace", label: "استفسار حول الاستبدال والاسترجاع" },
  { id: "general", label: "استفسار عام" },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  topic: "general",
};

export default function ContactUs() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // رقم الجوال: أرقام فقط وبحد أقصى 9
    const next = name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSent(false);
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "الاسم الأول مطلوب";
    if (!form.lastName.trim()) next.lastName = "اسم العائلة مطلوب";
    if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "البريد الإلكتروني غير صحيح";
    if (!form.phone) next.phone = "رقم الجوال مطلوب";
    else if (!/^5\d{8}$/.test(form.phone))
      next.phone = "رقم الجوال غير صحيح (يبدأ بـ 5 ويتكون من 9 أرقام)";
    if (!form.message.trim()) next.message = "الرسالة مطلوبة";
    else if (form.message.trim().length < 10)
      next.message = "الرسالة قصيرة جداً (10 أحرف على الأقل)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(form); // TODO: ابعت البيانات للـ API هنا
    setForm(INITIAL_FORM);
    setSent(true);
  };

  return (
    <div className="contactUsPage">
      <div className="contactHero">
        <h1>تواصل معنا !</h1>
        <p>هل لديك أي أسئلة أو ملاحظات؟ ما عليك سوى مراسلتنا!</p>
      </div>

      <div className="contactCard">
        <div className="contactInfoPanel">
          <h2>معلومات الاتصال</h2>
          <p>قل شيئًا لبدء محادثة مباشرة!</p>

          <ul className="contactInfoList">
            <li>
              <div className="contactInfoListIcon">
                <img src={phoneIcon} alt="" />
              </div>
              <span>+966506540920</span>
            </li>
            <li>
              <div className="contactInfoListIcon">
                <img src={mailIcon} alt="" />
              </div>
              <span>RashatEtr@gmail.com</span>
            </li>
            <li>
              <div className="contactInfoListIcon">
                <img src={locationIcon} alt="" />
              </div>
              <span>الرياض - المملكة العربية السعودية</span>
            </li>
          </ul>

          <img src={contactSideImg} alt="" className="contactInfoImg" />
          <img src={contactSideImg1} alt="" className="contactInfoImg1" />

          <div className="contactSocials">
            <a href="#" aria-label="Whatsapp">
              <img src={whatsappIcon} alt="" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
          </div>
        </div>

        <form className="contactForm" onSubmit={handleSubmit} noValidate>
          <div className="formRow">
            <div className={`formField${errors.firstName ? " formField--error" : ""}`}>
              <label htmlFor="firstName">الاسم الأول</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="الاسم الأول"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="formError">{errors.firstName}</p>}
            </div>
            <div className={`formField${errors.lastName ? " formField--error" : ""}`}>
              <label htmlFor="lastName">اسم العائلة</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="اسم العائلة"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="formError">{errors.lastName}</p>}
            </div>
          </div>

          <div className="formRow">
            <div className={`formField${errors.email ? " formField--error" : ""}`}>
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="inputWithIcon">
                <img src={mailFormIcon} alt="" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="formError">{errors.email}</p>}
            </div>
            <div className={`formField${errors.phone ? " formField--error" : ""}`}>
              <label htmlFor="phone">رقم الجوال</label>
              <div className="phoneField">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="5X XXX XXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
                <span className="countryCode">+966</span>
              </div>
              {errors.phone && <p className="formError">{errors.phone}</p>}
            </div>
          </div>

          <div className={`formField${errors.message ? " formField--error" : ""}`}>
            <label htmlFor="message">رسالة</label>
            <textarea
              id="message"
              name="message"
              placeholder="اكتب رسالتك.."
              rows={2}
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <p className="formError">{errors.message}</p>}
          </div>

          <div className="formField">
            <label className="formFieldTitle">اختر الموضوع؟</label>
            <div className="topicsRow">
              {topicsOptions.map((option) => (
                <label className="topicOption" key={option.id}>
                  <input
                    type="checkbox"
                    checked={form.topic === option.id}
                    onChange={() => setForm((prev) => ({ ...prev, topic: option.id }))}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submitButton">
            إرسال رسالة
          </button>

          {sent && (
            <p className="formSuccess" role="status">
              تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}