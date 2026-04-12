"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";

interface UploadCertificatProps {
  onSuccess: () => void;
}

type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function UploadCertificat({ onSuccess }: UploadCertificatProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({ status: "idle" });

  function validateFile(file: File): string | null {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      return "Seuls les fichiers PDF sont acceptes.";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `Le fichier ne doit pas depasser ${MAX_SIZE_MB} MB.`;
    }
    return null;
  }

  async function handleUpload(file: File) {
    const error = validateFile(file);
    if (error) {
      setUploadState({ status: "error", message: error });
      return;
    }

    setUploadState({ status: "uploading", progress: 0 });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiClient.post<{
        success: boolean;
        data: {
          primaryVerificationStatus: "PASSED" | "FAILED";
          primaryVerificationNote: string | null;
        };
        message: string;
      }>("/certifications/submit", formData, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.lengthComputable) {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadState({ status: "uploading", progress });
          }
        },
      });

      if (
        response.success &&
        response.data.primaryVerificationStatus === "PASSED"
      ) {
        setUploadState({
          status: "success",
          message:
            "Votre certificat a ete soumis avec succes. Il est en attente de verification par un administrateur.",
        });
        onSuccess();
      } else {
        const note =
          response.data.primaryVerificationNote ||
          "Le nom sur le certificat ne correspond pas a votre profil. Verifiez que votre nom complet est bien visible dans le document.";
        setUploadState({ status: "error", message: note });
      }
    } catch {
      setUploadState({
        status: "error",
        message:
          "Une erreur est survenue lors de l'envoi. Verifiez votre connexion et reessayez.",
      });
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  }

  const isUploading = uploadState.status === "uploading";

  return (
    <div className="space-y-4">
      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        } ${isUploading ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={handleChange}
        />
        <p className="text-sm font-medium text-foreground">
          Glissez-deposez votre certificat PDF ici
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ou cliquez pour selectionner un fichier (PDF, 5 MB max)
        </p>
        {!isUploading && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Selectionner un fichier
          </Button>
        )}
      </div>

      {uploadState.status === "uploading" && (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
          <p className="text-right text-xs text-muted-foreground">
            {uploadState.progress}%
          </p>
        </div>
      )}

      {uploadState.status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-800">{uploadState.message}</p>
        </div>
      )}

      {uploadState.status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{uploadState.message}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setUploadState({ status: "idle" })}
          >
            Reessayer
          </Button>
        </div>
      )}
    </div>
  );
}
