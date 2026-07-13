import nishantImg from "@/assets/Nishant Karki.jpg";
import simonImg from "@/assets/Simon Bhattarai.jpg";
import prashantImg from "@/assets/Prashant Mani Tamang.jpg";
import janguImg from "@/assets/Jangu Sherpa.jpg";
import sukadevImg from "@/assets/Sukadev Thapa.jpeg";
import aadarshaImg from "@/assets/Aadarsha Bhandari.jpg";
import sushantImg from "@/assets/Sushant Thapa.JPG";
import samrajImg from "@/assets/Samraj.jpg";
import prashiddhaImg from "@/assets/Prashiddha.jpg";

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  quote: string;
  trek: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface TeamMember {
  id: string;
  _id?: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [];

export const stats: StatItem[] = [
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
    avatar: nishantImg,
  },
  {
    id: "tm2",
    name: "Simon Bhattarai",
    role: "Leading Role",
    bio: "Senior expedition leader and guide with expertise in high-altitude mountaineering. Leads our most challenging expeditions.",
    avatar: simonImg,
  },
  {
    id: "tm3",
    name: "Prashant Mani Tamang",
    role: "Main Guide",
    bio: "Main guide and expedition coordinator with years of experience in managing treks and ensuring traveller safety and comfort.",
    avatar: prashantImg,
  },
  {
    id: "tm4",
    name: "Jangu Sherpa",
    role: "Trekking + Climbing Guide",
    bio: "Expert climbing and trekking guide specializing in high-altitude expeditions. Multi-skilled mountaineer with climbing expertise.",
    avatar: janguImg,
  },
  {
    id: "tm5",
    name: "Sukadev Thapa",
    role: "Trekking Guide",
    bio: "Dedicated guide with extensive knowledge of remote trails and local villages. Creates memorable cultural experiences.",
    avatar: sukadevImg,
  },
  {
    id: "tm6",
    name: "Aadarsha Bhandari",
    role: "Trekking Guide",
    bio: "Professional trekking guide committed to safety and excellent service. Fluent in multiple languages.",
    avatar: aadarshaImg,
  },
  {
    id: "tm7",
    name: "Sushant Thapa",
    role: "Trekking Guide",
    bio: "Skilled guide with expertise in different seasons. Known for attention to detail and authentic local experiences.",
    avatar: sushantImg,
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
