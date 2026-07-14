import * as React from "react";
import { CheckCircle2, Clock3, Layers3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageFormState, PackageEditorFieldErrors } from "./types";

type PackageEditorGeneralTabProps = {
  form: PackageFormState;
  formErrors: PackageEditorFieldErrors;
  onChange: <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => void;
  featuredLabel?: string;
};

export const PackageEditorGeneralTab: React.FC<PackageEditorGeneralTabProps> = ({
  form,
  formErrors,
  onChange,
  featuredLabel = "Featured toggle",
}) => {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)]">
      <div className="space-y-6">
        <PackageEditorSection
          title="General"
          icon={<Layers3 className="h-5 w-5 text-primary" />}
          description="Core package details and publishing state."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="package-title">Package title</Label>
              <Input
                id="package-title"
                value={form.title}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="Everest Base Camp Trek"
              />
              {formErrors.title ? <p className="text-sm text-red-600">{formErrors.title}</p> : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="package-description">Short description</Label>
              <Textarea
                id="package-description"
                value={form.description}
                onChange={(e) => onChange("description", e.target.value)}
                className="min-h-[120px]"
                placeholder="A concise description shown on cards and summaries."
              />
              {formErrors.description ? (
                <p className="text-sm text-red-600">{formErrors.description}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-destination">Destination</Label>
              <Input
                id="package-destination"
                value={form.destination}
                onChange={(e) => onChange("destination", e.target.value)}
                placeholder="Khumbu"
              />
              {formErrors.destination ? (
                <p className="text-sm text-red-600">{formErrors.destination}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-slug">Package slug</Label>
              <Input
                id="package-slug"
                value={form.slug}
                onChange={(e) => onChange("slug", e.target.value)}
                placeholder="Auto-generated slug"
              />
            </div>
            <label className="flex items-center justify-between gap-4 rounded-2xl border p-4 md:col-span-1">
              <div>
                <p className="font-medium">{featuredLabel}</p>
                <p className="text-sm text-muted-foreground">
                  Promote this package in curated sections.
                </p>
              </div>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => onChange("featured", e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between gap-4 rounded-2xl border p-4 md:col-span-1">
              <div>
                <p className="font-medium">Publish status</p>
                <p className="text-sm text-muted-foreground">Toggle between active and draft.</p>
              </div>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => onChange("isActive", e.target.checked)}
                className="h-4 w-4"
              />
            </label>
          </div>
        </PackageEditorSection>

        <PackageEditorSection title="Preview" icon={<Sparkles className="h-5 w-5 text-primary" />}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="mt-1 font-medium">{form.title || "Untitled package"}</p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="mt-1 font-medium">{form.destination || "Not set"}</p>
            </div>
            <div className="rounded-2xl border p-4 md:col-span-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  <Clock3 className="h-4 w-4" /> {form.isActive ? "Active" : "Draft"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4" /> {form.featured ? "Featured" : "Standard"}
                </span>
              </div>
            </div>
          </div>
        </PackageEditorSection>
      </div>

      <div className="space-y-6">
        <PackageEditorSection title="Workspace status" icon={<Clock3 className="h-5 w-5 text-primary" />}>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
              <span>Use Ctrl/Cmd + S</span>
              <span className="font-medium">Quick save</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
              <span>Autosave</span>
              <span className="font-medium">30 seconds</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
              <span>Unsaved changes</span>
              <span className="font-medium">Tracked</span>
            </div>
          </div>
        </PackageEditorSection>

        <PackageEditorSection title="Actions" icon={<CheckCircle2 className="h-5 w-5 text-primary" />}>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Keep this tab focused on the core metadata that defines the package.</p>
            <p>Use the other tabs for markdown content, media management, SEO, and the final review.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" type="button" disabled>
              Clean structure
            </Button>
            <Button variant="outline" size="sm" type="button" disabled>
              Consistent spacing
            </Button>
          </div>
        </PackageEditorSection>
      </div>
    </div>
  );
};
