import "./Footer.css";
import Logo from "../../assets/logo-rashet-3tr.png";
import Link from "react"
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
            <Link></Link>

          </div>
          <div className="col-3"></div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
