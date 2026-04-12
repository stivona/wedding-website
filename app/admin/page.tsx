import { redirect } from "next/navigation";

const NOTION_ADMIN =
  "https://ribbon-month-841.notion.site/Admin-3371286404948050a2cecf82e5c554ad";

/** Run redirect on every request (not statically baked). */
export const dynamic = "force-dynamic";

export default function AdminPage() {
  redirect(NOTION_ADMIN);
}
