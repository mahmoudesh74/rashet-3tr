import { useEffect, useState } from "react";
import "./PerfumeSection.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import arrowLeft from "../../assets/arrowLeft.svg";
import Rating from "../../assets/rating.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import rialsaody from "../../assets/saudi-riyal.svg";
import rialSale from "../../assets/rialSale.svg";

import AddToCartButton from "../AddToCartButton/AddToCartButton";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import { getProducts } from "../../Redux/productsSlice";
import { addToCart } from "../../Redux/cartSlice";

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
        isFavorite={product.favorite}
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
          <h3>{product.name}</h3>
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
            {product.oldPrice}
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

  const {
    products: apiProducts,
    loading,
  } = useSelector((state) => state.products);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!apiProducts.length) {
      dispatch(getProducts());
    }
  }, [dispatch, apiProducts.length]);

  useEffect(() => {
    const sourceProducts =
      productsProp?.length
        ? productsProp
        : apiProducts;

    const formattedProducts = sourceProducts.map((product) => ({
      id: product.id,

      image: getProductImage(product),

      name: getProductName(product),

      category: getProductCategory(product),

      price: Number(product.price || 0),

      oldPrice: Number(product.original_price || 0),

      favorite: false,

      rating: product.rating || null,
    }));

    setItems(formattedProducts);
  }, [productsProp, apiProducts]);

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              favorite: !product.favorite,
            }
          : product
      )
    );
  };

  const handleAddToCart = (id) => {
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