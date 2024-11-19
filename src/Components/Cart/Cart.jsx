import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import CartCard from "../CartCard/CartCard";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItems } = useContext(CartContext);
  const isCartEmpty = cartItems.length === 0;

  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <div>
      <Breadcrumbs disabled={isCartEmpty} />
      <h2 className={styles.mainTitle}>Cart</h2>
      <div className={styles.cardsContainer}>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <CartCard
              key={index}
              product={cartItem.item}
              quantity={cartItem.quantity}
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <h3>
        Together:{" "}
        <span className={styles.result}>{totalQuantity} products.</span>
      </h3>
      <h3>
        Sum:{" "}
        <span className={styles.result}>
          {cartItems
            .reduce(
              (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
              0
            )
            .toFixed(2)}
        </span>
      </h3>
      {isCartEmpty ? (
        <button className={`${styles.stepBtn} ${styles.disabled}`} disabled>
          Next step
        </button>
      ) : (
        <Link to="/contact" className={styles.noUnderline}>
          <button className={styles.stepBtn}>Next step</button>
        </Link>
      )}
    </div>
  );
}

export default Cart;
