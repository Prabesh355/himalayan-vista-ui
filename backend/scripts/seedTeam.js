const Team = require('../models/Team');
const { getPool } = require('../config/db');

// Team members with both local and fallback URLs
const sampleTeamMembers = [
  {
    name: "Nishant Karki",
    role: "Trekking Guide",
    bio: "Experienced trekking guide with deep knowledge of Himalayan trails and local culture. Passionate about sharing Nepal's natural beauty.",
    avatar: 'https://i.pravatar.cc/400?img=12',
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Simon Bhattarai",
    role: "Leading Role",
    bio: "Senior expedition leader and guide with expertise in high-altitude mountaineering. Leads our most challenging expeditions.",
    avatar: 'https://i.pravatar.cc/400?img=13',
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Prashant Mani Tamang",
    role: "Main Guide",
    bio: "Main guide and expedition coordinator with years of experience in managing treks and ensuring traveller safety and comfort.",
    avatar: 'https://i.pravatar.cc/400?img=14',
    sortOrder: 3,
    isActive: true,
  },
  {
    name: "Jangu Sherpa",
    role: "Trekking + Climbing Guide",
    bio: "Expert climbing and trekking guide specializing in high-altitude expeditions. Multi-skilled mountaineer with climbing expertise.",
    avatar: 'https://i.pravatar.cc/400?img=15',
    sortOrder: 4,
    isActive: true,
  },
  {
    name: "Sukadev Thapa",
    role: "Trekking Guide",
    bio: "Dedicated guide with extensive knowledge of remote trails and local villages. Creates memorable cultural experiences.",
    avatar: 'https://i.pravatar.cc/400?img=16',
    sortOrder: 5,
    isActive: true,
  },
  {
    name: "Aadarsha Bhandari",
    role: "Trekking Guide",
    bio: "Professional trekking guide committed to safety and excellent service. Fluent in multiple languages.",
    avatar: 'https://i.pravatar.cc/400?img=17',
    sortOrder: 6,
    isActive: true,
  },
  {
    name: "Sushant Thapa",
    role: "Trekking Guide",
    bio: "Skilled guide with expertise in different seasons. Known for attention to detail and authentic local experiences.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    sortOrder: 7,
    isActive: true,
  },
  {
    name: "Samraj",
    role: "Trekking Guide",
    bio: "Enthusiastic guide with strong connections in local communities. Specializes in cultural and environmental awareness.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    sortOrder: 8,
    isActive: true,
  },
  {
    name: "Prashidda",
    role: "Trekking Guide",
    bio: "Experienced guide passionate about sustainable tourism and environmental conservation in the Himalayas.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    sortOrder: 9,
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
