
import "./Footer.css";

import Logo from "../../assets/logo-rashet-3tr.png";
import location from "../../assets/locationIcon.svg";
import phone from "../../assets/phone.svg";
import email from "../../assets/email.svg";

import payImg1 from "../../assets/payImg1.svg";
import payImg2 from "../../assets/payImg2.svg";
import payImg3 from "../../assets/payImg3.svg";
import payImg4 from "../../assets/payImg4.svg";
import payImg5 from "../../assets/payImg5.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";

const QUICK_LINKS = [
  { label: "الرئيسيه", to: "/" },
  { label: "احدث المقالات", section: "articles" },
  { label: "المجموعات", section: "groups" },
  { label: "الاكثر مبيعا", section: "bestSeller" },
  { label: "عن رشه عطر", to: "/AboutRashetEtr" },
  { label: "تواصل معنا", section: "contactUs" },
];

const USEFUL_LINKS = [
  { label: "سياسة الاستبدال والاسترجاع", to: "/return-policy" },
  { label: "سياسة الخصوصية", to: "/privacy-policy" },
];

export default function Footer() {
  const navigate = useNavigate();
  const locationPath = useLocation();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    // لو إحنا في الـ Home
    if (locationPath.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // لو في صفحة تانية، ارجع للـ Home
      navigate(`/?scroll=${sectionId}`);
    }
  };

  return (
    <footer className="Footer">
      <div className="container">
        <div className="row">

          {/* Logo */}
          <div className="LogoContainer col-3">
            <img src={Logo} alt="رشة عطر" />

            <p>
              في رشة عطر، نقدم تجربة عطرية تجمع بين الفخامة والأناقة،
              لتجد العطر الذي يعبر عن شخصيتك.
            </p>
          </div>

          {/* Quick Links */}
          <div className="LinksContainer col-3">
            <h3>روابط سريعه</h3>

            {QUICK_LINKS.map((link) => (
              <div className="linkItem" key={link.label}>

                {link.section ? (
                  <Link
                    to={`#${link.section}`}
                    onClick={(e) =>
                      handleSectionClick(e, link.section)
                    }
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link to={link.to}>
                    {link.label}
                  </Link>
                )}

                <span className="FooterLine"></span>
              </div>
            ))}
          </div>

          {/* Useful Links */}
          <div className="ownLinks col-3">
            <h3>روابط تهمك</h3>

            {USEFUL_LINKS.map((link) => (
              <div className="linkItem" key={link.label}>
                <Link to={link.to}>
                  {link.label}
                </Link>

                <span className="FooterLine"></span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="contactWithUs col-3">
            <h3>تواصل معنا</h3>

            <div className="location">
              <div className="locationIcon">
                <img src={location} alt="الموقع" />
              </div>

              <div className="locationText">
                الرياض - المملكة العربية السعودية
              </div>
            </div>

            <div className="location">
              <div className="phoneIcon">
                <img src={phone} alt="الهاتف" />
              </div>

              <div className="locationText">
                +966506540920
              </div>
            </div>

            <div className="location">
              <div className="locationIcon">
                <img src={email} alt="البريد الإلكتروني" />
              </div>

              <div className="locationText">
                RashatEtr@gmail.com
              </div>
            </div>

            {/* Payment */}
            <div className="payed">
              <p>نحن نقبل</p>

              <div className="payrow">
                <img src={payImg1} alt="" />
                <img src={payImg2} alt="" />
                <img src={payImg3} alt="" />
                <img src={payImg4} alt="" />
                <img src={payImg5} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="makeby">
          <p>صنع بإتقان على</p>

          <span>|</span>

          <p>
            <a href="" style={{ color: "#6B6764" }}>
              Growfet
            </a>{" "}
            2026
          </p>
        </div>
      </div>
    </footer>
  );
}




