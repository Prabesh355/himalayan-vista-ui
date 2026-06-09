import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { teamMembers } from "@/services/uiData";
import { api } from "@/services/api";
import type { TeamItem } from "@/services/adminService";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Our Team — Nomads Navigate Nepal" },
      {
        name: "description",
        content:
          "Meet our experienced trekking guides and expedition leaders. Local experts with decades of combined experience in the Himalayas.",
      },
      { property: "og:title", content: "Our Team — Nomads Navigate Nepal" },
      {
        property: "og:description",
        content: "Meet the expert guides who lead our Himalayan adventures.",
      },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const { data } = useQuery({
    queryKey: ["team-members", "public"],
    queryFn: async () => (await api.get<{ success: boolean; data: TeamItem[] }>("/team-members")).data,
  });

  const members = data?.data && data.data.length > 0 ? data.data : teamMembers;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />

        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Our Team</p>
            <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight">
              Meet the <span className="text-gradient-sunset">experts.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Our experienced guides and leaders are local experts with decades of combined
              experience leading adventurers through the Himalayas. Your safety, comfort, and
              experience are our top priorities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Guides</h2>
          <p className="text-muted-foreground max-w-2xl">
            Each member of our team brings unique expertise and a passion for the mountains.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-3xl glass overflow-hidden shadow-soft transition-all hover:shadow-elegant hover:-translate-y-1"
            >
              <div className="overflow-hidden aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
                <img
                  src={member.avatar || "https://via.placeholder.com/600x600?text=Team"}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-gradient-sunset">{member.role}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
                <div className="mt-6 flex items-center gap-2 pt-4 border-t border-border/40">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium text-muted-foreground">Expert Guide</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 border-t border-border/60">
        <div className="rounded-3xl glass p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Trek?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with our guides and plan your Himalayan adventure. Each trek is customized to
            your experience level and preferences.
          </p>
          <button className="inline-flex items-center justify-center rounded-full bg-gradient-sunset px-8 py-4 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5">
            Plan Your Trek
          </button>
        </div>
      </section>
    </>
  );
}
