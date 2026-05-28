import everest from "@/assets/dest-everest.jpg";
import annapurna from "@/assets/dest-annapurna.jpg";
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
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    tagline: "A journey through every climate zone",
    description:
      "From subtropical forests to the Thorong La pass at 5,416m — the most diverse trek in the Himalayas.",
    image: annapurna,
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
    id: "3",
    slug: "pokhara-phewa",
    name: "Pokhara & Phewa Lake",
    region: "Pokhara",
    tagline: "Lakeside calm beneath the fishtail",
    description:
      "Paragliding, lakeside cafés, and dawn reflections of Machapuchare — the perfect launchpad for Annapurna adventures.",
    image: pokhara,
    altitude: "822 m",
    bestSeason: "Year-round",
    difficulty: "Easy",
    duration: "3 days",
    priceFrom: 299,
    rating: 4.7,
    reviews: 521,
    tags: ["City", "Lake", "Adventure"],
  },
  {
    id: "4",
    slug: "kathmandu-heritage",
    name: "Kathmandu Heritage",
    region: "Kathmandu Valley",
    tagline: "Seven UNESCO sites in one valley",
    description:
      "Boudhanath, Pashupatinath, Durbar Squares and ancient Newar towns — a cultural deep-dive through living history.",
    image: kathmandu,
    altitude: "1,400 m",
    bestSeason: "Oct–Mar",
    difficulty: "Easy",
    duration: "4 days",
    priceFrom: 449,
    rating: 4.6,
    reviews: 389,
    tags: ["Cultural", "UNESCO", "City"],
  },
  {
    id: "5",
    slug: "langtang-valley",
    name: "Langtang Valley",
    region: "Langtang",
    tagline: "Quiet trails, glacial meadows",
    description:
      "Less crowded than Everest or Annapurna — pristine alpine valleys, yak pastures and warm Tamang hospitality.",
    image: langtang,
    altitude: "4,984 m",
    bestSeason: "Mar–May · Oct–Nov",
    difficulty: "Moderate",
    duration: "10 days",
    priceFrom: 899,
    rating: 4.8,
    reviews: 156,
    tags: ["Trekking", "Off-beat", "Wildlife"],
  },
  {
    id: "6",
    slug: "chitwan-safari",
    name: "Chitwan Jungle Safari",
    region: "Lowlands",
    tagline: "Rhinos, tigers and ancient jungles",
    description:
      "Trade peaks for plains — jeep safaris, canoe rides and Tharu villages in Nepal's first national park.",
    image: chitwan,
    altitude: "150 m",
    bestSeason: "Oct–Mar",
    difficulty: "Easy",
    duration: "3 days",
    priceFrom: 399,
    rating: 4.7,
    reviews: 274,
    tags: ["Wildlife", "Safari", "Jungle"],
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