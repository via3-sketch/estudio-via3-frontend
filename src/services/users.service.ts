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

export const deactivateUser = async (
  id: string,
  token: string,
) => {
  return await api(`/users/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};