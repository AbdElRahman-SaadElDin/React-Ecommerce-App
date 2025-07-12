import ProductList from "../../components/productlist/ProductList";
import { useAuth } from "../../context/UserContext/UserContext";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  const { isLogin } = useAuth();

  return (
    <>
      <section className={styles.home}>
        {isLogin ? (
          <>
            <h1 className={styles.heading}>All Products</h1>
            <p className={styles.subtitle}>
              Browse our products and add them to your cart
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.heading}>Welcome to MyShop</h1>
            <p className={styles.subtitle}>
              Please{" "}
              <Link to="/login" className={styles.loginLink}>
                login
              </Link>{" "}
              or{" "}
              <Link to="/register" className={styles.registerLink}>
                register
              </Link>{" "}
              to view products and view your cart
            </p>
          </>
        )}
        <ProductList />
      </section>
    </>
  );
}

export default HomePage;
