import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import styles from "./CartCard.module.css";

function CartCard({ product, quantity }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleDelete = () => {
    removeFromCart(product.id);
  };

  return (
    <div className={styles.CartCard}>
      <img
        className={styles.cardImg}
        src={product.thumbnail}
        alt={product.title}
      />
      <div>
        <div className={styles.cardTextContainer}>
          <p className={styles.cardText}>{product.title}</p>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <img src="./img/basket.svg" alt="basket" />
            Delete
          </button>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.btnsContainer}>
            <button
              className={`${styles.miniBtn} ${
                quantity === 1 ? styles.disabledColor : ""
              }`}
              onClick={handleDecrease}
              disabled={quantity === 1}
            >
              -
            </button>
            <h1 className={styles.amount}>{quantity}</h1>
            <button className={styles.miniBtn} onClick={handleIncrease}>
              +
            </button>
          </div>
          <p>
            Price:{" "}
            <span className={styles.price}>
              ${(product.price * quantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
