import styles from "./CartDrawer.module.css";
import tomford from "../../assets/tomford.png"
import rialSaody from "../../assets/saudi-riyal.svg"
export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onCheckout,
  onViewCart,
}) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>

      <aside className={styles.drawer}>
        <div className={styles.header}>
          <h2>
            سلة التسوق{" "}
            <span className={styles.count}>({items.length} منتجات)</span>
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

        <div className={styles.itemsList}>
          {items.length === 0 ? (
            <p className={styles.emptyText}>السلة فارغة حالياً</p>
          ) : (
            items.map((item) => (
              <div className={styles.item} key={item.id}>
                 <div className={styles.itemImageWrap}>
                  <img src={tomford}alt={item.name} />
                </div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemTop}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    {item.size && (
                      <span className={styles.itemSize}>{item.size}</span>
                    )}
                  </div>

                  <div className={styles.itemBottom}>
                     <div className={styles.qtyControl}>
                      <button
                        type="button"
                        onClick={() => onIncrease(item.id)}
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                        aria-label="إنقاص الكمية"
                      >
                        -
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                     <span className={styles.currency}>  {item.price}</span><img src={rialSaody} alt="" />
                    </span>

                   
                  </div>
                </div>

               
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>الإجمالي:</span>
            <span className={styles.totalValue}>{total} ر.س</span>
          </div>

          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={onCheckout}
          >
            إتمام الطلب
          </button>

          <button
            type="button"
            className={styles.viewCartBtn}
            onClick={onViewCart}
          >
            عرض السلة
          </button>
        </div>
      </aside>
    </>
  );
}
