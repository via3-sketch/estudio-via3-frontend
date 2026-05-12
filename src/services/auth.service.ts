import { api } from "./api";

export const registerUser = (payload: any) => {
  return api("/auth/signup", {
    method: "POST",

    body: JSON.stringify(payload),
  });
};

export const loginUser = (payload: {
  email: string;

  password: string;
}) => {
  return api("/auth/signin", {
    method: "POST",

    body: JSON.stringify(payload),
  });
};

export const completeProfile = (
  id: string,
  payload: {
    phone: string;

    country: string;

    companyName: string;

    city: string;

    address: string;
  },
) => {
  const token = localStorage.getItem("token");

  return api(`/users/complete-profile/${id}`, {
    method: "PATCH",

    headers: {
           "Content-Type":
          "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });
};

