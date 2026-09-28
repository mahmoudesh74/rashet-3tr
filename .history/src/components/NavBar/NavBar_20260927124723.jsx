import { useState } from "react";
import styles from "./NavBar.module.css";
import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart.svg";
import Modal from "../../components/Model/Modal";
import LoginForm from "../../pages/LoginPage/LoginPage";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tomford from "../../assets/tomford.png"

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
    image: "",
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

  return (
    <>
      <nav dir="rtl" className={styles.navbar}>
        <div className={styles.container}>

          <img
            src={LogoImage}
            alt="LogoImage"
            className={styles.logoImage}
          />

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

          </div>
        </div>
      </nav>

      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      >
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