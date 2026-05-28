import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nomads — Nomads Navigate Nepal" },
      { name: "description", content: "About Nomads — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("About Nomads"),
});
