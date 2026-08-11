import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  MessageSquare,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  Compass,
  Star,
  MapPin,
  CheckCircle2,
  Calendar,
  Send,
  Sparkles,
  Mountain,
  HeartPulse,
  Globe,
  Clock,
  Languages,
} from "lucide-react";
import nishantKarki from "@/assets/Nishant Karki.jpg";
import api from "@/services/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Talk to a Guide — Nishant Karki | Nomads Navigate Nepal" },
      {
        name: "description",
        content:
          "Consult directly with senior Himalayan guide Nishant Karki for free expert advice on trekking routes, safety, permits, and custom Nepal itineraries.",
      },
      { property: "og:title", content: "Talk to a Guide — Nishant Karki | Nomads Navigate Nepal" },
      {
        property: "og:description",
        content:
          "Connect directly with Nishant Karki, senior trekking guide at Nomads Navigate Nepal. 12+ years of Himalayan experience.",
      },
    ],
  }),
  component: TalkToGuidePage,
});

function TalkToGuidePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "whatsapp",
    subject: "Trek Consultation with Nishant Karki",
    inquiryType: "general_inquiry",
    preferredRegion: "Everest Region",
    travelDates: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const inquiryMutation = useMutation({
    mutationFn: async (payload: typeof formData) => {
      const response = await api.post("/inquiries", {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        subject: `${payload.subject} - ${payload.preferredRegion}`,
        inquiryType: payload.inquiryType,
        preferredContact: payload.preferredContact,
        message: `[Region: ${payload.preferredRegion}] [Dates: ${payload.travelDates || "Flexible"}]\n\n${payload.message}`,
      });
      return response.data;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Consultation request sent to Nishant Karki successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to submit inquiry. Please try again or message via WhatsApp.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (formData.message.length < 10) {
      toast.error("Please provide a message with at least 10 characters.");
      return;
    }
    inquiryMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Direct Guide Consultation
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-foreground">
            Talk to a <span className="text-accent">Guide</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Planning your Himalayan journey? Get 100% free, personalized advice directly from our senior lead guide, <strong className="text-foreground">Nishant Karki</strong>.
          </p>
        </motion.div>

        {/* Lead Guide Hero Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl bg-card border border-border/40 overflow-hidden shadow-elegant grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10"
        >
          {/* Image & Quick Badge Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative group w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-accent/30 shadow-glow">
              <img
                src={nishantKarki}
                alt="Nishant Karki - Senior Trekking Guide"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-1 border border-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  Available for Consultations
                </div>
                <h3 className="text-2xl font-bold font-display">Nishant Karki</h3>
                <p className="text-sm text-white/80">Senior Trekking Guide & Expedition Leader</p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm text-center">
              <div className="p-3 rounded-xl bg-secondary/15 border border-border/40">
                <div className="text-lg font-extrabold text-accent font-display">12+ Yrs</div>
                <div className="text-[11px] text-muted-foreground font-medium">Experience</div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/15 border border-border/40">
                <div className="text-lg font-extrabold text-accent font-display">450+</div>
                <div className="text-[11px] text-muted-foreground font-medium">Treks Led</div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/15 border border-border/40">
                <div className="text-lg font-extrabold text-accent font-display flex items-center justify-center gap-1">
                  4.9 <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">Rating</div>
              </div>
            </div>
          </div>

          {/* Guide Biography & Credentials Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-accent/15 text-accent text-xs font-bold uppercase tracking-wide">
                  Lead Guide
                </span>
                <span className="px-3 py-1 rounded-md bg-secondary/20 text-muted-foreground text-xs font-semibold">
                  NMA Certified
                </span>
                <span className="px-3 py-1 rounded-md bg-secondary/20 text-muted-foreground text-xs font-semibold">
                  High Altitude Specialist
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-foreground leading-tight">
                "Every step in the Himalayas is a story worth sharing safely."
              </h2>

              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                Nishant Karki is one of Nepal's most respected senior trekking leaders, having guided over 450 expeditions across the Everest, Annapurna, Manaslu, and Langtang mountain ranges. With deep roots in local Sherpa and Tamang mountain culture, Nishant combines safety-first altitude protocols with authentic local storytelling.
              </p>
            </div>

            {/* Specialties & Certifications */}
            <div className="space-y-3 pt-2 border-t border-border/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-display flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Certifications & Expertise
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90 font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/10 border border-border/40">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>NMA Certified High Altitude Guide</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/10 border border-border/40">
                  <HeartPulse className="w-4 h-4 text-accent shrink-0" />
                  <span>Wilderness First Responder (WFR)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/10 border border-border/40">
                  <Globe className="w-4 h-4 text-accent shrink-0" />
                  <span>Leave No Trace Master Educator</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/10 border border-border/40">
                  <Languages className="w-4 h-4 text-accent shrink-0" />
                  <span>English, Nepali, Hindi, Japanese</span>
                </div>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="https://wa.me/9779800000000?text=Hi%20Nishant!%20I%20would%20like%20to%20consult%20about%20trekking%20in%20Nepal."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow-glow transition duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Nishant
              </a>
              <a
                href="mailto:nomadsnavigatenepal5@gmail.com?subject=Consultation%20with%20Nishant%20Karki"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 border border-border/60 text-foreground font-semibold text-sm transition duration-200"
              >
                <Mail className="w-4 h-4 text-accent" />
                Email Guide
              </a>
              <a
                href="tel:+9779800000000"
                className="inline-flex items-center justify-center p-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 border border-border/60 text-foreground transition"
                title="Call Nishant Karki"
              >
                <Phone className="w-4 h-4 text-accent" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Grid: Form & Why Consult */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Consultation Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-card border border-border/40 rounded-3xl p-6 sm:p-8 shadow-elegant space-y-6"
          >
            <div className="space-y-2 border-b border-border/40 pb-5">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Free Consultation
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">
                Ask Nishant Anything About Your Trek
              </h3>
              <p className="text-muted-foreground text-sm">
                Fill out the form below. Nishant or our senior guide desk will reply directly within 2-4 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-green-950/30 border border-green-800/50 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
                <h4 className="text-xl font-bold font-display text-green-300">Message Received!</h4>
                <p className="text-sm text-green-200/90 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out to Nishant Karki. He will review your travel plans and reply to your preferred contact method shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Smith"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Preferred Region
                    </label>
                    <select
                      name="preferredRegion"
                      value={formData.preferredRegion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="Everest Region">Everest Region (EBC, Three Passes)</option>
                      <option value="Annapurna Region">Annapurna Region (ABC, Circuit, Mardi)</option>
                      <option value="Manaslu & Tsum">Manaslu & Tsum Valley</option>
                      <option value="Langtang Valley">Langtang Valley</option>
                      <option value="Peak Climbing">Peak Climbing & Expeditions</option>
                      <option value="Custom Itinerary">Custom / Other Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Target Travel Dates
                    </label>
                    <input
                      type="text"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      placeholder="e.g. October 2026 or Spring 2027"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    How should Nishant reply?
                  </label>
                  <div className="flex gap-4 text-xs font-medium text-foreground pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={formData.preferredContact === "whatsapp"}
                        onChange={handleChange}
                        className="accent-accent"
                      />
                      <span>WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={handleChange}
                        className="accent-accent"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === "phone"}
                        onChange={handleChange}
                        className="accent-accent"
                      />
                      <span>Phone Call</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Questions / Trek Goals *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell Nishant about your fitness level, group size, preferred duration, or any questions about high-altitude acclimatization..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryMutation.isPending}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-sunset hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-glow cursor-pointer transition flex items-center justify-center gap-2"
                >
                  {inquiryMutation.isPending ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Free Inquiry to Nishant Karki</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Consultation Benefits & FAQ Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Why Consult Card */}
            <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-4">
              <h4 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                <Mountain className="w-5 h-5 text-accent" />
                Why Consult Directly with Nishant?
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span><strong>Custom Route Tailoring:</strong> Adjust trail pace according to your group's fitness & acclimatization needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span><strong>Real-time Weather & Trail Updates:</strong> Current insights on Lukla flight status, snowpack, and tea house availability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span><strong>Gear & Packing Advice:</strong> Exact checklist guidance for sleeping bag ratings, down jackets, and boot break-in.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span><strong>Transparent Pricing:</strong> Clear breakdowns of permits (TIMS, Sagarmatha/Annapurna entry), porter logistics, and meals.</span>
                </li>
              </ul>
            </div>

            {/* Quick Response SLA */}
            <div className="p-6 rounded-3xl bg-accent/10 border border-accent/20 space-y-3 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto" />
              <h5 className="text-base font-bold font-display text-foreground">Rapid Response Guarantee</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nishant personally reviews inquiries between trekking departures. You will receive a direct reply within <strong>2 to 4 hours</strong>.
              </p>
            </div>

            {/* Office Contact Card */}
            <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-display">
                Company Headquarters
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>Thamel, Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+977 9800000000 / +977 1 4500000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>nomadsnavigatenepal5@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <span>Office Hours: Sun – Fri (6:00 AM – 8:00 PM NPT)</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
