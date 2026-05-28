import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Nomads Navigate Nepal" },
      { name: "description", content: "Your dashboard — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("Your dashboard"),
});
