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

function BackIcon({ className }: { className?: string }) {
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronIcon({
  className,
  direction,
}: {
  className?: string;
  direction: "left" | "right";
}) {
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
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPreviousPhoto = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || photos.length === 0) {
        return current;
      }
      return (current - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const showNextPhoto = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || photos.length === 0) {
        return current;
      }
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

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

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    if (activeIndex >= photos.length) {
      setActiveIndex(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPreviousPhoto();
      } else if (event.key === "ArrowRight") {
        showNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, photos.length, closeLightbox, showPreviousPhoto, showNextPhoto]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

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
            {photos.map((photo, index) => (
              <article
                key={photo.pathname}
                className="card p-0 overflow-hidden relative group"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="block w-full aspect-[4/3] bg-olive/5 cursor-zoom-in"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photoFilename(photo.pathname)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
                <a
                  href={photo.downloadUrl}
                  className="absolute top-3 right-3 p-2 bg-cream/90 border border-olive text-olive rounded-full opacity-0 group-hover:opacity-100 hover:bg-olive hover:text-cream transition-all duration-200 focus:opacity-100"
                  download
                  aria-label="Download photo"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DownloadIcon className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 bg-cream/95 backdrop-blur-sm flex flex-col top-[var(--site-header-height)]"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="flex items-center justify-between gap-4 p-4 md:p-6">
            <button
              type="button"
              onClick={closeLightbox}
              className="inline-flex items-center gap-2 px-4 py-2 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
            >
              <BackIcon className="w-4 h-4" />
              Back
            </button>

            <p className="font-body text-olive/60 text-sm">
              {activeIndex + 1} / {photos.length}
            </p>

            <a
              href={activePhoto.downloadUrl}
              className="p-2 border border-olive text-olive rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
              download
              aria-label="Download photo"
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-4 pb-6 md:px-16 md:pb-10 min-h-0">
            {photos.length > 1 && (
              <button
                type="button"
                onClick={showPreviousPhoto}
                className="absolute left-2 md:left-6 p-3 border border-olive text-olive rounded-full bg-cream/80 hover:bg-olive hover:text-cream transition-colors duration-200"
                aria-label="Previous photo"
              >
                <ChevronIcon className="w-6 h-6" direction="left" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.url}
              alt={photoFilename(activePhoto.pathname)}
              className="max-h-[calc(100vh-var(--site-header-height)-8rem)] max-w-full object-contain rounded-lg shadow-lg"
            />

            {photos.length > 1 && (
              <button
                type="button"
                onClick={showNextPhoto}
                className="absolute right-2 md:right-6 p-3 border border-olive text-olive rounded-full bg-cream/80 hover:bg-olive hover:text-cream transition-colors duration-200"
                aria-label="Next photo"
              >
                <ChevronIcon className="w-6 h-6" direction="right" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
