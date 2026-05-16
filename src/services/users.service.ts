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