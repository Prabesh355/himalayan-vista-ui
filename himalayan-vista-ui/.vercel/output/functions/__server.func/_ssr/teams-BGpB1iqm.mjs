import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as teamMembers } from "./mockData-CJYvBa3A.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { U as Users } from "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function TeamsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7
      }, className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent uppercase tracking-wider", children: "Our Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 text-5xl md:text-6xl font-semibold tracking-tight", children: [
          "Meet the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-sunset", children: "experts." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-2xl", children: "Our experienced guides and leaders are local experts with decades of combined experience leading adventurers through the Himalayas. Your safety, comfort, and experience are our top priorities." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold mb-4", children: "Our Guides" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl", children: "Each member of our team brings unique expertise and a passion for the mountains." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: teamMembers.map((member, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-60px"
      }, transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }, className: "group rounded-3xl glass overflow-hidden shadow-soft transition-all hover:shadow-elegant hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: member.avatar, alt: member.name, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold tracking-tight", children: member.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-medium text-gradient-sunset", children: member.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3", children: member.bio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 pt-4 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Expert Guide" })
          ] })
        ] })
      ] }, member.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-20 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl glass p-12 md:p-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold mb-4", children: "Ready to Trek?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto mb-8", children: "Connect with our guides and plan your Himalayan adventure. Each trek is customized to your experience level and preferences." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex items-center justify-center rounded-full bg-gradient-sunset px-8 py-4 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5", children: "Plan Your Trek" })
    ] }) })
  ] });
}
export {
  TeamsPage as component
};
