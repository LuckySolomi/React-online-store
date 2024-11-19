import React, { useState } from "react";
import styles from "./Card.module.css";

function Card({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddProduct = () => {
    if (!isAdded) {
      onAddToCart();
      setIsAdded(true);
    }
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.cardImg}
        src={product.thumbnail}
        alt={product.title}
      ></img>

      <p>{product.title}</p>
      <h2>${product.price}</h2>

      <button className={styles.cardBtn} onClick={handleAddProduct}>
        {isAdded ? (
          <>
            <img src="./img/checkmark.svg" alt="Added" />
            Added
          </>
        ) : (
          "+ Add to cart"
        )}
      </button>
    </div>
  );
}

export default Card;
