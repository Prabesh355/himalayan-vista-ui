import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  LogOut, 
  ShieldCheck, 
  KeyRound, 
  Home, 
  BarChart3, 
  HelpCircle, 
  Quote, 
  MailCheck, 
  Save, 
  Settings2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { homeContentService, HomeContentData } from "@/services/homeContentService";
import { toast } from "sonner";

export const AdminSettings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "why" | "testimonials" | "cta" | "session">("hero");

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["admin-home-content"],
    queryFn: () => homeContentService.getHomeContent(),
  });

  const [formData, setFormData] = useState<HomeContentData | null>(null);

  useEffect(() => {
    if (response?.data) {
      setFormData(response.data);
    }
  }, [response]);

  const saveMutation = useMutation({
    mutationFn: (updatedData: HomeContentData) => homeContentService.updateHomeContent(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-home-content"] });
      queryClient.invalidateQueries({ queryKey: ["home-content"] });
      toast.success("Homepage content updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update homepage content");
    }
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("user");
    }
    navigate({ to: "/login" });
  };

  const handleSave = () => {
    if (formData) {
      saveMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !formData) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 flex items-center gap-3 text-red-500">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p>Failed to load homepage contents. Please ensure the backend server is reachable.</p>
      </div>
    );
  }

  const handleHeroChange = (field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [field]: val
        }
      };
    });
  };

  const handleCtaChange = (field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cta: {
          ...prev.cta,
          [field]: val
        }
      };
    });
  };

  const handleStatChange = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const nextStats = [...prev.stats];
      nextStats[index] = { ...nextStats[index], [field]: val };
      return { ...prev, stats: nextStats };
    });
  };

  const handleWhyChange = (index: number, field: "title" | "body" | "icon", val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const nextWhy = [...prev.why];
      nextWhy[index] = { ...nextWhy[index], [field]: val };
      return { ...prev, why: nextWhy };
    });
  };

  const handleTestimonialChange = (index: number, field: "name" | "country" | "quote" | "trek" | "avatar", val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const nextTestimonials = [...prev.testimonials];
      nextTestimonials[index] = { ...nextTestimonials[index], [field]: val };
      return { ...prev, testimonials: nextTestimonials };
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Content Editor</h1>
          <p className="text-muted-foreground">Manage and edit the dynamic sections of the Nomads Navigate Nepal homepage.</p>
        </div>
        {activeTab !== "session" && (
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/95 transition-all shadow-md hover:scale-102 active:scale-98 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-b pb-1">
        {[
          { id: "hero", label: "Hero Banner", icon: Home },
          { id: "stats", label: "Statistics", icon: BarChart3 },
          { id: "why", label: "Why Choose Us", icon: HelpCircle },
          { id: "testimonials", label: "Testimonials", icon: Quote },
          { id: "cta", label: "CTA Section", icon: MailCheck },
          { id: "session", label: "Session Basics", icon: Settings2 },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                isActive 
                  ? "bg-secondary text-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        {activeTab === "hero" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Hero Header Configuration</h2>
            <p className="text-sm text-muted-foreground">This content is displayed at the very top of the homepage.</p>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">Badge Banner text</label>
                <input
                  type="text"
                  value={formData.hero.badgeText}
                  onChange={(e) => handleHeroChange("badgeText", e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">Primary Title</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleHeroChange("title", e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-semibold uppercase"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">Subtitle Description</label>
                <textarea
                  value={formData.hero.description}
                  onChange={(e) => handleHeroChange("description", e.target.value)}
                  className="flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">Hero Background Image URL</label>
                <input
                  type="text"
                  value={formData.hero.backgroundImage || ""}
                  onChange={(e) => handleHeroChange("backgroundImage", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Statistics Config</h2>
              <p className="text-sm text-muted-foreground">Adjust the counter figures shown below the Hero section.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {formData.stats.map((s, index) => (
                <div key={index} className="border rounded-xl p-4 bg-background/50 space-y-3">
                  <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Stat Card #{index + 1}</h3>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Label</label>
                      <input
                        type="text"
                        value={s.label}
                        onChange={(e) => handleStatChange(index, "label", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Value</label>
                      <input
                        type="text"
                        value={s.value}
                        onChange={(e) => handleStatChange(index, "value", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "why" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">"Why Nomads" Core Strengths</h2>
              <p className="text-sm text-muted-foreground">Configure the three main pillars highlighting company advantages.</p>
            </div>
            <div className="space-y-4">
              {formData.why.map((w, index) => (
                <div key={index} className="border rounded-xl p-4 bg-background/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Advantage Block #{index + 1}</h3>
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Icon</label>
                      <select
                        value={w.icon}
                        onChange={(e) => handleWhyChange(index, "icon", e.target.value)}
                        className="h-8 rounded-lg border border-input bg-background px-2 py-1 text-xs"
                      >
                        <option value="Compass">Compass</option>
                        <option value="ShieldCheck">Shield Check</option>
                        <option value="Sparkles">Sparkles</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Title</label>
                      <input
                        type="text"
                        value={w.title}
                        onChange={(e) => handleWhyChange(index, "title", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Description Body</label>
                      <textarea
                        value={w.body}
                        onChange={(e) => handleWhyChange(index, "body", e.target.value)}
                        className="flex min-h-14 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Featured Customer Testimonials</h2>
              <p className="text-sm text-muted-foreground">Manage client reviews displayed directly on the homepage.</p>
            </div>
            <div className="space-y-5">
              {formData.testimonials.map((t, index) => (
                <div key={index} className="border rounded-xl p-4 bg-background/50 space-y-3">
                  <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Client Quote #{index + 1}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => handleTestimonialChange(index, "name", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Country</label>
                      <input
                        type="text"
                        value={t.country}
                        onChange={(e) => handleTestimonialChange(index, "country", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Trek Completed</label>
                      <input
                        type="text"
                        value={t.trek}
                        onChange={(e) => handleTestimonialChange(index, "trek", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-foreground/80">Avatar Image URL</label>
                      <input
                        type="text"
                        value={t.avatar}
                        onChange={(e) => handleTestimonialChange(index, "avatar", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <label className="text-xs font-semibold text-foreground/80">Quote Content</label>
                    <textarea
                      value={t.quote}
                      onChange={(e) => handleTestimonialChange(index, "quote", e.target.value)}
                      className="flex min-h-16 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cta" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Bottom CTA Block Setup</h2>
            <p className="text-sm text-muted-foreground">Adjust the title and descriptions shown inside the high-contrast gradient card at the bottom.</p>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">CTA Primary Title</label>
                <input
                  type="text"
                  value={formData.cta.title}
                  onChange={(e) => handleCtaChange("title", e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold">CTA Subtitle Details</label>
                <textarea
                  value={formData.cta.subtitle}
                  onChange={(e) => handleCtaChange("subtitle", e.target.value)}
                  className="flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "session" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground font-display">Session Management</h2>
              <p className="text-sm text-muted-foreground">Admin credentials and authentication tips.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border p-4 bg-background/50">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">Security Policy</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your credentials are encrypted using bcrypt and validated via JWT. Admin users cannot change roles from standard settings for safety.
                </p>
              </div>
              <div className="rounded-xl border p-4 bg-background/50">
                <div className="flex items-center gap-3 mb-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">Token Lifetime</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your token expires after 30 days. If your dashboard operations encounter unauthorized warnings, please sign out and sign back in to renew your JWT.
                </p>
              </div>
            </div>
            <div className="border-t pt-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-sm">Logout Session</h3>
                <p className="text-xs text-muted-foreground">Clear active credentials and navigate to the landing login page.</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
