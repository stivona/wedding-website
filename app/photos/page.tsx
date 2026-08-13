import type { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: "Photos | Shannon & Austin",
  description:
    "Upload and view photos from Shannon & Austin's wedding weekend.",
};

export default function PhotosPage() {
  return (
    <div className="py-16 md:py-24 mb-20">
      <div className="container-wedding">
        <div className="text-center mb-12">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            PHOT<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>S
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg max-w-2xl mx-auto">
            Upload your pictures from the weekend and browse everyone&apos;s
            memories in the gallery below.
          </p>
        </div>

        <PhotoGallery />
      </div>
    </div>
  );
}
