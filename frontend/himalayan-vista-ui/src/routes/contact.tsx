import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Talk to a guide — Nomads Navigate Nepal" },
      { name: "description", content: "Talk to a guide — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("Talk to a guide"),
});
