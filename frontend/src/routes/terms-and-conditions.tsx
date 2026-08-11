import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Mountain,
  Plane,
  HeartPulse,
  CreditCard,
  Lock,
  UserCheck,
  Scale,
} from "lucide-react";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Nomads Navigate Nepal" },
      {
        name: "description",
        content:
          "Official Terms & Conditions governing bookings, trekking expeditions, tours, and travel services provided by Nomads Navigate Nepal.",
      },
      { property: "og:title", content: "Terms & Conditions — Nomads Navigate Nepal" },
      {
        property: "og:description",
        content:
          "Complete Terms & Conditions for trekking, peak climbing, expeditions, travel insurance, and adventure activities in Nepal.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

const termsSections = [
  {
    id: "acceptance-of-terms",
    number: "1",
    title: "ACCEPTANCE OF TERMS",
    icon: CheckCircle2,
    content: (
      <div className="space-y-3">
        <p>
          Online booking submission does not by itself guarantee a confirmed booking.
        </p>
        <p>
          A booking becomes confirmed only after Nomads Navigate Nepal accepts it and the required payment/deposit is received.
        </p>
        <p>
          By selecting <strong className="text-accent">“I Agree”</strong>, you confirm that your information is accurate, you understand these Terms, accept applicable payment/cancellation/refund conditions, understand the risks of trekking and adventure activities, and agree to follow reasonable instructions from guides and operators.
        </p>
        <p className="text-muted-foreground text-sm italic">
          If you do not agree, you must not submit the booking form.
        </p>
      </div>
    ),
  },
  {
    id: "client-information",
    number: "2",
    title: "CLIENT INFORMATION",
    icon: UserCheck,
    content: (
      <p>
        The Client must provide accurate booking information, including personal, passport, contact, emergency-contact, and other reasonably required information. The Client is responsible for checking submitted information, and the Company is not responsible for additional costs resulting from incorrect or incomplete information.
      </p>
    ),
  },
  {
    id: "booking-confirmation",
    number: "3",
    title: "BOOKING CONFIRMATION",
    icon: FileText,
    content: (
      <p>
        Bookings are subject to availability. Nomads Navigate Nepal may accept, decline, or request additional information. Confirmation may be provided through email, WhatsApp, written confirmation, invoice, or another official communication channel. Genuine administrative or pricing errors may be corrected before final confirmation.
      </p>
    ),
  },
  {
    id: "payment",
    number: "4",
    title: "PAYMENT",
    icon: CreditCard,
    content: (
      <p>
        Deposits and remaining balances are payable according to the quotation, invoice, or booking confirmation. Certain services may require full advance payment, including permits, flights, hotels, transportation, adventure activities, and third-party services. Failure to pay on time may result in cancellation and loss of amounts paid, subject to applicable cancellation terms. Transaction and currency-conversion charges may also apply.
      </p>
    ),
  },
  {
    id: "prices",
    number: "5",
    title: "PRICES",
    icon: Scale,
    content: (
      <p>
        Prices are based on the confirmed quotation or itinerary and may change before confirmation due to government fees, permits, airline charges, accommodation, transportation, taxes, exchange rates, or supplier costs. Additional services or client-requested changes after confirmation may incur additional charges.
      </p>
    ),
  },
  {
    id: "cancellation-by-client",
    number: "6",
    title: "CANCELLATION BY THE CLIENT",
    icon: AlertTriangle,
    content: (
      <p>
        Cancellation must be submitted through an official written communication channel. Cancellation charges depend on the cancellation date and service type. Non-refundable costs may include permits, conservation fees, flights, hotels, transportation, third-party activities, payment processing charges, and other committed costs. The applicable cancellation schedule will be stated in the booking confirmation where different from the standard policy.
      </p>
    ),
  },
  {
    id: "cancellation-by-company",
    number: "7",
    title: "CANCELLATION BY NOMADS NAVIGATE NEPAL",
    icon: ShieldCheck,
    content: (
      <p>
        The Company may cancel, postpone, modify, or reroute a trip when reasonably necessary for safety, operational, legal, or legitimate reasons, including severe weather, natural disasters, avalanches, landslides, floods, earthquakes, political unrest, strikes, road closures, flight disruptions, government restrictions, safety concerns, or force majeure. Alternative arrangements may be offered where reasonably possible, and refunds depend on services provided and recoverable/non-refundable third-party costs, subject to applicable law.
      </p>
    ),
  },
  {
    id: "itinerary-changes",
    number: "8",
    title: "ITINERARY CHANGES",
    icon: Mountain,
    content: (
      <p>
        Mountain and adventure itineraries are subject to weather, route, transportation, safety, and operational conditions. The Company may modify itineraries when reasonably necessary and will make reasonable efforts to provide alternative arrangements where practicable.
      </p>
    ),
  },
  {
    id: "flights-transportation",
    number: "9",
    title: "FLIGHTS & TRANSPORTATION",
    icon: Plane,
    content: (
      <p>
        Domestic mountain flights and transportation may be delayed or cancelled due to weather, operational conditions, technical issues, traffic, airport restrictions, or circumstances beyond the Company's control. The Company may assist with rebooking or alternatives where available, while additional disruption-related costs may be payable by the Client unless otherwise included or recoverable.
      </p>
    ),
  },
  {
    id: "trekking-high-altitude",
    number: "10",
    title: "TREKKING & HIGH-ALTITUDE ACTIVITIES",
    icon: Mountain,
    content: (
      <p>
        Trekking and high-altitude travel involve inherent risks including altitude sickness, injury, illness, falls, extreme weather, avalanches, landslides, and exhaustion. Clients must follow reasonable safety instructions and may be required to descend, stop, or leave an itinerary where continuing is considered unsafe. Summit achievement or completion of every itinerary day cannot be guaranteed.
      </p>
    ),
  },
  {
    id: "peak-climbing-expeditions",
    number: "11",
    title: "PEAK CLIMBING & EXPEDITIONS",
    icon: Mountain,
    content: (
      <p>
        Peak climbing and mountaineering are inherently hazardous and may involve falls, rockfall, avalanches, crevasses, extreme weather, altitude illness, frostbite, hypothermia, equipment failure, injury, and death. Participation may require appropriate fitness, experience, equipment, medical compliance, and regulatory requirements. Safety decisions made by qualified climbing or expedition leaders must be respected, and expedition success is not guaranteed.
      </p>
    ),
  },
  {
    id: "adventure-activities",
    number: "12",
    title: "ADVENTURE ACTIVITIES",
    icon: AlertTriangle,
    content: (
      <p>
        Adventure activities may involve significant physical and environmental risks. Clients must comply with Company and third-party operator safety requirements. Certain activities may require separate waivers, declarations, age restrictions, medical requirements, or safety conditions. Third-party operator terms may also apply.
      </p>
    ),
  },
  {
    id: "travel-insurance",
    number: "13",
    title: "TRAVEL INSURANCE",
    icon: ShieldCheck,
    content: (
      <p>
        Clients are responsible for obtaining appropriate travel insurance. For trekking, climbing, expeditions, and high-altitude activities, insurance should cover the relevant altitude and activity. Recommended coverage includes emergency medical treatment, helicopter evacuation, search and rescue, repatriation, cancellation, interruption, flight delays, personal accident, and baggage loss/theft.
      </p>
    ),
  },
  {
    id: "emergency-evacuation",
    number: "14",
    title: "EMERGENCY & EVACUATION",
    icon: HeartPulse,
    content: (
      <p>
        The Company may assist with coordinating medical treatment, rescue, evacuation, or transportation during emergencies. Emergency services such as helicopter evacuation may involve substantial costs, which are payable by the Client unless included in the package or covered by insurance, subject to applicable law.
      </p>
    ),
  },
  {
    id: "health-fitness",
    number: "15",
    title: "HEALTH & FITNESS",
    icon: HeartPulse,
    content: (
      <p>
        Clients are responsible for determining whether they are medically and physically fit for their selected activities. Relevant medical conditions, allergies, dietary requirements, mobility limitations, or other safety-related information must be disclosed accurately.
      </p>
    ),
  },
  {
    id: "passport-visa-permits",
    number: "16",
    title: "PASSPORT, VISA & PERMITS",
    icon: FileText,
    content: (
      <p>
        Clients are responsible for valid travel documents and immigration requirements and for providing accurate passport information. Government regulations, permit requirements, and fees may change. The Company may assist with permits and documentation where included in the package.
      </p>
    ),
  },
  {
    id: "accommodation",
    number: "17",
    title: "ACCOMMODATION",
    icon: MapPin,
    content: (
      <p>
        Accommodation will correspond to the category stated in the confirmed itinerary. Mountain accommodation may differ from city or international hotel standards, and facilities such as electricity, heating, hot water, internet, and private bathrooms may not always be available. Comparable alternatives may be provided where necessary.
      </p>
    ),
  },
  {
    id: "third-party-suppliers",
    number: "18",
    title: "THIRD-PARTY SUPPLIERS",
    icon: UserCheck,
    content: (
      <p>
        The Company may arrange services through independent airlines, hotels, transportation companies, helicopter operators, adventure operators, restaurants, and other suppliers. Such suppliers may have their own terms, cancellation policies, and operational requirements.
      </p>
    ),
  },
  {
    id: "client-conduct",
    number: "19",
    title: "CLIENT CONDUCT",
    icon: UserCheck,
    content: (
      <p>
        Clients must behave respectfully toward guides, porters, staff, local communities, and other travelers. Participation may be terminated where a Client endangers others, refuses safety instructions, engages in illegal conduct, threatens or abuses others, causes serious disruption, damages property, or violates laws/regulations. Additional costs may be payable by the Client, subject to applicable law.
      </p>
    ),
  },
  {
    id: "personal-belongings",
    number: "20",
    title: "PERSONAL BELONGINGS",
    icon: Lock,
    content: (
      <p>
        Clients are responsible for passports, money, electronics, luggage, equipment, and other personal belongings. Appropriate insurance is recommended. The Company is not responsible for loss or theft except where required by applicable law or caused by proven Company negligence.
      </p>
    ),
  },
  {
    id: "unused-services",
    number: "21",
    title: "UNUSED SERVICES",
    icon: FileText,
    content: (
      <p>
        No automatic refund applies to services voluntarily unused by the Client, including accommodation, meals, transportation, trekking days, activities, or other services. Any applicable refund will be assessed according to the circumstances and supplier policies.
      </p>
    ),
  },
  {
    id: "force-majeure",
    number: "22",
    title: "FORCE MAJEURE",
    icon: AlertTriangle,
    content: (
      <p>
        The Company is not responsible for failure or delay caused by circumstances beyond its reasonable control, including natural disasters, earthquakes, avalanches, severe weather, war, terrorism, civil unrest, strikes, epidemics, government restrictions, road closures, airport closures, and other unforeseeable events.
      </p>
    ),
  },
  {
    id: "liability",
    number: "23",
    title: "LIABILITY",
    icon: ShieldCheck,
    content: (
      <p>
        Nomads Navigate Nepal will exercise reasonable care in providing and arranging services. Clients acknowledge that trekking, climbing, mountaineering, and adventure activities involve inherent risks. Nothing in these Terms excludes liability that cannot legally be excluded or limited. The Company is not responsible for losses caused by circumstances outside its reasonable control or independent third-party acts, subject to applicable law.
      </p>
    ),
  },
  {
    id: "privacy-personal-data",
    number: "24",
    title: "PRIVACY & PERSONAL DATA",
    icon: Lock,
    content: (
      <p>
        Information submitted through the booking form may be used to process bookings and arrange permits, accommodation, transportation, insurance assistance, emergency support, and requested services. Personal information will be handled according to applicable Nepalese law and the Company's Privacy Policy. Necessary booking information may be shared with relevant service providers where reasonably required.
      </p>
    ),
  },
  {
    id: "electronic-acceptance",
    number: "25",
    title: "ELECTRONIC ACCEPTANCE & RECORDS",
    icon: CheckCircle2,
    content: (
      <p>
        Submitting the booking form and selecting “I Agree” constitutes electronic acceptance of these Terms, subject to applicable law. The Company may maintain electronic records of bookings, communications, payments, and Terms acceptance. The accepted version may be retained as part of the booking record.
      </p>
    ),
  },
  {
    id: "complaints",
    number: "26",
    title: "COMPLAINTS",
    icon: HelpCircle,
    content: (
      <p>
        Clients should report problems to the guide, trip leader, or Company as soon as reasonably possible. The Company will make reasonable efforts to investigate and resolve complaints during the trip. Formal complaints should be submitted in writing within a reasonable period after the relevant service.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: "27",
    title: "GOVERNING LAW",
    icon: Scale,
    content: (
      <p>
        These Terms are governed by the applicable laws of Nepal. Disputes should first be addressed through good-faith communication. If unresolved, disputes will be handled through the appropriate legal process and competent authority/court in Nepal, subject to applicable law.
      </p>
    ),
  },
  {
    id: "changes-to-terms",
    number: "28",
    title: "CHANGES TO THESE TERMS",
    icon: FileText,
    content: (
      <p>
        Nomads Navigate Nepal may update these Terms from time to time. The applicable version for a booking will generally be the version accepted by the Client at the time of booking, subject to changes required by applicable law.
      </p>
    ),
  },
  {
    id: "final-acceptance",
    number: "29",
    title: "FINAL ACCEPTANCE",
    icon: CheckCircle2,
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-foreground">
          By checking the acceptance box and submitting the booking form, the Client confirms:
        </p>
        <blockquote className="p-4 rounded-xl bg-accent/10 border-l-4 border-accent text-accent-foreground text-sm italic leading-relaxed">
          “I have read and understood the Terms & Conditions of Nomads Navigate Nepal and agree to be bound by them. I confirm that the information provided by me is accurate and complete, and I understand the risks associated with trekking, travel, peak climbing, expeditions and adventure activities.”
        </blockquote>
        <div className="pt-2 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm font-medium">
          <div className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>I Agree to the Terms & Conditions</span>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>I confirm that I have provided accurate information</span>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>I confirm that I understand the applicable cancellation and refund policy</span>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>I confirm that I understand the travel/adventure risks and insurance requirements</span>
          </div>
        </div>
      </div>
    ),
  },
];

function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 border-b border-border/40 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-foreground">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            These Terms & Conditions (“Terms”) govern all bookings and services provided by <strong className="text-foreground">Nomads Navigate Nepal</strong> (“Company”, “we”, “us”, or “our”) to the person making a booking (“Client”, “you”, or “your”).
          </p>
          <div className="p-4 rounded-xl bg-secondary/10 border border-border/40 max-w-2xl mx-auto text-left text-xs sm:text-sm text-muted-foreground leading-relaxed">
            By submitting the online booking form and selecting <strong className="text-accent">“I Agree”</strong>, you confirm that you have read, understood, and accepted these Terms & Conditions, subject to applicable law.
          </div>
        </motion.div>

        {/* Quick Nav / Index */}
        <div className="p-5 rounded-2xl bg-card border border-border/40 shadow-sm space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-display">
            Quick Navigation
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {termsSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-2.5 py-1 rounded-md bg-secondary/15 hover:bg-accent/20 border border-border/40 text-foreground transition"
              >
                {sec.number}. {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {termsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.3) }}
                className="p-6 sm:p-8 rounded-2xl bg-card border border-border/40 shadow-sm space-y-4 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent font-bold text-xs sm:text-sm font-display border border-accent/20 shrink-0">
                    {section.number}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-foreground flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent shrink-0 hidden sm:inline" />
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-foreground/90 leading-relaxed pt-1">
                  {section.content}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Support Callout & Office Details */}
        <div className="p-6 sm:p-8 rounded-2xl bg-secondary/10 border border-border/40 text-center space-y-6">
          <HelpCircle className="w-10 h-10 text-accent mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-foreground">Need Assistance or Have Questions?</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Our team is available 24/7 to clarify any booking terms, insurance guidelines, or trekking requirements before you embark.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 text-left">
            <div className="p-4 rounded-xl bg-card border border-border/40 flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Email Us</div>
                <a href="mailto:nomadsnavigatenepal5@gmail.com" className="text-xs sm:text-sm font-medium text-foreground hover:text-accent transition break-all">
                  nomadsnavigatenepal5@gmail.com
                </a>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40 flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Call / WhatsApp</div>
                <span className="text-xs sm:text-sm font-medium text-foreground">+977 9800000000</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Office Location</div>
                <span className="text-xs sm:text-sm font-medium text-foreground">Thamel, Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
