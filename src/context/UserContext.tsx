"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  email: string;
  role: string;
};

type UserContextType = {
  token: string | null;

  user: DecodedToken | null;

  isAuthenticated: boolean;

  isHydrated: boolean;

  login: (token: string) => void;

  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<DecodedToken | null>(
    null
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      const decoded = jwtDecode<DecodedToken>(
        storedToken
      );

      setUser(decoded);
    }

    setIsHydrated(true);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);

    setToken(newToken);

    const decoded = jwtDecode<DecodedToken>(
      newToken
    );

    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,

        user,

        isAuthenticated: !!token,

        isHydrated,

        login,

        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext debe usarse dentro de UserProvider"
    );
  }

  return context;
}