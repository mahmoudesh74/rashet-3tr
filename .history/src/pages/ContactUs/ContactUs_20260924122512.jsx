import "./contactUs.css";
import { useState } from "react";
import locationIcon from "../../assets/locationIcon.svg";
import phoneIcon from "../../assets/phoneIcon.svg";
import mailIcon from "../../assets/mailIcon.svg";
import instagramIcon from "../../assets/instagramIcon.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import mastercardIcon from "../../assets/mastercardIcon.svg";
import applePayIcon from "../../assets/applePayIcon.svg";
import mada from "../../assets/mada.svg";
import visaIcon from "../../assets/visaIcon.svg";
import contactSideImg from "../../assets/contactSideImg.png";
import logo from "../../assets/logo.svg";

const topicsOptions = [
  { id: "privacy", label: "استفسار حول الخصوصية" },
  { id: "replace", label: "استفسار حول الاستبدال والاسترجاع" },
  { id: "general", label: "استفسار عام" },
];

const quickLinks = [
  "الرئيسية",
  "أحدث المقالات",
  "المجموعات",
  "الأكثر مبيعاً",
  "عن رشة عطر",
  "تواصل معنا",
];

const helpfulLinks = ["سياسة الاستبدال والاسترجاع", "سياسة الخصوصية"];

export default function ContactUs() {
  const [topic, setTopic] = useState("general");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: ربط الفورم بالـ API
  };

  return (
    <div className="contactUsPage">
      {/* الهيرو */}
      <div className="contactHero">
        <h1>تواصل معنا !</h1>
        <p>هل لديك أي أسئلة أو ملاحظات؟ ما عليك سوى مراسلتنا!</p>
      </div>

      {/* الفورم + معلومات الاتصال */}
      <div className="contactCard">
        <form className="contactForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label>الاسم الأول</label>
              <input type="text" placeholder="الاسم الكامل" />
            </div>
            <div className="formField">
              <label>اسم العائلة</label>
              <input type="text" />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>البريد الإلكتروني</label>
              <div className="inputWithIcon">
                <input type="email" placeholder="example@domain.com" />
                <img src={mailIcon} alt="" />
              </div>
            </div>
            <div className="formField">
              <label>رقم الجوال</label>
              <div className="phoneField">
                <span className="countryCode">+966</span>
                <input type="tel" placeholder="5X XXX XXXX" />
              </div>
            </div>
          </div>

          <div className="formField">
            <label>رسالة</label>
            <textarea placeholder="اكتب رسالتك.." rows={5} />
          </div>

          <div className="formField">
            <label>اختر الموضوع؟</label>
            <div className="topicsRow">
              {topicsOptions.map((option) => (
                <label className="topicOption" key={option.id}>
                  {option.label}
                  <input
                    type="checkbox"
                    checked={topic === option.id}
                    onChange={() => setTopic(option.id)}
                  />
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submitButton">
            إرسال رسالة
          </button>
        </form>

        <div className="contactInfoPanel">
          <h2>معلومات الاتصال</h2>
          <p>قل شيئًا لبدء محادثة مباشرة!</p>

          <ul className="contactInfoList">
            <li>
              <span>+966506540920</span>
              <img src={phoneIcon} alt="" />
            </li>
            <li>
              <span>RashatEtr@gmail.com</span>
              <img src={mailIcon} alt="" />
            </li>
            <li>
              <span>الرياض - المملكة العربية السعودية</span>
              <img src={locationIcon} alt="" />
            </li>
          </ul>

          <img src={contactSideImg} alt="" className="contactInfoImg" />

          <div className="contactSocials">
            <a href="#" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
            <a href="#" aria-label="Whatsapp">
              <img src={whatsappIcon} alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <footer className="contactFooter">
        <div className="footerColumn footerBrand">
          <img src={logo} alt="رشة عطر" className="footerLogo" />
          <p>
            في رشة عطر، نقدم تجربة عطرية تجمع بين الفخامة والأناقة، لتجد العطر
            الذي يعبر عن شخصيتك.
          </p>
        </div>

        <div className="footerColumn">
          <h3>روابط سريعة</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="footerColumn">
          <h3>روابط تهمك</h3>
          <ul>
            {helpfulLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="footerColumn">
          <h3>تواصل معنا</h3>
          <ul className="footerContactList">
            <li>
              <span>الرياض - المملكة العربية السعودية</span>
              <img src={locationIcon} alt="" />
            </li>
            <li>
              <span>+966506540920</span>
              <img src={phoneIcon} alt="" />
            </li>
            <li>
              <span>RashatEtr@gmail.com</span>
              <img src={mailIcon} alt="" />
            </li>
          </ul>
          <div className="paymentIcons">
            <img src={mada} alt="مدى" />
            <img src={applePayIcon} alt="Apple Pay" />
            <img src={mastercardIcon} alt="Mastercard" />
            <img src={visaIcon} alt="Visa" />
          </div>
        </div>
      </footer>

      <div className="footerBottom">
        <p>Copyright 2026 | جميع الحقوق محفوظة</p>
      </div>
    </div>
  );
}
