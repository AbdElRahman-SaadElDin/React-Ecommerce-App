import { useCart } from "../../context/CartContext/CartContext";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToShortList }) {
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useCart();
  const navigate = useNavigate();

  const cartItem = cartItems.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleIncrease = () => {
    if (cartItem && cartItem.quantity < product.stock) {
      increaseQuantity(product.id);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      decreaseQuantity(product.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/details/${product.id}`);
  };

  const handleAddToShortList = () => {
    if (onAddToShortList) {
      onAddToShortList(product.title);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          onClick={handleCardClick}
        />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={`star-${i}`}
              className={
                i < product.rating ? styles.starFilled : styles.starEmpty
              }
            >
              &#9733;
            </span>
          ))}
          <span className={styles.ratingValue}>({product.rating})</span>
        </div>
        <p className={styles.price}>${product.price}</p>

        <div className={styles.buttonContainer}>
          {cartItem ? (
            <div className={styles.counter}>
              <button onClick={handleDecrease} className={styles.counterBtn}>
                -
              </button>
              <span className={styles.counterValue}>{cartItem.quantity}</span>
              <button
                onClick={handleIncrease}
                className={styles.counterBtn}
                disabled={cartItem.quantity >= product.stock}
              >
                +
              </button>
            </div>
          ) : (
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              Add to Cart
            </button>
          )}

          <button
            onClick={handleAddToShortList}
            className={styles.shortListBtn}
          >
            Add Short List
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
