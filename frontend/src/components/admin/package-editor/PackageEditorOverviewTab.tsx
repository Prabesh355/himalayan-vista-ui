import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCircle2 } from "lucide-react";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageEditorFieldErrors, PackageFormState } from "./types";
import { resolveImageUrl } from "@/lib/imageUrl";

type PackageEditorOverviewTabProps = {
  form: PackageFormState;
  overviewWarnings: string[];
  formatPrice: (value: number) => string;
  handleImageError: React.ReactEventHandler<HTMLImageElement>;
};

export const PackageEditorOverviewTab: React.FC<PackageEditorOverviewTabProps> = ({
  form,
  overviewWarnings,
  formatPrice,
  handleImageError,
}) => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border bg-card p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Overview</h3>
        </div>

        {overviewWarnings.length > 0 ? (
          <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-900">
            <p className="font-semibold">Warnings</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {overviewWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Package information</p>
            <p className="mt-2 text-lg font-semibold">{form.title || "Untitled package"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{form.description || "No description added yet."}</p>
            <div className="mt-4 grid gap-2 text-sm">
              <p>
                <span className="font-medium">Destination:</span> {form.destination || "Not set"}
              </p>
              <p>
                <span className="font-medium">Status:</span> {form.isActive ? "Active" : "Draft"}
              </p>
              <p>
                <span className="font-medium">Featured:</span> {form.featured ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Pricing</p>
            <p className="mt-2 text-lg font-semibold">
              {form.price ? formatPrice(Number(form.price)) : "Not set"}
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <p>
                <span className="font-medium">Discount price:</span>{" "}
                {form.discountPrice ? formatPrice(Number(form.discountPrice)) : "—"}
              </p>
              <p>
                <span className="font-medium">Days:</span> {form.durationDays || "—"}
              </p>
              <p>
                <span className="font-medium">Nights:</span> {form.durationNights || "—"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border p-4 xl:col-span-2">
            <p className="text-sm text-muted-foreground">Images</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {form.images.length ? (
                form.images.map((img, idx) => (
                  <div key={`${img}-overview-${idx}`} className="overflow-hidden rounded-2xl border bg-muted/30">
                    <img
                      src={resolveImageUrl(img)}
                      alt={`Overview ${idx + 1}`}
                      onError={handleImageError}
                      className="h-36 w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                      <span className="truncate">{idx === 0 ? "Cover image" : `Image ${idx + 1}`}</span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 font-medium text-emerald-700">
                        Ready
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No images uploaded.</p>
              )}
            </div>
          </div>
          <div className="rounded-2xl border p-4 xl:col-span-2">
            <p className="text-sm text-muted-foreground">Itinerary preview</p>
            <div className="prose prose-sm mt-4 max-w-none rounded-2xl border bg-background p-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {form.itinerary || "*No itinerary provided*"}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
