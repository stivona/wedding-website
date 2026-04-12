import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NOTION_ADMIN =
  "https://ribbon-month-841.notion.site/Admin-3371286404948050a2cecf82e5c554ad";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "admin.shannonandaustin.com") {
    return NextResponse.redirect(NOTION_ADMIN, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
