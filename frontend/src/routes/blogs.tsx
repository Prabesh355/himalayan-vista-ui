import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Stories from the trail — Nomads Navigate Nepal" },
      { name: "description", content: "Stories from the trail — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("Stories from the trail"),
});
