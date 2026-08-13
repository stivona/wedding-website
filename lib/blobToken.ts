export function sanitizeBlobReadWriteToken(raw: string | undefined): string {
  if (!raw?.trim()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  const rwTokenMatch = raw.match(
    /BLOB_READ_WRITE_TOKEN=["']?([^\s"']+)["']?/
  );
  if (rwTokenMatch?.[1]) {
    return rwTokenMatch[1];
  }

  const inlineToken = raw
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("vercel_blob_rw_"));

  if (inlineToken) {
    return inlineToken.replace(/^["']+|["']+$/g, "");
  }

  const singleLine = raw.split(/[\r\n]+/)[0]?.trim() ?? "";
  const token = singleLine.replace(/^["']+|["']+$/g, "");

  if (!token.startsWith("vercel_blob_rw_")) {
    throw new Error("BLOB_READ_WRITE_TOKEN is invalid.");
  }

  return token;
}

export function getBlobReadWriteToken() {
  return sanitizeBlobReadWriteToken(process.env.BLOB_READ_WRITE_TOKEN);
}

export function sanitizeBlobClientToken(raw: string): string {
  const trimmed = raw.trim();

  if (/^vercel_blob_client_[A-Za-z0-9]+_[A-Za-z0-9+/=._-]+$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(
    /vercel_blob_client_([A-Za-z0-9]+)_([A-Za-z0-9+/=._-]+)/
  );

  if (match) {
    return `vercel_blob_client_${match[1]}_${match[2]}`;
  }

  throw new Error("Invalid upload token received from server.");
}
