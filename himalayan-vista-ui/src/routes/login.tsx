import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in / Register — Nomads Navigate Nepal" },
      { name: "description", content: "Sign in / Register — Nomads Navigate Nepal." },
    ],
  }),
  component: makeComingSoon("Sign in / Register"),
});
