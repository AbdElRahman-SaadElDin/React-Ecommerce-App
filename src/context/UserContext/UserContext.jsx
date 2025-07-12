import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const registerKey = "users";
const loginKey = "isLogin";
const currentUserKey = "currentUser";

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem(registerKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem(loginKey) === "true";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem(currentUserKey);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem(registerKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(loginKey, isLogin);
    localStorage.setItem(currentUserKey, JSON.stringify(currentUser));
  }, [isLogin, currentUser]);

  const register = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setIsLogin(true);
      setCurrentUser(user);
      return true;
    }
    setIsLogin(false);
    setCurrentUser(null);
    return false;
  };

  const logout = () => {
    setIsLogin(false);
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        register,
        login,
        logout,
        isLogin,
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
