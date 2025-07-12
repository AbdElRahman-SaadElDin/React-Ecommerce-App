import React from "react";
import { useCart } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import image from "../../assets/Group.png";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    removeAll,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/details/${productId}`);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <img src={image} alt="Empty Cart" className={styles.emptyCartImage} />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button className={styles.goToHomeBtn} onClick={handleNavigate}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1>Shopping Cart</h1>
        <button className={styles.removeAllBtn} onClick={removeAll}>
          Remove All
        </button>
      </div>

      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div
              className={styles.itemImage}
              onClick={() => handleProductClick(item.id)}
            >
              <img src={item.thumbnail} alt={item.title} />
            </div>

            <div className={styles.itemInfo}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>

              <div className={styles.itemRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={`${i}`}
                    className={
                      i < item.rating ? styles.starFilled : styles.starEmpty
                    }
                  >
                    &#9733;
                  </span>
                ))}
                <span className={styles.ratingValue}>({item.rating})</span>
              </div>

              <div className={styles.itemPrice}>
                <span className={styles.unitPrice}>
                  Item Price: ${item.price}
                </span>
                <span className={styles.totalPrice}>
                  ${(item.price * item.quantity).toFixed(2)} total
                </span>
              </div>
            </div>

            <div className={styles.itemActions}>
              <div className={styles.quantityControl}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => increaseQuantity(item.id)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                <i class="fa-regular fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartFooter}>
        <div className={styles.totalSection}>
          <h2>Total: ${getTotalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
