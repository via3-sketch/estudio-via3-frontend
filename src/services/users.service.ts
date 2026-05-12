import { api } from "./api";

export const getUsers = async (
  token: string,
) => {
  return await api("/users", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};