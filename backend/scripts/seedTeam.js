require('dotenv').config();
const Team = require('../models/Team');
const { getPool } = require('../config/db');

const sampleTeamMembers = [
  {
    name: "Sherpa Pemba",
    role: "Head Guide",
    bio: "With over 20 years of trekking experience in the Himalayas, Sherpa Pemba leads expeditions with expertise and passion. He has successfully guided hundreds of climbers to summits across Nepal.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Ang Rita",
    role: "Senior Trekking Guide",
    bio: "Ang Rita specializes in high-altitude expeditions and has a deep knowledge of Sherpa culture. Her friendly demeanor and mountain expertise make every trek unforgettable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Dawa Tenzing",
    role: "Cultural Expert",
    bio: "Born in the shadow of Everest, Dawa shares authentic insights into Sherpa traditions, Buddhism, and Himalayan culture. His storytelling brings the mountains to life.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    sortOrder: 3,
    isActive: true,
  },
  {
    name: "Kamala Lama",
    role: "Logistics Manager",
    bio: "Kamala ensures every trek is perfectly organized, from permits to accommodations. Her attention to detail means you can focus on the adventure.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    sortOrder: 4,
    isActive: true,
  },
];

async function seedTeamMembers() {
  try {
    console.log('Starting team member seed...');
    
    for (const member of sampleTeamMembers) {
      try {
        const existing = await Team.findOne({ name: member.name });
        if (!existing) {
          await Team.create(member);
          console.log(`✓ Created team member: ${member.name}`);
        } else {
          console.log(`- Team member already exists: ${member.name}`);
        }
      } catch (err) {
        console.error(`✗ Error creating ${member.name}:`, err.message);
      }
    }
    
    const count = await Team.countDocuments();
    console.log(`\n✓ Team seed complete. Total team members: ${count}`);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seedTeamMembers().then(() => {
  console.log('Seed script finished.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
