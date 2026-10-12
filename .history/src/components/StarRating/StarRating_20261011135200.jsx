import { useState } from "react";
import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";
import "./StarRating.css";

export default function StarRating({ rating, onRate }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  const initial = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

  // الأولوية: hover ← اختيار المستخدم ← تقييم المنتج الأصلي
  const active = hovered || selected || initial;

  const handleClick = (value) => {
    // الضغط على نفس النجمة تاني يلغي التقييم
    const next = selected === value ? 0 : value;
    setSelected(next);
    onRate?.(next);
  };

  return (
    <div
      className="catalog-stars"
      role="radiogroup"
      aria-label="التقييم"
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className="star-btn"
          role="radio"
          aria-checked={selected === value}
          aria-label={`${value} من 5`}
          onMouseEnter={() => setHovered(value)}
          onClick={() => handleClick(value)}
        >
          <img
            src={value <= active ? star : emptyStartIcon}
            alt=""
            className="star"
          />
        </button>
      ))}
    </div>
  );
}