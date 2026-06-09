import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
  Globe2,
  Upload
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { homeContentService, HomeContentData } from "@/services/homeContentService";
import { siteSettingsService, SiteSettingsData } from "@/services/siteSettingsService";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const AdminSettings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<
    "hero" | "stats" | "why" | "testimonials" | "cta" | "site" | "session"
  >("hero");
  const heroImageInputRef = useRef<HTMLInputElement | null>(null);
  const testimonialImageInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingImageContext, setUploadingImageContext] = useState<
    "hero" | "testimonial" | "site" | ""
  >("");
  const [testimonialUploadIndex, setTestimonialUploadIndex] = useState<number | null>(null);

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["admin-home-content"],
    queryFn: () => homeContentService.getHomeContent(),
  });
  const { data: siteResponse, isLoading: isSiteLoading, isError: isSiteError } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: () => siteSettingsService.getSiteSettings(),
  });

  const [formData, setFormData] = useState<HomeContentData | null>(null);
  const [siteFormData, setSiteFormData] = useState<SiteSettingsData | null>(null);
  const [siteJsonErrors, setSiteJsonErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (response?.data) {
      setFormData(response.data);
    }
  }, [response]);

  useEffect(() => {
    if (siteResponse?.data) {
      setSiteFormData(siteResponse.data);
    }
  }, [siteResponse]);

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
  const saveSiteMutation = useMutation({
    mutationFn: (updatedData: SiteSettingsData) => siteSettingsService.updateSiteSettings(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Site settings updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update site settings");
    },
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("user");
    }
    navigate({ to: "/login" });
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const result = await adminService.uploadImage(fd);
    return result?.fileUrl;
  };

  const handleHeroImageUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !formData) return;
    setUploadingImage(true);
    setUploadingImageContext("hero");
    try {
      const fileUrl = await uploadImage(file);
      if (fileUrl) {
        setFormData((prev) =>
          prev
            ? {
                ...prev,
                hero: {
                  ...prev.hero,
                  backgroundImage: fileUrl,
                },
              }
            : prev,
        );
        toast.success("Hero background image uploaded");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploadingImage(false);
      setUploadingImageContext("");
    }
  };

  const handleTestimonialAvatarUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (file == null || testimonialUploadIndex == null || !formData) return;
    setUploadingImage(true);
    setUploadingImageContext("testimonial");
    try {
      const fileUrl = await uploadImage(file);
      if (fileUrl) {
        setFormData((prev) => {
          if (!prev) return prev;
          const nextTestimonials = [...prev.testimonials];
          nextTestimonials[testimonialUploadIndex] = {
            ...nextTestimonials[testimonialUploadIndex],
            avatar: fileUrl,
          };
          return { ...prev, testimonials: nextTestimonials };
        });
        toast.success("Testimonial avatar uploaded");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploadingImage(false);
      setUploadingImageContext("");
      setTestimonialUploadIndex(null);
    }
  };

  const requestTestimonialUpload = (index: number) => {
    setTestimonialUploadIndex(index);
    testimonialImageInputRef.current?.click();
  };

  const requestHeroImageUpload = () => {
    heroImageInputRef.current?.click();
  };

  const handleSave = () => {
    if (activeTab === "site") {
      if (!siteFormData) return;
      if (Object.values(siteJsonErrors).some(Boolean)) {
        toast.error("Fix the JSON fields before saving site settings.");
        return;
      }
      saveSiteMutation.mutate(siteFormData);
      return;
    }

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

  const handleSiteChange = (field: keyof SiteSettingsData, val: string) => {
    setSiteFormData((prev) => (prev ? { ...prev, [field]: val } : prev));
  };

  const handleSocialChange = (
    field: keyof SiteSettingsData["socialLinks"],
    val: string,
  ) => {
    setSiteFormData((prev) =>
      prev ? { ...prev, socialLinks: { ...prev.socialLinks, [field]: val } } : prev,
    );
  };

  const handleSeoChange = (field: NonNullable<SiteSettingsData["seo"]> extends infer T ? keyof T : never, val: string) => {
    setSiteFormData((prev) =>
      prev ? { ...prev, seo: { ...(prev.seo || {}), [field]: val } } : prev,
    );
  };

  const handleJsonChange = (
    field: "navbarItems" | "footerColumns",
    value: string,
  ) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        throw new Error("Value must be an array.");
      }
      setSiteJsonErrors((prev) => ({ ...prev, [field]: undefined }));
      setSiteFormData((prev) => (prev ? { ...prev, [field]: parsed } : prev));
    } catch (error) {
      setSiteJsonErrors((prev) => ({
        ...prev,
        [field]: error instanceof Error ? error.message : "Invalid JSON",
      }));
    }
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
          { id: "site", label: "Site CMS", icon: Globe2 },
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="text"
                    value={formData.hero.backgroundImage || ""}
                    onChange={(e) => handleHeroChange("backgroundImage", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={requestHeroImageUpload}
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/90"
                    disabled={uploadingImage && uploadingImageContext === "hero"}
                  >
                    <Upload className="w-4 h-4" />
                    {uploadingImage && uploadingImageContext === "hero" ? "Uploading..." : "Upload Image"}
                  </button>
                  <input
                    ref={heroImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleHeroImageUpload(e.target.files);
                      if (e.target) e.target.value = "";
                    }}
                  />
                </div>
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
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={t.avatar}
                          onChange={(e) => handleTestimonialChange(index, "avatar", e.target.value)}
                          className="flex-1 h-9 rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => requestTestimonialUpload(index)}
                          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-secondary/90"
                          disabled={uploadingImage && uploadingImageContext === "testimonial" && testimonialUploadIndex === index}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingImage && uploadingImageContext === "testimonial" && testimonialUploadIndex === index
                            ? "Uploading..."
                            : "Upload"}
                        </button>
                      </div>
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
              <input
                ref={testimonialImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleTestimonialAvatarUpload(e.target.files);
                  if (e.target) e.target.value = "";
                }}
              />
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

        {activeTab === "site" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Global Website Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage shared navbar, footer, contact, social, logo, and SEO content used across the public website.
              </p>
            </div>

            {isSiteLoading && (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}

            {(isSiteError || !siteFormData) && !isSiteLoading && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
                Failed to load site settings. Please ensure the backend server is reachable.
              </div>
            )}

            {siteFormData && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Website Name</label>
                    <input
                      type="text"
                      value={siteFormData.siteName}
                      onChange={(e) => handleSiteChange("siteName", e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Logo URL</label>
                    <input
                      type="text"
                      value={siteFormData.logoUrl || ""}
                      onChange={(e) => handleSiteChange("logoUrl", e.target.value)}
                      placeholder="Leave empty to use bundled logo"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Contact Email</label>
                    <input
                      type="email"
                      value={siteFormData.contactEmail}
                      onChange={(e) => handleSiteChange("contactEmail", e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Contact Phone</label>
                    <input
                      type="text"
                      value={siteFormData.contactPhone}
                      onChange={(e) => handleSiteChange("contactPhone", e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold">Address</label>
                    <input
                      type="text"
                      value={siteFormData.address}
                      onChange={(e) => handleSiteChange("address", e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold">Footer Tagline</label>
                    <textarea
                      value={siteFormData.footerTagline}
                      onChange={(e) => handleSiteChange("footerTagline", e.target.value)}
                      className="flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold">Copyright Text</label>
                    <input
                      type="text"
                      value={siteFormData.copyrightText}
                      onChange={(e) => handleSiteChange("copyrightText", e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="rounded-xl border bg-background/50 p-4">
                  <h3 className="text-sm font-bold">Social Media Links</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {(["instagram", "facebook", "twitter", "youtube"] as const).map((key) => (
                      <div key={key} className="grid gap-1.5">
                        <label className="text-xs font-semibold capitalize text-muted-foreground">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={siteFormData.socialLinks?.[key] || ""}
                          onChange={(e) => handleSocialChange(key, e.target.value)}
                          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Navbar Items JSON</label>
                    <textarea
                      defaultValue={JSON.stringify(siteFormData.navbarItems, null, 2)}
                      onChange={(e) => handleJsonChange("navbarItems", e.target.value)}
                      className="min-h-72 w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs"
                    />
                    {siteJsonErrors.navbarItems && (
                      <p className="text-xs text-red-500">{siteJsonErrors.navbarItems}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-sm font-semibold">Footer Columns JSON</label>
                    <textarea
                      defaultValue={JSON.stringify(siteFormData.footerColumns, null, 2)}
                      onChange={(e) => handleJsonChange("footerColumns", e.target.value)}
                      className="min-h-72 w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs"
                    />
                    {siteJsonErrors.footerColumns && (
                      <p className="text-xs text-red-500">{siteJsonErrors.footerColumns}</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border bg-background/50 p-4">
                  <h3 className="text-sm font-bold">Default SEO Metadata</h3>
                  <div className="mt-4 grid gap-4">
                    <input
                      type="text"
                      value={siteFormData.seo?.metaTitle || ""}
                      onChange={(e) => handleSeoChange("metaTitle", e.target.value)}
                      placeholder="Meta title"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <textarea
                      value={siteFormData.seo?.metaDescription || ""}
                      onChange={(e) => handleSeoChange("metaDescription", e.target.value)}
                      placeholder="Meta description"
                      className="flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={siteFormData.seo?.metaKeywords || ""}
                      onChange={(e) => handleSeoChange("metaKeywords", e.target.value)}
                      placeholder="Meta keywords"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
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
