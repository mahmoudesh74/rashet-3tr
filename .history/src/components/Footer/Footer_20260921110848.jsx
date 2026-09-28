import "./Footer.css";
import Logo from "../../assets/logo-rashet-3tr.png";

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
        <a href="#"> الرئيسيه</a>
        <a href="#"> احدث المقالات</a>
        <a href="#"> المجموعات</a>
        
 <a href="#"> الاكثر مبيعا</a>
        <a href="#">  عن رشه عطر </a>
        <a href="#"> تواصل معنا</a>
          </div>
          <div className="ownLinks col-3">
            روابط تهمك

          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
