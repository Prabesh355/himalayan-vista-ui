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
      itinerary: `# Lobuche East Peak Climbing – 18 Days

  ## Trip Overview

  Lobuche East (6,119m) is one of Nepal’s most popular trekking peaks and an excellent choice for climbers looking for a more technical challenge than Mera Peak. Located in the heart of the Everest region, this expedition combines the legendary Everest Base Camp trekking route with an exciting alpine summit climb.

  The journey begins with a scenic flight to Lukla Airport and follows the classic trail through famous Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes.

  During the expedition, trekkers visit Everest Base Camp, hike to Kala Patthar for panoramic Everest views, and then move toward Lobuche High Camp for the summit push.

  From the summit of Lobuche East, climbers enjoy stunning views of Mount Everest, Lhotse, Nuptse, Ama Dablam, and surrounding Himalayan peaks.

  This climb is ideal for trekkers with basic mountaineering experience who want to step into technical Himalayan climbing.

  ---

  # Trip Highlights

  * Summit Lobuche East (6,119m)
  * Visit Everest Base Camp
  * Sunrise hike to Kala Patthar
  * Scenic flight to/from Lukla Airport
  * Explore Sagarmatha National Park
  * Technical climbing experience with fixed ropes
  * Professional climbing guide support
  * Stunning Everest region mountain views
  * Authentic Sherpa villages and culture

  ---

  # Trip Facts

  | Trip Duration    | 18 Days                     |
  | ---------------- | --------------------------- |
  | Maximum Altitude | 6,119m                      |
  | Trip Grade       | Challenging / Technical     |
  | Accommodation    | Hotel / Tea House / Camping |
  | Best Season      | Spring & Autumn             |
  | Group Size       | 1–12 People                 |
  | Transportation   | Flight                      |
  | Start/End Point  | Kathmandu                   |

  ---

  # Detailed Itinerary

  ### Day 01: Arrival in Kathmandu (1,400m)

  Arrive at Tribhuvan International Airport and transfer to hotel. Evening trip briefing.

  ---

  ### Day 02: Kathmandu Preparation Day

  Permit processing, gear check, and expedition preparation. Optional sightseeing in Kathmandu.

  ---

  ### Day 03: Fly to Lukla Airport (2,860m) & Trek to Phakding (2,610m)

  Scenic flight to Lukla followed by an easy trek to Phakding.

  *Flight:* 35 minutes
  *Trek:* 3–4 hours

  ---

  ### Day 04: Trek to Namche Bazaar (3,440m)

  Enter Sagarmatha National Park and trek to the Sherpa capital.

  *Trek:* 6–7 hours

  ---

  ### Day 05: Acclimatization Day at Namche Bazaar

  Rest day with optional hike to Hotel Everest View.

  ---

  ### Day 06: Trek to Tengboche (3,860m)

  Visit famous Tengboche Monastery.

  *Trek:* 5–6 hours

  ---

  ### Day 07: Trek to Dingboche (4,410m)

  Walk through alpine landscapes and enjoy mountain views.

  *Trek:* 5–6 hours

  ---

  ### Day 08: Acclimatization Day at Dingboche

  Optional hike to Nagarjun Hill for altitude adjustment.

  ---

  ### Day 09: Trek to Lobuche (4,940m)

  Pass memorial sites at Thukla and continue toward Lobuche village.

  *Trek:* 5–6 hours

  ---

  ### Day 10: Trek to Everest Base Camp (5,364m) & Return to Gorakshep

  Visit Everest Base Camp before returning to Gorakshep.

  *Trek:* 7–8 hours

  ---

  ### Day 11: Hike to Kala Patthar (5,545m) & Return to Lobuche

  Early morning sunrise hike followed by return to Lobuche.

  *Trek:* 6–7 hours

  ---

  ### Day 12: Trek to Lobuche High Camp (5,400m)

  Move to high camp and prepare for summit climb.

  *Trek:* 4–5 hours

  ---

  ### Day 13: Summit Lobuche East (6,119m) & Return to Pheriche

  Early summit push using fixed ropes before descending.

  *Climb Duration:* 8–10 hours

  ---

  ### Day 14: Contingency/Rest Day

  Extra day reserved for bad weather or recovery.

  ---

  ### Day 15: Trek to Namche Bazaar

  Descend through beautiful villages.

  *Trek:* 6–7 hours

  ---

  ### Day 16: Trek to Lukla

  Final trekking day.

  *Trek:* 6–7 hours

  ---

  ### Day 17: Fly Back to Kathmandu

  Morning flight to Kathmandu and farewell dinner.

  ---

  ### Day 18: Final Departure

  Transfer to Tribhuvan International Airport for final departure.

  ---

  # Why Choose Lobuche East?

  Lobuche East is perfect for trekkers who want to combine Everest Base Camp trekking with a technical Himalayan climbing experience before moving on to larger expedition peaks in the future.

  | Group Size     | Cost Per Person (USD)    |
  | -------------- | ------------------------ |
  | 1 Person       | *USD 2,750*            |
  | 2 – 3 Persons  | *USD 2,450* per person |
  | 4 – 6 Persons  | *USD 2,250* per person |
  | 8 – 12 Persons | *USD 2,050* per person |`,
      image: lobucheEast,
      altitude: "6,119 m",
      bestSeason: "Mar–May · Sep–Oct",
      difficulty: "Strenuous",
      duration: "18 days",
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
      itinerary: `# Annapurna Circuit Trek via Tilicho Lake – 15 Days

  ## Trek Overview

  The *Annapurna Circuit Trek via Tilicho Lake* is one of Nepal’s most iconic trekking adventures, combining the classic Annapurna Circuit route with a side trip to the stunning *Tilicho Lake (4,919m)*—one of the world’s highest lakes.

  This trek takes travelers through diverse landscapes including lush forests, waterfalls, deep gorges, alpine deserts, ancient villages, and the famous *Thorong La Pass (5,416m)*. Trekkers also experience rich Gurung, Manangi, and Tibetan-influenced cultures along the route.

  ---

  ### Trek Duration:

  15 Days

  ### Maximum Elevation:

  Thorong La Pass – 5,416m

  ### Trek Difficulty:

  Moderate to Challenging

  ### Accommodation:

  Tea Houses / Mountain Lodges

  ### Starting Point:

  Kathmandu → Besisahar → Chame

  ### Ending Point:

  Jomsom → Pokhara → Kathmandu

  ---

  # Trek Highlights

  * Visit the breathtaking *Tilicho Lake (4,919m)*
  * Cross the famous *Thorong La Pass (5,416m)*
  * Explore traditional villages like Manang, Pisang, and Marpha
  * Experience diverse landscapes from subtropical forests to alpine deserts
  * Visit Muktinath Temple
  * Enjoy views of Annapurna, Dhaulagiri, Tilicho Peak, and Gangapurna
  * Relax in Pokhara after completing the trek

  ---

  # Detailed Day-by-Day Itinerary

  ---

  ## Day 1: Arrival in Kathmandu (1,400m)

  Arrive in Kathmandu and transfer to your hotel.

  ### Activities:

  * Airport pickup
  * Trek briefing
  * Explore Thamel
  * Gear shopping

  *Accommodation:* Hotel in Kathmandu

  ---

  ## Day 2: Drive Kathmandu to Chame (2,670m)

  Duration: 8–10 hours

  Drive through Besisahar and enjoy scenic mountain roads.

  *Highlights:*

  * Marshyangdi River
  * Waterfalls
  * Mountain villages

  *Accommodation:* Tea house

  ---

  ## Day 3: Trek Chame to Upper Pisang (3,300m)

  Duration: 5–6 hours

  Walk through forests and enjoy views of Annapurna II.

  *Accommodation:* Tea house

  ---

  ## Day 4: Trek Upper Pisang to Manang (3,540m)

  Duration: 6–7 hours

  Take the upper route for better mountain views.

  *Highlights:*

  * Braga Monastery
  * Stunning landscapes

  *Accommodation:* Tea house

  ---

  ## Day 5: Acclimatization Day in Manang

  Rest and acclimatization.

  ### Optional hikes:

  * Gangapurna Lake
  * Ice Lake
  * Local monastery visits

  *Accommodation:* Tea house

  ---

  ## Day 6: Trek Manang to Shree Kharka (4,060m)

  Duration: 4–5 hours

  Start heading toward Tilicho route.

  *Accommodation:* Tea house

  ---

  ## Day 7: Trek Shree Kharka to Tilicho Base Camp (4,150m)

  Duration: 5–6 hours

  Walk along landslide-prone trails.

  *Accommodation:* Tea house

  ---

  ## Day 8: Visit Tilicho Lake (4,919m) → Return to Shree Kharka

  Duration: 7–8 hours

  One of the trek’s major highlights.

  *Highlights:*

  * Crystal blue lake
  * Snow-capped peaks
  * Incredible photography spots

  *Accommodation:* Tea house

  ---

  ## Day 9: Trek Shree Kharka to Yak Kharka (4,050m)

  Duration: 5–6 hours

  Reconnect with Annapurna Circuit route.

  *Accommodation:* Tea house

  ---

  ## Day 10: Trek Yak Kharka to Thorong Phedi (4,525m)

  Duration: 4–5 hours

  Prepare for pass crossing.

  *Accommodation:* Tea house

  ---

  ## Day 11: Cross Thorong La Pass (5,416m) → Muktinath (3,800m)

  Duration: 8–10 hours

  The most challenging day of the trek.

  *Highlights:*

  * Thorong La Pass
  * Prayer flags
  * Panoramic views

  *Accommodation:* Tea house

  ---

  ## Day 12: Trek/Drive Muktinath to Jomsom (2,720m)

  Duration: 5–6 hours

  Explore Mustang landscapes.

  *Accommodation:* Tea house

  ---

  ## Day 13: Drive/Flight Jomsom to Pokhara

  Relax in Pokhara after trekking.

  ### Activities:

  * Lakeside walk
  * Restaurants
  * Spa

  *Accommodation:* Hotel

  ---

  ## Day 14: Drive/Fly Pokhara to Kathmandu

  Return to Kathmandu.

  *Accommodation:* Hotel

  ---

  ## Day 15: Final Departure

  Airport transfer for your international flight.


  # Best Time to Trek

  ### Spring (March–May)

  Best weather and blooming rhododendrons

  ### Autumn (September–November)

  Best mountain visibility and stable weather

  ---

  # Why Choose This Trek?

  ✅ Tilicho Lake adventure
  ✅ Thorong La Pass crossing
  ✅ Diverse landscapes
  ✅ Cultural villages
  ✅ One of Nepal’s most famous trekking routes

  | Group Size     | Cost Per Person (USD)    |
  | -------------- | ------------------------ |
  | 1 Person       | *USD 1,450*            |
  | 2 – 3 Persons  | *USD 1,300* per person |
  | 4 – 6 Persons  | *USD 1,200* per person |
  | 8 – 12 Persons | *USD 1095* per person   |`,
      image: annapurnaCircuit,
      altitude: "5,416 m",
      bestSeason: "Oct–Nov · Mar–Apr",
      difficulty: "Challenging",
      duration: "15 days",
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