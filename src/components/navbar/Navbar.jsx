import { useCart } from "../../context/CartContext/CartContext";
import { useAuth } from "../../context/UserContext/UserContext";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  const { cartCount } = useCart();
  const { isLogin, currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        MyShop
      </NavLink>

      <div className={styles.links}>
        {isLogin ? (
          <>
            <span className={styles.userInfo}>
              Welcome, {currentUser?.username}!
            </span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Register
            </NavLink>
          </>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.cartIcon} ${styles.active}` : styles.cartIcon
          }
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
