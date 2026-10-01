import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart.svg";
import Modal from "../../components/Model/Modal";
import LoginForm from "../../pages/LoginPage/LoginPage";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tomford from "../../assets/tomford.png";
import backarat from "../../assets/backarat.png";

const INITIAL_CART_ITEMS = [
  {
    id: "tom-ford-oud",
    name: "Tom Ford | عطر توم فورد",
    size: "50 مل",
    price: 450,
    qty: 1,
    image: tomford,
  },
  {
    id: "baccarat",
    name: "Baccarat | عطر بكرات روج",
    size: "100 مل",
    price: 450,
    qty: 1,
    image: backarat,
  },
];

const links = [
  { label: "الرئيسية", to: "/" },
  { label: "المجموعه", section: "groups" },
  { label: "عن رشة عطر", to: "/AboutRashetEtr" },
  { label: "الاكثر مبيعا", section: "bestSeller" },
  { label: "العطور", section: "perfumes" },
  { label: "المقالات", section: "articles" },
  { label: "تواصل معنا", to: "/ContactUs" },
];

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  const navigate = useNavigate();
  const location = useLocation();

  // close the mobile menu with the Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(`/?scroll=${sectionId}`);
    }
  };

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  // one place that renders a link, used by both the desktop and the mobile list
  const renderLink = (link, className) =>
    link.section ? (
      <Link
        to={`/#${link.section}`}
        onClick={(e) => {
          handleSectionClick(e, link.section);
          setIsMenuOpen(false);
        }}
        className={className}
      >
        {link.label}
      </Link>
    ) : (
      <Link
        to={link.to}
        onClick={() => setIsMenuOpen(false)}
        className={className}
      >
        {link.label}
      </Link>
    );

  return (
    <>
      <nav dir="rtl" className={styles.navbar}>
        <div className={styles.container}>
          <img src={LogoImage} alt="LogoImage" className={styles.logoImage} />

          {/* Desktop links */}
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>{renderLink(link, styles.link)}</li>
            ))}
          </ul>

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

            <div
              className={styles.cart}
              onClick={() => setIsCartOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={cartIcon} alt="سلة" />
              <span className={styles.cartCount}>{cartItems.length}</span>
            </div>

            {/* Hamburger: only visible on small screens */}
            <button
              type="button"
              className={`${styles.menuBtn}${isMenuOpen ? ` ${styles.menuBtnOpen}` : ""}`}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <ul
          id="mobile-menu"
          className={`${styles.mobileMenu}${isMenuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        >
          {links.map((link) => (
            <li key={link.label}>{renderLink(link, styles.mobileLink)}</li>
          ))}
        </ul>
      </nav>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onClose={() => setIsLoginOpen(false)} />
      </Modal>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onCheckout={() => {
          setIsCartOpen(false);
        }}
        onViewCart={() => {
          setIsCartOpen(false);
          navigate("/cart");
        }}
      />
    </>
  );
}