import type { Metadata } from "next";
import AdminNotionEmbed from "@/components/AdminNotionEmbed";

// Notion's own share/embed URL for the planning page. The `/ebd/` path with the
// double slash is Notion's canonical embed URL (the single-slash form 301s to
// it); it is not a typo.
const NOTION_EMBED_SRC =
  "https://ribbon-month-841.notion.site/ebd//3371286404948050a2cecf82e5c554ad";
// Plain public page URL, used for the "open in Notion" escape hatch.
const NOTION_PAGE_URL =
  "https://ribbon-month-841.notion.site/Admin-3371286404948050a2cecf82e5c554ad";

export const metadata: Metadata = {
  title: "Admin | Shannon & Austin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="w-full">
      <AdminNotionEmbed embedSrc={NOTION_EMBED_SRC} pageUrl={NOTION_PAGE_URL} />
    </div>
  );
}
