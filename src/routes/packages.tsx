import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Trekking Packages — Nomads Navigate Nepal" },
      { name: "description", content: "Trekking Packages — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("Trekking Packages"),
});
