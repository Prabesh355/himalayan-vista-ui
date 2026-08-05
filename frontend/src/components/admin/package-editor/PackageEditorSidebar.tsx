import * as React from "react";
import { CheckCircle2, Clock3, FileText, Eye, ImagePlus, Layers3, Sparkles, AlertTriangle, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabKey } from "./types";

const editorNavItems = [
  { key: "general", label: "General", icon: Layers3 },
  { key: "itinerary", label: "Itinerary", icon: FileText },
  { key: "images", label: "Images", icon: ImagePlus },
  { key: "route-map", label: "Route Map", icon: Map },
  { key: "pricing", label: "Pricing", icon: Sparkles },
  { key: "seo", label: "SEO", icon: Eye },
  { key: "overview", label: "Overview", icon: CheckCircle2 },
] as const satisfies ReadonlyArray<{
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}>;

type PackageEditorSidebarProps = {
  selectedPackageTitle: string;
  lastEditedAt: string | null;
  saveSuccess: boolean;
  imageCount: number;
  wordCount: number;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export const PackageEditorSidebar: React.FC<PackageEditorSidebarProps> = ({
  selectedPackageTitle,
  lastEditedAt,
  saveSuccess,
  imageCount,
  wordCount,
  activeTab,
  onTabChange,
}) => {
  return (
    <aside className="hidden h-full flex-col border-r bg-muted/20 p-5 md:flex">
      <div className="space-y-3 border-b pb-4">
        <div className="space-y-2 text-left">
          <p className="text-2xl font-semibold tracking-tight">{selectedPackageTitle}</p>
          <p className="text-sm text-muted-foreground">
            Full-screen CMS workspace for large package records.
          </p>
        </div>
        <div className="rounded-2xl border bg-background p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Last edited</p>
              <p className="mt-1 text-sm font-medium">{lastEditedAt || "—"}</p>
            </div>
            {saveSuccess ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700">
                <Clock3 className="h-4 w-4" /> Draft
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-muted-foreground">Images</p>
              <p className="mt-1 font-semibold">{imageCount}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-muted-foreground">Itinerary words</p>
              <p className="mt-1 font-semibold">{wordCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {editorNavItems.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "outline"}
            className={cn("justify-start gap-2 rounded-xl px-4 py-3 text-left", activeTab !== key && "bg-background")}
            type="button"
            onClick={() => onTabChange(key)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      <div className="mt-4 space-y-3 rounded-2xl border bg-background p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Editor reminders
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Ctrl/Cmd + S saves immediately.</li>
          <li>Autosave drafts every 30 seconds.</li>
          <li>Closing with unsaved changes prompts confirmation.</li>
        </ul>
      </div>
    </aside>
  );
};
