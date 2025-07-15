import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useBlocker } from "react-router-dom";
import { useAuth } from "../../context/UserContext/UserContext";
import styles from "./Register.module.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      addresses: [{ address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const justRegistered = useRef(false);

  const watchedValues = watch();

  const isFormDirty = () => {
    const hasMainFields =
      watchedValues.username ||
      watchedValues.email ||
      watchedValues.password ||
      watchedValues.confirmPassword;

    const hasAddressContent = watchedValues.addresses?.some(
      (addr) => addr.address?.trim() !== ""
    );

    return isDirty && (hasMainFields || hasAddressContent);
  };

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const shouldBlock =
      !justRegistered.current &&
      isFormDirty() &&
      currentLocation.pathname !== nextLocation.pathname;

    console.log("Blocker check:", {
      isDirty: isDirty,
      hasMainFields:
        watchedValues.username ||
        watchedValues.email ||
        watchedValues.password ||
        watchedValues.confirmPassword,
      hasAddressContent: watchedValues.addresses?.some(
        (addr) => addr.address?.trim() !== ""
      ),
      shouldBlock,
      currentPath: currentLocation.pathname,
      nextPath: nextLocation.pathname,
    });

    return shouldBlock;
  });

  useEffect(() => {
    if (blocker.state === "blocked") {
      console.log("Blocking navigation - form is dirty");
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
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      alert("Please fill in all required fields before registering.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.find((user) => user.email === data.email);

    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

    const filteredData = {
      ...data,
      addresses: data.addresses.filter((addr) => addr.address.trim() !== ""),
    };

    registerUser(filteredData);
    justRegistered.current = true;
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  const password = watch("password", "");

  const addAddress = () => {
    append({ address: "" });
  };

  const removeAddress = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className={styles.title}>Register</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "User Name is required",
              validate: (value) =>
                !/\s/.test(value) || "No spaces allowed in User Name",
            })}
            className={errors.username ? styles.inputError : ""}
            autoComplete="username"
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>
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
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{1,}$/,
                message: "At least 1 uppercase, 1 number, 1 special character",
              },
            })}
            className={errors.password ? styles.inputError : ""}
            autoComplete="new-password"
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{1,}$/,
                message: "Passwords do not match",
              },
            })}
            className={errors.confirmPassword ? styles.inputError : ""}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Addresses</label>
          <div className={styles.addressContainer}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.addressField}>
                <input
                  {...register(`addresses.${index}.address`)}
                  placeholder={`Address ${index + 1}`}
                  autoComplete="street-address"
                  className={styles.addressInput}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className={styles.removeAddressBtn}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAddress}
              className={styles.addAddressBtn}
            >
              + Add Another Address
            </button>
          </div>
        </div>

        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
