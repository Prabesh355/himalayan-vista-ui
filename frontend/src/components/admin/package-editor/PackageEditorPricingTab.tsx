import * as React from "react";
import { Plus, Sparkles, Trash2 } from "lucide-react";
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
      <div className="mt-8 rounded-2xl border bg-muted/20 p-5">
        <div className="flex items-center justify-between gap-3"><div><h3 className="font-semibold">Group price tiers</h3><p className="text-sm text-muted-foreground">Set a per-person price for each group-size range.</p></div><button type="button" onClick={() => onChange("groupPriceTiers", [...form.groupPriceTiers, { min: "", max: "", price: "" }])} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"><Plus className="h-4 w-4" /> Add tier</button></div>
        <div className="mt-4 space-y-3">{form.groupPriceTiers.map((tier, index) => <div key={index} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"><Input type="number" placeholder="Min people" value={tier.min} onChange={(e) => onChange("groupPriceTiers", form.groupPriceTiers.map((value, i) => i === index ? { ...value, min: e.target.value } : value))} /><Input type="number" placeholder="Max people" value={tier.max} onChange={(e) => onChange("groupPriceTiers", form.groupPriceTiers.map((value, i) => i === index ? { ...value, max: e.target.value } : value))} /><Input type="number" placeholder="Price per person" value={tier.price} onChange={(e) => onChange("groupPriceTiers", form.groupPriceTiers.map((value, i) => i === index ? { ...value, price: e.target.value } : value))} /><button type="button" onClick={() => onChange("groupPriceTiers", form.groupPriceTiers.filter((_, i) => i !== index))} className="inline-flex items-center justify-center rounded-lg border px-3 text-red-600"><Trash2 className="h-4 w-4" /></button></div>)}</div>
      </div>
    </PackageEditorSection>
  );
};
