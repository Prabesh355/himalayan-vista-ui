import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { i as Star, M as MapPin, C as Clock, T as TrendingUp } from "../_libs/lucide-react.mjs";
const difficultyColor = {
  Easy: "text-emerald-400",
  Moderate: "text-sky-400",
  Challenging: "text-amber-400",
  Strenuous: "text-rose-400"
};
function DestinationCard({ d, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
      className: "group relative overflow-hidden rounded-3xl glass shadow-soft transition-all hover:shadow-elegant hover:-translate-y-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/destinations",
          className: "block",
          "aria-label": d.name,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: d.image,
                alt: d.name,
                loading: "lazy",
                width: 1024,
                height: 1024,
                className: "h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 flex flex-wrap gap-1.5", children: d.tags.slice(0, 2).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white border border-white/20",
                children: t
              },
              t
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-amber-300 text-amber-300" }),
              d.rating
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-white/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                d.region
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-semibold tracking-tight", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/80 line-clamp-2", children: d.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-2 text-xs text-white/85", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  " ",
                  d.duration
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 ${difficultyColor[d.difficulty]}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
                  " ",
                  d.difficulty
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-white/10 px-2 py-0.5", children: [
                  "from ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-white", children: [
                    "$",
                    d.priceFrom
                  ] })
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
export {
  DestinationCard as D
};
