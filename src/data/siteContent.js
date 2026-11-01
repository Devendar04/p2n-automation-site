/**
 * Single source of truth for P2N Automation's real-world content.
 * Source: "Website Content & Assets Document" (P2N Automation).
 *
 * Text lives here (not in images) so it renders as real HTML for SEO.
 * Image files live in /public/images/** and are referenced by absolute path.
 */

/* ------------------------------------------------------------------ */
/* SECTION 1 — PRESS, MEDIA & ACHIEVEMENTS                             */
/* ------------------------------------------------------------------ */
/**
 * layout:
 *   "lead"     → large feature row at the top of /press (slider + text)
 *   "card"     → grid card
 *   "portrait" → feature row for a tall screenshot (press clipping)
 */
export const PRESS_ITEMS = [
  {
    id: "tie-global-summit",
    layout: "lead",
    event: "JECC TiE Global Summit (Hackathon Winners)",
    emoji: "🏆",
    heading: "1st Prize Winners at TiE Global Summit",
    subheading: "AI Hackathon (Category: AI Tutor for Human Well-Being)",
    description:
      "P2N Automation secured the 1st Position and a ₹1,50,000 cash award at the prestigious TiE Global Summit (TGS) in Jaipur. Competing against 300+ teams, we showcased our winning innovation GLAMIFY (AI + XR Smart Mirror) to 1000+ founders and investors.",
    images: [
      {
        src: "/images/press/tie-global-summit-winners-cheque.jpg",
        alt: "Two P2N Automation team members holding the AI Hackathon winner's prize cheque of Rs. 1,50,000 at the TiE Global Summit",
        width: 360,
        height: 640,
      },
      {
        src: "/images/press/tie-global-summit-team-with-cheque.jpg",
        alt: "P2N Automation team members and guests posing with the AI Hackathon prize cheque on stage at the TiE Global Summit",
        width: 512,
        height: 384,
      },
      {
        src: "/images/press/tie-global-summit-expo-booth.jpg",
        alt: "Two P2N Automation founders standing at an exhibition stall at the TiE Global Summit in Jaipur",
        width: 480,
        height: 640,
      },
    ],
  },
  {
    id: "rashtriya-swadeshi-mahotsav",
    layout: "card",
    event: "Rashtriya Swadeshi Mahotsav, Chittorgarh",
    emoji: "🎪",
    heading: "Showcasing Innovation via iStart",
    subheading: "Rashtriya Swadeshi Mahotsav",
    description:
      "Proudly represented P2N Automation through iStart Rajasthan at this grand week-long exhibition, demonstrating our tech solutions and startup vision to administration and pan-India industries.",
    images: [
      {
        src: "/images/press/swadeshi-mahotsav-startup-pavilion.jpg",
        alt: "Group photo of startup teams at the iSTART Rajasthan Swadeshi Startup Pavilion at Rashtriya Swadeshi Mahotsav, Chittorgarh",
        width: 648,
        height: 432,
      },
      {
        src: "/images/press/swadeshi-mahotsav-startup-pavilion-sign.jpg",
        alt: "P2N Automation team standing with iStart Rajasthan representatives in front of the Startup Pavilion sign",
        width: 384,
        height: 512,
      },
      {
        src: "/images/press/swadeshi-mahotsav-vr-demo.jpg",
        alt: "A P2N Automation team member demonstrating a VR headset and laptop to officials at the Swadeshi Mahotsav stall",
        width: 540,
        height: 360,
      },
    ],
  },
  {
    id: "sssweekend-rajasthan",
    layout: "card",
    event: "SSSWeekend Rajasthan (Taj Amer)",
    emoji: "🤝",
    heading: "Global Startup Collaboration",
    subheading: "SSSWeekend Rajasthan | Taj Amer",
    description:
      "Allotted a dedicated startup desk to pitch our vision directly to international investors, government officials, and delegates in collaboration with Startup Armenia.",
    images: [
      {
        src: "/images/press/sssweekend-rajasthan-signage.jpg",
        alt: "P2N Automation founders in front of the #SSSWeekend Rajasthan sign with Startup Armenia and iStart flags",
        width: 800,
        height: 600,
      },
      {
        src: "/images/press/sssweekend-rajasthan-startup-summit-banners.jpg",
        alt: "P2N Automation founders standing between Rajasthan Startup Summit 2026 banners at Taj Amer, Jaipur",
        width: 480,
        height: 640,
      },
    ],
  },
  {
    id: "traffic-infratech-expo",
    layout: "card",
    event: "Traffic InfraTech Expo",
    emoji: "🚦",
    heading: "Exploring Future Mobility",
    subheading: "14th Traffic InfraTech Expo at Bharat Mandapam, Delhi",
    description:
      "Visited India’s premier B2B transport expo to explore cutting-edge AI, traffic management, and smart-mobility tech to continuously upgrade our ITMS project.",
    images: [
      {
        src: "/images/press/traffic-infratech-bharat-mandapam.jpg",
        alt: "P2N Automation founders outside Bharat Mandapam in Delhi on the day of the Traffic InfraTech Expo",
        width: 600,
        height: 800,
      },
      {
        src: "/images/press/traffic-infratech-expo-backdrop.jpg",
        alt: "P2N Automation founders in front of the Transport + Traffic InfraTech Expo backdrop",
        width: 480,
        height: 640,
      },
    ],
  },
  {
    id: "tiecon-udaipur",
    layout: "card",
    event: "TiEcon Udaipur (Hotel Marriott)",
    emoji: "🌟",
    heading: "Startup Showcase at TiEcon Udaipur",
    subheading: "South Rajasthan's Largest Entrepreneurship Summit",
    description:
      "Proudly represented P2N Automation as a promising startup at TiEcon Udaipur, held at Hotel Marriott. Networked with industry leaders and showcased our technological innovations at South Rajasthan's largest entrepreneurship summit.",
    images: [
      {
        src: "/images/press/tiecon-udaipur-26.jpg",
        alt: "A P2N Automation team member standing behind the TiE Udaipur sign at TiEcon Udaipur 2026",
        width: 480,
        height: 640,
      },
    ],
  },
  {
    id: "itms-media-coverage",
    layout: "portrait",
    event: "ITMS Media Coverage",
    emoji: "📰",
    heading: "Media Spotlight on ITMS",
    subheading: "Press Coverage for Intelligent Traffic Management System",
    description:
      "Our successful deployment of the AI-powered ITMS (Intelligent Traffic Management System) caught the media's attention. We were featured in the press for our contribution to smart city mobility, enhancing road safety, and automating traffic enforcement.",
    images: [
      {
        src: "/images/press/itms-media-coverage-udaipurblog.jpg",
        alt: "UdaipurBlog news post showing the AI traffic control system trial at Fatehpura Circle, Udaipur, with the P2N Automation team testing the system on a laptop",
        width: 432,
        height: 768,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SECTION 2 — OUR PROJECTS                                            */
/* ------------------------------------------------------------------ */
export const PROJECT_FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "ai", label: "AI & Smart Mobility" },
  { key: "defence", label: "Defence & Hardware" },
  { key: "spatial", label: "Spatial & 3D" },
];

export const PROJECTS = [
  {
    id: "itms",
    category: "ai",
    tag: "AI · Smart City",
    title: "ITMS (Intelligent Traffic Management System)",
    emoji: "🚦",
    heading: "Smart City ITMS",
    description:
      "Successfully deployed the pilot version of our AI-powered Intelligent Traffic Management System in Udaipur and Jaipur. It utilizes computer vision to optimize traffic flow, enhance road safety, and automate rule enforcement.",
    // No photo was supplied for ITMS ("generate the image from AI" in the brief).
    // This is a text-free illustration drawn in the site palette — swap in a
    // real photo or AI render by replacing the file or this src.
    images: [
      {
        src: "/images/projects/itms-illustration.svg",
        alt: "Illustration of an AI traffic camera detecting and tracking vehicles at a city intersection",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    id: "indian-army-drone-arena",
    category: "defence",
    tag: "Defence",
    title: "Indian Army Defence Indoor Drone Arena",
    emoji: "🪖",
    heading: "Defence Drone Testing Facility",
    description:
      "A proud contribution to national security. We developed a specialized indoor drone arena in Kashmir for the Indian Army, engineered for tactical flight testing and strategic soldier training.",
    images: [
      {
        src: "/images/projects/indian-army-indoor-drone-arena.jpg",
        alt: "Four P2N Automation team members standing inside the indoor drone arena built for the Indian Army, with padded checkerboard walls and illuminated flight hoops",
        width: 768,
        height: 576,
      },
    ],
  },
  {
    id: "ai-3d-hologram",
    category: "spatial",
    tag: "Spatial Computing",
    title: "Real-time AI Interactive 3D Hologram",
    emoji: "🗺️",
    heading: "AI-Based 3D Hologram",
    description:
      "Pushing the boundaries of spatial computing, we built a real-time, interactive 3D holographic projection system for precise terrain mapping and spatial data visualization.",
    images: [
      {
        src: "/images/projects/3d-hologram-earth.png",
        alt: "Holographic 3D globe projected inside the P2N Automation hologram display",
        width: 388,
        height: 374,
      },
      {
        src: "/images/projects/3d-hologram-terrain.png",
        alt: "Holographic 3D terrain model of a mountain range projected by the real-time hologram system",
        width: 594,
        height: 449,
      },
    ],
  },
  {
    id: "industrial-3d-design",
    category: "spatial",
    tag: "Industrial Design",
    title: "Industrial 3D Designing",
    emoji: "⚙️",
    heading: "Complex Industrial 3D Design",
    description:
      "Providing end-to-end 3D design solutions and flawless digital prototyping for complex industrial machinery, helping industries transition from concept to manufacturing seamlessly.",
    images: [
      {
        src: "/images/projects/industrial-3d-printer.jpg",
        alt: "A 3D printer fabricating a white prototype part on its build plate",
        width: 360,
        height: 480,
      },
      {
        src: "/images/projects/industrial-3d-slicer-design.jpg",
        alt: "3D slicing software showing a prototype model with generated support structures",
        width: 576,
        height: 432,
      },
    ],
  },
  {
    id: "driver-verification-device",
    category: "ai",
    tag: "IoT · AI Vision",
    title: "Driver Attendance & Dress Verification Device",
    emoji: "🚌",
    heading: "IoT Smart Verification Device",
    description:
      "An AI-vision and IoT-powered safety solution for schools and organizations. It automatically verifies driver attendance and uniform compliance before vehicle operation, ensuring maximum safety.",
    images: [
      {
        src: "/images/projects/driver-verification-device-black.png",
        alt: "Wall-mounted black driver verification device with a colour display, keypad and camera",
        width: 378,
        height: 339,
      },
      {
        src: "/images/projects/driver-verification-device-white.png",
        alt: "Wall-mounted white driver verification device with a keypad and camera",
        width: 326,
        height: 310,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SECTION 3 — CERTIFICATIONS & RECOGNITIONS                           */
/* ------------------------------------------------------------------ */
export const CERTIFICATIONS = [
  {
    id: "msme",
    title: "MSME Registered",
    logo: "/images/certifications/msme-logo.jpg",
    alt: "MSME — Micro, Small & Medium Enterprises logo",
  },
  {
    id: "istart-rajasthan",
    title: "iStart Rajasthan Recognized / Funded",
    logo: "/images/certifications/istart-rajasthan-logo.jpg",
    alt: "iStart Rajasthan logo",
  },
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    logo: "/images/certifications/iso-9001-logo.png",
    alt: "ISO 9001 certified company seal",
  },
];

/* ------------------------------------------------------------------ */
/* SECTION 4 — TEAM, SOCIAL & CONTACT                                  */
/* ------------------------------------------------------------------ */
export const TEAM = [
  { name: "Pratap Singh", role: "Founder / CEO" },
  { name: "Rizwan Shah", role: "Co-Founder / CTO" },
];

export const SOCIAL_LINKS = {
  // The brief's LinkedIn URL ended in "?viewAsMember=true" (an admin-preview
  // parameter); the clean company URL is used here.
  linkedin: "https://www.linkedin.com/company/p2n-automation/",
  instagram: "https://www.instagram.com/p2n_automation/",
};

export const CONTACT = {
  email: "p2nautomation@gmail.com",
  phone: "6367398035",
  phoneDisplay: "+91 63673 98035",
  phoneHref: "tel:+916367398035",
  whatsappNumber: "916367398035",
  address: "P2N AUTOMATION, near Grahmin Bank, Nakoda Nagar Udaipur, Rajasthan",
  addressShort: "Nakoda Nagar, Udaipur, Rajasthan",
};
