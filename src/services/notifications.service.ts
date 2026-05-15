import { api } from "./api";

export const getNotificationsByUser = (
  userId: string,
) => {
  const token =
    localStorage.getItem("token");

  return api(
    `/notifications/user/${userId}`,
    {
      method: "GET",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    },
  );
};

export const getUnreadNotifications = (
  userId: string,
) => {
  const token =
    localStorage.getItem("token");

  return api(
    `/notifications/user/${userId}/unread`,
    {
      method: "GET",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    },
  );
};

export const getUnreadCount = (
  userId: string,
) => {
  const token =
    localStorage.getItem("token");

  return api(
    `/notifications/user/${userId}/count`,
    {
      method: "GET",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    },
  );
};

export const markAsRead = (
  notificationId: string,
) => {
  const token =
    localStorage.getItem("token");

  return api(
    `/notifications/${notificationId}/read`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    },
  );
};

export const markAllAsRead = (
  userId: string,
) => {
  const token =
    localStorage.getItem("token");

  return api(
    `/notifications/user/${userId}/read-all`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    },
  );
};