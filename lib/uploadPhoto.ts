import { sanitizeBlobClientToken } from "@/lib/blobToken";

const BLOB_API_URL = "https://vercel.com/api/blob";
const BLOB_API_VERSION = "12";

type ClientTokenResponse = {
  type?: string;
  clientToken?: string;
  error?: string;
};

function getStoreIdFromClientToken(clientToken: string) {
  const storeId = clientToken.split("_")[3];
  if (!storeId) {
    throw new Error("Invalid upload token.");
  }
  return storeId;
}

function sanitizeFilename(filename: string) {
  const trimmed = filename.trim();
  if (!trimmed) {
    return `photo-${Date.now()}.jpg`;
  }

  return trimmed.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function uploadPhoto(file: File) {
  const pathname = `photos/${sanitizeFilename(file.name)}`;

  const tokenResponse = await fetch("/api/photos/upload", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      type: "blob.generate-client-token",
      payload: {
        pathname,
        clientPayload: null,
        multipart: false,
      },
    }),
  });

  const tokenData = (await tokenResponse.json()) as ClientTokenResponse;

  if (!tokenResponse.ok || !tokenData.clientToken) {
    throw new Error(tokenData.error ?? "Failed to prepare upload.");
  }

  const clientToken = sanitizeBlobClientToken(tokenData.clientToken);

  const uploadUrl = `${BLOB_API_URL}/?${new URLSearchParams({ pathname })}`;
  const headers: Record<string, string> = {
    authorization: `Bearer ${clientToken}`,
    "x-vercel-blob-store-id": getStoreIdFromClientToken(clientToken),
    "x-api-version": BLOB_API_VERSION,
    "x-content-length": String(file.size),
    "x-vercel-blob-access": "public",
  };

  if (file.type) {
    headers["x-content-type"] = file.type;
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    let message = "Upload failed.";

    try {
      const errorBody = JSON.parse(errorText) as {
        error?: string;
        message?: string;
      };
      message =
        typeof errorBody.error === "string"
          ? errorBody.error
          : typeof errorBody.message === "string"
            ? errorBody.message
            : message;
    } catch {
      if (errorText) {
        message = errorText;
      }
    }

    throw new Error(message);
  }
}
