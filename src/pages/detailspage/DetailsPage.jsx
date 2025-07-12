import React, { useState, useEffect } from "react";
import styles from "./DetailsPage.module.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../network/interceptor";
import { useCart } from "../../context/CartContext/CartContext";

function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useCart();

  const callApi = async () => {
    try {
      const res = await axiosInstance.get(`/${id}`);
      setProduct(res?.data);
      setSelectedImage(res.data.images?.[0] || null);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const cartItem = cartItems.find((item) => item.id === product?.id);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imagesSection}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product?.title || "Product"}
            className={styles.mainImage}
          />
        )}
        <div className={styles.imageSlider}>
          {(product?.images || []).map((img) => (
            <img
              key={img}
              src={img}
              className={
                img === selectedImage
                  ? styles.sliderImage + " " + styles.selected
                  : styles.sliderImage
              }
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.title}>{product?.title}</h1>
        <div className={styles.ratingBrandRow}>
          <span className={styles.rating}>⭐ {product?.rating}</span>
          <span className={styles.brand}>{product?.brand}</span>
        </div>
        <div className={styles.categorySkuRow}>
          <span className={styles.category}>{product?.category}</span>
          <span className={styles.sku}>Code: {product?.sku}</span>
        </div>
        <p className={styles.description}>{product?.description}</p>
        <div className={styles.tagsRow}>
          {(product?.tags || []).map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
        <div className={styles.priceStockRow}>
          <span className={styles.price}>${product?.price}</span>
          <span className={styles.stock}>Available: {product?.stock}</span>
        </div>
        <div className={styles.cartActions}>
          {!cartItem ? (
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className={styles.counter}>
              <button
                className={styles.counterBtn}
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </button>
              <span className={styles.counter}>{cartItem.quantity}</span>
              <button
                className={styles.counterBtn}
                onClick={() => increaseQuantity(product.id)}
                disabled={cartItem.quantity >= product.stock}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
