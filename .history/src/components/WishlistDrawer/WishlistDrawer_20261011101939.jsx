
import styles from "./WishlistDrawer.module.css";
import { X, Trash2, Heart } from "lucide-react";

export default function WishlistDrawer({
  isOpen,
  onClose,
  items = [],
  loading = false,
  onRemove,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <aside
        className={styles.drawer}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            <Heart size={22} />
            <h2>المفضلة</h2>
            <span>{items.length}</span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="إغلاق المفضلة"
          >
            <X size={22} />
          </button>
        </div>

        {loading ? (
          <div className={styles.message}>
            جاري تحميل المفضلة...
          </div>
        ) : items.length === 0 ? (
          <div className={styles.empty}>
            <Heart size={48} />
            <h3>قائمة المفضلة فارغة</h3>
            <p>
              أضف العطور التي تعجبك لتجدها هنا.
            </p>

            <button
              type="button"
              onClick={onClose}
              className={styles.continueButton}
            >
              متابعة التسوق
            </button>
          </div>
        ) : (
          <div className={styles.items}>
            {items.map((item) => {
              const product = item.product ?? item;
              const productName =
                product.name_ar ??
                product.name ??
                product.title ??
                "عطر";

              const productImage =
                product.image ??
                product.image_url ??
                product.thumbnail;

              const price =
                product.price ??
                product.sale_price;

              return (
                <div
                  className={styles.item}
                  key={item.id ?? product.id}
                >
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={productName}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <Heart size={26} />
                    </div>
                  )}

                  <div className={styles.productInfo}>
                    <h3>{productName}</h3>

                    {price != null && (
                      <p className={styles.price}>
                        {price} ر.س
                      </p>
                    )}

                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => onRemove?.(item.id)}
                      disabled={!onRemove}
                    >
                      <Trash2 size={15} />
                      حذف من المفضلة
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
