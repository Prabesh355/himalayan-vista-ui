import everest from "@/assets/Everest Base Camp.jpeg";
import mera from "@/assets/Mera Peak Expedition.jpg";
import meraSki from "@/assets/Mera Peak Ski.jpeg";
import annapurna from "@/assets/Annapurna Base Camp.jpg";
import annapurnaCircuit from "@/assets/Annapurna Circuit Trek.jpg";
import manaslu from "@/assets/Manaslu and Tsum Valley.jpg";
import lobucheEast from "@/assets/Lobuche East.jpg";
import threePass from "@/assets/Three Pass Trek.jpg";
import narPhu from "@/assets/nur.jpeg";
import apiHimal from "@/assets/Api Himal Base Camp Trek.JPG";
import kanchenjunga from "@/assets/Kanchenjunga Base Camp Trek.JPG";
import tshoRolpa from "@/assets/Tsho Rolpa Lake Trek.JPG";

// Team member images
import nishantKarki from "@/assets/Nishant Karki.jpg";
import sukadevThapa from "@/assets/Sukadev Thapa.jpeg";
import prashantManiTamang from "@/assets/Prashant Mani Tamang.jpg";
import aadarshaBhandari from "@/assets/Aadarsha Bhandari.jpg";
import simonBhattarai from "@/assets/Simon Bhattarai.jpg";
import janguSherpa from "@/assets/Jangu Sherpa.jpg";

export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";
export type Region =
  | "Everest"
  | "Annapurna"
  | "Langtang"
  | "Kathmandu Valley"
  | "Pokhara"
  | "Lowlands";

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
  bio?: string;
  avatar?: string;
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
    itinerary: `## Everest Base Camp Trek — 14 Days

  The classic Everest Base Camp route is a Himalayan bucket-list journey through the Khumbu Valley. Trek through Sherpa towns, ancient monasteries, and rugged high-altitude landscapes with the South Face of Everest as the backdrop.

  1. **Day 1 — Arrival Kathmandu (1,400 m):** Airport pickup, welcome dinner, and trek briefing.
  2. **Day 2 — Kathmandu to Lukla; trek to Phakding (2,650 m):** Short mountain flight to Lukla, then gentle walk along the Dudh Koshi.
  3. **Day 3 — Phakding to Namche Bazaar (3,440 m):** Enter Sagarmatha National Park and climb to the bustling Sherpa town of Namche.
  4. **Day 4 — Acclimatization in Namche Bazaar:** Short hikes, museum visit, and rest day for altitude adjustment.
  5. **Day 5 — Namche Bazaar to Tengboche (3,860 m):** Walk past pine forests and Mani walls to the famous Tengboche monastery.
  6. **Day 6 — Tengboche to Dingboche (4,410 m):** High alpine trekking with excellent views of Lhotse, Ama Dablam and Nuptse.
  7. **Day 7 — Acclimatization in Dingboche:** Hike to Nagarjun Hill or Chukung for clearer mountain views.
  8. **Day 8 — Dingboche to Lobuche (4,940 m):** A strong climb to Lobuche with glacier views ahead.
  9. **Day 9 — Lobuche to Gorak Shep (5,170 m) and Everest Base Camp (5,364 m):** Reach the famous camp and return to Gorak Shep.
  10. **Day 10 — Hike to Kala Patthar (5,545 m) and descend to Pheriche:** Sunrise mountain panorama and gradual descent to lower altitude.
  11. **Day 11 — Pheriche to Namche Bazaar:** Trek back through Sherpa villages and alpine meadows.
  12. **Day 12 — Namche Bazaar to Lukla:** Final trek through the Khumbu Valley.
  13. **Day 13 — Fly Lukla to Kathmandu:** Return flight and farewell evening in Kathmandu.
  14. **Day 14 — Departure:** Transfer to the airport for your onward journey.

  **Highlights:** Everest Base Camp, Kala Patthar sunrise view, Tengboche monastery, Sherpa culture, Sagarmatha National Park.
`,
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

    This exceptional ski-mountaineering journey is designed for experienced backcountry skiers. It combines the classic Mera Peak approach with structured alpine training, careful acclimatization, and a rewarding summit ski descent from Nepal’s highest trekking peak.

    - **Day 1 — Arrival in Kathmandu (1,400 m):** Airport transfer, expedition briefing, equipment review, and permit coordination.
    - **Day 2 — Kathmandu preparation day:** Final gear fitting, route briefing, and guidance from the expedition leader.
    - **Day 3 — Fly to Lukla; trek to Paiya (5–6 hrs):** Scenic mountain flight followed by a gradual trek into the Khumbu foothills.
    - **Day 4 — Paiya to Panggom (5–6 hrs):** Continue through forested trails and quiet Sherpa settlements.
    - **Day 5 — Panggom to Ningsow (5–6 hrs):** Traverse ridge lines and open valleys while gaining elevation steadily.
    - **Day 6 — Ningsow to Chhatra Khola (6–7 hrs):** Enter the Hinku Valley and settle into the expedition rhythm.
    - **Day 7 — Chhatra Khola to Kothe (6–7 hrs):** Move deeper into the valley toward the Mera approach route.
    - **Day 8 — Kothe to Thangnak (4–5 hrs):** A shorter trekking day with time for recovery and preparation.
    - **Day 9 — Acclimatization and ski technique session:** Glacier movement, rope systems, and avalanche awareness practice.
    - **Day 10 — Thangnak to Khare (4–5 hrs):** Reach the main staging point for ski and climbing preparation.
    - **Day 11 — Training day at Khare:** Guided practice on crampon use, rope travel, and crevasse rescue procedures.
    - **Day 12 — Trek to High Camp (5–6 hrs):** Move onto the upper glacier and prepare for summit day.
    - **Day 13 — Summit push and ski descent (8–10 hrs):** Early ascent to the summit of Mera Peak (6,476 m), followed by a controlled ski descent.
    - **Day 14 — High Camp to Kothe (5–6 hrs):** Descend safely back to lower elevations after the summit objective.
    - **Day 15 — Kothe to Thuli Kharka (6–7 hrs):** A steady return trek with time to unwind and recover.
    - **Day 16 — Thuli Kharka to Lukla via Zatrwa La (6–8 hrs):** Cross the pass and complete the final approach toward Lukla.
    - **Day 17 — Fly to Kathmandu:** Return to the capital for a farewell evening.
    - **Day 18 — Departure:** Airport transfer for onward travel.

    **Trip notes:** Recommended for experienced skiers with prior high-altitude exposure. Includes professional guide support, technical training, and a conservative acclimatization profile.`,
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
    itinerary: `## Annapurna Base Camp Trek — 10 Days

  This classic Annapurna trek takes you through lush rhododendron forests, traditional Gurung villages, and high alpine landscapes, ending at the mighty Annapurna Sanctuary.

  1. **Day 1 — Arrival Kathmandu:** Welcome, permit processing, and trek briefing.
  2. **Day 2 — Kathmandu to Pokhara:** Scenic road transfer, then early preparation in lakeside Pokhara.
  3. **Day 3 — Drive to Nayapul; trek to Tikhedhunga:** Begin the trek through farmland and rivers.
  4. **Day 4 — Tikhedhunga to Ghorepani:** Climb through bamboo forest to the popular village of Ghorepani.
  5. **Day 5 — Poon Hill sunrise; trek to Tadapani:** Early hilltop sunrise followed by a day of magnificent mountain views.
  6. **Day 6 — Tadapani to Chomrong:** Descend into the Modi Khola valley and continue toward alpine villages.
  7. **Day 7 — Chomrong to Dovan:** Trek through rhododendron forests and quiet hillside villages.
  8. **Day 8 — Dovan to Machhapuchhre Base Camp:** Enter the Annapurna Sanctuary with stunning close-up views.
  9. **Day 9 — Machhapuchhre Base Camp to Annapurna Base Camp, return to Dovan:** Reach ABC at 4,130m and enjoy panoramic views of the massif.
  10. **Day 10 — Dovan to Pokhara:** Descend to the valley and transfer back to Pokhara for relaxation.

  **Highlights:** Poon Hill sunrise, Annapurna Sanctuary, Gurung culture, mountain views, and tea-house hospitality.
`,
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
  {
    id: "9",
    slug: "nar-phu-valley-trek",
    name: "Nar Phu Valley Trek",
    region: "Annapurna",
    tagline: "Explore the hidden valleys of Nar and Phu",
    description: "Trek through ancient Tibetan-influenced villages, dramatic canyons, centuries-old monasteries, and the spectacular Kang La Pass connecting Nar Valley with the Annapurna Circuit.",
    itinerary: `# Nar Phu Valley Trek – 15 Days

Nar Phu Valley Trek is one of Nepal's most remote and culturally preserved trekking destinations. Opened to foreign trekkers only in 2002, the trail takes you through ancient Tibetan-influenced villages, dramatic canyons, centuries-old monasteries, and the spectacular Kang La Pass.

---

## Detailed Itinerary

### Day 01: Drive Kathmandu – Koto (2,610m)
Drive through the scenic Marsyangdi Valley via Besisahar and Chame to Koto, the gateway to Nar Phu Valley.
*Driving:* 9–10 hrs

### Day 02: Trek Koto – Meta (3,560m)
Enter the restricted Nar Phu Valley, trekking through dense pine forests, narrow canyons, and suspension bridges.
*Walking:* 6–7 hrs

### Day 03: Trek Meta – Phu Village (4,080m)
Follow rugged trails alongside ancient chortens and spectacular rock formations before reaching the medieval village of Phu.
*Walking:* 6–7 hrs

### Day 04: Acclimatization Day at Phu
Explore the historic Tashi Lhakhang Monastery and enjoy stunning views of Himlung Himal and surrounding peaks.

### Day 05: Trek Phu – Nar Phedi (3,490m)
Descend through yak pastures and remote settlements to Nar Phedi Monastery.
*Walking:* 5–6 hrs

### Day 06: Trek Nar Phedi – Nar Village (4,110m)
A short ascent leads to the beautiful village of Nar, known for its unique Tibetan culture and traditional stone houses.
*Walking:* 3–4 hrs

### Day 07: Acclimatization & Exploration at Nar
Spend the day acclimatizing and exploring the surrounding ridges and monasteries.

### Day 08: Trek Nar – Kang La Pass (5,320m) – Ngawal (3,660m)
Cross the spectacular Kang La Pass, one of the major highlights of the trek, offering panoramic views of Annapurna II, Gangapurna, and Tilicho Peak.
*Walking:* 8–9 hrs

### Day 09: Trek Ngawal – Manang (3,540m)
Join the Annapurna Circuit trail and trek through traditional villages to Manang.
*Walking:* 4–5 hrs

### Day 10: Acclimatization Day in Manang
Explore Gangapurna Lake, local monasteries, and viewpoints around Manang.

### Day 11: Trek Manang – Yak Kharka (4,110m)
Gradual ascent through alpine terrain and grazing pastures.
*Walking:* 4–5 hrs

### Day 12: Trek Yak Kharka – Thorong Phedi (4,600m)
Continue toward the base of Thorong La Pass.
*Walking:* 4–5 hrs

### Day 13: Cross Thorong La Pass (5,416m) – Muktinath (3,800m)
A challenging yet rewarding day crossing one of the world's highest trekking passes before descending to the sacred pilgrimage site of Muktinath.
*Walking:* 8–10 hrs

### Day 14: Drive Muktinath – Pokhara
Scenic drive through Jomsom, Marpha, and Tatopani to Pokhara.

### Day 15: Drive or Fly Pokhara – Kathmandu
End of the trek.

---

# Cost Per Person (USD)

| Group Size | Cost Per Person |
| ---------- | --------------: |
| 1 Pax      |          $1,750 |
| 2 Pax      |          $1,550 |
| 3–4 Pax    |          $1,450 |
| 5–6 Pax    |          $1,350 |
| 7–8 Pax    |          $1,250 |

### Trek Highlights

* Explore the hidden valleys of Nar and Phu.
* Experience authentic Tibetan Buddhist culture.
* Visit the ancient Tashi Lhakhang Monastery.
* Cross the spectacular Kang La Pass (5,320m).
* Stunning views of Himlung Himal, Annapurna II, Gangapurna, and Tilicho Peak.
* Combine the remote Nar Phu Valley with the iconic Annapurna Circuit.`,
    image: narPhu,
    altitude: "5,320 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Challenging",
    duration: "15 days",
    priceFrom: 1250,
    rating: 4.8,
    reviews: 14,
    tags: ["Trekking", "Remote", "Cultural"],
  },
  {
    id: "10",
    slug: "api-himal-base-camp",
    name: "API Himal Base Camp",
    region: "Lowlands",
    tagline: "Untouched wilderness in far-western Nepal",
    description: "Explore the remote and rugged trails of far-western Nepal, trekking to the base of the majestic API Himal.",
    itinerary: "# Coming Soon...",
    image: apiHimal,
    altitude: "4,250 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Challenging",
    duration: "17 days",
    priceFrom: 1800,
    rating: 4.7,
    reviews: 8,
    tags: ["Remote", "Off the Beaten Path"],
  },
  {
    id: "11",
    slug: "kanchenjunga-base-camp",
    name: "Kanchenjunga Base Camp",
    region: "Everest",
    tagline: "Journey to the world's third highest peak",
    description: "Trek through pristine forests and remote villages to the base of Mt. Kanchenjunga, experiencing unique cultures and breathtaking vistas.",
    itinerary: "# Coming Soon...",
    image: kanchenjunga,
    altitude: "5,143 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Strenuous",
    duration: "21 days",
    priceFrom: 2200,
    rating: 4.9,
    reviews: 24,
    tags: ["Trekking", "Expedition", "Remote"],
  },
  {
    id: "12",
    slug: "tsho-rolpa-valley-trek",
    name: "Tsho Rolpa Valley Trek",
    region: "Langtang",
    tagline: "Discover one of Nepal's largest glacial lakes",
    description: "Trek through the beautiful Rolwaling Valley to the stunning Tsho Rolpa glacial lake, surrounded by towering peaks.",
    itinerary: "# Coming Soon...",
    image: tshoRolpa,
    altitude: "4,580 m",
    bestSeason: "Mar–May · Sep–Nov",
    difficulty: "Moderate",
    duration: "14 days",
    priceFrom: 1350,
    rating: 4.8,
    reviews: 12,
    tags: ["Trekking", "Lakes", "Scenic"],
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
    avatar: "https://ui-avatars.com/api/?name=Sushant+Thapa&background=random&size=280",
  },
  {
    id: "tm8",
    name: "Samraj",
    role: "Trekking Guide",
    bio: "Enthusiastic guide with strong connections in local communities. Specializes in cultural and environmental awareness.",
    avatar: "https://ui-avatars.com/api/?name=Samraj&background=random&size=280",
  },
  {
    id: "tm9",
    name: "Prashidda",
    role: "Trekking Guide",
    bio: "Experienced guide passionate about sustainable tourism and environmental conservation in the Himalayas.",
    avatar: "https://ui-avatars.com/api/?name=Prashidda&background=random&size=280",
  },
];
