import * as React from "react";
import { Button } from "@/components/ui/button";

type PackageEditorFooterProps = {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  selectedPackageExists: boolean;
  onSaveDraft: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

export const PackageEditorFooter: React.FC<PackageEditorFooterProps> = ({
  hasUnsavedChanges,
  isSaving,
  selectedPackageExists,
  onSaveDraft,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  return (
    <div className="sticky bottom-0 z-20 border-t bg-background/95 px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-muted-foreground">
          {hasUnsavedChanges ? "You have unsaved changes." : "All changes are synced."}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={onSaveDraft} disabled={isSaving}>
            Save Draft
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={!selectedPackageExists || isSaving}>
            Delete Package
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onUpdate} disabled={isSaving}>
            {isSaving ? "Updating…" : selectedPackageExists ? "Update Package" : "Create Package"}
          </Button>
        </div>
      </div>
    </div>
  );
};
