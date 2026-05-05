import { api } from "./api";

export const registerUser = (payload: any) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = (payload: { email: string; password: string }) => {
  return api("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};