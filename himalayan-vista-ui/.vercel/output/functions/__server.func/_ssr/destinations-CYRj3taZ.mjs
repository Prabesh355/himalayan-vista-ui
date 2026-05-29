import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as DestinationCard } from "./DestinationCard-DD09kPf0.mjs";
import { d as destinations } from "./mockData-CJYvBa3A.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Search, g as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const regions = ["All", "Everest", "Annapurna", "Langtang", "Kathmandu Valley", "Pokhara", "Lowlands"];
const difficulties = ["All", "Easy", "Moderate", "Challenging", "Strenuous"];
function DestinationsPage() {
  const [query, setQuery] = reactExports.useState("");
  const [region, setRegion] = reactExports.useState("All");
  const [difficulty, setDifficulty] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => {
    return destinations.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q) || d.region.toLowerCase().includes(q);
      const matchesR = region === "All" || d.region === region;
      const matchesD = difficulty === "All" || d.difficulty === difficulty;
      return matchesQ && matchesR && matchesD;
    });
  }, [query, region, difficulty]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7
        }, className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent uppercase tracking-wider", children: "Destinations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 text-5xl md:text-6xl font-semibold tracking-tight", children: [
            "Pick your ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-sunset", children: "horizon." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-2xl", children: "From high-altitude classics to jungle plains — six regions, every kind of traveller." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.15
        }, className: "mt-10 glass rounded-2xl p-3 flex flex-col lg:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 rounded-xl bg-background/50 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search Everest, Pokhara, jungle…", className: "w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: region, onChange: setRegion, options: regions, label: "Region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: difficulty, onChange: setDifficulty, options: difficulties, label: "Difficulty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Refine"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
        " destinations found"
      ] }) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "No matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try widening your filters." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { d, index: i }, d.id)) })
    ] })
  ] });
}
function Select({
  value,
  onChange,
  options,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative flex items-center gap-2 rounded-xl bg-background/50 px-4 min-w-[170px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "w-full bg-transparent py-3 text-sm font-medium outline-none cursor-pointer appearance-none pr-2", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, className: "bg-background text-foreground", children: o }, o)) })
  ] });
}
export {
  DestinationsPage as component
};
