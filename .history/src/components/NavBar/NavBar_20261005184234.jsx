import { useState } from "react";
import {  useSelector } from "react-redux";
import styles from "./NavBar.module.css";

import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart.svg";
import profileLoggedIcon from "../../assets/abdalla.jpg";

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
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  const navigate = useNavigate();
  const location = useLocation();
 

  
  const { isAuthenticated} = useSelector(
    (state) => state.auth
  );

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
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // الضغط على أيقونة البروفايل
  const handleProfileClick = () => {
    if (isAuthenticated) {
      // لو مسجل دخول
      navigate("/profile");
    } else {
      // لو مش مسجل دخول
      setIsLoginOpen(true);
    }
  };

 

  return (
    <>
      <nav dir="rtl" className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo */}
          <img
            src={LogoImage}
            alt="LogoImage"
            className={styles.logoImage}
          />

          {/* Links */}
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                {link.section ? (
                  <Link
                    to={`/#${link.section}`}
                    onClick={(e) =>
                      handleSectionClick(e, link.section)
                    }
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    to={link.to}
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className={styles.icons}>
            {/* Search */}
            <div className={styles.search}>
              <img src={SearchIcon} alt="بحث" />
            </div>

            {/* Profile */}
            <div
              className={styles.profile}
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  isAuthenticated
                    ? profileLoggedIcon
                    : profileIcon
                }
                alt="مستخدم"
              />
            </div>

            {/* Cart */}
            <div
              className={styles.cart}
              onClick={() => setIsCartOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={cartIcon} alt="سلة" />

              <span className={styles.cartCount}>
                {cartItems.length}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      >
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
        />
      </Modal>

      {/* Cart */}
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