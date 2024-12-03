"use client";
import { useAuth } from "@/hooks/_middlewareAuth";

export default function ProtectedPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <div>Welcome to the protected page!</div>;
}
