import * as React from "react";
import { GripVertical, ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageEditorFieldErrors, PackageFormState } from "./types";
import { resolveImageUrl } from "@/lib/imageUrl";

type PackageEditorImagesTabProps = {
  images: string[];
  uploading: boolean;
  formErrors: PackageEditorFieldErrors;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  replaceImageIndex: number | null;
  handleImageError: React.ReactEventHandler<HTMLImageElement>;
  handleImageUrlKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFilesUpload: (files: FileList | null, replaceIndex?: number | null) => Promise<void>;
  handleReplaceSelection: (index: number) => void;
  handleDragStart: (index: number) => void;
  handleDropImage: (targetIndex: number) => void;
  deleteImageAt: (index: number) => void;
  moveImage: (index: number, direction: -1 | 1) => void;
};

export const PackageEditorImagesTab: React.FC<PackageEditorImagesTabProps> = ({
  images,
  uploading,
  formErrors,
  imageInputRef,
  replaceImageIndex,
  handleImageError,
  handleImageUrlKeyDown,
  handleFilesUpload,
  handleReplaceSelection,
  handleDragStart,
  handleDropImage,
  deleteImageAt,
  moveImage,
}) => {
  return (
    <PackageEditorSection
      title="Images"
      icon={<ImagePlus className="h-5 w-5 text-primary" />}
      description="Drag, upload, reorder, replace, and set the visual cover image."
    >
      <div
        className="mb-5 rounded-3xl border-2 border-dashed border-border bg-muted/20 p-5 transition-colors hover:border-primary/50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void handleFilesUpload(e.dataTransfer.files, replaceImageIndex);
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-medium">Drop images here</p>
            <p className="text-sm text-muted-foreground">
              Multiple uploads are supported. Reordering is drag-and-drop.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFilesUpload(e.target.files, replaceImageIndex)}
            />
            <Button variant="outline" type="button" onClick={() => imageInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4" /> Upload images
            </Button>
            <span className="inline-flex items-center rounded-md border px-3 py-2 text-sm text-muted-foreground">
              Paste a URL below and press Enter
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <Input placeholder="Paste image URL and press Enter" onKeyDown={handleImageUrlKeyDown} />
          {uploading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Uploading…
            </div>
          ) : null}
        </div>
      </div>

      {images.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropImage(idx)}
              className="group overflow-hidden rounded-3xl border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={resolveImageUrl(img)}
                  alt={`Package ${idx + 1}`}
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                />
                {idx === 0 ? (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Cover
                  </span>
                ) : null}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  <GripVertical className="h-3 w-3" /> Drag
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium">Image {idx + 1}</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700">
                    Ready
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" type="button" onClick={() => handleReplaceSelection(idx)}>
                    Replace
                  </Button>
                  <Button variant="outline" size="sm" type="button" onClick={() => deleteImageAt(idx)}>
                    Delete
                  </Button>
                  {idx > 0 ? (
                    <Button variant="outline" size="sm" type="button" onClick={() => moveImage(idx, -1)}>
                      Move up
                    </Button>
                  ) : null}
                  {idx < images.length - 1 ? (
                    <Button variant="outline" size="sm" type="button" onClick={() => moveImage(idx, 1)}>
                      Move down
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          No images uploaded yet. Add a cover image to strengthen the package listing.
        </div>
      )}

      {formErrors.images ? <p className="mt-3 text-sm text-red-600">{formErrors.images}</p> : null}
    </PackageEditorSection>
  );
};
