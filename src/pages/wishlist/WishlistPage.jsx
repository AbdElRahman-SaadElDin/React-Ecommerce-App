import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCart } from "../../context/CartContext/CartContext";
import { removeWishlist, resetWhishlist } from "../../store/wishlistSlice";
import styles from "./WishlistPage.module.css";
import { useNavigate } from "react-router-dom";

function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useCart();

  const handleProductClick = (productId) => {
    navigate(`/details/${productId}`);
  };

  const handleRemoveAll = () => {
    dispatch(resetWhishlist());
  };

  const handleRemove = (productId) => {
    dispatch(removeWishlist(productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <h2>Your wishlist is empty</h2>
        <p>Add some products to your wishlist!</p>
        <button className={styles.goToHomeBtn} onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.wishlistHeader}>
        <h1>Wishlist</h1>
        <button className={styles.removeAllBtn} onClick={handleRemoveAll}>
          Remove All
        </button>
      </div>
      <div className={styles.wishlistItems}>
        {wishlistItems.map((item) => {
          const cartItem = cartItems.find((c) => c.id === item.id);
          return (
            <div key={item.id} className={styles.wishlistItem}>
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
                      key={i}
                      className={
                        i < item.rating ? styles.starFilled : styles.starEmpty
                      }
                    >
                      &#9733;
                    </span>
                  ))}
                  <span className={styles.ratingValue}>({item.rating})</span>
                </div>
                <div className={styles.itemPrice}>${item.price}</div>
              </div>
              <div className={styles.itemActions}>
                {cartItem ? (
                  <div className={styles.counter}>
                    <button
                      className={styles.counterBtn}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className={styles.counterValue}>
                      {cartItem.quantity}
                    </span>
                    <button
                      className={styles.counterBtn}
                      onClick={() => increaseQuantity(item.id)}
                      disabled={cartItem.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(item, 1)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                  title="Remove from wishlist"
                >
                  <i className="fa-regular fa-trash-can"></i> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishlistPage;
