import { api } from "./api";

export const getMeetings = async (token: string) => {
  return await api("/meetings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMeeting = async (
  meetingData: {
    date: string;
    time: string;
    targetUserId: string;
  },
  token: string
) => {
  return await api("/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(meetingData),
  });
};

export const cancelMeeting = async (
  id: string,
  token: string
) => {
  return await api(`/meetings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};