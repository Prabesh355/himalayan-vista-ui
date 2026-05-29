import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as stats, d as destinations, D as DestinationCard, t as testimonials } from "./mockData-DGDYsaR4.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { h as Sparkles, a as ArrowRight, b as Compass, f as ShieldCheck, i as Star } from "../_libs/lucide-react.mjs";
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
const heroImg = "/assets/hero-himalayas-CwQ6XFNk.jpg";
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedDestinations, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Why, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative -mt-20 min-h-[100svh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Himalayan peaks at sunset with prayer flags", width: 1920, height: 1080, className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,oklch(0.16_0.025_250/0.6)_100%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-20 pt-40 min-h-[100svh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }, className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-white border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-amber-300" }),
          "Spring 2026 departures open · save 15%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.02]", children: [
          "Breathe in the",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-sunset", children: "roof of the world." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-lg text-white/85 leading-relaxed", children: "Hand-crafted Himalayan journeys led by the people who grew up on these trails. From the Everest icefall to lakeside Pokhara — Nepal, your way." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "group inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5", children: [
            "Explore destinations",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-white border border-white/25 hover:bg-white/20", children: "Talk to a guide" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 40
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 1,
        delay: 0.3
      }, className: "mt-14 grid max-w-5xl gap-3 md:grid-cols-4 glass rounded-3xl p-3", children: [{
        label: "Destination",
        value: "Everest Region"
      }, {
        label: "Trek style",
        value: "Classic · Lodge"
      }, {
        label: "When",
        value: "Apr – May 2026"
      }, {
        label: "Travellers",
        value: "2 adults"
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "rounded-2xl bg-white/5 hover:bg-white/10 transition px-4 py-3 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-white/60", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-semibold text-white", children: f.value })
      ] }, f.label)) })
    ] })
  ] });
}
function Stats() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    duration: 0.5,
    delay: i * 0.08
  }, className: "glass rounded-2xl p-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl md:text-4xl font-semibold text-gradient-summit", children: s.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: s.label })
  ] }, s.label)) }) });
}
function FeaturedDestinations() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent uppercase tracking-wider", children: "Featured journeys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 text-4xl md:text-5xl font-semibold tracking-tight", children: [
          "Where in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-summit", children: "Nepal" }),
          " next?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: "Six signature regions, hundreds of itineraries. Hover a card to start dreaming." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "group inline-flex items-center gap-2 self-start rounded-full glass px-5 py-2.5 text-sm font-semibold transition hover:shadow-glow", children: [
        "View all",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: destinations.slice(0, 6).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { d, index: i }, d.id)) })
  ] });
}
function Why() {
  const items = [{
    icon: Compass,
    title: "Locally led, always",
    body: "Every trek is guided by certified Nepali leaders born in the regions you'll trek."
  }, {
    icon: ShieldCheck,
    title: "Safety isn't optional",
    body: "Oxygen, satellite comms and IFMGA-trained guides on every high-altitude departure."
  }, {
    icon: Sparkles,
    title: "Small, by design",
    body: "Group sizes capped at 10 so trails stay quiet and tea-house chats stay personal."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent uppercase tracking-wider", children: "Why Nomads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-4xl md:text-5xl font-semibold tracking-tight", children: "The difference is in the details." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-6 md:grid-cols-3", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6,
        delay: i * 0.1
      }, className: "glass rounded-3xl p-7 hover:shadow-elegant transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-summit shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl font-semibold", children: it.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: it.body })
      ] }, it.title)) })
    ] })
  ] });
}
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent uppercase tracking-wider", children: "Travellers' tales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-4xl md:text-5xl font-semibold tracking-tight", children: "12,000+ stories. Here are three." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.figure, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.6,
      delay: i * 0.1
    }, className: "glass rounded-3xl p-7 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-amber-400", children: Array.from({
        length: 5
      }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 text-foreground/90 leading-relaxed", children: [
        '"',
        t.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 flex items-center gap-3 pt-5 border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar, alt: t.name, className: "h-10 w-10 rounded-full object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            t.country,
            " · ",
            t.trek
          ] })
        ] })
      ] })
    ] }, t.id)) })
  ] });
}
function CTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2.5rem] bg-gradient-aurora p-10 md:p-16 shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-black/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Your Nepal story starts with one email." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/85 text-lg", children: "Tell us your dates and dream peak — we'll come back within 24 hours with a tailor-made plan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft hover:-translate-y-0.5 transition", children: [
          "Start planning",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20", children: "Browse treks" })
      ] })
    ] })
  ] }) });
}
export {
  Index as component
};
