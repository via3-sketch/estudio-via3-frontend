import { api } from "./api";

export const getTrainingRequests = async (
  token: string
) => {
  return await api("/training-requests", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTrainingRequestById = async (
  id: string,
  token: string,
) => {
  return await api(`/training-requests/${id}`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrainingRequest = async (
  id: string,
  payload: {
    status: string;
  },
  token: string,
) => {
  return await api(`/training-requests/${id}`, {
    method: "PATCH",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });
};