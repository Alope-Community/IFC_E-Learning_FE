"use client";
import "./../css/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient()); // Hanya dibuat di sisi klien

  if (!queryClient) {
    return null; // Render sesuatu jika client belum siap
  }

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
