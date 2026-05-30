import everest from "@/assets/everest-base-camp.jpeg";
import mera from "@/assets/mera-peak-expedition.jpg";
import meraSki from "@/assets/mera-peak-ski.jpg";
import annapurna from "@/assets/annapurna-base-camp.jpg";
import annapurnaCircuit from "@/assets/annapurna-circuit.jpg";
import manaslu from "@/assets/manaslu.jpg";
import lobucheEast from "@/assets/lobuche-east.jpg";
import threePass from "@/assets/everest-three-pass-trek.jpg";
import pokhara from "@/assets/dest-pokhara.jpg";
import kathmandu from "@/assets/dest-kathmandu.jpg";
import langtang from "@/assets/dest-langtang.jpg";
import chitwan from "@/assets/dest-chitwan.jpg";

// Team member images
import nishantKarki from "@/assets/Nishant Karki.jpg";
import sukadevThapa from "@/assets/Sukadev Thapa.jpeg";
import prashantManiTamang from "@/assets/Prashant Mani Tamang.jpg";
import aadarshaBhandari from "@/assets/Aadarsha Bhandari.jpg";
import simonBhattarai from "@/assets/Simon Bhattarai.jpg";
import janguSherpa from "@/assets/Jangu Sherpa.jpg";

export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";
export type Region = "Everest" | "Annapurna" | "Langtang" | "Kathmandu Valley" | "Pokhara" | "Lowlands";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: Region;
  tagline: string;
  description: string;
  // Optional rich itinerary/notes HTML/Markdown string to show in the "Trekking" package details
  itinerary?: string;
  image: string;
  altitude: string;
  bestSeason: string;
  difficulty: Difficulty;
  duration: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "everest-base-camp",
    name: "Everest Base Camp",
    region: "Everest",
    tagline: "Walk in the footsteps of legends",
    description:
      "The classic trek to the foot of the world's highest mountain, through Sherpa villages, Buddhist monasteries and surreal high-altitude landscapes.",
    image: everest,
    altitude: "5,364 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Challenging",
    duration: "14 days",
    priceFrom: 1499,
    rating: 4.9,
    reviews: 312,
    tags: ["Trekking", "Iconic", "High Altitude"],
  },
  {
    id: "2",
    slug: "mera-peak-ski",
    name: "Mera Peak Ski",
    region: "Everest",
    tagline: "Highest ski descent in Nepal",
    description:
      "Combine trekking and skiing in one adventure. Ascend Mera Peak and ski down the pristine slopes of the Himalayas.",
    itinerary: `
### Mera Peak Ski Expedition — 18 Days

Day 01: Arrival in Kathmandu (1,400m) — airport pickup, expedition briefing.
Day 02: Kathmandu preparation — permits, gear checks, guide meeting.
Day 03: Fly to Lukla & trek to Paiya (5–6 hrs).
Day 04: Trek to Panggom (5–6 hrs).
Day 05: Trek to Ningsow (5–6 hrs).
Day 06: Trek to Chhatra Khola (6–7 hrs).
Day 07: Trek to Kothe via Hinku Valley (6–7 hrs).
Day 08: Trek to Thangnak (4–5 hrs).
Day 09: Acclimatization and ski drills.
Day 10: Trek to Khare (4–5 hrs) — Mera base settlement.
Day 11: Ski training & climbing practice (ropework, crampons, glacier travel).
Day 12: Trek to High Camp (5–6 hrs) — glacier approach.
Day 13: Summit Mera Peak (6,476m) & ski descent (8–10 hrs).
Day 14: Trek to Kothe (5–6 hrs).
Day 15: Trek to Thuli Kharka (6–7 hrs).
Day 16: Trek to Lukla via Zatrwa La Pass (6–8 hrs).
Day 17: Fly back to Kathmandu — farewell dinner.
Day 18: Final departure.

Notes: Designed for experienced backcountry skiers. Includes guide support, technical training, and proper acclimatization.`,
    image: meraSki,
    altitude: "6,476 m",
    bestSeason: "Mar–May",
    difficulty: "Strenuous",
    duration: "18 days",
    priceFrom: 2199,
    rating: 4.9,
    reviews: 89,
    tags: ["Trekking", "Skiing", "Adventure"],
  },
  {
    id: "3",
    slug: "mera-peak-expedition",
    name: "Mera Peak Expedition",
    region: "Everest",
    tagline: "Conquer Nepal's most accessible 6000m peak",
    description:
      "A thrilling climbing expedition to Mera Peak. Experience high-altitude mountaineering with stunning Himalayan views.",
    itinerary: `
### Mera Peak Expedition — 16 days (climbing-focused)

Day 01: Arrival Kathmandu — briefing and hotel.
Day 02: Preparation day — permits & gear check.
Day 03: Fly to Lukla & trek to Paiya (5–6 hrs).
Day 04: Trek to Panggom (5–6 hrs).
Day 05: Trek to Ningsow (5–6 hrs).
Day 06: Trek to Chhatra Khola (6–7 hrs).
Day 07: Trek to Kothe (6–7 hrs) — enter Hinku Valley.
Day 08: Trek to Thangnak (4–5 hrs).
Day 09: Acclimatization day — short hikes and skills.
Day 10: Trek to Khare (4–5 hrs).
Day 11: Climbing practice — ropework, crampons, glacier travel.
Day 12: Trek to High Camp (5–6 hrs).
Day 13: Summit push to Mera Peak (6,476m) & descend (8–10 hrs).
Day 14: Trek to Kothe (5–6 hrs).
Day 15: Trek to Lukla (6–8 hrs).
Day 16: Fly to Kathmandu — departure or extra night.
`,
    image: mera,
    altitude: "6,476 m",
    bestSeason: "Mar–May · Sep–Oct",
    difficulty: "Strenuous",
    duration: "16 days",
    priceFrom: 1799,
    rating: 4.8,
    reviews: 156,
    tags: ["Climbing", "Expedition", "High Altitude"],
  },
  {
    id: "4",
    slug: "manaslu-tsum-valley",
    name: "Manaslu and Tsum Valley",
    region: "Annapurna",
    tagline: "Sacred peaks and remote wilderness",
    description:
      "Trek around the eighth-highest mountain in the world. Experience remote valleys, monasteries, and pristine alpine landscapes.",
    itinerary: `
### Manaslu Circuit (with optional Tsum Valley) — typical 13–18 days

Overview: The Manaslu Circuit winds through the Budi Gandaki gorge and Larkya La (5,167m). The route is remote, varied and less crowded than other classic treks.

Sample itinerary (13 days core; extend to 18 days with Tsum Valley):
Day 1: Arrival Kathmandu — trek briefing.
Day 2: Drive to Soti Khola / Macha Khola — start trek.
Day 3–6: Trek through terraced lowlands, waterfalls and forests to Namrung / Samagaon.
Day 7: Acclimatization — short hikes and monastery visits.
Day 8–9: Trek toward Samdo and Dharmasala (approach to Larkya La).
Day 10: Early start — cross Larkya La (5,167 m) and descend to Bimthang.
Day 11–12: Continue descent to Dharapani / Jagat and drive out to Besishar.
Day 13: Return to Kathmandu or extend via Tsum Valley for 4–5 extra days exploring remote monasteries and valleys.

Notes: Challenging terrain with high passes; micro crampons recommended on icy sections. Permit and restricted-area requirements apply.`,
    image: manaslu,
    altitude: "5,160 m",
    bestSeason: "Sep–Nov · Mar–May",
    difficulty: "Challenging",
    duration: "18 days",
    priceFrom: 1599,
    rating: 4.8,
    reviews: 134,
    tags: ["Trekking", "Spiritual", "Remote"],
  },
  {
    id: "5",
    slug: "annapurna-base-camp",
    name: "Annapurna Base Camp",
    region: "Annapurna",
    tagline: "Surrounded by the Annapurna massif",
    description:
      "Trek to the heart of the Annapurna range. Wake up to stunning 360-degree views of snow-capped peaks at 4,130m.",
    image: annapurna,
    altitude: "4,130 m",
    bestSeason: "Oct–Nov · Mar–May",
    difficulty: "Moderate",
    duration: "10 days",
    priceFrom: 899,
    rating: 4.9,
    reviews: 421,
    tags: ["Trekking", "Scenic", "Views"],
  },
  {
    id: "6",
    slug: "lobuche-east",
    name: "Lobuche East",
    region: "Everest",
    tagline: "Alpine climbing with Everest views",
    description:
      "Combine trekking to Everest Base Camp with a thrilling climb to Lobuche East, with spectacular mountain panoramas.",
    itinerary: `
### Lobuche East Expedition — 18 Days (sample)

Day 01: Arrival Kathmandu (1,400m) — briefing and hotel.
Day 02: Preparation day — permits & gear check.
Day 03: Fly to Lukla & trek to Phakding (3–4 hrs).
Day 04: Trek to Namche Bazaar (6–7 hrs).
Day 05: Acclimatization day at Namche Bazaar.
Day 06: Trek to Tengboche (5–6 hrs).
Day 07: Trek to Dingboche (5–6 hrs).
Day 08: Acclimatization at Dingboche.
Day 09: Trek to Lobuche (5–6 hrs).
Day 10: Trek to Everest Base Camp & return to Gorak Shep (7–8 hrs).
Day 11: Sunrise hike to Kala Patthar (5,545m) & return to Lobuche.
Day 12: Trek to Lobuche High Camp (prepare for summit).
Day 13: Summit Lobuche East (6,119m) & descend to Pheriche (8–10 hrs).
Day 14: Contingency/rest day.
Day 15: Trek to Namche Bazaar (6–7 hrs).
Day 16: Trek to Lukla (6–7 hrs).
Day 17: Fly to Kathmandu & farewell dinner.
Day 18: Final departure.

Notes: Fixed rope sections and alpine climbing techniques are used on summit day.`,
    image: lobucheEast,
    altitude: "6,119 m",
    bestSeason: "Mar–May · Sep–Oct",
    difficulty: "Strenuous",
    duration: "15 days",
    priceFrom: 1699,
    rating: 4.8,
    reviews: 178,
    tags: ["Climbing", "Trekking", "Technical"],
  },
  {
    id: "7",
    slug: "annapurna-circuit-trek",
    name: "Annapurna Circuit Trek",
    region: "Annapurna",
    tagline: "A journey through every climate zone",
    description:
      "From subtropical forests to the Thorong La pass at 5,416m — the most diverse trek in the Himalayas. Walk through all seasons.",
    itinerary: `
### Annapurna Circuit via Tilicho Lake — 15 Days

Day 1: Arrival Kathmandu (1,400m) — airport pickup and briefing.
Day 2: Drive Kathmandu to Chame (2,670m) — 8–10 hrs.
Day 3: Trek Chame to Upper Pisang (3,300m) — 5–6 hrs.
Day 4: Trek Upper Pisang to Manang (3,540m) — 6–7 hrs.
Day 5: Acclimatization in Manang — optional hikes.
Day 6: Trek Manang to Shree Kharka (4,060m) — 4–5 hrs.
Day 7: Trek Shree Kharka to Tilicho Base Camp (4,150m) — 5–6 hrs.
Day 8: Visit Tilicho Lake (4,919m) & return to Shree Kharka — 7–8 hrs.
Day 9: Trek Shree Kharka to Yak Kharka (4,050m) — 5–6 hrs.
Day 10: Trek Yak Kharka to Thorong Phedi (4,525m) — 4–5 hrs.
Day 11: Cross Thorong La Pass (5,416m) to Muktinath (3,800m) — 8–10 hrs.
Day 12: Trek/drive Muktinath to Jomsom (2,720m) — 5–6 hrs.
Day 13: Fly/drive Jomsom to Pokhara — rest and relaxation.
Day 14: Transfer Pokhara to Kathmandu — hotel night.
Day 15: Final departure.

Notes: Best seasons are Spring and Autumn. Tilicho Lake is a high-altitude highlight; Thorong La is the most challenging day.`,
    image: annapurnaCircuit,
    altitude: "5,416 m",
    bestSeason: "Oct–Nov · Mar–Apr",
    difficulty: "Challenging",
    duration: "16 days",
    priceFrom: 1299,
    rating: 4.8,
    reviews: 248,
    tags: ["Trekking", "Cultural", "Pass"],
  },
  {
    id: "8",
    slug: "three-pass-trek",
    name: "Three Pass Trek",
    region: "Everest",
    tagline: "Traverse the high Himalayan passes",
    description:
      "A classic circuit traversing three high passes near Everest — a challenging and rewarding high-altitude trek for experienced trekkers.",
    image: threePass,
    altitude: "5,200 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Strenuous",
    duration: "18 days",
    priceFrom: 1999,
    rating: 4.9,
    reviews: 64,
    tags: ["Trekking", "High Altitude", "Adventure"],
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Maya Tanaka",
    country: "Japan",
    avatar: "https://i.pravatar.cc/120?img=47",
    quote:
      "The EBC trek with Nomads was the trip of a lifetime. Our guide Tenzing made every day feel both safe and magical.",
    trek: "Everest Base Camp",
  },
  {
    id: "t2",
    name: "Lucas Ferreira",
    country: "Brazil",
    avatar: "https://i.pravatar.cc/120?img=12",
    quote:
      "Beautifully organised. Tea-houses, permits, transfers — everything just worked. I focused on the mountains.",
    trek: "Annapurna Circuit",
  },
  {
    id: "t3",
    name: "Priya Sharma",
    country: "India",
    avatar: "https://i.pravatar.cc/120?img=32",
    quote:
      "Langtang felt like a hidden secret. Our small group, the silence of the valleys, the food — perfection.",
    trek: "Langtang Valley",
  },
];

export const stats = [
  { label: "Happy travellers", value: "12K+" },
  { label: "Treks led", value: "850+" },
  { label: "Years in Nepal", value: "14" },
  { label: "Avg. rating", value: "4.9" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Nishant Karki",
    role: "Trekking Guide",
    bio: "Experienced trekking guide with deep knowledge of Himalayan trails and local culture. Passionate about sharing Nepal's natural beauty.",
    avatar: nishantKarki,
  },
  {
    id: "tm2",
    name: "Simon Bhattarai",
    role: "Leading Role",
    bio: "Senior expedition leader and guide with expertise in high-altitude mountaineering. Leads our most challenging expeditions.",
    avatar: simonBhattarai,
  },
  {
    id: "tm3",
    name: "Prashant Mani Tamang",
    role: "Main Guide",
    bio: "Main guide and expedition coordinator with years of experience in managing treks and ensuring traveller safety and comfort.",
    avatar: prashantManiTamang,
  },
  {
    id: "tm4",
    name: "Jangu Sherpa",
    role: "Trekking + Climbing Guide",
    bio: "Expert climbing and trekking guide specializing in high-altitude expeditions. Multi-skilled mountaineer with climbing expertise.",
    avatar: janguSherpa,
  },
  {
    id: "tm5",
    name: "Sukadev Thapa",
    role: "Trekking Guide",
    bio: "Dedicated guide with extensive knowledge of remote trails and local villages. Creates memorable cultural experiences.",
    avatar: sukadevThapa,
  },
  {
    id: "tm6",
    name: "Aadarsha Bhandari",
    role: "Trekking Guide",
    bio: "Professional trekking guide committed to safety and excellent service. Fluent in multiple languages.",
    avatar: aadarshaBhandari,
  },
  {
    id: "tm7",
    name: "Sushant Thapa",
    role: "Trekking Guide",
    bio: "Skilled guide with expertise in different seasons. Known for attention to detail and authentic local experiences.",
    avatar: "https://i.pravatar.cc/120?img=39",
  },
  {
    id: "tm8",
    name: "Samraj",
    role: "Trekking Guide",
    bio: "Enthusiastic guide with strong connections in local communities. Specializes in cultural and environmental awareness.",
    avatar: "https://i.pravatar.cc/120?img=40",
  },
  {
    id: "tm9",
    name: "Prashidda",
    role: "Trekking Guide",
    bio: "Experienced guide passionate about sustainable tourism and environmental conservation in the Himalayas.",
    avatar: "https://i.pravatar.cc/120?img=41",
  },
];