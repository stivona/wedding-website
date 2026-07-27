"use client";

import { useState } from "react";

type AdminNotionEmbedProps = {
  /** Notion embed URL (the /ebd/ share URL). */
  embedSrc: string;
  /** Plain public page URL, for the "open in Notion" escape hatch. */
  pageUrl: string;
};

/**
 * Renders the wedding-planning Notion page.
 *
 * Why this is click-to-load rather than an iframe that mounts on page load:
 *
 * The admin page is a public notion.site page that contains several Notion
 * databases (Guest List, Tasks, Contact Sheet). notion.site is a fully
 * client-rendered SPA, so embedding it -- for ANY viewer, logged in or not --
 * pulls Notion's entire client bundle: ~600 JS chunks plus a wasm-sqlite
 * worker, OPFS cache workers, formula/collection-view code, etc. (verified
 * live: ~700 network requests per load). All of that renders into one
 * full-width, 600px-tall <iframe>, which the browser promises as a single
 * large GPU compositing layer.
 *
 * On iOS/desktop Safari that combination -- a big composited layer backing a
 * memory- and script-heavy cross-origin app -- is a well-documented trigger
 * for WebKit's "A problem repeatedly occurred" renderer crash: Safari kills
 * the tab under GPU/memory pressure, auto-reloads, hits the same load, and
 * loops. (iframes and large composited layers are named triggers in the
 * canonical write-up: https://stackoverflow.com/questions/76127296 -- and the
 * recommended mitigation there is literally "don't render the iframe until the
 * user asks for it, to reduce the number of composited elements.")
 *
 * So the real fix is to keep that heavy layer out of the initial render
 * entirely: show a lightweight poster, and only mount the iframe when an admin
 * explicitly clicks to load it. That removes the thing that crashes on
 * load/reload, instead of trying to time around it. The "Open in Notion" link
 * is always present as an escape hatch and is the better surface for actual
 * editing anyway (the embed is view-oriented).
 */
export default function AdminNotionEmbed({
  embedSrc,
  pageUrl,
}: AdminNotionEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="container-wedding py-10 md:py-16">
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <h1 className="heading-display text-4xl md:text-5xl">Admin</h1>
        <div className="decorative-line" />
        <p className="font-body text-olive/60 text-sm max-w-xl">
          Wedding-planning workspace. Loads directly from Notion.
        </p>
      </div>

      {!showEmbed ? (
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 rounded-lg border border-olive/15 bg-olive/5 px-6 py-14 text-center">
          <p className="font-body text-olive/70 text-sm max-w-md">
            The planning board loads the full Notion app, so it&apos;s kept off
            the page until you ask for it.
          </p>
          <button
            type="button"
            onClick={() => setShowEmbed(true)}
            className="px-6 py-2.5 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
          >
            Load planning board
          </button>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body uppercase tracking-widest text-olive/70 underline underline-offset-2 hover:text-olive"
          >
            Or open in Notion ↗
          </a>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-end mb-2">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body uppercase tracking-widest text-olive/70 underline underline-offset-2 hover:text-olive"
            >
              Open in Notion ↗
            </a>
          </div>
          <iframe
            src={embedSrc}
            title="Wedding admin"
            width="100%"
            height={720}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block w-full border-0 rounded-lg"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
