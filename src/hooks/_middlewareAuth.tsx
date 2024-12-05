import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiry time in UNIX timestamp
  [key: string]: string | number; // Other token properties
}

const useAuthRedirect = (redirectTo: string = "/") => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp

        if (decoded.exp > currentTime) {
          // Token is still valid
          router.push(redirectTo); // Redirect to the specified page
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, [router, redirectTo]);
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      try {
        // Decode token
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token is expired
        if (decoded.exp && decoded.exp < currentTime) {
          console.error("Token expired");
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [router]);

  return { isAuthenticated };
};

export { useAuthRedirect, useAuth };
