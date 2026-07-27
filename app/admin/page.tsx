import { redirect } from "next/navigation";

// Plain public Notion page (not the /ebd/ embed variant) — this is a
// top-level redirect now, not an iframe embed.
const NOTION_ADMIN =
  "https://ribbon-month-841.notion.site/Admin-3371286404948050a2cecf82e5c554ad";

/**
 * Redirect straight to the Notion admin page instead of embedding it.
 *
 * History: this page went through two embed-based approaches (a delayed
 * iframe mount, then a click-to-load iframe) trying to work around a
 * Safari crash loop ("A problem repeatedly occurred"). Root cause,
 * confirmed with real browser testing: the Notion page contains live
 * databases (Guest List, Tasks, Contact Sheet), and notion.site is a
 * client-rendered SPA -- any page with a database forces the viewer to
 * download Notion's entire client bundle (~615 JS chunks, ~700
 * requests) on load. Cramming that into one large cross-origin iframe
 * is a known Safari trigger for tab crashes under memory/compositing
 * pressure, which auto-reloads and re-crashes in a loop.
 *
 * A redirect sidesteps the whole failure mode: no iframe, nothing
 * embedded, no compositing layer for Safari to choke on -- the Notion
 * page just loads as its own top-level page, same as visiting it
 * directly.
 *
 * force-dynamic: run on every request, never statically cache the
 * redirect.
 */
export const dynamic = "force-dynamic";

export default function AdminPage() {
  redirect(NOTION_ADMIN);
}
