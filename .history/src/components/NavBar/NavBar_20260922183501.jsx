import { useState } from "react";
import styles from "./NavBar.module.css";
import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart.svg";
import Modal from "../../components/Model/Modal";
import LoginForm from "../../pages/LoginPage/LoginPage";
import { Link } from "react-router-dom";
const links = [
  { label: "الرئيسية", to: "#", active: true },
  { label: "المجموعه  ", to: "#groups" },
  { label: "عن رشة عطر", to: "/AboutRashetEtr"},
  { label: "الاكثر مبيعا", to: "#" },
  { label: "العطور", to: "/" },
  { label: "المقالات", to: "#" },
  { label: "تواصل معنا", to: "#" },
];

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav dir="rtl" className={styles.navbar}>
        <div className={styles.container}>
          <img src={LogoImage} alt="LogoImage" className={styles.logoImage} />

          {/* Links */}
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`${styles.link} ${link.active ? styles.linkActive : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className={styles.icons}>
            <div className={styles.search}>
              <img src={SearchIcon} alt="بحث" />
            </div>

           
            <div
              className={styles.profile}
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={profileIcon} alt="مستخدم" />
            </div>

            <div className={styles.cart}>
              <img src={cartIcon} alt="سلة" />
              <span className={styles.cartCount}>0</span>
            </div>
          </div>
        </div>
      </nav>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onClose={() => setIsLoginOpen(false)} />
      </Modal>
    </>
  );
}
