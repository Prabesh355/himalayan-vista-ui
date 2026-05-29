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
const everest = "/assets/dest-everest-rsbMFCDc.jpg";
const annapurna = "/assets/dest-annapurna-Xdh7294M.jpg";
const pokhara = "/assets/dest-pokhara-D9xiZnd-.jpg";
const kathmandu = "/assets/dest-kathmandu-xHfsRDWM.jpg";
const langtang = "/assets/dest-langtang-Cmd7sdKY.jpg";
const chitwan = "/assets/dest-chitwan-B1lWtWrL.jpg";
const destinations = [
  {
    id: "1",
    slug: "everest-base-camp",
    name: "Everest Base Camp",
    region: "Everest",
    tagline: "Walk in the footsteps of legends",
    description: "The classic trek to the foot of the world's highest mountain, through Sherpa villages, Buddhist monasteries and surreal high-altitude landscapes.",
    image: everest,
    altitude: "5,364 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Challenging",
    duration: "14 days",
    priceFrom: 1499,
    rating: 4.9,
    reviews: 312,
    tags: ["Trekking", "Iconic", "High Altitude"]
  },
  {
    id: "2",
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    tagline: "A journey through every climate zone",
    description: "From subtropical forests to the Thorong La pass at 5,416m — the most diverse trek in the Himalayas.",
    image: annapurna,
    altitude: "5,416 m",
    bestSeason: "Oct–Nov · Mar–Apr",
    difficulty: "Challenging",
    duration: "16 days",
    priceFrom: 1299,
    rating: 4.8,
    reviews: 248,
    tags: ["Trekking", "Cultural", "Pass"]
  },
  {
    id: "3",
    slug: "pokhara-phewa",
    name: "Pokhara & Phewa Lake",
    region: "Pokhara",
    tagline: "Lakeside calm beneath the fishtail",
    description: "Paragliding, lakeside cafés, and dawn reflections of Machapuchare — the perfect launchpad for Annapurna adventures.",
    image: pokhara,
    altitude: "822 m",
    bestSeason: "Year-round",
    difficulty: "Easy",
    duration: "3 days",
    priceFrom: 299,
    rating: 4.7,
    reviews: 521,
    tags: ["City", "Lake", "Adventure"]
  },
  {
    id: "4",
    slug: "kathmandu-heritage",
    name: "Kathmandu Heritage",
    region: "Kathmandu Valley",
    tagline: "Seven UNESCO sites in one valley",
    description: "Boudhanath, Pashupatinath, Durbar Squares and ancient Newar towns — a cultural deep-dive through living history.",
    image: kathmandu,
    altitude: "1,400 m",
    bestSeason: "Oct–Mar",
    difficulty: "Easy",
    duration: "4 days",
    priceFrom: 449,
    rating: 4.6,
    reviews: 389,
    tags: ["Cultural", "UNESCO", "City"]
  },
  {
    id: "5",
    slug: "langtang-valley",
    name: "Langtang Valley",
    region: "Langtang",
    tagline: "Quiet trails, glacial meadows",
    description: "Less crowded than Everest or Annapurna — pristine alpine valleys, yak pastures and warm Tamang hospitality.",
    image: langtang,
    altitude: "4,984 m",
    bestSeason: "Mar–May · Oct–Nov",
    difficulty: "Moderate",
    duration: "10 days",
    priceFrom: 899,
    rating: 4.8,
    reviews: 156,
    tags: ["Trekking", "Off-beat", "Wildlife"]
  },
  {
    id: "6",
    slug: "chitwan-safari",
    name: "Chitwan Jungle Safari",
    region: "Lowlands",
    tagline: "Rhinos, tigers and ancient jungles",
    description: "Trade peaks for plains — jeep safaris, canoe rides and Tharu villages in Nepal's first national park.",
    image: chitwan,
    altitude: "150 m",
    bestSeason: "Oct–Mar",
    difficulty: "Easy",
    duration: "3 days",
    priceFrom: 399,
    rating: 4.7,
    reviews: 274,
    tags: ["Wildlife", "Safari", "Jungle"]
  }
];
const testimonials = [
  {
    id: "t1",
    name: "Maya Tanaka",
    country: "Japan",
    avatar: "https://i.pravatar.cc/120?img=47",
    quote: "The EBC trek with Nomads was the trip of a lifetime. Our guide Tenzing made every day feel both safe and magical.",
    trek: "Everest Base Camp"
  },
  {
    id: "t2",
    name: "Lucas Ferreira",
    country: "Brazil",
    avatar: "https://i.pravatar.cc/120?img=12",
    quote: "Beautifully organised. Tea-houses, permits, transfers — everything just worked. I focused on the mountains.",
    trek: "Annapurna Circuit"
  },
  {
    id: "t3",
    name: "Priya Sharma",
    country: "India",
    avatar: "https://i.pravatar.cc/120?img=32",
    quote: "Langtang felt like a hidden secret. Our small group, the silence of the valleys, the food — perfection.",
    trek: "Langtang Valley"
  }
];
const stats = [
  { label: "Happy travellers", value: "12K+" },
  { label: "Treks led", value: "850+" },
  { label: "Years in Nepal", value: "14" },
  { label: "Avg. rating", value: "4.9" }
];
export {
  DestinationCard as D,
  destinations as d,
  stats as s,
  testimonials as t
};
