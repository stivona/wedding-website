import type { Metadata } from "next";
import ZolaRegistryEmbed from "@/components/ZolaRegistryEmbed";

const ZOLA_REGISTRY_URL =
  "https://www.zola.com/registry/shannonandaustinaugust8/";
const ZOLA_REGISTRY_KEY = "shannonandaustinaugust8";

export const metadata: Metadata = {
  title: "Registry | Shannon & Austin",
  description:
    "Shannon & Austin's wedding registry on Zola for August 8, 2026.",
};

export default function RegistryPage() {
  return (
    <div className="py-16 md:py-24 mb-20">
      <div className="container-wedding">
        <div className="text-center mb-12">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            REGISTRY
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg max-w-2xl mx-auto">
            Your presence is the greatest gift. If you&apos;d like to contribute,
            our registry is below.
          </p>
        </div>

        <ZolaRegistryEmbed
          href={ZOLA_REGISTRY_URL}
          registryKey={ZOLA_REGISTRY_KEY}
        />
      </div>
    </div>
  );
}
