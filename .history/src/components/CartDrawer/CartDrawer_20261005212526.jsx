import styles from "./CartDrawer.module.css";
import rialSaody from "../../assets/saudi-riyal.svg";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  itemsCount = 0,
  total = 0,
  loading = false,
  onIncrease,
  onDecrease,
  onCheckout,
}) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={styles.drawer}>

        {/* Header */}
        <div className={styles.header}>
          <h2>
            سلة التسوق{" "}
            <span className={styles.count}>
              ({itemsCount} منتجات)
            </span>
          </h2>

          <button
            type="button"
            className={styles.close}
            aria-label="إغلاق"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className={styles.itemsList}>

          {loading ? (
            <p className={styles.emptyText}>
              جاري تحميل السلة...
            </p>
          ) : items.length === 0 ? (
            <p className={styles.emptyText}>
              السلة فارغة حالياً
            </p>
          ) : (
            items.map((item) => (
              <div
                className={styles.item}
                key={item.id}
              >

                {/* Image */}
                <div
                  className={
                    styles.itemImageWrap
                  }
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                {/* Info */}
                <div
                  className={styles.itemInfo}
                >

                  <div
                    className={styles.itemTop}
                  >
                    <h3
                      className={
                        styles.itemName
                      }
                    >
                      {item.name}
                    </h3>

                    {item.size && (
                      <span
                        className={
                          styles.itemSize
                        }
                      >
                        {item.size}
                      </span>
                    )}
                  </div>

                  <div
                    className={
                      styles.itemBottom
                    }
                  >

                    {/* Quantity */}
                    <div
                      className={
                        styles.qtyControl
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onIncrease?.(
                            item.id
                          )
                        }
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onDecrease?.(
                            item.id
                          )
                        }
                        aria-label="إنقاص الكمية"
                      >
                        -
                      </button>
                    </div>

                    {/* Price */}
                    <span
                      className={
                        styles.itemPrice
                      }
                    >
                      {item.price}

                      <span
                        className={
                          styles.currency
                        }
                      >
                        <img
                          src={rialSaody}
                          alt=""
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>

          <div
            className={styles.totalRow}
          >
            <span
              className={styles.totalLabel}
            >
              الإجمالي:
            </span>

            <span
              className={styles.totalValue}
            >
              {total} ر.س
            </span>
          </div>

          {/* Checkout */}
          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={onCheckout}
          >
            إتمام الطلب
          </button>

          {/* View Cart */}
          <button
            type="button"
            className={styles.viewCartBtn}
            onClick={() =>
              navigate("/ShoppingBasket")
            }
          >
            عرض السلة
          </button>

        </div>
      </aside>
    </>
  );
}