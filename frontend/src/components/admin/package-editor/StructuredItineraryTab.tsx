import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVertical, ImagePlus, Plus, Trash2, Upload, X } from "lucide-react";
import { adminService, ItineraryDayItem } from "@/services/adminService";
import { resolveImageUrl } from "@/lib/imageUrl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type DraftDay = ItineraryDayItem & { id: string; images: string[] };

const newId = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `day-${Date.now()}-${Math.random()}`;
const normalise = (days: ItineraryDayItem[]): DraftDay[] => days.map((day, index) => ({
  ...day, id: String(day.id || day._id || newId()), dayNumber: index + 1, title: day.title || "",
  altitude: day.altitude || "", meals: day.meals || "", accommodation: day.accommodation || "",
  hours: day.hours || "", distance: day.distance || "", description: day.description || "", images: day.images || [],
}));
const createDay = (number: number): DraftDay => ({ id: newId(), dayNumber: number, title: "", altitude: "", meals: "", accommodation: "", hours: "", distance: "", description: "", images: [] });
const legacyDays = (itinerary?: string): ItineraryDayItem[] => {
  const text = String(itinerary || "").trim();
  const matches = [...text.matchAll(/(?:^|\n)\s*(?:\d+[.)]\s*)?(?:#{1,6}\s*)?Day\s*(\d+)\s*(?:[—–:-]\s*)?([^\n]*)/gi)];
  return matches.map((match, index) => ({
    id: `legacy-${match[1]}-${index}`,
    dayNumber: index + 1,
    title: match[2].trim() || `Day ${index + 1}`,
    description: text.slice((match.index || 0) + match[0].length, matches[index + 1]?.index || text.length).replace(/^\s*[-:]*\s*/, "").trim(),
  }));
};
const toItineraryMarkdown = (days: DraftDay[]) => days.map((day) => {
  const details = [
    day.altitude && `Altitude: ${day.altitude}`,
    day.meals && `Meals: ${day.meals}`,
    day.accommodation && `Lodge: ${day.accommodation}`,
    day.hours && `Walking hours: ${day.hours}`,
    day.distance && `Distance: ${day.distance}`,
  ].filter(Boolean).join(" · ");
  return [`## Day ${day.dayNumber}: ${day.title}`, details, day.description].filter(Boolean).join("\n\n");
}).join("\n\n---\n\n");

export function StructuredItineraryTab({ packageId }: { packageId: string }) {
  const queryClient = useQueryClient();
  const [days, setDays] = useState<DraftDay[]>([]);
  const [savedDays, setSavedDays] = useState<DraftDay[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [replaceTarget, setReplaceTarget] = useState<{ dayId: string; imageIndex: number } | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  // The deployed package API is the source of truth. This avoids depending on
  // a separate itinerary route and makes every existing package editable.
  const query = useQuery({ queryKey: ["package", packageId], queryFn: () => adminService.getPackage(packageId), enabled: Boolean(packageId) });

  useEffect(() => {
    if (!query.data) return;
    const packageData = query.data.data;
    const loaded = normalise(packageData.itineraryDays?.length ? packageData.itineraryDays : legacyDays(packageData.itinerary));
    setDays(loaded);
    setSavedDays(loaded);
    setOpenDays(loaded.length ? [loaded[0].id] : []);
  }, [query.data]);

  const isDirty = useMemo(() => JSON.stringify(days) !== JSON.stringify(savedDays), [days, savedDays]);
  const validationError = useMemo(() => days.find((day) => !day.title.trim()), [days]);
  const updateDay = (id: string, patch: Partial<DraftDay>) => setDays((current) => normalise(current.map((day) => day.id === id ? { ...day, ...patch } : day)));
  const addDay = () => {
    const day = createDay(days.length + 1);
    setDays((current) => [...current, day]);
    setOpenDays((current) => [...current, day.id]);
  };
  const removeDay = (id: string) => {
    const day = days.find((item) => item.id === id);
    if (!day || !window.confirm(`Remove Day ${day.dayNumber}: ${day.title || "Untitled"}?`)) return;
    setDays((current) => normalise(current.filter((item) => item.id !== id)));
  };
  const moveDay = (target: number) => {
    if (draggedIndex === null || draggedIndex === target) return;
    setDays((current) => {
      const next = [...current]; const [moving] = next.splice(draggedIndex, 1); next.splice(target, 0, moving);
      return normalise(next);
    });
    setDraggedIndex(null);
  };
  const uploadImage = async (day: DraftDay, file?: File) => {
    if (!file) return;
    try {
      const body = new FormData(); body.append("file", file); body.append("packageId", packageId);
      const result = await adminService.uploadImage(body);
      if (!result?.fileUrl) throw new Error("The upload did not return an image URL.");
      const target = replaceTarget?.dayId === day.id ? replaceTarget.imageIndex : null;
      updateDay(day.id, { images: target === null ? [...day.images, result.fileUrl] : day.images.map((image, index) => index === target ? result.fileUrl : image) });
      setReplaceTarget(null);
    } catch (error: any) { toast.error(error?.response?.data?.message || error?.message || "Image upload failed"); }
  };
  const save = useMutation({
    mutationFn: () => adminService.updatePackage(packageId, { itineraryDays: days, itinerary: toItineraryMarkdown(days) }),
    onSuccess: async (result) => {
      const savedPackage = result?.data;
      const saved = normalise(savedPackage?.itineraryDays?.length ? savedPackage.itineraryDays : days); setDays(saved); setSavedDays(saved);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["package", packageId] }),
        queryClient.invalidateQueries({ queryKey: ["admin-packages"] }),
        queryClient.invalidateQueries({ queryKey: ["packages"] }),
        queryClient.invalidateQueries({ queryKey: ["package"] }),
      ]);
      toast.success("Itinerary saved and website preview updated.");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || error?.message || "Unable to save itinerary"),
  });

  if (!packageId) return <p className="rounded-xl border p-6 text-sm text-muted-foreground">Save the package first, then add its day-by-day itinerary.</p>;
  if (query.isLoading) return <div className="rounded-xl border p-6 text-sm text-muted-foreground">Loading the current itinerary…</div>;
  if (query.isError) return <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">Could not load this package itinerary. Please retry.</div>;

  return <section className="space-y-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><h2 className="text-xl font-semibold">Day-by-day itinerary</h2><p className="text-sm text-muted-foreground">Edit the current itinerary in place. Drag cards to reorder; day numbers update automatically.</p></div>
      <Button type="button" onClick={addDay}><Plus className="h-4 w-4" /> Add itinerary day</Button>
    </div>
    {days.length === 0 ? <div className="rounded-2xl border border-dashed p-8 text-center"><p className="font-medium">No itinerary days yet</p><p className="mt-1 text-sm text-muted-foreground">Add the first day to create the itinerary.</p></div> :
      <Accordion type="multiple" value={openDays} onValueChange={setOpenDays} className="space-y-3">
        {days.map((day, index) => <AccordionItem key={day.id} value={day.id} className="rounded-2xl border bg-card px-4" draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveDay(index)}>
          <div className="flex items-center gap-2"><GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" aria-label="Drag to reorder" /><AccordionTrigger className="min-w-0 flex-1 no-underline hover:no-underline"><span className="flex min-w-0 items-center gap-3"><span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">DAY {day.dayNumber}</span><span className="truncate">{day.title || "Untitled day"}</span></span></AccordionTrigger><Button type="button" size="icon" variant="ghost" className="shrink-0 text-destructive hover:text-destructive" onClick={() => removeDay(day.id)} aria-label={`Remove day ${day.dayNumber}`}><Trash2 className="h-4 w-4" /></Button></div>
          <AccordionContent className="pt-2"><div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium">Day<Input value={day.dayNumber} readOnly aria-label="Day number" /></label>
            <label className="grid gap-1 text-sm font-medium">Title <span className="text-destructive">*</span><Input value={day.title} onChange={(event) => updateDay(day.id, { title: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Altitude<Input value={day.altitude} onChange={(event) => updateDay(day.id, { altitude: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Meals<Input value={day.meals} onChange={(event) => updateDay(day.id, { meals: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Lodge<Input value={day.accommodation} onChange={(event) => updateDay(day.id, { accommodation: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Walking hours<Input value={day.hours} onChange={(event) => updateDay(day.id, { hours: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Distance<Input value={day.distance} onChange={(event) => updateDay(day.id, { distance: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium md:col-span-2">Description<Textarea value={day.description} onChange={(event) => updateDay(day.id, { description: event.target.value })} rows={5} /></label>
            <div className="space-y-2 md:col-span-2"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-medium">Images</p><div className="flex gap-2"><Input className="h-9 w-52" placeholder="Paste image URL and press Enter" onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); const url = event.currentTarget.value.trim(); if (url) { updateDay(day.id, { images: [...day.images, url] }); event.currentTarget.value = ""; } } }} /><input ref={(element) => { fileInputs.current[day.id] = element; }} type="file" accept="image/*" className="hidden" onChange={(event) => void uploadImage(day, event.target.files?.[0])} /><Button type="button" size="sm" variant="outline" onClick={() => { setReplaceTarget(null); fileInputs.current[day.id]?.click(); }}><Upload className="h-4 w-4" /> Upload</Button></div></div>
              {day.images.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{day.images.map((image, imageIndex) => <div key={`${image}-${imageIndex}`} className="group relative overflow-hidden rounded-lg border"><img src={resolveImageUrl(image)} alt={`Day ${day.dayNumber} image ${imageIndex + 1}`} className="h-24 w-full object-cover" /><div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"><Button type="button" size="sm" variant="ghost" className="h-7 text-white hover:bg-white/20 hover:text-white" onClick={() => { setReplaceTarget({ dayId: day.id, imageIndex }); fileInputs.current[day.id]?.click(); }}><ImagePlus className="h-3.5 w-3.5" /> Replace</Button><Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-white/20 hover:text-white" onClick={() => updateDay(day.id, { images: day.images.filter((_, itemIndex) => itemIndex !== imageIndex) })} aria-label="Remove image"><X className="h-3.5 w-3.5" /></Button></div></div>)}</div> : <p className="text-sm text-muted-foreground">No images for this day.</p>}</div>
          </div></AccordionContent>
        </AccordionItem>)}
      </Accordion>}
    <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t bg-background/95 py-4 backdrop-blur"><p className="text-sm text-muted-foreground">{isDirty ? "You have unsaved itinerary changes." : "All itinerary changes are saved."}</p><div className="flex gap-2"><Button type="button" variant="outline" disabled={!isDirty || save.isPending} onClick={() => { setDays(savedDays); toast.message("Itinerary changes discarded."); }}>Discard</Button><Button type="button" disabled={!isDirty || Boolean(validationError) || save.isPending} onClick={() => save.mutate()}>{save.isPending ? "Saving…" : "Save itinerary"}</Button></div></div>
    {validationError && <p className="text-sm text-destructive">Day {validationError.dayNumber} needs a title before saving.</p>}
  </section>;
}
