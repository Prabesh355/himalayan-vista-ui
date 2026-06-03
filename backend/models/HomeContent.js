const { createModel } = require('../lib/postgresModel');

const HomeContent = createModel('HomeContent', {
  defaults: {
    hero: () => ({
      badgeText: "Small group sizes · Expert Nepali guides",
      title: "NOMADS NAVIGATE NEPAL",
      description: "Explore Nepal, Beyond Maps",
      backgroundImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
    }),
    stats: () => [
      { label: "Happy travellers", value: "12K+" },
      { label: "Treks led", value: "850+" },
      { label: "Years in Nepal", value: "14" },
      { label: "Avg. rating", value: "4.9" }
    ],
    why: () => [
      {
        icon: "Compass",
        title: "Locally led, always",
        body: "Every trek is guided by certified Nepali leaders born in the regions you'll trek."
      },
      {
        icon: "ShieldCheck",
        title: "Safety isn't optional",
        body: "Oxygen, satellite comms and IFMGA-trained guides on every high-altitude departure."
      },
      {
        icon: "Sparkles",
        title: "Small, by design",
        body: "Group sizes capped at 10 so trails stay quiet and tea-house chats stay personal."
      }
    ],
    testimonials: () => [
      {
        id: "t1",
        name: "Maya Tanaka",
        country: "Japan",
        avatar: "https://i.pravatar.cc/120?img=47",
        quote: "The EBC trek with Nomads was the trip of a lifetime. Our guide Tenzing made every day feel both safe and magical.",
        trek: "Everest Base Camp"
      },
      {
        id: "t2",
        name: "Lucas Ferreira",
        country: "Brazil",
        avatar: "https://i.pravatar.cc/120?img=12",
        quote: "Beautifully organised. Tea-houses, permits, transfers — everything just worked. I focused on the mountains.",
        trek: "Annapurna Circuit"
      },
      {
        id: "t3",
        name: "Priya Sharma",
        country: "India",
        avatar: "https://i.pravatar.cc/120?img=32",
        quote: "Langtang felt like a hidden secret. Our small group, the silence of the valleys, the food — perfection.",
        trek: "Langtang Valley"
      }
    ],
    cta: () => ({
      title: "Your Nepal story starts with one email.",
      subtitle: "Tell us your dates and dream peak — we'll come back within 24 hours with a tailor-made plan."
    })
  }
});

module.exports = HomeContent;
