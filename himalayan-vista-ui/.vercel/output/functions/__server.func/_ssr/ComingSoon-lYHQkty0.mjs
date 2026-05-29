import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { e as Mountain, A as ArrowLeft } from "../_libs/lucide-react.mjs";
function ComingSoon({ title, eyebrow }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 py-32 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      className: "glass rounded-3xl p-12 md:p-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-summit shadow-glow animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-7 w-7 text-white" }) }),
        eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs uppercase tracking-[0.2em] text-accent font-semibold", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl md:text-5xl font-semibold tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-md mx-auto", children: "This page is part of the upcoming build. The Home and Destinations experiences are live — take a look while we keep climbing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back to home"
            ]
          }
        )
      ]
    }
  ) });
}
function makeComingSoon(title, eyebrow = "Phase 2") {
  return function StubComponent() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, { title, eyebrow });
  };
}
export {
  makeComingSoon as m
};
