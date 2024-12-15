"use client";
import "./../css/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gray-50">
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
