import { api } from "./api";

export const getTrainingRequests = async (
  token: string, ...params: string[]
) => {
  return await api(`/training-requests${params ? params.map(p => "?"+p ).join("&") : ""}`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyTrainingRequests = async (
  token: string,
) => {
  return await api("/training-requests/me", {
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

export const createTrainingRequest = async (
  payload: {
    trainingId: string;
    participantsCount: number;
    objectives: string;
    context: string;
  },
  token: string,
) => {
  return await api("/training-requests", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });
};

export const editTrainingRequest = async (
  id: string,
  payload: {
    participantsCount: number;
    objectives: string;
    context: string;
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

export const updateTrainingRequest = async (
  id: string,
  payload: {
    status: string;
  },
  token: string,
) => {
  return await api(`/training-requests/${id}/status`, {
    method: "PATCH",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });
};