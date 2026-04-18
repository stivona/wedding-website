import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Subdomain admin — same deployment as main site; root goes to /admin (domain must be added in Vercel + DNS). */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "admin.shannonandaustin.com" && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
