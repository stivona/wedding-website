"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { uploadPhoto } from "@/lib/uploadPhoto";

type Photo = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  downloadUrl: string;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function photoFilename(pathname: string) {
  return pathname.split("/").pop() ?? "photo";
}

export default function PhotoGallery() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const loadPhotos = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/photos");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load photos.");
      }

      setPhotos(data.photos ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load photos."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (fileArray.length === 0) {
      setError("Please choose one or more image files.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      for (let index = 0; index < fileArray.length; index += 1) {
        const file = fileArray[index];
        setUploadProgress(`Uploading ${index + 1} of ${fileArray.length}...`);

        await uploadPhoto(file);
      }

      await loadPhotos();
      setUploadProgress(null);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      void uploadFiles(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files?.length) {
      void uploadFiles(event.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-12">
      <div
        className={`card border-2 border-dashed transition-colors ${
          isDragging ? "border-olive bg-olive/5" : "border-olive/20"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p className="font-body text-olive/80 mb-2">
            Share your favorite moments from our wedding weekend.
          </p>
          <p className="font-body text-olive/60 text-sm mb-6">
            JPG, PNG, WebP, GIF, or HEIC up to 15 MB each.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <button
            type="button"
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Choose Photos"}
          </button>

          <p className="font-body text-olive/50 text-sm mt-4">
            Or drag and drop photos here.
          </p>

          {uploadProgress && (
            <p className="font-body text-olive/70 text-sm mt-4">
              {uploadProgress}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="card border border-red-300/60 bg-red-50/70">
          <p className="font-body text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="heading-display text-3xl md:text-4xl">GALLERY</h2>
          <button
            type="button"
            onClick={() => void loadPhotos()}
            className="link-nav"
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="card text-center">
            <p className="font-body text-olive/70">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="card text-center">
            <p className="font-body text-olive/70">
              No photos yet. Be the first to upload!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <article key={photo.pathname} className="card p-0 overflow-hidden">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-[4/3] bg-olive/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photoFilename(photo.pathname)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body text-olive/70 text-xs truncate">
                      {photoFilename(photo.pathname)}
                    </p>
                    <p className="font-body text-olive/50 text-xs">
                      {formatFileSize(photo.size)}
                    </p>
                  </div>
                  <a
                    href={photo.downloadUrl}
                    className="shrink-0 px-3 py-1.5 border border-olive text-olive font-body text-xs uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                    download
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
