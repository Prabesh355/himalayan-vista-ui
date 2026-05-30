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
    itinerary: `## Mera Peak Ski Expedition — 18 Days

  A technical ski-mountaineering itinerary for experienced backcountry skiers, combining trekking, alpine skills training and a summit/ski descent from Mera Peak (6,476 m).

  1. **Day 1 — Arrival in Kathmandu (1,400 m):** Airport pickup and expedition briefing. Final gear checks and permit administration.
  2. **Day 2 — Kathmandu preparations:** Permit collection, equipment fitting, and group briefing with lead guide.
  3. **Day 3 — Fly to Lukla; trek to Paiya (5–6 hrs):** Short flight into the Khumbu and the start of the trek.
  4. **Day 4 — Paiya to Panggom (5–6 hrs):** Gradual ascent through alpine villages and scenic valleys.
  5. **Day 5 — Panggom to Ningsow (5–6 hrs):** Trekking through high meadows and river crossings.
  6. **Day 6 — Ningsow to Chhatra Khola (6–7 hrs):** Entering the Hinku Valley; steady altitude gain.
  7. **Day 7 — Chhatra Khola to Kothe (6–7 hrs):** Approaching the Mera base area; campsite or teahouse accommodation.
  8. **Day 8 — Kothe to Thangnak (4–5 hrs):** Lodging in the high valley and final approach preparations.
  9. **Day 9 — Acclimatization & ski drills:** Glacier travel techniques, ropework, and avalanche awareness sessions.
  10. **Day 10 — Thangnak to Khare (4–5 hrs):** Move to Mera base settlement and continue technical rehearsals.
  11. **Day 11 — Ski training & climbing practice:** Focused skills training with guides (crevasse rescue, crampon work).
  12. **Day 12 — Trek to High Camp (5–6 hrs):** Final alpine approach onto the glacier; prepare for summit push.
  13. **Day 13 — Summit push & ski descent (8–10 hrs):** Early start to summit Mera Peak (6,476 m) and ski descent back to high camp/base.
  14. **Day 14 — High Camp to Kothe (5–6 hrs):** Descend off the glacier and retrace to lower camps.
  15. **Day 15 — Kothe to Thuli Kharka (6–7 hrs):** Easier trekking day; recovery and celebration.
  16. **Day 16 — Thuli Kharka to Lukla via Zatrwa La (6–8 hrs):** Long day crossing the pass and returning toward Lukla.
  17. **Day 17 — Fly to Kathmandu:** Return flight and farewell dinner in Kathmandu.
  18. **Day 18 — Departure:** Transfer to the airport for onward travel.

  **Notes:** Designed for experienced backcountry skiers. Includes certified guide support, technical training, and a conservative acclimatization schedule.`,
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
    itinerary: `## Mera Peak Expedition — 16 Days (Climbing-focused)

  A progressive climbing itinerary geared for climbers aiming to summit Mera Peak (6,476 m). The program balances trekking days with technical skills and conservative acclimatization.

  1. **Day 1 — Arrival Kathmandu:** Welcome, expedition briefing and hotel accommodation.
  2. **Day 2 — Preparation & permits:** Gear checks, permit processing and final briefing.
  3. **Day 3 — Fly to Lukla; trek to Paiya (5–6 hrs):** Begin trek into the Hinku Valley.
  4. **Day 4 — Paiya to Panggom (5–6 hrs):** Scenic ascent through mountain villages.
  5. **Day 5 — Panggom to Ningsow (5–6 hrs):** Continued high-valley trekking.
  6. **Day 6 — Ningsow to Chhatra Khola (6–7 hrs):** Approach to the upper valley.
  7. **Day 7 — Chhatra Khola to Kothe (6–7 hrs):** Enter Mera base region and settle into the team rhythm.
  8. **Day 8 — Kothe to Thangnak (4–5 hrs):** Short day with time for recovery.
  9. **Day 9 — Acclimatization & short hikes:** Skills refresh and light hikes to aid acclimatization.
  10. **Day 10 — Trek to Khare (4–5 hrs):** Reach the primary base for technical training.
  11. **Day 11 — Climbing practice:** Ropework, crampon technique and glacier travel drills.
  12. **Day 12 — Trek to High Camp (5–6 hrs):** Final approach to the glacier high camp.
  13. **Day 13 — Summit push & descend (8–10 hrs):** Summit attempt on Mera Peak and return to high camp or lower camp.
  14. **Day 14 — High Camp to Kothe (5–6 hrs):** Descend off the glacier and begin trek out.
  15. **Day 15 — Kothe to Lukla (6–8 hrs):** Final trekking day to Lukla.
  16. **Day 16 — Fly to Kathmandu / departure:** Return flight and transfer to your hotel or onward travel.

  **Notes:** Suitable for climbers with previous high-altitude trekking experience. Includes technical coaching and glacier safety instruction.`,
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
    itinerary: `## Manaslu Circuit (with optional Tsum Valley) — 13–18 Days

  The Manaslu Circuit is a remote, cultural and high-pass trek that traverses deep gorges, high alpine meadows and the Larkya La (5,167 m). An optional extension into the Tsum Valley adds cultural and spiritual highlights.

  **Sample itinerary (13 days core; extend to 18 days for Tsum Valley):**

  1. **Day 1 — Arrival Kathmandu:** Trek briefing and preparation.
  2. **Day 2 — Drive to Soti Khola / Macha Khola:** Road transfer and start of trek.
  3. **Days 3–6 — Trek to Namrung / Samagaon:** Pass through terraced farmland, forests and river valley settlements.
  4. **Day 7 — Acclimatization:** Short hikes, monastery visits and rest.
  5. **Days 8–9 — Trek toward Samdo and Dharmasala:** Remote valley trekking as you approach the high pass.
  6. **Day 10 — Cross Larkya La (5,167 m):** Early start for the pass crossing and descent to Bimthang.
  7. **Days 11–12 — Descend to Dharapani / Jagat:** Continue descent and trek out toward Besishar.
  8. **Day 13 — Return to Kathmandu or extend:** Optionally continue into the Tsum Valley for 4–5 additional days.

  **Notes:** Challenging terrain with high passes; appropriate equipment and permits are required. Micro-spikes or crampons may be recommended in icy conditions.`,
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
    itinerary: `## Lobuche East Expedition — 18 Days (Sample)

  A classic alpine objective in the Everest region, combining high-altitude trekking with a technical summit attempt on Lobuche East (6,119 m). This itinerary includes acclimatization days and technical preparation.

  1. **Day 1 — Arrival Kathmandu:** Expedition briefing and hotel accommodation.
  2. **Day 2 — Preparation & permits:** Final gear checks and permit processing.
  3. **Day 3 — Fly to Lukla; trek to Phakding (3–4 hrs):** Begin the ascent into the Khumbu.
  4. **Day 4 — Phakding to Namche Bazaar (6–7 hrs):** Enter Sherpa country; market town of Namche.
  5. **Day 5 — Acclimatization at Namche Bazaar:** Short hikes and acclimatization activities.
  6. **Day 6 — Namche to Tengboche (5–6 hrs):** Visit the famous Tengboche Monastery.
  7. **Day 7 — Tengboche to Dingboche (5–6 hrs):** Continue the gradual ascent.
  8. **Day 8 — Acclimatization at Dingboche:** Rest day to acclimatize and prepare.
  9. **Day 9 — Dingboche to Lobuche (5–6 hrs):** Trek toward the base of the technical features.
  10. **Day 10 — Trek to Everest Base Camp & Gorak Shep (7–8 hrs):** Optional side trip to EBC; return to Lobuche area.
  11. **Day 11 — Sunrise to Kala Patthar (5,545 m):** Panoramic views and return to Lobuche.
  12. **Day 12 — Lobuche to High Camp:** Final approach and summit preparation.
  13. **Day 13 — Summit Lobuche East (6,119 m) & descend to Pheriche (8–10 hrs):** Summit day with alpine techniques; descent to lower camp.
  14. **Day 14 — Contingency / rest day:** Flexible day for weather or recovery.
  15. **Day 15 — Trek to Namche Bazaar (6–7 hrs):** Begin the trek out.
  16. **Day 16 — Namche to Lukla (6–7 hrs):** Final trek segment to Lukla.
  17. **Day 17 — Fly to Kathmandu & farewell dinner:** Return to the capital.
  18. **Day 18 — Departure:** Transfer to airport for onward travel.

  **Notes:** Summit day may require fixed ropes and alpine climbing techniques. Guides will assess conditions and determine timing for summit attempts.`,
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
    itinerary: `## Annapurna Circuit via Tilicho Lake — 15 Days

  A varied circuit passing through alpine meadows and the Thorong La (5,416 m). This route includes an optional visit to Tilicho Lake and offers diverse landscapes and cultural encounters.

  1. **Day 1 — Arrival Kathmandu (1,400 m):** Airport transfer and trek briefing.
  2. **Day 2 — Drive to Chame (2,670 m):** Long scenic drive into the Annapurna foothills (8–10 hrs).
  3. **Day 3 — Chame to Upper Pisang (3,300 m):** Trek with panoramic mountain views (5–6 hrs).
  4. **Day 4 — Upper Pisang to Manang (3,540 m):** Continue to the high plateau (6–7 hrs).
  5. **Day 5 — Acclimatization in Manang:** Optional hikes and acclimatization day.
  6. **Day 6 — Manang to Shree Kharka (4,060 m):** Gradual ascent toward Tilicho (4–5 hrs).
  7. **Day 7 — Shree Kharka to Tilicho Base Camp (4,150 m):** Approach to Tilicho region (5–6 hrs).
  8. **Day 8 — Tilicho Lake visit (4,919 m) & return:** Day trip to the lake and return to Shree Kharka (7–8 hrs).
  9. **Day 9 — Shree Kharka to Yak Kharka (4,050 m):** Trek toward Thorong area (5–6 hrs).
  10. **Day 10 — Yak Kharka to Thorong Phedi (4,525 m):** Short day preparing for the pass (4–5 hrs).
  11. **Day 11 — Cross Thorong La (5,416 m) to Muktinath (3,800 m):** Long, rewarding day over the pass (8–10 hrs).
  12. **Day 12 — Muktinath to Jomsom (2,720 m):** Trek or drive to Jomsom and rest (5–6 hrs).
  13. **Day 13 — Jomsom to Pokhara:** Fly or drive to Pokhara for relaxation.
  14. **Day 14 — Pokhara to Kathmandu:** Transfer back to Kathmandu and overnight.
  15. **Day 15 — Departure:** Transfer to the airport for onward travel.

  **Notes:** Best seasons are Spring and Autumn. The Thorong La crossing is the most challenging day; proper acclimatization is essential.`,
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