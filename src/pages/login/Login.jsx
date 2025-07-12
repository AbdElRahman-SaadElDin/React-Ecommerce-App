import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useBlocker } from "react-router-dom";
import { useAuth } from "../../context/UserContext/UserContext";
import styles from "./Login.module.css";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const watchedValues = watch();

  const isFormDirty = () => {
    const hasChanges = isDirty;
    const hasContent =
      watchedValues.email?.trim() !== "" ||
      watchedValues.password?.trim() !== "";
    return hasChanges && hasContent;
  };

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const shouldBlock =
      isFormDirty() && currentLocation.pathname !== nextLocation.pathname;
    console.log("Login Blocker check:", {
      isDirty: isDirty,
      hasContent:
        watchedValues.email?.trim() !== "" ||
        watchedValues.password?.trim() !== "",
      shouldBlock,
      currentPath: currentLocation.pathname,
      nextPath: nextLocation.pathname,
    });
    return shouldBlock;
  });

  useEffect(() => {
    if (blocker.state === "blocked") {
      console.log("Blocking login navigation - form is dirty");
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  const onSubmit = (data) => {
    const success = login(data.email, data.password);
    if (success) {
      alert("Login successful!");
      navigate(from, { replace: true });
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className={styles.title}>Login</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={errors.email ? styles.inputError : ""}
              autoComplete="email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={errors.password ? styles.inputError : ""}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
