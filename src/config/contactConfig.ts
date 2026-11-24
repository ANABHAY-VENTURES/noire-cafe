/**
 * Centralized Contact & Location Configuration for NOIRÉ Café.
 * 
 * NOTE: The values below are clearly marked demo placeholders for preview
 * and design presentation purposes. Replace with verified business credentials
 * when launching live production.
 */

export interface ContactConfig {
  cafeName: string;
  tagline: string;
  address: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
    fullFormatted: string;
    notes: string;
  };
  phone: {
    display: string;
    value: string;
  };
  email: {
    display: string;
    value: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    kitchenNote: string;
  };
  socials: Array<{
    platform: string;
    handle: string;
    url: string;
  }>;
  maps: {
    embedUrl: string;
    directionsUrl: string;
    coordinates: string;
  };
}

export const CONTACT_CONFIG: ContactConfig = {
  cafeName: "NOIRÉ Café",
  tagline: "Coffee. Crafted Slowly.",
  address: {
    line1: "42 Limmatquai (Demo Location)",
    city: "Zürich",
    postalCode: "8001",
    country: "Switzerland",
    fullFormatted: "42 Limmatquai (Demo Location), 8001 Zürich, Switzerland",
    notes: "Directly alongside the Limmat river promenade · 4 min walk from Zürich HB",
  },
  phone: {
    display: "+41 44 000 00 00 (Demo Line)",
    value: "+41440000000",
  },
  email: {
    display: "bonjour@noirecafe.demo",
    value: "mailto:bonjour@noirecafe.demo",
  },
  hours: {
    weekdays: "07:30 – 19:00",
    saturday: "08:00 – 19:30",
    sunday: "08:30 – 18:00",
    kitchenNote: "*Artisanal bakery and slow-pour kitchen service open until 16:00 daily.",
  },
  socials: [
    {
      platform: "Instagram",
      handle: "@noire.zurich",
      url: "https://instagram.com",
    },
    {
      platform: "Spotify",
      handle: "NOIRÉ Acoustic Sessions",
      url: "https://spotify.com",
    },
    {
      platform: "Substack",
      handle: "The NOIRÉ Dispatch",
      url: "https://substack.com",
    },
  ],
  maps: {
    // Standard embed centered on the scenic Limmatquai in Zürich
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.884787994018!2d8.541485376899478!3d47.37123960458872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a00df18902d%3A0xbcf4c3db5a8e1e75!2sLimmatquai%2042%2C%208001%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1710000000000!5m2!1sen!2sch",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Limmatquai+42+Zurich+Switzerland",
    coordinates: "47.3712° N, 8.5435° E · Alt. 408m",
  },
};
