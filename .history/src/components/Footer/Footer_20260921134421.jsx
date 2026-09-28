import "./Footer.css";
import Logo from "../../assets/logo-rashet-3tr.png";
import location from "../../assets/locationIcon.svg";
import phone from "../../assets/phone.svg";
import email from "../../assets/email.svg";

const QUICK_LINKS = [
  "الرئيسيه",
  "احدث المقالات",
  "المجموعات",
  "الاكثر مبيعا",
  "عن رشه عطر",
  "تواصل معنا",
];

const USEFUL_LINKS = ["سياسة الاستبدال والاسترجاع", "سياسة الخصوصية"];

export default function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <div className="row">
          <div className="LogoContainer  col-3">
            <img src={Logo} alt="" />
            <p>
              في رشة عطر، نقدم تجربة عطرية تجمع بين الفخامة والأناقة، لتجد العطر
              الذي يعبر عن شخصيتك.
            </p>
          </div>

          <div className="LinksContainer col-3">
            <h3>روابط سريعه</h3>
            {QUICK_LINKS.map((label) => (
              <div className="linkItem" key={label}>
                <a href="#">{label}</a>
                <span className="FooterLine"></span>
              </div>
            ))}
          </div>

          <div className="ownLinks col-3">
            <h3> روابط تهمك</h3>
            {USEFUL_LINKS.map((label) => (
              <div className="linkItem" key={label}>
                <a href="#">{label}</a>
                <span className="FooterLine"></span>
              </div>
            ))}
          </div>

          <div className="contactWithUs col-3">
            <h3>تواصل معنا</h3>
            <div className="location">
              <div className="locationIcon">
                <img src={location} alt="" />
              </div>
              <div className="locationText">
                الرياض - المملكة العربية السعودية
              </div>
            </div>
            <div className="location">
              <div className="phoneIcon">
                <img src={phone} alt="" />
              </div>
              <div className="locationText">+966506540920</div>
            </div>
            <div className="location">
              <div className="locationIcon">
                <img src={email} alt="" />
              </div>
              <div className="locationText">RashatEtr@gmail.com</div>
            </div>
          </div>
          <div className="payed">
            dsvfrgewdsdf
          </div>
        </div>
        <div className="makeby">
          <p>صنع بإتقان على </p> |{" "}
          <p>
            {" "}
            <a href="" style={{ color: "#6B6764" }}>
              Growfet
            </a>{" "}
            2026
          </p>
        </div>
      </div>
    </div>
  );
}
