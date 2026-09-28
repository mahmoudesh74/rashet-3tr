import { useState } from "react";
import "./PerfumeSection.css";
import { Link} from "react-router-dom";
import loris from "../../assets/perfume1.png";
import libre from "../../assets/perfume2.png";
import baccarat from "../../assets/perfume3.png";
import tomford from "../../assets/perfume4.png";
import arrowLeft from "../../assets/arrowLeft.svg";
import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";
import Rating from "../../assets/rating.svg";
import shopping from "../../assets/shopping-cart-02.svg";
import rialsaody from "../../assets/saudi-riyal.svg"
import rialSale from "../../assets/rialSale.svg"
const DEFAULT_PRODUCTS = [
  {
    id: "tom-ford-oud-wood",
    image: tomford,
    name: "Tom ford |عطر توم فود",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
  {
    id: "baccarat-rouge-540",
    image: baccarat,
    name: "Baccarat | عطر بكرات",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
  {
    id: "ysl-libre",
    image: libre,
    name: "Libre | عطر ليبرا",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: false,
  },
  {
    id: "loris-bronze-wood",
    image: loris,
    name: "Loris | عطر لوريس",
    category: "عطور رجالية",
    rating: 4.8,
    oldPrice: 600,
    price: 450,
    favorite: true,
  },
];

function PerfumeCard({ product, onToggleFavorite, onAddToCart }) {
  return (
    <div  className="perfume-card">
      <button
        type="button"
        className={`fav-btn${product.favorite ? " is-active" : ""}`}
        aria-label={product.favorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
        onClick={() => onToggleFavorite(product.id)}
      >
        <img src={product.favorite ? favoriteHeart : heart} alt="" />
      </button>

      <div className="perfume-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="perfumecontent">
        <h3 className="perfume-card__name">{product.name}</h3>

        <div className="perfume-card__rating">
          <img src={Rating} alt="Rating" />
          <span>({product.rating})</span>
        </div>
      </div>
      <p className="perfume-card__category">{product.category}</p>

      <div className="perfume-card__price">
        <span className="price-new">{product.price}<img src={rialsaody} alt="" /></span>

        <span className="price-old"><img src={rialSale} alt="" /></span>
      </div>

      <button
        type="button"
        className="perfume-add-btn"
        onClick={() => onAddToCart(product.id)}
      >
        <div className="perfumecartImg">
          
          <img src={shopping} alt="shopping" />
        </div>
        <span>أضف إلى السلة</span>
      </button>
    </div>
  );
}

export default function PerfumeSection({
  title = "العطور",

  products = DEFAULT_PRODUCTS,
  onAddToCart = () => {},
}) {
  const [items, setItems] = useState(products);
 

  const handleToggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    );
  };

  return (
    <section id="perfumes" className="perfume-section ">
      <div className="perfumeSectionHead">
        <div className="perfumeSectionHeaditem" >
          <h2>{title}</h2>
          <span className="PerfumeHeaderLine"></span>
        </div>

        <Link to="/PerfumePage"  className="PerfumeSectionButton" style={{ cursor: "pointer" }} >
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </Link>
      </div>

      <div className="perfume-grid">
        {items.map((product) => (
          <PerfumeCard
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
