import everest from "@/assets/everest-base-camp.jpeg";
import mera from "@/assets/mera-peak-expedition.jpg";
import meraSki from "@/assets/Mera Peak ski.jpg";
import annapurna from "@/assets/annapurna-base-camp.jpg";
import annapurnaCircuit from "@/assets/annapurna-circuit.jpg";
import manaslu from "@/assets/manaslu.jpg";
import lobucheEast from "@/assets/lobuche-east.jpg";
import threePass from "@/assets/everest-three-pass-trek.jpg";
import pokhara from "@/assets/dest-pokhara.jpg";
import kathmandu from "@/assets/dest-kathmandu.jpg";
import langtang from "@/assets/dest-langtang.jpg";
import chitwan from "@/assets/dest-chitwan.jpg";

export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";
export type Region = "Everest" | "Annapurna" | "Langtang" | "Kathmandu Valley" | "Pokhara" | "Lowlands";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: Region;
  tagline: string;
  description: string;
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
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: "tm2",
    name: "Simon Bhattarai",
    role: "Leading Role",
    bio: "Senior expedition leader and guide with expertise in high-altitude mountaineering. Leads our most challenging expeditions.",
    avatar: "https://i.pravatar.cc/120?img=34",
  },
  {
    id: "tm3",
    name: "Prashant Mani Tamang",
    role: "Main Guide",
    bio: "Main guide and expedition coordinator with years of experience in managing treks and ensuring traveller safety and comfort.",
    avatar: "https://i.pravatar.cc/120?img=35",
  },
  {
    id: "tm4",
    name: "Jangu Sherpa",
    role: "Trekking + Climbing Guide",
    bio: "Expert climbing and trekking guide specializing in high-altitude expeditions. Multi-skilled mountaineer with climbing expertise.",
    avatar: "https://i.pravatar.cc/120?img=36",
  },
  {
    id: "tm5",
    name: "Sukadev Thapa",
    role: "Trekking Guide",
    bio: "Dedicated guide with extensive knowledge of remote trails and local villages. Creates memorable cultural experiences.",
    avatar: "https://i.pravatar.cc/120?img=37",
  },
  {
    id: "tm6",
    name: "Aadarsha Bhandari",
    role: "Trekking Guide",
    bio: "Professional trekking guide committed to safety and excellent service. Fluent in multiple languages.",
    avatar: "https://i.pravatar.cc/120?img=38",
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