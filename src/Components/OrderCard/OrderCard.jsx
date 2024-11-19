import React from "react";
import { CartContext } from "../CartContext/CartContext";
import styles from "./OrderCard.module.css";

function OrderCard({ product, quantity }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImg}
        src={product.thumbnail}
        alt={product.title}
      />
      <div>
        <p>{product.title}</p>
        <h2>
          ${(product.price * quantity).toFixed(2)}, ${quantity}product
        </h2>
      </div>
    </div>
  );
}

export default OrderCard;
