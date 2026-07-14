import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PackageEditorSection } from "./PackageEditorSection";
import { PackageFormState, PackageEditorFieldErrors } from "./types";

type PackageEditorItineraryTabProps = {
  form: PackageFormState;
  formErrors: PackageEditorFieldErrors;
  itineraryEditorRef: React.RefObject<HTMLTextAreaElement | null>;
  itineraryView: "split" | "editor" | "preview";
  setItineraryView: (value: "split" | "editor" | "preview") => void;
  itinerarySearch: string;
  setItinerarySearch: (value: string) => void;
  insertMarkdownSnippet: (snippet: string) => void;
  highlightedItinerary: string;
  wordCount: number;
  charCount: number;
  onChange: <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => void;
};

export const PackageEditorItineraryTab: React.FC<PackageEditorItineraryTabProps> = ({
  form,
  formErrors,
  itineraryEditorRef,
  itineraryView,
  setItineraryView,
  itinerarySearch,
  setItinerarySearch,
  insertMarkdownSnippet,
  highlightedItinerary,
  wordCount,
  charCount,
  onChange,
}) => {
  return (
    <PackageEditorSection
      title="Itinerary"
      icon={<FileText className="h-5 w-5 text-primary" />}
      description="Markdown editor with split preview and live counters."
    >
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border bg-muted/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Word count</p>
          <p className="mt-1 text-2xl font-semibold">{wordCount}</p>
        </div>
        <div className="rounded-2xl border bg-muted/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Character count</p>
          <p className="mt-1 text-2xl font-semibold">{charCount}</p>
        </div>
        <div className="rounded-2xl border bg-muted/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Search</p>
          <div className="mt-2 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={itinerarySearch}
              onChange={(e) => setItinerarySearch(e.target.value)}
              placeholder="Find text inside itinerary"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" type="button" onClick={() => setItineraryView("split")}>
          Split view
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={() => setItineraryView("editor")}>Editor only</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => setItineraryView("preview")}>
          Preview only
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={() => insertMarkdownSnippet("\n### New section\n")}>
          Heading
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={() => insertMarkdownSnippet("\n- Detail item\n")}>
          List
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={() => insertMarkdownSnippet("**highlight**")}>
          Bold
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={() => insertMarkdownSnippet("`code`")}>
          Code
        </Button>
      </div>

      <div className={itineraryView === "split" ? "grid gap-4 lg:grid-cols-2" : "grid gap-4"}>
        {itineraryView !== "preview" ? (
          <div className="space-y-2">
            <Label htmlFor="itinerary-editor">Markdown editor</Label>
            <Textarea
              id="itinerary-editor"
              ref={itineraryEditorRef}
              value={form.itinerary}
              onChange={(e) => onChange("itinerary", e.target.value)}
              className="min-h-[500px] font-mono text-sm leading-6"
              placeholder={"## Day 1\n- Arrival and hotel check-in\n\n## Day 2\n- Trek begins"}
            />
            {formErrors.itinerary ? <p className="text-sm text-red-600">{formErrors.itinerary}</p> : null}
          </div>
        ) : null}

        {itineraryView !== "editor" ? (
          <div className="space-y-2">
            <Label>Live preview</Label>
            <div className="min-h-[500px] rounded-3xl border bg-background p-5 prose prose-sm max-w-none overflow-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{highlightedItinerary || "*No itinerary provided*"}</ReactMarkdown>
            </div>
          </div>
        ) : null}
      </div>
    </PackageEditorSection>
  );
};
