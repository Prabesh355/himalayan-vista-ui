import * as React from "react";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageFormState } from "./types";

type PackageEditorSeoTabProps = {
  form: PackageFormState;
  onChange: <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => void;
};

export const PackageEditorSeoTab: React.FC<PackageEditorSeoTabProps> = ({ form, onChange }) => {
  return (
    <PackageEditorSection title="SEO" icon={<Eye className="h-5 w-5 text-primary" />}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Meta title</Label>
          <Input
            value={form.metaTitle}
            onChange={(e) => onChange("metaTitle", e.target.value)}
            placeholder="Optional SEO title"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Meta description</Label>
          <Textarea
            value={form.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            className="min-h-[120px]"
            placeholder="Optional SEO description"
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="package-slug"
          />
        </div>
        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input
            value={form.canonicalUrl}
            onChange={(e) => onChange("canonicalUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>OpenGraph image</Label>
          <Input
            value={form.ogImage}
            onChange={(e) => onChange("ogImage", e.target.value)}
            placeholder="Image URL for social sharing"
          />
        </div>
      </div>
    </PackageEditorSection>
  );
};
