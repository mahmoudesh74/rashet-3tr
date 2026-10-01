import "./AddToCartButton.css";

export default function AddToCartButton({
  text = "أضف إلى السلة",
  icon,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`custom-btn ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className="custom-btn-icon">
          <img src={icon} alt="" />
        </div>
      )}

      {text && <span>{text}</span>}
    </button>
  );
}
