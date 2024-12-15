import { jwtDecode } from "jwt-decode";

export const getUserData = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // Jika token tidak ada, user belum login
  }

  try {
    const decoded: { id: string; name: string; email: string, avatar:string } =
      jwtDecode(token);

    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Jika token invalid
  }
};
