"use client";

import { useEffect, useRef } from "react";

const ZOLA_SCRIPT_ID = "zola-wjs";
const ZOLA_SCRIPT_SRC = "https://widget.zola.com/js/widget.js";

declare global {
  interface Window {
    ZolaWidget?: { init: () => void };
  }
}

type ZolaRegistryEmbedProps = {
  href: string;
  registryKey: string;
};

function initZolaWidget() {
  window.ZolaWidget?.init();
}

function loadZolaScript(onReady: () => void) {
  const existing = document.getElementById(ZOLA_SCRIPT_ID);

  if (existing) {
    if (window.ZolaWidget) {
      onReady();
    } else {
      existing.addEventListener("load", onReady, { once: true });
    }
    return;
  }

  const script = document.createElement("script");
  script.id = ZOLA_SCRIPT_ID;
  script.src = ZOLA_SCRIPT_SRC;
  script.async = true;
  script.onload = onReady;
  document.body.appendChild(script);
}

export default function ZolaRegistryEmbed({
  href,
  registryKey,
}: ZolaRegistryEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountWidget = () => {
      // Run after paint so the anchor is in the DOM (fixes first load / client nav).
      requestAnimationFrame(() => {
        initZolaWidget();
      });
    };

    loadZolaScript(mountWidget);
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto min-h-[480px]">
      <a
        className="zola-registry-embed sr-only"
        href={href}
        data-registry-key={registryKey}
      >
        Our Zola Wedding Registry
      </a>
    </div>
  );
}
