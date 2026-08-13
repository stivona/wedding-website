import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const photos = [];
    let cursor: string | undefined;

    do {
      const result = await list({
        prefix: "photos/",
        limit: 1000,
        cursor,
      });

      photos.push(...result.blobs);
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    photos.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({
      photos: photos.map((photo) => ({
        url: photo.url,
        pathname: photo.pathname,
        size: photo.size,
        uploadedAt: photo.uploadedAt,
        downloadUrl: `${photo.url}?download=1`,
      })),
    });
  } catch (error) {
    console.error("Failed to list photos:", error);
    return NextResponse.json(
      { error: "Unable to load photos." },
      { status: 500 }
    );
  }
}
