import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Jika token tidak ada, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Validasi token di sini jika perlu
    // Contoh: jwtDecode(token);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Lanjutkan ke halaman yang diminta
}

export const config = {
  matcher: ["/protected/:path*"], // Middleware hanya berlaku untuk halaman tertentu
};
