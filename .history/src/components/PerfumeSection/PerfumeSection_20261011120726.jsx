import { useEffect, useMemo } from "react";
import "./PerfumeSection.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import arrowLeft from "../../assets/arrowLeft.svg";
import Rating from "../../assets/rating.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import rialsaody from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import AddToCartButton from "../AddToCartButton/AddToCartButton";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import { getProducts } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/wishlistSlice";

function getWishlistProductId(item) {
  return item?.product_id ?? item?.product?.id;
}

function getProductCategory(product) {
  return (
    product.category ||
    product.categories?.[0]?.name_ar ||
    "غير مصنف"
  );
}

function getProductImage(product) {
  return (
    product.image ||
    product.images?.find((image) => image?.url)?.url ||
    ""
  );
}

function getProductName(product) {
  return (
    product.name_ar ||
    product.name ||
    product.name_en ||
    "منتج"
  );
}

function PerfumeCard({
  product,
  onToggleFavorite,
  onAddToCart,
}) {
  return (
    <div className="perfume-card">
      <FavoriteButton
        className="fav-btn"
        isFavorite={Boolean(product.favorite)}
        onClick={() => onToggleFavorite(product.id)}
      />

      <Link
        to={`/PerfumeDetails/${product.id}`}
        className="perfume-card__image"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </Link>

      <div className="perfumecontent">
        <Link
          to={`/PerfumeDetails/${product.id}`}
          className="perfume-card__name"
        >
          <h3> {product.name_en}|{product.name}</h3>
        </Link>

        {product.rating ? (
          <div className="perfume-card__rating">
            <img src={Rating} alt="Rating" />
            <span>({product.rating})</span>
          </div>
        ) : null}
      </div>

      <p className="perfume-card__category">
        {product.category}
      </p>

      <div className="perfume-card__price">
        <span className="price-new">
          {product.price}
          <img src={rialsaody} alt="" />
        </span>

        {product.oldPrice > product.price && (
          <span className="price-old">
            {/* {product.oldPrice} */}
            <img src={rialSale} alt="" />
          </span>
        )}
      </div>

      <AddToCartButton
        icon={shopping}
        onClick={() => onAddToCart(product.id)}
      />
    </div>
  );
}

export default function PerfumeSection({
  title = "العطور",
  products: productsProp,
  onAddToCart,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products: apiProducts,
    loading,
  } = useSelector((state) => state.products);

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items ?? []
  );

  // =========================
  // GET PRODUCTS + WISHLIST
  // =========================
  useEffect(() => {
    if (!apiProducts.length) {
      dispatch(getProducts());
    }
  }, [dispatch, apiProducts.length]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getWishlist());
    }
  }, [dispatch]);

  // =========================
  // WISHLIST PRODUCT IDS
  // =========================
  const favoriteProductIds = useMemo(() => {
    return new Set(
      wishlistItems
        .map(getWishlistProductId)
        .filter((id) => id !== undefined && id !== null)
        .map(Number)
    );
  }, [wishlistItems]);

  // =========================
  // FORMATTED PRODUCTS (مع حالة المفضلة)
  // =========================
  const items = useMemo(() => {
    const sourceProducts = productsProp?.length
      ? productsProp
      : apiProducts;

    return sourceProducts.map((product) => ({
      id: product.id,

      image: getProductImage(product),

      name: getProductName(product),
      name_en: product.name_en || product.name || "",
      category: getProductCategory(product),

      price: Number(product.price || 0),

      oldPrice: Number(product.original_price || 0),

      favorite: favoriteProductIds.has(Number(product.id)),

      rating: product.rating || null,
    }));
  }, [productsProp, apiProducts, favoriteProductIds]);

  // =========================
  // TOGGLE FAVORITE
  // =========================
  const handleToggleFavorite = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const isFavorite = favoriteProductIds.has(Number(id));

    try {
      if (isFavorite) {
        await dispatch(removeFromWishlist(id)).unwrap();
      } else {
        await dispatch(addToWishlist(id)).unwrap();
      }
    } catch (wishlistError) {
      console.error("Wishlist error:", wishlistError);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
const handleAddToCart = (id) => {
  const token = localStorage.getItem("token");

  // لو مش مسجل دخول: وجّهه للّوجن ومتضيفش
  if (!token) {
    navigate("/login");
    return;
  }

  if (onAddToCart) {
    onAddToCart(id);
    return;
  }

  dispatch(
    addToCart({
      product_id: id,
      size: "100ml",
      quantity: 1,
    })
  );
};
  if (loading && !items.length) {
    return (
      <section id="perfumes" className="perfume-section">
        <div className="perfumeSectionHead">
          <div className="perfumeSectionHeaditem">
            <h2>{title}</h2>
            <span className="PerfumeHeaderLine"></span>
          </div>

          <Link
            to="/PerfumePage"
            className="PerfumeSectionButton"
          >
            <p>عرض الكل</p>

            <div>
              <img src={arrowLeft} alt="arrowLeft" />
            </div>
          </Link>
        </div>

        <div className="perfume-grid">
          <p>جاري تحميل المنتجات...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="perfumes" className="perfume-section">
      <div className="perfumeSectionHead">
        <div className="perfumeSectionHeaditem">
          <h2>{title}</h2>
          <span className="PerfumeHeaderLine"></span>
        </div>

        <Link
          to="/PerfumePage"
          className="PerfumeSectionButton"
          style={{ cursor: "pointer" }}
        >
          <p>عرض الكل</p>

          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </Link>
      </div>

      <div className="perfume-grid">
        {items.slice(0, 4).map((product) => (
          <PerfumeCard
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}