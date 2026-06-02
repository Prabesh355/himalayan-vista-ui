import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mountain } from "lucide-react";

export function ComingSoon({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-12 md:p-20"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-summit shadow-glow animate-float">
          <Mountain className="h-7 w-7 text-white" />
        </div>
        {eyebrow && (
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent font-semibold">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          This page is part of the upcoming build. The Home and Destinations experiences are live —
          take a look while we keep climbing.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}

export function makeComingSoon(title: string, eyebrow = "Phase 2") {
  return function StubComponent() {
    return <ComingSoon title={title} eyebrow={eyebrow} />;
  };
}