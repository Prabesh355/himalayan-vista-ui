const { createModel } = require('../lib/postgresModel');

const SiteSettings = createModel('SiteSettings', {
  defaults: {
    siteName: 'Nomads Navigate Nepal',
    logoUrl: '',
    faviconUrl: '',
    contactEmail: 'nomadsnavigatenepal5@gmail.com',
    contactPhone: '+9779769364689',
    address: 'Thamel, Kathmandu · Lakeside, Pokhara',
    googleMapsUrl: '',
    copyrightText: 'Nomads Navigate Nepal. Made with thin air & strong tea.',
    socialLinks: () => ({
      instagram: 'https://www.instagram.com/nomadsnavigatenepal5?igsh=MWJteGl4czI4ejJjZA==',
      facebook: 'https://www.facebook.com/share/1K8PDHZgfM/?mibextid=wwXIfr',
      twitter: '',
      youtube: '',
    }),
    navbarItems: () => [
      { id: 'home', label: 'Home', href: '/', placement: 'primary', visible: true, order: 1 },
      { id: 'destinations', label: 'Destinations', href: '/destinations', placement: 'primary', visible: true, order: 2 },
      { id: 'packages', label: 'Trekking', href: '/packages', placement: 'primary', visible: true, order: 3 },
      { id: 'teams', label: 'Our Teams', href: '/teams', placement: 'primary', visible: true, order: 4 },
      { id: 'blogs', label: 'Stories', href: '/blogs', placement: 'primary', visible: true, order: 5 },
      { id: 'shop', label: 'Shop', href: '/shop', placement: 'primary', visible: true, order: 6 },
      { id: 'about', label: 'About', href: '/about', placement: 'more', visible: true, order: 7 },
      { id: 'contact', label: 'Contact', href: '/contact', placement: 'more', visible: true, order: 8 },
    ],
    footerTagline:
      'Crafting unforgettable Himalayan journeys since 2011. Locally owned, ethically run, lifelong memories.',
    footerColumns: () => [
      {
        title: 'Explore',
        links: [
          { label: 'Destinations', href: '/destinations', visible: true },
          { label: 'Trekking Packages', href: '/packages', visible: true },
          { label: 'Our Teams', href: '/teams', visible: true },
          { label: 'Stories', href: '/blogs', visible: true },
          { label: 'Gallery', href: '/about', visible: true },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about', visible: true },
          { label: 'Contact', href: '/contact', visible: true },
          { label: 'Sign In', href: '/login', visible: true },
          { label: 'Dashboard', href: '/dashboard', visible: true },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Trekking FAQs', href: '/contact', visible: true },
          { label: 'Permits & Visas', href: '/contact', visible: true },
          { label: 'Responsible Travel', href: '/about', visible: true },
          { label: 'Safety', href: '/about', visible: true },
        ],
      },
    ],
    seo: () => ({
      metaTitle: 'Nomads Navigate Nepal — Himalayan Treks & Adventures',
      metaDescription:
        'Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011.',
      metaKeywords: 'Nepal trekking, Everest Base Camp, Annapurna, Himalayan tours',
      ogImage: '',
      canonicalUrl: '',
    }),
    promotionalBanner: () => ({
      enabled: false,
      text: '',
      linkLabel: '',
      linkHref: '',
    }),
  },
});

module.exports = SiteSettings;
