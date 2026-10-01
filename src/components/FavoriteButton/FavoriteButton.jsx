
import "./FavoriteButton.css";

import heart from "../../assets/heart.svg";
import favoriteHeart from "../../assets/favoriteHeart.svg";

export default function FavoriteButton({
  isFavorite = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      className={`fav-btn ${isFavorite ? "is-active" : ""} ${className}`}
      aria-label={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
      onClick={onClick}
    >
      <img
        src={isFavorite ? favoriteHeart : heart}
        alt=""
      />
    </button>
  );
}

