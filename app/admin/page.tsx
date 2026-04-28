import type { Metadata } from "next";

const NOTION_EMBED_SRC =
  "https://ribbon-month-841.notion.site/ebd//3371286404948050a2cecf82e5c554ad";

export const metadata: Metadata = {
  title: "Admin | Shannon & Austin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="w-full">
      <iframe
        src={NOTION_EMBED_SRC}
        title="Wedding admin"
        width="100%"
        height={600}
        className="block w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
