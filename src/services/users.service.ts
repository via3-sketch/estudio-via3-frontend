export const getUsers = async (token: string, page: number = 1) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=5`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

export const toggleUserStatus = async (userId: string, isActive: boolean, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar el estado del usuario");
  }
  return response.json();
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