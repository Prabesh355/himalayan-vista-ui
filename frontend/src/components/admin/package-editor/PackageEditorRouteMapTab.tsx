import * as React from "react";
import { Map, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageFormState } from "./types";
import { resolveImageUrl } from "@/lib/imageUrl";

export function PackageEditorRouteMapTab({ form, onChange, onUpload }: { form: PackageFormState; onChange: <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => void; onUpload: (files: FileList | null) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return <PackageEditorSection title="Route Map" icon={<Map className="h-5 w-5 text-primary" />} description="Optional route map shown on the public package page."><div className="space-y-5"><label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={form.routeMapEnabled} onChange={(e) => onChange("routeMapEnabled", e.target.checked)} /> Enable route map</label><div className="grid gap-4 md:grid-cols-2"><Input value={form.routeMapTitle} onChange={(e) => onChange("routeMapTitle", e.target.value)} placeholder="Map title" /><Input value={form.routeMapAlt} onChange={(e) => onChange("routeMapAlt", e.target.value)} placeholder="Accessible alt text" /></div><Textarea value={form.routeMapDescription} onChange={(e) => onChange("routeMapDescription", e.target.value)} placeholder="Map description (optional)" /><Input value={form.routeMapCaption} onChange={(e) => onChange("routeMapCaption", e.target.value)} placeholder="Image caption" /><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden" onChange={(e) => onUpload(e.target.files)} /><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => inputRef.current?.click()}><Upload className="h-4 w-4" /> Upload map</Button>{form.routeMapImage && <Button type="button" variant="outline" onClick={() => onChange("routeMapImage", "")}>Remove</Button>}</div>{form.routeMapImage && <figure className="overflow-hidden rounded-2xl border"><img src={resolveImageUrl(form.routeMapImage)} alt={form.routeMapAlt || form.routeMapTitle || "Route map"} className="max-h-[420px] w-full object-contain bg-muted" /><figcaption className="p-3 text-sm text-muted-foreground">{form.routeMapCaption}</figcaption></figure>}</div></PackageEditorSection>;
}
