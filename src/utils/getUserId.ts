import { jwtDecode } from "jwt-decode";

export const getUserId = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // Jika token tidak ada, user belum login
  }

  try {
    const decoded: { id: string } = jwtDecode(token); // Pastikan payload JWT memiliki field `id`
    console.log(decoded);
    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Jika token invalid
  }
};
