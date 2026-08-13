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

function photoFilename(pathname: string) {
  return pathname.split("/").pop() ?? "Wedding photo";
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
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
            className="p-2 text-olive hover:text-olive-400 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
            aria-label="Refresh gallery"
          >
            <RefreshIcon className="w-5 h-5" />
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
                <div className="p-3 flex justify-end">
                  <a
                    href={photo.downloadUrl}
                    className="p-2 border border-olive text-olive rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                    download
                    aria-label="Download photo"
                  >
                    <DownloadIcon className="w-4 h-4" />
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
