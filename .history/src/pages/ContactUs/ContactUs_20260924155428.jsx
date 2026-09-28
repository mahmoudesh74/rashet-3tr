import "./contactUs.css";
import { useState } from "react";
import locationIcon from "../../assets/locationIcon.svg";
import phoneIcon from "../../assets/phone.svg";
import mailIcon from "../../assets/mail.svg";
import instagramIcon from "../../assets/arrow-down.svg";
import whatsappIcon from "../../assets/arrow-right-02.svg";
import contactSideImg from "../../assets/arrowLeft-p-r.svg";


const topicsOptions = [
  { id: "privacy", label: "استفسار حول الخصوصية" },
  { id: "replace", label: "استفسار حول الاستبدال والاسترجاع" },
  { id: "general", label: "استفسار عام" },
];



export default function ContactUs() {
  const [topic, setTopic] = useState("general");

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="contactUsPage">
      
      <div className="contactHero">
        <h1>تواصل معنا !</h1>
        <p>هل لديك أي أسئلة أو ملاحظات؟ ما عليك سوى مراسلتنا!</p>
      </div>

      {/* الفورم + معلومات الاتصال */}
      <div className="contactCard">
          <div className="contactInfoPanel">
          <h2>معلومات الاتصال</h2>
          <p>قل شيئًا لبدء محادثة مباشرة!</p>

          <ul className="contactInfoList">
            <li>
             <div className=" contactInfoListIcon">

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

          <div className="contactSocials">
            <a href="#" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
            <a href="#" aria-label="Whatsapp">
              <img src={whatsappIcon} alt="" />
            </a>
          </div>
        </div>
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

      
      </div>

     
    </div>
  );
}
