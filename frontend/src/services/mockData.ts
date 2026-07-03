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
import sushantThapa from "@/assets/Sushant Thapa.JPG";
import samrajImg from "@/assets/Samraj.png";
import prashiddhaImg from "@/assets/Prashiddha.png";

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
    itinerary: `# Annapurna Circuit Trek via Tilicho Lake – 15 Days

## Trek Overview

The *Annapurna Circuit Trek via Tilicho Lake* is a premium Himalayan journey that blends the classic Annapurna Circuit with an unforgettable side trip to Tilicho Lake—one of the world’s highest alpine lakes.

This itinerary leads trekkers through richly varied landscapes: subtropical forests, glacial rivers, high mountain deserts, ancient villages, and the iconic Thorong La Pass at 5,416m. Along the way, you will experience Gurung, Manangi, and Tibetan-influenced cultures in villages that have changed little for generations.

---

### Trek Duration:

15 Days

### Maximum Elevation:

Thorong La Pass – 5,416m

### Trek Difficulty:

Moderate to Challenging

### Accommodation:

Tea Houses / Mountain Lodges / Hotels

### Starting Point:

Kathmandu → Besisahar → Chame

### Ending Point:

Jomsom → Pokhara → Kathmandu

---

# Trek Highlights

* Walk the full Annapurna Circuit with the Tilicho Lake extension
* Cross the iconic Thorong La Pass at 5,416m
* Visit sacred Muktinath Temple and ancient Mustang-style villages
* Hike to Tilicho Lake (4,919m), one of the highest freshwater lakes in the world
* Enjoy rich mountain cultures and traditional tea-house hospitality
* Scan the Annapurna, Dhaulagiri, Tilicho, and Gangapurna ranges
* Relax in lakeside Pokhara after the trek

---

# Detailed Day-by-Day Itinerary

---

## Day 1: Arrival in Kathmandu (1,400m)

Arrive in Kathmandu and transfer to your hotel.

### Activities:

* Airport pickup
* Trek briefing
* Explore Thamel bazaar
* Final gear checks

*Accommodation:* Hotel in Kathmandu

---

## Day 2: Drive Kathmandu to Chame (2,670m)

Duration: 8–10 hours

Drive through terraced river valleys and the Marsyangdi Gorge, arriving in Chame for your first mountain night.

*Highlights:*

* Mountain villages and riverside scenery
* View of Annapurna II and Lamjung Himal

*Accommodation:* Tea house

---

## Day 3: Trek Chame to Upper Pisang (3,300m)

Duration: 5–6 hours

Trek through forests and high pastures before reaching the scenic village of Upper Pisang.

*Highlights:*

* View of Annapurna II and Pisang Peak
* Braga Monastery and local prayer walls

*Accommodation:* Tea house

---

## Day 4: Trek Upper Pisang to Manang (3,540m)

Duration: 5–6 hours

Continue across spectacular high terraces and narrow canyons into the vibrant trekking hub of Manang.

*Highlights:*

* Dramatic mountain views
* Manang village culture and markets

*Accommodation:* Tea house

---

## Day 5: Acclimatization Day in Manang

Rest and acclimatize with an optional day hike to local viewpoints.

### Optional hikes:

* Gangapurna Lake
* Ice Lake
* Local monastery visit

*Accommodation:* Tea house

---

## Day 6: Trek Manang to Shree Kharka (4,060m)

Duration: 4–5 hours

Leave Manang and enter the high alpine landscape on the route toward Tilicho Lake.

*Accommodation:* Tea house

---

## Day 7: Trek Shree Kharka to Tilicho Base Camp (4,150m)

Duration: 5–6 hours

Continue through alpine meadows and high ridges, reaching Tilicho Base Camp for the night.

*Accommodation:* Tea house

---

## Day 8: Tilicho Lake Excursion (4,919m) & Return to Shree Kharka

Duration: 7–8 hours

Hike to the turquoise shores of Tilicho Lake and return through quiet high pastures.

*Highlights:*

* Tilicho Lake and mountain reflections
* Alpine landscapes and remote trails

*Accommodation:* Tea house

---

## Day 9: Trek Shree Kharka to Yak Kharka (4,050m)

Duration: 5–6 hours

Descend from Tilicho and reconnect with the classic Annapurna Circuit route.

*Accommodation:* Tea house

---

## Day 10: Trek Yak Kharka to Thorong Phedi (4,525m)

Duration: 4–5 hours

Approach the high pass base camp and rest in preparation for the crossing.

*Accommodation:* Tea house

---

## Day 11: Cross Thorong La Pass (5,416m) → Muktinath (3,800m)

Duration: 8–10 hours

Cross the iconic Thorong La Pass and descend to the sacred valley of Muktinath.

*Highlights:*

* Thorong La Pass and panoramic Himalayan views
* Muktinath Temple and pilgrimage atmosphere

*Accommodation:* Tea house

---

## Day 12: Trek/Drive Muktinath to Jomsom (2,720m)

Duration: 5–6 hours

Descend through Mustang-style landscapes and enjoy the wide-open valley of Jomsom.

*Accommodation:* Tea house

---

## Day 13: Drive or Flight Jomsom to Pokhara

Relax in lakeside Pokhara after the trek with a scenic transfer or flight.

### Activities:

* Lakeside walk
* Boat ride or paragliding booking
* Relaxing in hilltop cafés

*Accommodation:* Hotel

---

## Day 14: Drive/Fly Pokhara to Kathmandu

Return to Kathmandu by road or flight and enjoy a final evening in the capital.

*Accommodation:* Hotel

---

## Day 15: Final Departure

Airport transfer for your international flight.

*Highlights:*

* Final souvenir shopping
* Departure assistance


# Best Time to Trek

### Spring (March–May)

Best weather, clear mountain views and blooming rhododendrons.

### Autumn (September–November)

Stable skies, crisp air and the best visibility in the Annapurna range.

---`,
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
    duration: "19 days",
    priceFrom: 1850,
    rating: 4.9,
    reviews: 64,
    tags: ["Trekking", "High Altitude", "Adventure"],
    itinerary: `# Everest Three Passes Trek – 19 Days

## The Ultimate Himalayan Adventure Through Everest's Three Legendary High Passes

*Challenge yourself on Nepal's most complete and rewarding trekking experience as you cross the three legendary high mountain passes—Kongma La (5,535m), Cho La (5,420m), and Renjo La (5,360m)—while visiting Everest Base Camp (5,364m), Kala Patthar (5,545m), and the breathtaking Gokyo Lakes.*

The Everest Three Passes Trek is the ultimate journey through the heart of the Khumbu region, combining everything that makes the Everest region world-famous into one unforgettable expedition. This incredible adventure takes you beyond the classic Everest Base Camp route, leading you through remote alpine valleys, pristine glacial lakes, high mountain passes, and authentic Sherpa villages surrounded by the highest peaks on Earth.

Designed for experienced trekkers seeking a greater challenge, this trek rewards every step with spectacular Himalayan scenery, rich Sherpa culture, and an unmatched sense of achievement.

---

# Why Choose the Everest Three Passes Trek?

If you're looking for the most complete trekking experience in the Everest region, the Everest Three Passes Trek is the perfect choice.

Unlike the traditional Everest Base Camp Trek, this route explores three spectacular mountain passes, offering dramatic landscapes, quieter trails, and panoramic viewpoints that few trekkers experience.

You'll stand at the foot of Mount Everest, witness sunrise from Kala Patthar, admire the crystal-clear Gokyo Lakes, and cross some of the highest trekking passes in the Himalayas—all within one incredible journey.

Every day brings new scenery, from dense pine forests and roaring rivers to glaciers, icefalls, turquoise lakes, and snow-covered peaks.

For serious trekking enthusiasts, this is widely regarded as Nepal's greatest trekking adventure.

---

# Book Your Everest Three Passes Adventure

### Duration

*19 Days / 18 Nights*

### Trek Region

Everest (Khumbu Region)

### Maximum Altitude

*Kala Patthar – 5,545m (18,192 ft)*

### Highest Mountain Pass

*Kongma La Pass – 5,535m (18,159 ft)*

### Everest Base Camp

*5,364m (17,598 ft)*

### Difficulty

*Challenging to Strenuous*

### Group Size

2–10 People

### Accommodation

3-Star Hotel in Kathmandu & Traditional Mountain Tea Houses

### Meals

Breakfast, Lunch & Dinner During Trek

### Transportation

Domestic Flight (Kathmandu/Ramechhap – Lukla – Kathmandu/Ramechhap)

### Trek Starts

Kathmandu

### Trek Ends

Kathmandu

### Best Seasons

* Spring (March–May)
* Autumn (September–November)

---

# Trek Highlights

✔️ Cross the legendary *Kongma La Pass (5,535m)*

✔️ Conquer the spectacular *Cho La Pass (5,420m)*

✔️ Experience the breathtaking *Renjo La Pass (5,360m)*

✔️ Reach *Everest Base Camp (5,364m)*

✔️ Hike to *Kala Patthar (5,545m)* for the best panoramic view of Mount Everest

✔️ Explore the stunning turquoise *Gokyo Lakes*

✔️ Climb *Gokyo Ri (5,357m)* for one of the finest viewpoints in Nepal

✔️ Experience the thrilling flight to Lukla

✔️ Discover the vibrant Sherpa town of Namche Bazaar

✔️ Visit the historic Tengboche Monastery

✔️ Walk beside the Khumbu Glacier and Ngozumpa Glacier

✔️ Trek through Sagarmatha National Park, a UNESCO World Heritage Site

✔️ Experience authentic Sherpa hospitality and Buddhist culture

✔️ Enjoy breathtaking views of Everest, Lhotse, Makalu, Cho Oyu, Ama Dablam, Nuptse, Pumori, Thamserku, and many more Himalayan peaks

✔️ Complete Nepal's most comprehensive Everest trekking circuit

---

# Trek Overview

The Everest Three Passes Trek is widely recognized as the ultimate trekking adventure in the Everest region.

Beginning with a scenic mountain flight to Lukla, your journey follows the classic Everest trail through Phakding and Namche Bazaar before branching into more remote sections of the Khumbu.

The trek takes you across three challenging mountain passes, each offering unforgettable views and unique landscapes.

You'll visit Everest Base Camp, where climbers begin their ascent of the world's highest mountain, before hiking to Kala Patthar for an unforgettable sunrise over Everest.

The adventure continues into the breathtaking Gokyo Valley, home to shimmering glacial lakes and the immense Ngozumpa Glacier, the longest glacier in Nepal.

Crossing Renjo La Pass rewards you with one of the finest panoramic mountain views in the Himalayas, stretching across Everest, Lhotse, Makalu, Cho Oyu, and countless surrounding peaks.

Combining high-altitude adventure, Sherpa culture, ancient monasteries, glacier crossings, and pristine alpine landscapes, this trek delivers the most complete Himalayan experience available.

---

# Why Choose This Trek?

The Everest Three Passes Trek offers everything the Everest Base Camp Trek does—and much more.

This journey allows you to:

* Complete Nepal's most famous trekking circuit.
* Cross three legendary Himalayan mountain passes.
* Visit Everest Base Camp.
* Watch sunrise from Kala Patthar.
* Explore the magnificent Gokyo Lakes.
* Hike to Gokyo Ri.
* Experience quieter and less crowded trails.
* Discover traditional Sherpa villages.
* Visit ancient Buddhist monasteries.
* Challenge yourself with one of the world's finest high-altitude trekking adventures.

For experienced trekkers seeking the ultimate Everest experience, no other trek compares.

---

# Quick Facts

| Trek Information    | Details                   |
| ------------------- | ------------------------- |
| Trek Name           | Everest Three Passes Trek |
| Duration            | 19 Days                   |
| Maximum Elevation   | 5,545m (Kala Patthar)     |
| Highest Pass        | Kongma La – 5,535m        |
| Second Pass         | Cho La – 5,420m           |
| Third Pass          | Renjo La – 5,360m         |
| Everest Base Camp   | 5,364m                    |
| Gokyo Ri            | 5,357m                    |
| Region              | Khumbu (Everest Region)   |
| Difficulty          | Challenging to Strenuous  |
| Walking Hours       | 6–9 Hours Daily           |
| Total Trek Distance | Approximately 170 km      |
| Accommodation       | Tea Houses                |
| Meals               | Breakfast, Lunch & Dinner |
| Best Season         | Spring & Autumn           |
| National Park       | Sagarmatha National Park  |
| Starting Point      | Kathmandu                 |
| Trek Start          | Lukla                     |
| Trek End            | Lukla                     |
| Fitness Level       | Excellent                 |

---

# Why Travel with Nomads Navigate Nepal?

The Everest Three Passes Trek demands careful planning, experienced leadership, and a strong commitment to safety.

At *Nomads Navigate Nepal*, we provide professional trekking experiences led by licensed guides who know every trail, pass, and village throughout the Khumbu region.

### Why Choose Us?

✔️ Government-Registered Trekking Company

✔️ Licensed & Experienced Trekking Guides

✔️ Expert High-Altitude Support

✔️ Ethical Porter Welfare

✔️ Small Group Departures

✔️ Personalized Itineraries

✔️ Transparent Pricing

✔️ High Safety Standards

✔️ Daily Health Monitoring

✔️ 24/7 Customer Support

✔️ Sustainable & Responsible Tourism

✔️ Authentic Himalayan Experiences

---

# Is This Trek Right for You?

The Everest Three Passes Trek is ideal for trekkers who:

* Have previous multi-day trekking experience.
* Enjoy physically demanding adventures.
* Want to explore beyond the standard Everest Base Camp route.
* Dream of crossing high Himalayan passes.
* Love mountain photography and dramatic landscapes.
* Seek a true wilderness experience with fewer crowds.
* Are in excellent physical condition and prepared for high-altitude trekking.

If you're looking for the most rewarding and complete trekking experience in Nepal, the Everest Three Passes Trek is the adventure of a lifetime.

---

# Begin Your Ultimate Everest Journey

The Everest Three Passes Trek is more than a trek—it's a true Himalayan expedition.

Every mountain pass crossed, every glacier traversed, and every summit viewed becomes part of a story you'll carry for the rest of your life.

Join *Nomads Navigate Nepal* and experience Nepal's most iconic trekking circuit with a team dedicated to your safety, comfort, and success.

## *Explore Nepal Beyond Maps.*

---

# Everest Three Passes Trek – 19 Days Detailed Itinerary

## Day 1: Arrival in Kathmandu (1,400m / 4,593 ft)

*Accommodation:* 3-Star Hotel
*Meals:* Welcome Dinner
*Transportation:* Airport Transfer

Welcome to Nepal!

Upon arrival at Tribhuvan International Airport, a representative from *Nomads Navigate Nepal* will greet you and transfer you to your hotel in Kathmandu.

After check-in, you can relax or explore the vibrant streets of Thamel, famous for its trekking shops, cafés, restaurants, and lively atmosphere.

In the evening, meet your trekking guide for a detailed trip briefing covering the itinerary, weather, safety procedures, altitude awareness, and equipment check.

Enjoy a traditional Nepali welcome dinner as you prepare for the adventure ahead.

### Today's Highlights

* Airport meet & greet
* Hotel check-in
* Explore Thamel
* Pre-trek briefing
* Traditional Nepali welcome dinner

---

## Day 2: Fly to Lukla (2,846m) – Trek to Phakding (2,610m)

*Flight:* 30–35 Minutes
*Walking:* 3–4 Hours
*Distance:* 8 km

After an unforgettable mountain flight to Lukla, meet your porter team and begin trekking through beautiful Sherpa villages alongside the Dudh Koshi River.

Cross suspension bridges decorated with colorful prayer flags before reaching the peaceful village of Phakding.

### Highlights

* Scenic Himalayan flight
* Lukla Airport
* Dudh Koshi River
* Sherpa villages
* First Himalayan trekking experience

---

## Day 3: Trek to Namche Bazaar (3,440m)

*Walking:* 6–7 Hours
*Distance:* 11 km

Today's trail follows the Dudh Koshi River through pine forests and across several suspension bridges, including the iconic Hillary Bridge.

After entering Sagarmatha National Park, begin the steep climb to Namche Bazaar.

If weather permits, enjoy your first view of Mount Everest.

### Highlights

* Sagarmatha National Park
* Hillary Suspension Bridge
* First Everest View
* Namche Bazaar

---

## Day 4: Acclimatization Day – Namche Bazaar

*Walking:* 3–4 Hours

To help your body adjust to the altitude, enjoy an acclimatization hike to the famous Everest View Hotel.

Marvel at spectacular views of Everest, Lhotse, Ama Dablam, Nuptse, and Thamserku before returning to Namche.

Spend the afternoon exploring local museums, cafés, and markets.

### Highlights

* Everest View Hotel
* Sherpa Museum
* Acclimatization hike
* Mountain cafés

---

## Day 5: Trek to Tengboche (3,867m)

*Walking:* 5–6 Hours

Follow scenic ridgelines with breathtaking Himalayan panoramas before descending to the Dudh Koshi River and climbing through rhododendron forests to Tengboche.

Visit the famous Tengboche Monastery, the spiritual center of the Khumbu region.

### Highlights

* Everest panorama
* Ama Dablam views
* Tengboche Monastery
* Buddhist culture

---

## Day 6: Trek to Dingboche (4,410m)

*Walking:* 5–6 Hours

Pass through Pangboche Village before ascending into the spectacular Imja Valley.

As vegetation becomes sparse, the dramatic alpine landscape begins to dominate the scenery.

### Highlights

* Pangboche
* Imja Valley
* Ama Dablam close-up views
* Sherpa villages

---

## Day 7: Acclimatization at Dingboche

*Walking:* 4 Hours

Today's hike to Nagarjun Hill helps improve acclimatization while offering panoramic views of Makalu, Lhotse, Ama Dablam, Cholatse, and Island Peak.

### Highlights

* Acclimatization hike
* Himalayan viewpoints
* Photography opportunities

---

## Day 8: Cross Kongma La Pass (5,535m) – Trek to Lobuche (4,940m)

*Walking:* 8–9 Hours

Today is one of the most challenging and rewarding days of the trek.

Climb steadily to Kongma La Pass, the highest of the three passes, where you'll enjoy breathtaking views of glaciers and towering Himalayan peaks.

Descend carefully into Lobuche for the night.

### Highlights

* Kongma La Pass (5,535m)
* Khumbu Glacier views
* High alpine landscapes
* First of the Three Passes completed

---

## Day 9: Trek to Everest Base Camp (5,364m) – Return to Gorak Shep (5,164m)

*Walking:* 7–8 Hours

Follow the Khumbu Glacier to the legendary Everest Base Camp.

Spend time exploring the base camp area and admiring the mighty Khumbu Icefall before returning to Gorak Shep.

### Highlights

* Everest Base Camp
* Khumbu Icefall
* Expedition camps (spring season)
* Lifetime achievement

---

## Day 10: Kala Patthar (5,545m) – Trek to Dzongla (4,830m)

*Walking:* 7–8 Hours

Before sunrise, hike to Kala Patthar for the finest panoramic view of Mount Everest.

After descending for breakfast, continue toward Dzongla, preparing for tomorrow's crossing of Cho La Pass.

### Highlights

* Sunrise over Everest
* Kala Patthar summit
* Pumori views
* Dzongla village

---

## Day 11: Cross Cho La Pass (5,420m) – Trek to Thagnak (4,700m)

*Walking:* 8–9 Hours

Today's trail crosses the spectacular Cho La Pass, famous for its rugged terrain, glacier crossing, and dramatic mountain scenery.

Descend carefully into the peaceful village of Thagnak.

### Highlights

* Cho La Pass
* Glacier crossing
* Snow-covered landscapes
* Second high pass completed

---

## Day 12: Trek to Gokyo (4,790m)

*Walking:* 3–4 Hours

Today's shorter trek follows the Ngozumpa Glacier before arriving at the stunning Gokyo Lakes.

The turquoise glacial lakes surrounded by snow-covered peaks create one of Nepal's most breathtaking landscapes.

### Highlights

* Ngozumpa Glacier
* Gokyo Lakes
* Peaceful alpine scenery

---

## Day 13: Gokyo Ri (5,357m) – Explore Gokyo

*Walking:* 4–5 Hours

Climb Gokyo Ri early in the morning for one of the finest panoramic viewpoints in the Himalayas.

Enjoy incredible views of Everest, Lhotse, Makalu, and Cho Oyu before spending a relaxing afternoon beside the beautiful lakes.

### Highlights

* Gokyo Ri summit
* Four 8,000-meter peaks visible
* Gokyo Lakes
* Outstanding photography

---

## Day 14: Cross Renjo La Pass (5,360m) – Trek to Lungden (4,380m)

*Walking:* 8 Hours

The final high pass of the expedition offers perhaps the finest panoramic views of the entire trek.

Renjo La provides unforgettable vistas across the Gokyo Lakes, Everest, Makalu, and Cho Oyu before descending into Lungden.

### Highlights

* Renjo La Pass
* Third high pass completed
* Panoramic Himalayan views
* Remote trekking trails

---

## Day 15: Trek to Namche Bazaar

*Walking:* 6–7 Hours

Descend gradually through traditional Sherpa villages before rejoining the classic Everest trekking route back to Namche Bazaar.

Enjoy a comfortable evening celebrating the successful completion of all three passes.

### Highlights

* Sherpa villages
* Easier descent
* Celebration in Namche

---

## Day 16: Trek to Lukla

*Walking:* 6–7 Hours

Retrace your steps through forests and suspension bridges to Lukla.

Celebrate your successful expedition with your trekking team.

### Highlights

* Final trekking day
* Dudh Koshi River
* Farewell celebration

---

## Day 17: Fly to Kathmandu

*Flight:* 30–35 Minutes

Return to Kathmandu on a scenic mountain flight.

The remainder of the day is free for shopping, sightseeing, or relaxing.

In the evening, enjoy a farewell dinner with your trekking team.

---

## Day 18: Free Day in Kathmandu

This extra day is reserved as a contingency for possible weather delays affecting Lukla flights.

If flights operate as scheduled, enjoy exploring Kathmandu's UNESCO World Heritage Sites, shopping for souvenirs, visiting cafés, or simply relaxing after your adventure.

### Optional Activities

* Kathmandu Sightseeing Tour
* Spa & Massage
* Local Markets
* Cultural Heritage Tours
* Traditional Nepali Cooking Class

---

## Day 19: Final Departure

After breakfast, our team will transfer you to Tribhuvan International Airport for your onward flight.

As your incredible Himalayan journey comes to an end, you'll leave Nepal with unforgettable memories of crossing three legendary mountain passes, standing at Everest Base Camp, witnessing sunrise from Kala Patthar, and discovering the breathtaking beauty of the Gokyo Lakes.

Thank you for choosing *Nomads Navigate Nepal*.

We look forward to welcoming you back for another unforgettable Himalayan adventure.

*Explore Nepal Beyond Maps.*

---

# Everest Three Passes Trek – Complete Packing List, Altitude Sickness, Safety, Sherpa Culture, Flora & Fauna, Photography & Essential Travel Information

---

# Complete Packing List

The Everest Three Passes Trek is one of Nepal's most demanding high-altitude adventures. Packing the right equipment is essential for your comfort, safety, and success.

Temperatures can vary from warm afternoons in the lower valleys to well below freezing on the high passes, so dressing in layers is highly recommended.

---

# Clothing

### Base Layers

* 2–3 moisture-wicking thermal tops
* 2 thermal bottoms
* 4 quick-dry trekking T-shirts
* 2 long-sleeve trekking shirts

### Insulation Layers

* Fleece jacket
* Lightweight insulated jacket
* High-quality down jacket (rated for temperatures below *-15°C*)

### Outer Layers

* Waterproof and windproof shell jacket
* Waterproof trekking pants

### Trekking Pants

* 2 pairs of trekking trousers
* Thermal leggings
* Comfortable camp trousers (optional)

### Headwear

* Warm beanie
* Sun hat or trekking cap
* Buff or neck gaiter

### Gloves

* Lightweight trekking gloves
* Waterproof insulated gloves

### Socks

* 4–5 pairs of warm trekking socks
* 2 pairs of liner socks (optional)

---

# Footwear

Proper footwear is critical, especially when crossing snow-covered mountain passes.

Recommended:

* Waterproof trekking boots with excellent ankle support
* Camp shoes or sandals
* Lightweight sneakers (optional)
* Spare boot laces

Always ensure your boots are well broken in before your trek.

---

# Backpack & Bags

* 35–45L daypack
* Duffel bag (carried by porter)
* Rain cover
* Waterproof dry bags or packing cubes

---

# Sleeping Equipment

Although tea houses provide blankets, we recommend bringing:

* Sleeping bag rated to *-20°C*
* Sleeping bag liner (optional)
* Inflatable travel pillow (optional)

---

# Trekking Equipment

* Trekking poles
* Headlamp with spare batteries
* Reusable water bottles (minimum 2 liters)
* Thermos flask
* UV-protection sunglasses
* Sunscreen (SPF 50+)
* Lip balm with SPF
* Camera or smartphone
* Spare batteries
* Extra memory cards
* Power bank (20,000–30,000mAh recommended)
* Universal travel adapter
* Waterproof phone pouch

---

# Personal Toiletries

* Toothbrush and toothpaste
* Soap and shampoo
* Quick-dry towel
* Wet wipes
* Hand sanitizer
* Toilet paper
* Moisturizer
* Nail clippers
* Personal hygiene products

---

# Personal First Aid Kit

Your trekking guide carries a comprehensive first aid kit, but you should also bring personal medical supplies.

Recommended items:

* Prescription medications
* Pain relievers
* Blister treatment
* Antiseptic cream
* Anti-diarrheal medication
* Allergy medicine
* Motion sickness tablets
* Oral Rehydration Salts (ORS)
* Water purification tablets

---

# Weather Conditions

Weather in the Everest region changes rapidly, especially above 5,000 meters.

## Spring (March–May)

* Mild daytime temperatures
* Cold nights
* Blooming rhododendrons
* Excellent mountain visibility

## Autumn (September–November)

* Stable weather
* Crisp mountain air
* Clear skies
* Comfortable trekking conditions

## Winter (December–February)

* Heavy snowfall on high passes
* Very cold mornings and nights
* Quiet trekking trails
* Spectacular snow-covered scenery

## Monsoon (June–August)

* Frequent rain
* Slippery trails
* Cloud cover
* Possible flight delays

Spring and autumn are strongly recommended for the best overall trekking experience.

---

# Altitude Sickness

The Everest Three Passes Trek reaches elevations above *5,500 meters*, making proper acclimatization essential.

Altitude sickness can affect anyone, regardless of age or fitness.

### Common Symptoms

* Persistent headache
* Fatigue
* Nausea
* Dizziness
* Difficulty sleeping
* Shortness of breath
* Loss of appetite

### Our Acclimatization Strategy

Our itinerary includes acclimatization days in Namche Bazaar and Dingboche, giving your body time to adapt before crossing the high passes.

We also recommend:

* Drinking at least 3–4 liters of water daily
* Walking slowly and steadily
* Eating nutritious meals
* Avoiding alcohol and smoking
* Getting adequate rest
* Reporting symptoms to your guide immediately

Your guide will monitor your health daily using a pulse oximeter and will make itinerary adjustments if necessary.

---

# Safety Measures

Your safety is our highest priority.

Every Everest Three Passes Trek with *Nomads Navigate Nepal* includes:

* Government-licensed trekking guide
* Experienced high-altitude trekking staff
* Daily health monitoring
* Pulse oximeter
* Comprehensive first aid kit
* Emergency communication support
* Flexible itinerary adjustments if required
* Assistance with emergency helicopter evacuation arrangements

We strongly recommend travel insurance covering high-altitude trekking up to *6,000 meters*.

---

# Sherpa Culture

The Khumbu region is home to the Sherpa people, whose traditions, hospitality, and mountaineering expertise have earned worldwide respect.

Throughout the trek you'll experience:

* Traditional Sherpa villages
* Ancient Buddhist monasteries
* Prayer wheels
* Mani walls
* Chortens and stupas
* Colorful prayer flags
* Local festivals (seasonal)
* Authentic Sherpa hospitality

Visitors are encouraged to respect local customs, remove shoes before entering monasteries, ask permission before photographing people, and always walk clockwise around mani walls and stupas.

---

# Flora & Fauna

The trek passes through the diverse ecosystems of *Sagarmatha National Park*, a UNESCO World Heritage Site.

## Flora

You'll encounter:

* Rhododendron forests
* Pine forests
* Fir forests
* Juniper shrubs
* Alpine meadows
* Mosses and lichens

## Wildlife

You may be fortunate enough to see:

* Himalayan Tahr
* Musk Deer
* Himalayan Monal (Nepal's national bird)
* Blood Pheasant
* Himalayan Griffon
* Snow Pigeon
* Himalayan Marmot
* Langur Monkeys

The elusive Snow Leopard also inhabits the region but is rarely spotted.

---

# Photography Guide

The Everest Three Passes Trek offers some of the finest mountain photography opportunities in the world.

## Best Photography Locations

* Lukla Airport
* Namche Bazaar
* Everest View Hotel
* Tengboche Monastery
* Kongma La Pass
* Everest Base Camp
* Kala Patthar
* Cho La Pass
* Gokyo Lakes
* Gokyo Ri
* Renjo La Pass

## Best Photography Subjects

* Mount Everest
* Ama Dablam
* Lhotse
* Makalu
* Cho Oyu
* Nuptse
* Pumori
* Ngozumpa Glacier
* Khumbu Glacier
* Turquoise Gokyo Lakes
* Yak caravans
* Prayer flags
* Sherpa villages
* Monasteries
* Sunrise and sunset landscapes

### Photography Tips

* Carry extra batteries, as cold temperatures reduce battery life.
* Use waterproof protection for your camera.
* Photograph during sunrise and sunset for the best lighting.
* Respect local customs when taking photographs of people or religious sites.

---

# Electricity & Charging

Electricity is available in most tea houses, though charging electronic devices often requires a small fee.

We recommend carrying:

* High-capacity power bank
* Spare camera batteries
* Universal travel adapter

---

# Internet & Mobile Network

Wi-Fi is available in many villages but may require an additional charge.

Mobile network coverage is available in several areas, though signals become weaker at higher elevations and on remote sections of the route.

Many trekkers appreciate the opportunity to disconnect and fully immerse themselves in the Himalayan environment.

---

# Currency & Spending Money

The local currency is the *Nepalese Rupee (NPR)*.

ATMs are available in Kathmandu and Namche Bazaar but are not available in most higher villages.

Bring enough cash for:

* Snacks
* Drinks
* Wi-Fi
* Device charging
* Hot showers
* Souvenirs
* Tips for guides and porters

Credit cards are rarely accepted along the trekking route.

---

# Equipment Rental

If you don't have all the necessary trekking gear, high-quality equipment can be rented in Kathmandu before the trek.

Common rental items include:

* Down jackets
* Sleeping bags
* Trekking poles
* Duffel bags
* Gaiters
* Microspikes (seasonal)
* Waterproof jackets
* Waterproof trekking pants

Our team can help you choose the right equipment before departure.

---

# Responsible Tourism

At *Nomads Navigate Nepal*, we are committed to sustainable trekking and protecting the fragile Himalayan environment.

We encourage every trekker to:

* Carry reusable water bottles.
* Reduce single-use plastics.
* Stay on marked trails.
* Respect Sherpa traditions and Buddhist culture.
* Support local tea houses and communities.
* Protect wildlife and natural habitats.
* Dispose of waste responsibly.
* Leave no trace of your visit.

Together, we can preserve the Everest region for future generations while supporting the people who call these mountains home.

---

# Why Choose Nomads Navigate Nepal?

The Everest Three Passes Trek is a demanding adventure that requires careful planning, experienced leadership, and unwavering attention to safety.

When you travel with *Nomads Navigate Nepal*, you'll benefit from:

* Government-registered trekking company
* Licensed and experienced high-altitude guides
* Ethical porter welfare
* Small group departures
* Personalized itineraries
* Transparent pricing
* Daily health monitoring
* High safety standards
* Sustainable tourism practices
* 24/7 customer support

From your arrival in Nepal to your departure, our team is dedicated to making your Three Passes adventure safe, rewarding, and truly unforgettable.

*Nomads Navigate Nepal*

*Explore Nepal Beyond Maps.*

---

# Everest Three Passes Trek – Package Includes, Excludes, Pricing, Booking Information & FAQs

---

# What's Included

When you book the *Everest Three Passes Trek – 19 Days* with *Nomads Navigate Nepal*, we take care of every essential detail so you can fully enjoy your Himalayan adventure.

## Airport Services

* Airport pick-up upon arrival in Kathmandu
* Airport drop-off before your international departure
* Private tourist vehicle for all airport transfers

---

## Accommodation

* 3 nights in a comfortable 3-Star Hotel in Kathmandu (Twin Sharing with Breakfast)
* Traditional Tea House accommodation during the trek (Twin Sharing)

---

## Meals During the Trek

* Daily Breakfast
* Daily Lunch
* Daily Dinner
* Fresh seasonal fruits (where available)
* Tea or coffee with breakfast

---

## Transportation

* Domestic Flight: Kathmandu (or Ramechhap during peak season) → Lukla
* Domestic Flight: Lukla → Kathmandu (or Ramechhap)
* Private airport transfers

---

## Professional Trekking Staff

* Government Licensed English-speaking Trekking Guide
* Experienced Sherpa Support Team
* Porter Service (1 porter for every 2 trekkers, carrying up to 20 kg)
* Guide & Porter salaries
* Meals and accommodation for trekking staff
* Staff insurance

---

## Trekking Permits

* Sagarmatha National Park Entry Permit
* Khumbu Pasang Lhamu Rural Municipality Permit
* All required government taxes and permit processing fees

---

## Safety & Support

* Comprehensive First Aid Kit
* Pulse Oximeter for daily health monitoring
* Emergency communication support
* Pre-trek briefing in Kathmandu
* Trek Completion Certificate
* 24/7 customer support before and during your trek

---

# What's Not Included

The following expenses are not included in the package price:

* International airfare
* Nepal Entry Visa fee
* Personal travel insurance
* Emergency helicopter evacuation costs
* Personal trekking equipment
* Sleeping bag & down jacket rental (available upon request)
* Lunch & Dinner in Kathmandu
* Alcoholic beverages
* Soft drinks & bottled beverages
* Snacks, chocolates & energy bars
* Hot showers
* Wi-Fi charges
* Battery charging fees
* Laundry services
* Personal shopping & expenses
* Tips for guides and porters (customary but appreciated)
* Additional accommodation or transportation due to weather delays, flight cancellations, natural disasters, or other unforeseen circumstances

---

# Group Pricing

### Everest Three Passes Trek – 19 Days

| Group Size     | Price Per Person (USD) |
| -------------- | ---------------------: |
| *2–4 People* |           *US$1,850* |
| *5–6 People* |           *US$1,750* |
| *7–8 People* |           *US$1,650* |

*For private groups larger than 8 people, please contact us for a customized quotation and special group discounts.*

---

# Optional Add-On Services

Make your Himalayan adventure even more memorable with our optional services:

* Private airport transfers
* Luxury hotel upgrades in Kathmandu
* Single-room accommodation
* Additional acclimatization day
* Helicopter return from Gokyo or Gorak Shep
* Everest Scenic Mountain Flight
* Private trekking guide
* Additional porter service
* Trekking equipment rental
* Kathmandu sightseeing tour
* Chitwan National Park extension
* Pokhara extension
* Island Peak Climbing
* Lobuche Peak Climbing

---

# Booking Process

Booking your Everest Three Passes Trek is easy and secure.

### Step 1 – Send Your Inquiry

Contact us through our website, WhatsApp, email, or social media with your preferred travel dates and group size.

### Step 2 – Confirm Your Trip

Our travel specialists will confirm availability, answer your questions, and help finalize your itinerary.

### Step 3 – Secure Your Booking

A booking deposit is required to reserve your trek. Once confirmed, we will arrange your flights, permits, accommodation, and all trekking logistics.

### Step 4 – Receive Your Pre-Trek Information

We'll send you a detailed information package covering your itinerary, equipment checklist, travel advice, and arrival details.

### Step 5 – Begin Your Adventure

Upon arrival in Nepal, our team will welcome you at the airport and take care of everything until your departure.

---

# Payment Information

We accept:

* Bank Transfer
* Secure Online Payment (where available)
* Cash Payment in Kathmandu before departure

The remaining balance is payable before your trek begins.

---

# Cancellation Policy

We understand that plans can change.

* Cancellations made well in advance may qualify for a partial refund after deducting non-refundable expenses.
* Date changes are generally possible, subject to availability.
* No refunds are available for unused services once the trek has started.

Please read our Terms & Conditions before confirming your booking.

---

# Travel Insurance

Comprehensive travel insurance is *mandatory* for this trek.

Your policy should include:

* High-altitude trekking coverage up to *6,000 meters*
* Emergency helicopter evacuation
* Medical treatment
* Trip cancellation
* Personal accident coverage
* Lost or delayed baggage

Please provide your insurance details before the trek begins.

---

# Frequently Asked Questions (FAQs)

### 1. How difficult is the Everest Three Passes Trek?

It is one of Nepal's most challenging tea house treks, suitable for trekkers with excellent fitness and preferably previous multi-day trekking experience.

### 2. How long is the trek?

The standard itinerary is *19 days*, including arrival, departure, and acclimatization.

### 3. What is the highest point of the trek?

Kala Patthar at *5,545 meters (18,192 ft)*.

### 4. Which is the highest pass?

Kongma La Pass at *5,535 meters*.

### 5. How many hours do we walk each day?

Most trekking days involve *6–9 hours* of walking.

### 6. Is previous trekking experience required?

It is highly recommended, although strong beginners with excellent fitness and determination may also complete the trek with proper preparation.

### 7. What is the best season?

Spring (March–May) and Autumn (September–November).

### 8. Are guides included?

Yes. Every trek includes an experienced, government-licensed trekking guide.

### 9. Is porter service included?

Yes. One porter is provided for every two trekkers.

### 10. Is drinking water available?

Yes. Boiled, filtered, and purified drinking water is available throughout the trek.

### 11. Can I charge my phone?

Yes. Most tea houses provide charging facilities for an additional fee.

### 12. Is Wi-Fi available?

Yes, in many villages, though speeds vary and charges may apply.

### 13. Are vegetarian meals available?

Yes. Most tea houses offer vegetarian and vegan-friendly meals.

### 14. Can I rent trekking equipment in Kathmandu?

Yes. Down jackets, sleeping bags, trekking poles, and other equipment can be rented before departure.

### 15. Is travel insurance compulsory?

Yes. Insurance covering high-altitude trekking and emergency evacuation is mandatory.

---

# Why Book with Nomads Navigate Nepal?

The Everest Three Passes Trek is an extraordinary expedition that deserves expert planning and local knowledge.

At *Nomads Navigate Nepal*, we combine professional service, experienced local guides, and genuine Himalayan hospitality to ensure every trek is safe, enjoyable, and unforgettable.

### Why Travelers Choose Us

* Government-registered trekking company
* Licensed local guides
* Experienced Sherpa team
* Small group departures
* Ethical porter welfare
* Transparent pricing
* Personalized service
* High safety standards
* Sustainable tourism practices
* 24/7 customer support

We don't just guide you across three legendary Himalayan passes—we help create memories that last a lifetime.

---

# Ready for Nepal's Ultimate Trekking Adventure?

The Everest Three Passes Trek is the ultimate challenge for passionate trekkers, combining rugged mountain passes, ancient Sherpa culture, breathtaking glaciers, turquoise alpine lakes, and unforgettable views of the world's highest peaks.

Whether you're standing at Everest Base Camp, watching sunrise from Kala Patthar, crossing the dramatic Cho La Pass, or overlooking the sparkling Gokyo Lakes from Renjo La, every day offers a new achievement and a new story to tell.

Join *Nomads Navigate Nepal* and experience the Himalayas beyond the ordinary.

## Contact Nomads Navigate Nepal Today

Start planning your Everest Three Passes Trek with our experienced local team.

*Explore Nepal Beyond Maps.*

*Your Ultimate Himalayan Adventure Begins Here.*
`,
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
    avatar: sushantThapa,
  },
  {
    id: "tm8",
    name: "Samraj",
    role: "Trekking Guide",
    bio: "Enthusiastic guide with strong connections in local communities. Specializes in cultural and environmental awareness.",
    avatar: samrajImg,
  },
  {
    id: "tm9",
    name: "Prashidda",
    role: "Trekking Guide",
    bio: "Experienced guide passionate about sustainable tourism and environmental conservation in the Himalayas.",
    avatar: prashiddhaImg,
  },
];
