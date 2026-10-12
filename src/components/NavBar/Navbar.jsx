import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NavBar.module.css";

import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/user.svg";
import profileLoggedIcon from "../../assets/circle-user-regular-full.svg";
import cartIcon from "../../assets/cart.svg";
import favoriteIcon from "../../assets/heart.svg";

import Modal from "../../components/Model/Modal";
import LoginForm from "../../pages/LoginPage/LoginPage";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import WishlistDrawer from "../../components/WishlistDrawer/WishlistDrawer";

import { clearWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice";

import { getCart, updateCartItem, deleteCartItem } from "../../Redux/cartSlice";

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
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // AUTH
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // CART
  const {
    items: cartItems,
    items_count: cartItemsCount,
    total: cartTotal,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  // WISHLIST
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);

  const wishlistLoading = useSelector(
    (state) => state.wishlist?.loading ?? false,
  );

  const wishlistCount = wishlistItems.length;

  // GET CART
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [isAuthenticated, dispatch]);

  // SECTION NAVIGATION
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        navigate(`/?scroll=${sectionId}`);
      }
    } else {
      navigate(`/?scroll=${sectionId}`);
    }
  };

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    navigate(`/?search=${encodeURIComponent(query)}#perfumes`);

    setIsSearchOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  // PROFILE
  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen((prev) => !prev);
    } else {
      setIsLoginOpen(true);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWishlist());

    setIsProfileOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  };



  // CART QUANTITY
  const handleIncrease = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    dispatch(
      updateCartItem({
        id: item.id,
        quantity: item.qty + 1,
      }),
    );
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    if (item.qty === 1) {
      dispatch(deleteCartItem(item.id));
      return;
    }

    dispatch(
      updateCartItem({
        id: item.id,
        quantity: item.qty - 1,
      }),
    );
  };

  // REMOVE FROM WISHLIST
  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      <nav dir="rtl" className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" aria-label="الصفحة الرئيسية">
            <img src={LogoImage} alt="رشة عطر" className={styles.logoImage} />
          </Link>

          {/* Links */}
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                {link.section ? (
                  <Link
                    to={`/#${link.section}`}
                    onClick={(e) => handleSectionClick(e, link.section)}
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className={styles.icons}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <button
                type="button"
                className={styles.search}
                onClick={() => setIsSearchOpen((prev) => !prev)}
                aria-label="فتح البحث"
                aria-expanded={isSearchOpen}
              >
                <img src={SearchIcon} alt="" />
              </button>

              {isSearchOpen && (
                <form className={styles.searchForm} onSubmit={handleSearch}>
                  <input
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="ابحث عن عطر..."
                    aria-label="ابحث عن عطر"
                    autoFocus
                  />

                  <button type="submit">بحث</button>

                  <button
                    type="button"
                    className={styles.closeSearch}
                    onClick={handleCloseSearch}
                    aria-label="إغلاق البحث"
                  >
                    ×
                  </button>
                </form>
              )}
            </div>

            {/* Profile */}
            <div className={styles.profileWrapper}>
              <div
                className={styles.profile}
                onClick={handleProfileClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleProfileClick();
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={isAuthenticated ? profileLoggedIcon : profileIcon}
                  alt="مستخدم"
                />
              </div>

              {/* Profile Dropdown */}
              {isAuthenticated && isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.profileInfo}>
                    <h3>{user?.name || "المستخدم"}</h3>
                    <p>{user?.email || ""}</p>
                  </div>

                 

                  <div className={styles.dropdownDivider} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              className={styles.cart}
              onClick={() => setIsCartOpen(true)}
              role="button"
              tabIndex={0}
              aria-label={`سلة المشتريات، ${cartItemsCount || 0} منتجات`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsCartOpen(true);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={cartIcon} alt="سلة المشتريات" />

              <span className={styles.cartCount}>{cartItemsCount || 0}</span>
            </div>

            {/* Wishlist */}
            <div
              className={styles.wishlist}
              onClick={() => setIsWishlistOpen(true)}
              role="button"
              tabIndex={0}
              aria-label={`المفضلة، ${wishlistCount} منتجات`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsWishlistOpen(true);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={favoriteIcon} alt="المفضلة" />

              {wishlistCount > 0 && (
                <span className={styles.wishlistCount}>{wishlistCount}</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onClose={() => setIsLoginOpen(false)} />
      </Modal>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        itemsCount={cartItemsCount}
        total={cartTotal}
        loading={cartLoading}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onCheckout={() => setIsCartOpen(false)}
        onViewCart={() => {
          setIsCartOpen(false);
          navigate("/ShoppingBasket");
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        loading={wishlistLoading}
        onRemove={handleRemoveFromWishlist}
      />
    </>
  );
}
