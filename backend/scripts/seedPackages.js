require('dotenv').config();
const Package = require('../models/Package');
const { getPool } = require('../config/db');

const destinations = [
  {
    title: "Everest Base Camp",
    region: "Everest",
    tagline: "Walk in the footsteps of legends",
    description: "The classic trek to the foot of the world's highest mountain, through Sherpa villages, Buddhist monasteries and surreal high-altitude landscapes.",
    itinerary: `## Everest Base Camp Trek — 14 Days\n\nThe classic Everest Base Camp route is a Himalayan bucket-list journey through the Khumbu Valley. Trek through Sherpa towns, ancient monasteries, and rugged high-altitude landscapes with the South Face of Everest as the backdrop.\n\n1. Day 1 — Arrival Kathmandu (1,400 m): Airport pickup, welcome dinner, and trek briefing.\n2. Day 2 — Kathmandu to Lukla; trek to Phakding (2,650 m): Short mountain flight to Lukla, then gentle walk along the Dudh Koshi.\n3. Day 3 — Phakding to Namche Bazaar (3,440 m): Enter Sagarmatha National Park and climb to the bustling Sherpa town of Namche.\n4. Day 4 — Acclimatization in Namche Bazaar: Short hikes, museum visit, and rest day for altitude adjustment.\n5. Day 5 — Namche Bazaar to Tengboche (3,860 m): Walk past pine forests and Mani walls to the famous Tengboche monastery.\n6. Day 6 — Tengboche to Dingboche (4,410 m): High alpine trekking with excellent views of Lhotse, Ama Dablam and Nuptse.\n7. Day 7 — Acclimatization in Dingboche: Hike to Nagarjun Hill or Chukung for clearer mountain views.\n8. Day 8 — Dingboche to Lobuche (4,940 m): A strong climb to Lobuche with glacier views ahead.\n9. Day 9 — Lobuche to Gorak Shep (5,170 m) and Everest Base Camp (5,364 m): Reach the famous camp and return to Gorak Shep.\n10. Day 10 — Hike to Kala Patthar (5,545 m) and descend to Pheriche: Sunrise mountain panorama and gradual descent to lower altitude.\n11. Day 11 — Pheriche to Namche Bazaar: Trek back through Sherpa villages and alpine meadows.\n12. Day 12 — Namche Bazaar to Lukla: Final trek through the Khumbu Valley.\n13. Day 13 — Fly Lukla to Kathmandu: Return flight and farewell evening in Kathmandu.\n14. Day 14 — Departure: Transfer to the airport for your onward journey.\n\nHighlights: Everest Base Camp, Kala Patthar sunrise view, Tengboche monastery, Sherpa culture, Sagarmatha National Park.`,
    images: ["https://images.unsplash.com/photo-1533418263911-173776b1441c"],
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
    images: ["https://images.unsplash.com/photo-1520201762631-6756d6898373"],
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
    images: ["https://images.unsplash.com/photo-1464822759023-0a7986b21c1b"],
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
    images: ["https://images.unsplash.com/photo-1506744038136-462857d430e8"],
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
    title: "Annapurna Base Camp",
    region: "Annapurna",
    tagline: "Surrounded by the Annapurna massif",
    description: "Trek to the heart of the Annapurna range. Wake up to stunning 360-degree views of snow-capped peaks at 4,130m.",
    itinerary: `## Annapurna Base Camp Trek — 10 Days\n\nThis classic Annapurna trek takes you through lush rhododendron forests, traditional Gurung villages, and high alpine landscapes, ending at the mighty Annapurna Sanctuary.\n\n1. Day 1 — Arrival Kathmandu: Welcome, permit processing, and trek briefing.\n2. Day 2 — Kathmandu to Pokhara: Scenic road transfer, then early preparation in lakeside Pokhara.\n3. Day 3 — Drive to Nayapul; trek to Tikhedhunga: Begin the trek through farmland and rivers.\n4. Day 4 — Tikhedhunga to Ghorepani: Climb through bamboo forest to the popular village of Ghorepani.\n5. Day 5 — Poon Hill sunrise; trek to Tadapani: Early hilltop sunrise followed by a day of magnificent mountain views.\n6. Day 6 — Tadapani to Chomrong: Descend into the Modi Khola valley and continue toward alpine villages.\n7. Day 7 — Chomrong to Dovan: Trek through rhododendron forests and quiet hillside villages.\n8. Day 8 — Dovan to Machhapuchhre Base Camp: Enter the Annapurna Sanctuary with stunning close-up views.\n9. Day 9 — Machhapuchhre Base Camp to Annapurna Base Camp, return to Dovan: Reach ABC at 4,130m and enjoy panoramic views of the massif.\n10. Day 10 — Dovan to Pokhara: Descend to the valley and transfer back to Pokhara for relaxation.\n\nHighlights: Poon Hill sunrise, Annapurna Sanctuary, Gurung culture, mountain views, and tea-house hospitality.`,
    images: ["https://images.unsplash.com/photo-1544735716-56d8902a6f14"],
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
    title: "Lobuche East",
    region: "Everest",
    tagline: "Alpine climbing with Everest views",
    description: "Combine trekking to Everest Base Camp with a thrilling climb to Lobuche East, with spectacular mountain panoramas.",
    itinerary: `# Lobuche East Peak Climbing – 18 Days\n\n## Trip Overview\n\nLobuche East (6,119m) is one of Nepal’s most popular trekking peaks and an excellent choice for climbers looking for a more technical challenge than Mera Peak. Located in the heart of the Everest region, this expedition combines the legendary Everest Base Camp trekking route with an exciting alpine summit climb.\n\nThe journey begins with a scenic flight to Lukla Airport and follows the classic trail through famous Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes.\n\nDuring the expedition, trekkers visit Everest Base Camp, hike to Kala Patthar for panoramic Everest views, and then move toward Lobuche High Camp for the summit push.\n\nFrom the summit of Lobuche East, climbers enjoy stunning views of Mount Everest, Lhotse, Nuptse, Ama Dablam, and surrounding Himalayan peaks.\n\nThis climb is ideal for trekkers with basic mountaineering experience who want to step into technical Himalayan climbing.\n\n---\n\n# Trip Highlights\n\n* Summit Lobuche East (6,119m)\n* Visit Everest Base Camp\n* Sunrise hike to Kala Patthar\n* Scenic flight to/from Lukla Airport\n* Explore Sagarmatha National Park\n* Technical climbing climbing experience with fixed ropes\n* Professional climbing guide support\n* Stunning Everest region mountain views\n* Authentic Sherpa villages and culture\n\n---\n\n# Trip Facts\n\n| Trip Duration    | 18 Days                     |\n| ---------------- | --------------------------- |\n| Maximum Altitude | 6,119m                      |\n| Trip Grade       | Challenging / Technical     |\n| Accommodation    | Hotel / Tea House / Camping |\n| Best Season      | Spring & Autumn             |\n| Group Size       | 1–12 People                 |\n| Transportation   | Flight                      |\n| Start/End Point  | Kathmandu                   |\n\n---\n\n# Detailed Itinerary\n\n### Day 01: Arrival in Kathmandu (1,400m)\n\nArrive at Tribhuvan International Airport and transfer to hotel. Evening trip briefing.\n\n---\n\n### Day 02: Kathmandu Preparation Day\n\nPermit processing, gear check, and expedition preparation. Optional sightseeing in Kathmandu.\n\n---\n\n### Day 03: Fly to Lukla Airport (2,860m) & Trek to Phakding (2,610m)\n\nScenic flight to Lukla followed by an easy trek to Phakding.\n\n*Flight:* 35 minutes\n*Trek:* 3–4 hours\n\n---\n\n### Day 04: Trek to Namche Bazaar (3,440m)\n\nEnter Sagarmatha National Park and trek to the Sherpa capital.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 05: Acclimatization Day at Namche Bazaar\n\nRest day with optional hike to Hotel Everest View.\n\n---\n\n### Day 06: Trek to Tengboche (3,860m)\n\nVisit famous Tengboche Monastery.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 07: Trek to Dingboche (4,410m)\n\nWalk through alpine landscapes and enjoy mountain views.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 08: Acclimatization Day at Dingboche\n\nOptional hike to Nagarjun Hill for altitude adjustment.\n\n---\n\n### Day 09: Trek to Lobuche (4,940m)\n\nPass memorial sites at Thukla and continue toward Lobuche village.\n\n*Trek:* 5–6 hours\n\n---\n\n### Day 10: Trek to Everest Base Camp (5,364m) & Return to Gorakshep\n\nVisit Everest Base Camp before returning to Gorakshep.\n\n*Trek:* 7–8 hours\n\n---\n\n### Day 11: Hike to Kala Patthar (5,545m) & Return to Lobuche\n\nEarly morning sunrise hike followed by return to Lobuche.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 12: Trek to Lobuche High Camp (5,400m)\n\nMove to high camp and prepare for summit climb.\n\n*Trek:* 4–5 hours\n\n---\n\n### Day 13: Summit Lobuche East (6,119m) & Return to Pheriche\n\nEarly summit push using fixed ropes before descending.\n\n*Climb Duration:* 8–10 hours\n\n---\n\n### Day 14: Contingency/Rest Day\n\nExtra day reserved for bad weather or recovery.\n\n---\n\n### Day 15: Trek to Namche Bazaar\n\nDescend through beautiful villages.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 16: Trek to Lukla\n\nFinal trekking day.\n\n*Trek:* 6–7 hours\n\n---\n\n### Day 17: Fly Back to Kathmandu\n\nMorning flight to Kathmandu and farewell dinner.\n\n---\n\n### Day 18: Final Departure\n\nTransfer to Tribhuvan International Airport for final departure.`,
    images: ["https://images.unsplash.com/photo-1464822759023-0a7986b21c1b"],
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
    description: "From subtropical forests to the Thorong l a pass at 5,416m — the most diverse trek in the Himalayas. Walk through all seasons.",
    itinerary: `# Annapurna Circuit Trek via Tilicho Lake – 15 Days\n\n## Trek Overview\n\nThe *Annapurna Circuit Trek via Tilicho Lake* is one of Nepal’s most iconic trekking adventures, combining the classic Annapurna Circuit route with a side trip to the stunning *Tilicho Lake (4,919m)*—one of the world’s highest lakes.\n\nThis trek takes travelers through diverse landscapes including lush forests, waterfalls, deep gorges, alpine deserts, ancient villages, and the famous *Thorong l a Pass (5,416m)*. Trekkers also experience rich Gurung, Manangi, and Tibetan-influenced cultures along the route.\n\n---\n\n### Trek Duration:\n\n15 Days\n\n### Maximum Elevation:\n\nThorong l a Pass – 5,416m\n\n### Trek Difficulty:\n\nModerate to Challenging\n\n### Accommodation:\n\nTea Houses / Mountain Lodges\n\n### Starting Point:\n\nKathmandu → Besisahar → Chame\n\n---\n\n# Trek Highlights\n\n* Visit the breathtaking *Tilicho Lake (4,919m)*\n* Cross the famous *Thorong l a Pass (5,416m)*\n* Explore traditional villages like Manang, Pisang, and Marpha\n* Experience diverse landscapes from subtropical forests to alpine deserts\n* Visit Muktinath Temple\n* Enjoy views of Annapurna, Dhaulagiri, Tilicho Peak, and Gangapurna\n* Relax in Pokhara after completing the trek\n\n---\n\n# Detailed Day-by-Day Itinerary\n\n---\n\n## Day 1: Arrival in Kathmandu (1,400m)\n\nArrive in Kathmandu and transfer to your hotel.\n\n### Activities:\n\n* Airport pickup\n* Trek briefing\n* Explore Thamel\n* Gear shopping\n\n*Accommodation:* Hotel in Kathmandu\n\n---\n\n## Day 2: Drive Kathmandu to Chame (2,670m)\n\nDuration: 8–10 hours\n\nDrive through Besisahar and enjoy scenic mountain roads.\n\n*Highlights:*\n\n* Marshyangdi River\n* Waterfalls\n* Mountain villages\n\n*Accommodation:* Tea house\n\n---\n\n## Day 3: Trek Chame to Upper Pisang (3,300m)\n\nDuration: 5–6 hours\n\nWalk through forests and enjoy views of Annapurna II.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 4: Trek Upper Pisang to Manang (3,540m)\n\nDuration: 6–7 hours\n\nTake the upper route for better mountain views.\n\n*Highlights:*\n\n* Braga Monastery\n* Stunning landscapes\n\n*Accommodation:* Tea house\n\n---\n\n## Day 5: Acclimatization Day in Manang\n\nRest and acclimatization.\n\n### Optional hikes:\n\n* Gangapurna Lake\n* Ice Lake\n* Local monastery visits\n\n*Accommodation:* Tea house\n\n---\n\n## Day 6: Trek Manang to Shree Kharka (4,060m)\n\nDuration: 4–5 hours\n\nStart heading toward Tilicho route.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 7: Trek Shree Kharka to Tilicho Base Camp (4,150m)\n\nDuration: 5–6 hours\n\nWalk along landslide-prone trails.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 8: Visit Tilicho Lake (4,919m) → Return to Shree Kharka\n\nDuration: 7–8 hours\n\nOne of the trek’s major highlights.\n\n*Highlights:*\n\n* Crystal blue lake\n* Snow-capped peaks\n* Incredible photography spots\n\n*Accommodation:* Tea house\n\n---\n\n## Day 9: Trek Shree Kharka to Yak Kharka (4,050m)\n\nDuration: 5–6 hours\n\nReconnect with Annapurna Circuit route.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 10: Trek Yak Kharka to Thorong Phedi (4,525m)\n\nDuration: 4–5 hours\n\nPrepare for pass crossing.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 11: Cross Thorong l a Pass (5,416m) → Muktinath (3,800m)\n\nDuration: 8–10 hours\n\nThe most challenging day of the trek.\n\n*Highlights:*\n\n* Thorong l a Pass\n* Prayer flags\n* Panoramic views\n\n*Accommodation:* Tea house\n\n---\n\n## Day 12: Trek/Drive Muktinath to Jomsom (2,720m)\n\nDuration: 5–6 hours\n\nExplore Mustang landscapes.\n\n*Accommodation:* Tea house\n\n---\n\n## Day 13: Drive/Flight Jomsom to Pokhara\n\nRelax in Pokhara after trekking.\n\n### Activities:\n\n* Lakeside walk\n* Restaurants\n* Spa\n\n*Accommodation:* Hotel\n\n---\n\n## Day 14: Drive/Fly Pokhara to Kathmandu\n\nReturn to Kathmandu.\n\n*Accommodation:* Hotel\n\n---\n\n## Day 15: Final Departure\n\nAirport transfer for your international flight.`,
    images: ["https://images.unsplash.com/photo-1464822759023-0a7986b21c1b"],
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
    itinerary: "A classic circuit traversing three high passes near Everest.",
    images: ["https://images.unsplash.com/photo-1464822759023-0a7986b21c1b"],
    price: 1999,
    duration: { days: 18, nights: 17 },
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
    for (const data of destinations) {
      await Package.create(data);
    }
    console.log('Packages seeded successfully!');
  } catch (error) {
    console.error('Error seeding packages:', error);
  } finally {
    process.exit(0);
  }
}

seed();
