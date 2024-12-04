"use client";
import { useAuth } from "@/hooks/_middlewareAuth";
import { useLogout } from "@/hooks/authentication";

export default function ProtectedPage() {
  const { logout } = useLogout();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Welcome to the protected page!{" "}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
