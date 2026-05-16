import { api } from "./api";

export const uploadFile = (
  requestId: string,
  formData: FormData,
) => {
  const token =
    localStorage.getItem(
      "token",
    );

  return api(
    `/training-requests/${requestId}/upload-evidence`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    },
  );
};