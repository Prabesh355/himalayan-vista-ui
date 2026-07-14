import * as React from "react";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageEditorFieldErrors, PackageFormState } from "./types";

type PackageEditorPricingTabProps = {
  form: PackageFormState;
  formErrors: PackageEditorFieldErrors;
  onChange: <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => void;
};

export const PackageEditorPricingTab: React.FC<PackageEditorPricingTabProps> = ({
  form,
  formErrors,
  onChange,
}) => {
  return (
    <PackageEditorSection title="Pricing" icon={<Sparkles className="h-5 w-5 text-primary" />}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" value={form.price} onChange={(e) => onChange("price", e.target.value)} />
          {formErrors.price ? <p className="text-sm text-red-600">{formErrors.price}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Discount Price</Label>
          <Input
            type="number"
            value={form.discountPrice}
            onChange={(e) => onChange("discountPrice", e.target.value)}
          />
          {formErrors.discountPrice ? (
            <p className="text-sm text-red-600">{formErrors.discountPrice}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Days</Label>
          <Input
            type="number"
            value={form.durationDays}
            onChange={(e) => onChange("durationDays", e.target.value)}
          />
          {formErrors.durationDays ? <p className="text-sm text-red-600">{formErrors.durationDays}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Nights</Label>
          <Input
            type="number"
            value={form.durationNights}
            onChange={(e) => onChange("durationNights", e.target.value)}
          />
          {formErrors.durationNights ? (
            <p className="text-sm text-red-600">{formErrors.durationNights}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Group Min</Label>
          <Input
            type="number"
            value={form.groupSizeMin}
            onChange={(e) => onChange("groupSizeMin", e.target.value)}
          />
          {formErrors.groupSizeMin ? <p className="text-sm text-red-600">{formErrors.groupSizeMin}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Group Max</Label>
          <Input
            type="number"
            value={form.groupSizeMax}
            onChange={(e) => onChange("groupSizeMax", e.target.value)}
          />
          {formErrors.groupSizeMax ? <p className="text-sm text-red-600">{formErrors.groupSizeMax}</p> : null}
        </div>
      </div>
    </PackageEditorSection>
  );
};
