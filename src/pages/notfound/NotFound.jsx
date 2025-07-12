import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span className={styles.four}>4</span>
          <div className={styles.zeroContainer}>
            <span className={styles.zero}>0</span>
          </div>
          <span className={styles.four}>4</span>
        </div>

        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.buttonContainer}>
          <button onClick={handleGoHome} className={styles.primaryBtn}>
            <i className="fa-solid fa-home"></i>
            Go Home
          </button>
          <button onClick={handleGoBack} className={styles.secondaryBtn}>
            <i className="fa-solid fa-arrow-left"></i>
            Go Back
          </button>
        </div>

        <div className={styles.illustration}>
          <div className={styles.planet}></div>
          <div className={styles.astronaut}></div>
          <div className={styles.stars}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={styles.star}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
