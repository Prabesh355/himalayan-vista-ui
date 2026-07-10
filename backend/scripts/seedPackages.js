require('dotenv').config();
const slugify = require('slugify');
const Package = require('../models/Package');
const { getPool } = require('../config/db');

const rawDestinations = [
  {
    title: "Everest Base Camp",
    region: "Everest",
    tagline: "Walk in the footsteps of legends",
    description: "The classic trek to the foot of the world's highest mountain, through Sherpa villages, Buddhist monasteries and surreal high-altitude landscapes.",
    itinerary: `## Everest Base Camp Trek — 14 Days

The classic Everest Base Camp route is a Himalayan bucket-list journey through the Khumbu Valley. Trek through Sherpa towns, ancient monasteries, and rugged high-altitude landscapes with the South Face of Everest as the backdrop.

1. Day 1 — Arrival Kathmandu (1,400 m): Airport pickup, welcome dinner, and trek briefing.
2. Day 2 — Kathmandu to Lukla; trek to Phakding (2,650 m): Short mountain flight to Lukla, then gentle walk along the Dudh Koshi.
3. Day 3 — Phakding to Namche Bazaar (3,440 m): Enter Sagarmatha National Park and climb to the bustling Sherpa town of Namche.
4. Day 4 — Acclimatization in Namche Bazaar: Short hikes, museum visit, and rest day for altitude adjustment.
5. Day 5 — Namche Bazaar to Tengboche (3,860 m): Walk past pine forests and Mani walls to the famous Tengboche monastery.
6. Day 6 — Tengboche to Dingboche (4,410 m): High alpine trekking with excellent views of Lhotse, Ama Dablam and Nuptse.
7. Day 7 — Acclimatization in Dingboche: Hike to Nagarjun Hill or Chukung for clearer mountain views.
8. Day 8 — Dingboche to Lobuche (4,940 m): A strong climb to Lobuche with glacier views ahead.
9. Day 9 — Lobuche to Gorak Shep (5,170 m) and Everest Base Camp (5,364 m): Reach the famous camp and return to Gorak Shep.
10. Day 10 — Hike to Kala Patthar (5,545 m) and descend to Pheriche: Sunrise mountain panorama and gradual descent to lower altitude.
11. Day 11 — Pheriche to Namche Bazaar: Trek back through Sherpa villages and alpine meadows.
12. Day 12 — Namche Bazaar to Lukla: Final trek through the Khumbu Valley.
13. Day 13 — Fly Lukla to Kathmandu: Return flight and farewell evening in Kathmandu.
14. Day 14 — Departure: Transfer to the airport for your onward journey.

Highlights: Everest Base Camp, Kala Patthar sunrise view, Tengboche monastery, Sherpa culture, Sagarmatha National Park.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1499,
    duration: { days: 14, nights: 13 },
    rating: 4.9,
    reviewCount: 312,
    tags: ["Trekking", "Iconic", "High Altitude"],
    destination: "Everest",
    groupSize: { min: 1, max: 12 },
    featured: true,
  },
  {
    title: "Mera Peak Ski",
    region: "Everest",
    tagline: "Highest ski descent in Nepal",
    description: "Combine trekking and skiing in one adventure. Ascend Mera Peak and ski down the pristine slopes of the Himalayas.",
    itinerary: `## Mera Peak Ski Expedition — 18 Days\n\nThis exceptional ski-mountaineering journey is designed for experienced backcountry skiers. It combines the classic Mera Peak approach with structured alpine training, careful acclimatization, and a rewarding summit ski descent from Nepal’s highest trekking peak.\n\n- Day 1 — Arrival in Kathmandu (1,400 m): Airport transfer, expedition briefing, equipment review, and permit coordination.\n- Day 2 — Kathmandu preparation day: Final gear fitting, route briefing, and guidance from the expedition leader.\n- Day 3 — Fly to Lukla; trek to Paiya (5–6 hrs): Scenic mountain flight followed by a gradual trek into the Khumbu foothills.\n- Day 4 — Paiya to Panggom (5–6 hrs): Continue through forested trails and quiet Sherpa settlements.\n- Day 5 — Panggom to Ningsow (5–6 hrs): Traverse ridge lines and open valleys while gaining elevation steadily.\n- Day 6 — Ningsow to Chhatra Khola (6–7 hrs): Enter the Hinku Valley and settle into the expedition rhythm.\n- Day 7 — Chhatra Khola to Kothe (6–7 hrs): Move deeper into the valley toward the Mera approach route.\n- Day 8 — Kothe to Thangnak (4–5 hrs): A shorter trekking day with time for recovery and preparation.\n- Day 9 — Acclimatization and ski technique session: Glacier movement, rope systems, and avalanche awareness practice.\n- Day 10 — Thangnak to Khare (4–5 hrs): Reach the main staging point for ski and climbing preparation.\n- Day 11 — Training day at Khare: Guided practice on crampon use, rope travel, and crevasse rescue procedures.\n- Day 12 — Trek to High Camp (5–6 hrs): Move onto the upper glacier and prepare for summit day.\n- Day 13 — Summit push and ski descent (8–10 hrs): Early ascent to the summit of Mera Peak (6,476 m), followed by a controlled ski descent.\n- Day 14 — High Camp to Kothe (5–6 hrs): Descend safely back to lower elevations after the summit objective.\n- Day 15 — Kothe to Thuli Kharka (6–7 hrs): A steady return trek with time to unwind and recover.\n- Day 16 — Thuli Kharka to Lukla via Zatrwa La (6–8 hrs): Cross the pass and complete the final approach toward Lukla.\n- Day 17 — Fly to Kathmandu: Return to the capital for a farewell evening.\n- Day 18 — Departure: Airport transfer for onward travel.\n\nTrip notes: Recommended for experienced skiers with prior high-altitude exposure.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 2199,
    duration: { days: 18, nights: 17 },
    rating: 4.9,
    reviewCount: 89,
    tags: ["Trekking", "Skiing", "Adventure"],
    destination: "Everest",
    groupSize: { min: 1, max: 12 },
    featured: false,
  },
  {
    title: "Mera Peak Expedition",
    region: "Everest",
    tagline: "Conquer Nepal's most accessible 6000m peak",
    description: "A thrilling climbing expedition to Mera Peak. Experience high-altitude mountaineering with stunning Himalayan views.",
    itinerary: `## Mera Peak Expedition — 16 Days (Climbing-focused)\n\nA progressive climbing itinerary geared for climbers aiming to summit Mera Peak (6,476 m). The program balances trekking days with technical skills and conservative acclimatization.\n\n1. Day 1 — Arrival Kathmandu: Welcome, expedition briefing and hotel accommodation.\n2. Day 2 — Preparation & permits: Gear checks, permit processing and final briefing.\n3. Day 3 — Fly to Lukla; trek to Paiya (5–6 hrs): Begin trek into the Hinku Valley.\n4. Day 4 — Paiya to Panggom (5–6 hrs): Scenic ascent through mountain villages.\n5. Day 5 — Panggom to Ningsow (5–6 hrs): Continued high-valley trekking.\n6. Day 6 — Ningsow to Chhatra Khola (6–7 hrs): Approach to the upper valley.\n7. Day 7 — Chhatra Khola to Kothe (6–7 hrs): Enter Mera base region and settle into the team rhythm.\n8. Day 8 — Kothe to Thangnak (4–5 hrs): Short day with time for recovery.\n9. Day 9 — Acclimatization & short hikes: Skills refresh and light hikes to aid acclimatization.\n10. Day 10 — Trek to Khare (4–5 hrs): Reach the primary base for technical training.\n11. Day 11 — Climbing practice: Ropework, crampon technique and glacier travel drills.\n12. Day 12 — Trek to High Camp (5–6 hrs): Final approach to the glacier high camp.\n13. Day 13 — Summit push & descend (8–10 hrs): Summit attempt on Mera Peak and return to high camp or lower camp.\n14. Day 14 — High Camp to Kothe (5–6 hrs): Descend off the glacier and begin trek out.\n15. Day 15 — Kothe to Lukla (6–8 hrs): Final trekking day to Lukla.\n16. Day 16 — Fly to Kathmandu / departure: Return flight and transfer to your hotel or onward travel.\n\nNotes: Suitable for climbers with previous high-altitude trekking experience.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1799,
    duration: { days: 16, nights: 15 },
    rating: 4.8,
    reviewCount: 156,
    tags: ["Climbing", "Expedition", "High Altitude"],
    destination: "Everest",
    groupSize: { min: 1, max: 12 },
    featured: false,
  },
  {
    title: "Manaslu and Tsum Valley",
    region: "Annapurna",
    tagline: "Sacred peaks and remote wilderness",
    description: "Trek around the eighth-highest mountain in the world. Experience remote valleys, monasteries, and pristine alpine landscapes.",
    itinerary: `## Manaslu Circuit (with optional Tsum Valley) — 13–18 Days\n\nThe Manaslu Circuit is a remote, cultural and high-pass trek that traverses deep gorges, high alpine meadows and the Larkya La (5,167 m). An optional extension into the Tsum Valley adds cultural and spiritual highlights.\n\nSample itinerary (13 days core; extend to 18 days for Tsum Valley):\n\n1. Day 1 — Arrival Kathmandu: Trek briefing and preparation.\n2. Day 2 — Drive to Soti Khola / Macha Khola: Road transfer and start of trek.\n3. Days 3–6 — Trek to Namrung / Samagaon: Pass through terraced farmland, forests and river valley settlements.\n4. Day 7 — Acclimatization: Short hikes, monastery visits and rest.\n5. Days 8–9 — Trek toward Samdo and Dharmasala: Remote valley trekking as you approach the high pass.\n6. Day 10 — Cross Larkya La (5,167 m): Early start for the pass crossing and descent to Bimthang.\n7. Days 11–12 — Descend to Dharapani / Jagat: Continue descent and trek out toward Besishar.\n8. Day 13 — Return to Kathmandu or extend: Optionally continue into the Tsum Valley for 4–5 additional days.\n\nNotes: Challenging terrain with high passes; appropriate equipment and permits are required.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1599,
    duration: { days: 18, nights: 17 },
    rating: 4.8,
    reviewCount: 134,
    tags: ["Trekking", "Spiritual", "Remote"],
    destination: "Annapurna",
    groupSize: { min: 1, max: 12 },
    featured: true,
  },
  {
    title: "Kanchenjunga Base Camp Trek",
    region: "Everest",
    tagline: "Remote Kanchenjunga wilderness trek to North and South Base Camps",
    description: "A 24-day expedition to the remote North and South Base Camps of Mount Kanchenjunga, blending wilderness trekking, local culture, and dramatic Himalayan scenery.",
    itinerary: `## Kanchenjunga Base Camp Trek — 24 Days

Explore the remote wilderness of eastern Nepal on a 24-day expedition to both North Base Camp (Pangpema – 5,143m) and South Base Camp (Oktang – 4,730m) of Mount Kanchenjunga. Trek through the protected Kanchenjunga Conservation Area, traditional mountain villages, rhododendron forests, alpine meadows, and glacial valleys.

---

### Day 1 — Arrival in Kathmandu (1,400m)
Airport transfer, hotel check-in, and pre-trek briefing. Welcome dinner and preparation for the expedition.

### Day 2 — Fly Kathmandu to Bhadrapur; drive to Taplejung (1,820m)
Morning flight and scenic drive through eastern Nepal’s hills to Taplejung.

### Day 3 — Drive Sekathum; trek to Amjilosa (2,510m)
Begin the trek along the Ghunsa Khola through forests and village settlements.

### Day 4 — Trek Amjilosa to Gyabla (2,730m)
Climb through bamboo and rhododendron forest to the remote village of Gyabla.

### Day 5 — Trek Gyabla to Ghunsa (3,430m)
Continue ascending to Ghunsa, the main cultural center of the Kanchenjunga region.

### Day 6 — Acclimatization in Ghunsa
Rest day with optional hikes and monastery visits.

### Day 7 — Trek Ghunsa to Kambachen (4,050m)
Ascend into high alpine terrain alongside glacier-fed rivers.

### Day 8 — Acclimatization in Kambachen
Optional acclimatization hike with mountain views including Jannu.

### Day 9 — Trek Kambachen to Lhonak (4,780m)
Trek onto the high glacial plateau toward Lhonak and its dramatic icefilled valleys.

### Day 10 — Excursion to Pangpema (5,143m) and return to Lhonak
Visit North Base Camp and enjoy extraordinary views of Kanchenjunga’s north face.

### Day 11 — Trek Lhonak to Ghunsa (3,430m)
Descend through alpine terrain back to Ghunsa.

### Day 12 — Trek Ghunsa to Sele La Kharka (4,290m)
Move toward the high meadow of Sele La Kharka.

### Day 13 — Cross Sele La Pass and Mirgin La to Cheram (3,870m)
Cross high passes and descend to the remote village of Cheram.

### Day 14 — Excursion to Oktang (4,730m) and return to Cheram
Visit South Base Camp and witness the southern face of Kanchenjunga.

### Day 15 — Trek Cheram to Tortong (2,995m)
Descend from Cheram through forests and meadows to Tortong.

### Day 16 — Trek Tortong to Yamphudin (2,080m)
Continue descending through village settlements and terraced fields.

### Day 17 — Trek Yamphudin to Khebang (1,915m)
Walk through tranquil farmlands and riverside villages.

### Day 18 — Trek Khebang to Taplejung (1,820m)
Final trekking day returning to Taplejung.

### Day 19 — Drive to Bhadrapur
Return drive through eastern Nepal’s scenic hills.

### Day 20 — Fly Bhadrapur to Kathmandu
Morning flight back to Kathmandu and afternoon at leisure.

### Day 21 — Leisure day in Kathmandu
Explore the city, shop, or recover from the trek.

### Day 22 — Buffer day
A contingency day to accommodate weather or transportation delays.

### Day 23 — Farewell dinner
Enjoy a final dinner with the trekking team.

### Day 24 — Final departure
Transfer to Tribhuvan International Airport for your onward flight.
`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 3200,
    duration: { days: 24, nights: 23 },
    rating: 4.8,
    reviewCount: 24,
    tags: ["Trekking", "Remote", "High Altitude"],
    destination: "Everest",
    category: "trekking",
    groupSize: { min: 1, max: 12 },
    featured: true,
  },
  {
    title: "Annapurna Base Camp",
    region: "Annapurna",
    tagline: "Surrounded by the Annapurna massif",
    description: "Trek to the heart of the Annapurna range. Wake up to stunning 360-degree views of snow-capped peaks at 4,130m.",
    itinerary: `## Annapurna Base Camp Trek — 10 Days\n\nThis classic Annapurna trek takes you through lush rhododendron forests, traditional Gurung villages, and high alpine landscapes, ending at the mighty Annapurna Sanctuary.\n\n1. Day 1 — Arrival Kathmandu: Welcome, permit processing, and trek briefing.\n2. Day 2 — Kathmandu to Pokhara: Scenic road transfer, then early preparation in lakeside Pokhara.\n3. Day 3 — Drive to Nayapul; trek to Tikhedhunga: Begin the trek through farmland and rivers.\n4. Day 4 — Tikhedhunga to Ghorepani: Climb through bamboo forest to the popular village of Ghorepani.\n5. Day 5 — Poon Hill sunrise; trek to Tadapani: Early hilltop sunrise followed by a day of magnificent mountain views.\n6. Day 6 — Tadapani to Chomrong: Descend into the Modi Khola valley and continue toward alpine villages.\n7. Day 7 — Chomrong to Dovan: Trek through rhododendron forests and quiet hillside villages.\n8. Day 8 — Dovan to Machhapuchhre Base Camp: Enter the Annapurna Sanctuary with stunning close-up views.\n9. Day 9 — Machhapuchhre Base Camp to Annapurna Base Camp, return to Dovan: Reach ABC at 4,130m and enjoy panoramic views of the massif.\n10. Day 10 — Dovan to Pokhara: Descend to the valley and transfer back to Pokhara for relaxation.\n\nHighlights: Poon Hill sunrise, Annapurna Sanctuary, Gurung culture, mountain views, and tea-house hospitality.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 899,
    duration: { days: 10, nights: 9 },
    rating: 4.9,
    reviewCount: 421,
    tags: ["Trekking", "Scenic", "Views"],
    destination: "Annapurna",
    groupSize: { min: 1, max: 12 },
    featured: true,
  },
  {
    title: "Tsho Rolpa Valley Trek",
    region: "Kathmandu Valley",
    tagline: "Discover Nepal's largest glacial lake in the Rolwaling Himal",
    description: "A 10-day trek through the Rolwaling Valley to Tsho Rolpa Lake (4,580m), combining alpine scenery, Sherpa culture, and remote Himalayan wilderness.",
    itinerary: `## Tsho Rolpa Valley Trek — 10 Days

Discover one of Nepal's most rewarding hidden treks on a journey to Tsho Rolpa Lake, Nepal's largest glacial lake. This 10-day itinerary travels through the remote Rolwaling Valley, traditional Sherpa villages, dense forests, and alpine landscapes.

---

### Day 1 — Drive Kathmandu to Chetchet
Travel by private jeep from Kathmandu to Chetchet, the gateway to the Rolwaling Valley.

### Day 2 — Trek Chetchet to Simigaon (2,020m)
Begin the walk along the Rolwaling River, crossing suspension bridges and following scenic forest trails to Simigaon.

### Day 3 — Trek Simigaon to Dongang (2,800m)
Trek through bamboo and pine forests as the valley narrows, arriving in the peaceful village of Dongang.

### Day 4 — Trek Dongang to Beding (3,690m)
Continue to Beding, one of the main settlements in the Rolwaling region, with majestic views of surrounding Himalayan peaks.

### Day 5 — Acclimatization Day in Beding
Rest and acclimatize in Beding with optional local hikes, monastery visits, and cultural exploration.

### Day 6 — Trek Beding to Na Village (4,180m)
Ascend into the alpine zone, passing yak pastures and glacier streams before reaching Na Village.

### Day 7 — Trek Na Village to Tsho Rolpa Lake (4,580m)
Hike to the spectacular Tsho Rolpa Lake, where turquoise glacial water meets towering peaks and glaciers.

### Day 8 — Return to Na Village
Descend back to Na Village, enjoying the dramatic mountain scenery along the return route.

### Day 9 — Trek Na Village to Beding
Retrace the trail to Beding, soaking in the valley's quiet beauty and Sherpa hospitality.

### Day 10 — Trek Beding to Chetchet and drive to Kathmandu
Descend to Chetchet and return to Kathmandu by jeep, completing the Rolwaling Valley adventure.
`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 890,
    duration: { days: 10, nights: 9 },
    rating: 4.8,
    reviewCount: 28,
    tags: ["Trekking", "Remote", "Lake"],
    destination: "Kathmandu Valley",
    category: "trekking",
    groupSize: { min: 2, max: 10 },
    featured: true,
  },  {
    title: "Api Himal Base Camp Trek",
    region: "Kathmandu Valley",
    tagline: "Far-West Nepal's hidden Himalayan gem",
    description: "A remote 16-day trek to Api Base Camp through the Api Nampa Conservation Area, including flights, village visits, and alpine scenery.",
    itinerary: `## Api Himal Base Camp Trek — 16 Days\n\nFar-West Nepal's hidden Himalayan gem. Trek through remote villages, dense forests, and alpine meadows to Api Base Camp for breathtaking views of Api, Nampa, and Bobaye Himal.\n\n1. Day 1 — Arrival in Kathmandu (1,400m)\n2. Day 2 — Sightseeing and trek preparation in Kathmandu.\n3. Day 3 — Flight to Dhangadhi (109m)\n4. Day 4 — Drive to Gokuleshwar (850m)\n5. Day 5 — Drive to Latinath and trek to Paribagar\n6. Day 6 — Trek to Makarigaad (1,800m)\n7. Day 7 — Trek to Seti (3,000m)\n8. Day 8 — Trek to Simar / Domal (3,400m)\n9. Day 9 — Trek to Dhauli Odar (3,800m) — Lower Api Base Camp\n10. Day 10 — Trek to Api Base Camp (4,250m) and explore glacial lakes with panoramic views of Api Himal.\n11. Day 11 — Return trek to Seti\n12. Day 12 — Trek to Makarigaad\n13. Day 13 — Trek to Latinath and drive to Gokuleshwar\n14. Day 14 — Drive to Dhangadhi\n15. Day 15 — Flight to Kathmandu\n16. Day 16 — Final Departure: Transfer to Tribhuvan International Airport for your international flight.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 2400,
    duration: { days: 16, nights: 15 },
    rating: 4.8,
    reviewCount: 12,
    tags: ["Trekking", "Remote", "Far-West"],
    destination: "Kathmandu Valley",
    category: "trekking",
    groupSize: { min: 1, max: 8 },
    featured: true,
  },
  {
    title: "Nar Phu Valley Trek",
    region: "Annapurna",
    tagline: "Remote Himalayan adventure through Nar and Phu Valleys",
    description: "A 12-day restricted area trek through Nar and Phu, crossing Kang La Pass and returning via the Annapurna Circuit.",
    itinerary: `## Nar Phu Valley Trek — 12 Days

Discover one of Nepal's most remote restricted-area treks through the hidden Nar and Phu Valleys. Journey from Koto to Kang La Pass (5,320m) and rejoin the Annapurna Circuit for a scenic return to Kathmandu.

1. Day 1 — Arrival Kathmandu (1,400m): Welcome, airport pickup, hotel check-in, and trek briefing.
2. Day 2 — Drive Kathmandu to Koto (2,600m): Scenic road transfer through the Marsyangdi Valley.
3. Day 3 — Trek Koto to Meta (3,560m): Enter the Nar Phu Valley with rivers, pine forests, and suspension bridges.
4. Day 4 — Trek Meta to Phu Village (4,080m): Reach the ancient Tibetan village of Phu.
5. Day 5 — Acclimatization in Phu: Explore local monasteries and adjust to altitude.
6. Day 6 — Trek Phu to Nar Phedi (3,490m): Descend to Nar Phedi and visit the mountain monastery.
7. Day 7 — Trek Nar Phedi to Nar Village (4,110m): Climb to Nar Village and enjoy Himalayan viewpoints.
8. Day 8 — Acclimatization in Nar: Rest and explore the village before the pass.
9. Day 9 — Trek Nar to Kang La Pass (5,320m) and descend to Ngawal (3,660m): Cross the pass and enjoy stunning Annapurna range views.
10. Day 10 — Trek Ngawal to Chame (2,670m): Descend through Annapurna Circuit villages.
11. Day 11 — Drive Chame to Kathmandu: Scenic return drive with mountain valley views.
12. Day 12 — Departure: Airport transfer and farewell.

Highlights: Nar Phu restricted area, Kang La Pass, Tibetan culture, monasteries, Annapurna range views, and remote mountain villages.
`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1350,
    duration: { days: 12, nights: 11 },
    rating: 4.8,
    reviewCount: 14,
    tags: ["Trekking", "Remote", "Cultural"],
    destination: "Annapurna",
    category: "trekking",
    groupSize: { min: 2, max: 12 },
    featured: false,
  },
  {
    title: "Lobuche East",
    region: "Everest",
    tagline: "Alpine climbing with Everest views",
    description: "Combine trekking to Everest Base Camp with a thrilling climb to Lobuche East, with spectacular mountain panoramas.",
    itinerary: `# Lobuche East Peak Climbing – 18 Days\n\n## Trip Overview\n\nLobuche East (6,119m) is one of Nepal’s most popular trekking peaks and an excellent choice for climbers looking for a more technical challenge than Mera Peak. Located in the heart of the Everest region, this expedition combines the legendary Everest Base Camp trekking route with an exciting alpine summit climb.\n\nThe journey begins with a scenic flight to Lukla Airport and follows the classic trail through famous Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes.\n\nDuring the expedition, trekkers visit Everest Base Camp, hike to Kala Patthar for panoramic Everest views, and then move toward Lobuche High Camp for the summit push.\n\nFrom the summit of Lobuche East, climbers enjoy stunning views of Mount Everest, Lhotse, Nuptse, Ama Dablam, and surrounding Himalayan peaks.\n\nThis climb is ideal for trekkers with basic mountaineering experience who want to step into technical Himalayan climbing.\n\n---\n\n# Trip Highlights\n\n* Summit Lobuche East (6,119m)\n* Visit Everest Base Camp\n* Sunrise hike to Kala Patthar\n* Scenic flight to/from Lukla Airport\n* Explore Sagarmath la National Park\n* Technical climbing climbing experience with fixed ropes\n* Professional climbing guide support\n* Stunning Everest region mountain views\n* Authentic Sherpa villages and culture\n\n---\n\n# Trip Facts\n\n| Trip Duration    | 18 Days                     |\n| ---------------- | --------------------------- |\n| Maximum Altitude | 6,119m                      |\n| Trip Grade       | Challenging / Technical     |\n| Accommodation    | Hotel / Tea House / Camping |\n| Best Season      | Spring & Autumn             |\n| Group Size       | 1–12 People                 |\n| Transportation   | Flight                      |\n| Start/End Point  | Kathmandu                   |\n\n---\n\n# Detailed Itinerary\n\n### Day 01: Arrival in Kathmandu (1,400m)\n\nArrive at Tribhuvan International Airport and transfer to hotel. Evening trip briefing.\n\n---\n\n### Day 02: Kathmandu Preparation Day\n\nPermit processing, gear check, and expedition preparation. Optional sightseeing in Kathmandu.\n\n---\n\n### Day 03: Fly to Lukla Airport (2,860m) & Trek to Phakding (2,610m)\n\nScenic flight to Lukla followed by an easy trek to Phakding.\n\n*Flight:* 35 minutes\n*Trek:* 3–4 hours\n\n---\n\n### Day 04: Trek to Namche Bazaar (3,440m)\n\nEnter Sagarmatha National Park and trek to the Sherpa capital.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 05: Acclimatization Day at Namche Bazaar\n\nRest day with optional hike to Hotel Everest View.\n\n---\n\n### Day 06: Trek to Tengboche (3,860m)\n\nVisit famous Tengboche Monastery.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 07: Trek to Dingboche (4,410m)\n\nWalk through alpine landscapes and enjoy mountain views.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 08: Acclimatization Day at Dingboche\n\nOptional hike to Nagarjun Hill for altitude adjustment.\n\n---\n\n### Day 09: Trek to Lobuche (4,940m)\n\nPass memorial sites at Thukla and continue toward Lobuche village.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 10: Trek to Everest Base Camp (5,364m) & Return to Gorakshep\n\nVisit Everest Base Camp before returning to Gorakshep.\n\n*Trek:* 7–8 hours\n\n---\n\n### Day 11: Hike to Kala Patthar (5,545m) & Return to Lobuche\n\nEarly morning sunrise hike followed by return to Lobuche.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 12: Trek to Lobuche High Camp (5,400m)\n\nMove to high camp and prepare for summit climb.\n\n*Trek:* 4–5 hours\n\n---\n\n### Day 13: Summit Lobuche East (6,119m) & Return to Pheriche\n\nEarly summit push using fixed ropes before descending.\n\n*Climb Duration:* 8–10 hours\n\n---\n\n### Day 14: Contingency/Rest Day\n\nExtra day reserved for bad weather or recovery.\n\n---\n\n### Day 15: Trek to Namche Bazaar\n\nDescend through beautiful villages.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 16: Trek to Lukla\n\nFinal trekking day.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 17: Fly Back to Kathmandu\n\nMorning flight to Kathmandu and farewell dinner.\n\n---\n\n### Day 18: Final Departure\n\nTransfer to Tribhuvan International Airport for final departure.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1699,
    duration: { days: 18, nights: 17 },
    rating: 4.8,
    reviewCount: 178,
    tags: ["Climbing", "Trekking", "Technical"],
    destination: "Everest",
    groupSize: { min: 1, max: 12 },
    featured: false,
  },
  {
    title: "Annapurna Circuit Trek",
    region: "Annapurna",
    tagline: "A journey through every climate zone",
    description: "From subtropical forests to the Thorong La pass at 5,416m — the most diverse trek in the Himalayas. Walk through all seasons.",
    itinerary: `# Annapurna Circuit Trek via Tilicho Lake – 15 Days\n\n## Trek Overview\n\nThe *Annapurna Circuit Trek via Tilicho Lake* is one of Nepal’s most iconic trekking adventures, combining the classic Annapurna Circuit route with a side trip to the stunning *Tilicho Lake (4,919m)*—one of the world’s highest lakes.\n\nThis trek takes travelers through diverse landscapes including lush forests, waterfalls, deep gorges, alpine deserts, ancient villages, and the famous *Thorong l a Pass (5,416m)*. Trekkers also experience rich Gurung, Manangi, and Tibetan-influenced cultures along the route.\n\n---\n\n### Trek Duration:\n\n15 Days\n\n### Maximum Elevation:\n\nThorong l a Pass – 5,416m\n\n### Trek Difficulty:\n\nModerate to Challenging\n\n### Accommodation:\n\nTea Houses / Mountain Lodges\n\n### Starting Point:\n\nKathmandu → Besisahar → Chame\n\n---\n\n# Trek Highlights\n\n* Visit the breathtaking *Tilicho Lake (4,919m)*\n* Cross the famous *Thorong l a Pass (5,416m)*\n* Explore traditional villages like Manang, Pisang, and Marpha\n* Experience diverse landscapes from subtropical forests to alpine deserts\n* Visit Muktinath Temple\n* Enjoy views of Annapurna, Dhaulagiri, Tilicho Peak, and Gangapurna\n* Relax in Pokhara after completing the trek\n\n---\n\n# Detailed Day-by-Day Itinerary\n\n---\n\n## Day 1: Arrival in Kathmandu (1,400m)\n\nArrive in Kathmandu and transfer to your hotel.\n\n### Activities:\n\n* Airport pickup\n* Trek briefing\n* Explore Thamel\n* Gear shopping\n\n*Accommodation:* Hotel in Kathmandu\n\n---\n\n## Day 2: Drive Kathmandu to Chame (2,670m)\n\nDuration: 8–10 hours\n\nDrive through Besisahar and enjoy scenic mountain roads.\n\n*Highlights:*\n\n* Marshyangdi River\n* Waterfalls\n* Mountain villages\n\n*Accommodation:* Tea house\n\n---\n\n## Day 3: Trek Chame to Upper Pisang (3,300m)\n\nDuration: 5–6 hours\n\nWalk through forests and enjoy views of Annapurna II.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 4: Trek Upper Pisang to Manang (3,540m)\n\nDuration: 6–7 hours\n\nTake the upper route for better mountain views.\n\n*Highlights:*\n\n* Braga Monastery\n* Stunning landscapes\n\n*Accommodation:* Tea house\n\n---\n\n## Day 5: Acclimatization Day in Manang\n\nRest and acclimatization.\n\n### Optional hikes:\n\n* Gangapurna Lake\n* Ice Lake\n* Local monastery visits\n\n*Accommodation:* Tea house\n\n---\n\n## Day 6: Trek Manang to Shree Kharka (4,060m)\n\nDuration: 4–5 hours\n\nStart heading toward Tilicho route.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 7: Trek Shree Kharka to Tilicho Base Camp (4,150m)\n\nDuration: 5–6 hours\n\nWalk along landslide-prone trails.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 8: Visit Tilicho Lake (4,919m) → Return to Shree Kharka\n\nDuration: 7–8 hours\n\nOne of the trek’s major highlights.\n\n*Highlights:*\n\n* Crystal blue lake\n* Snow-capped peaks\n* Incredible photography spots\n\n*Accommodation:* Tea house\n\n---\n\n## Day 9: Trek Shree Kharka to Yak Kharka (4,050m)\n\nDuration: 5–6 hours\n\nReconnect with Annapurna Circuit route.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 10: Trek Yak Kharka to Thorong Phedi (4,525m)\n\nDuration: 4–5 hours\n\nPrepare for pass crossing.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 11: Cross Thorong l a Pass (5,416m) → Muktinath (3,800m)\n\nDuration: 8–10 hours\n\nThe most challenging day of the trek.\n\n*Highlights:*\n\n* Thorong l a Pass\n* Prayer flags\n* Panoramic views\n\n*Accommodation:* Tea house\n\n---\n\n## Day 12: Trek/Drive Muktinath to Jomsom (2,720m)\n\nDuration: 5–6 hours\n\nExplore Mustang landscapes.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 13: Drive/Flight Jomsom to Pokhara\n\nRelax in Pokhara after trekking.\n\n### Activities:\n\n* Lakeside walk\n* Restaurants\n* Spa\n\n*Accommodation:* Hotel\n\n---\n\n## Day 14: Drive/Fly Pokhara to Kathmandu\n\nReturn to Kathmandu.\n\n*Accommodation:* Hotel\n\n---\n\n## Day 15: Final Departure\n\nAirport transfer for your international flight.`,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1299,
    duration: { days: 15, nights: 14 },
    rating: 4.8,
    reviewCount: 248,
    tags: ["Trekking", "Cultural", "Pass"],
    destination: "Annapurna",
    groupSize: { min: 1, max: 12 },
    featured: true,
  },
  {
    title: "Three Pass Trek",
    region: "Everest",
    tagline: "Traverse the high Himalayan passes",
    description: "A classic circuit traversing three high passes near Everest — a challenging and rewarding high-altitude trek for experienced trekkers.",
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

Wi-Fi is available in many villages, though speeds vary and may require an additional charge.

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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    price: 1850,
    duration: { days: 19, nights: 18 },
    rating: 4.9,
    reviewCount: 64,
    tags: ["Trekking", "High Altitude", "Adventure"],
    destination: "Everest",
    groupSize: { min: 1, max: 12 },
    featured: false,
  },
];

async function seed() {
  try {
    console.log('Seeding packages...');
    for (const data of rawDestinations) {
      // Don't add query params to local URLs
      const url = data.imageUrl.startsWith('http://localhost')
        ? data.imageUrl
        : `${data.imageUrl}?auto=format&fit=crop&w=1024&q=80`;

      const processedData = {
        ...data,
        image: url,
        images: [url],
      };
      delete processedData.imageUrl;

      const slug = slugify(String(data.title), { lower: true, strict: true });
      const existing = await Package.find({ slug }).exec();

      if (existing && existing.length > 0) {
        const pkg = existing[0];
        Object.assign(pkg, processedData);
        await pkg.save();
        console.log(`Updated package "${data.title}" (${slug})`);
      } else {
        await Package.create(processedData);
        console.log(`Created package "${data.title}" (${slug})`);
      }
    }
    console.log('Packages seeded successfully!');
  } catch (error) {
    console.error('Error seeding packages:', error);
  } finally {
    process.exit(0);
  }
}

seed();
