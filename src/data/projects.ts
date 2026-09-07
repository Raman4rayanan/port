export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  status?: string;
  image?: string;
  mobileImage?: string;
}

export const featuredProjects: Project[] = [
  {
    id: "invisible-security-system",
    title: "INVISIBLE SECURITY SYSTEM",
    category: "SECURITY / EMBEDDED / ELECTRONICS",
    shortDescription: "A concealed security system designed to detect unauthorized access and respond without relying on a visible conventional security device.",
    technologies: ["EMBEDDED", "SENSORS", "ELECTRONICS"],
    image: "/invisible_security_desk.png",
    mobileImage: "/invisible_security_mobile.png"
  },
  {
    id: "wheel-speed-sensor",
    title: "WHEEL SPEED SENSOR",
    category: "AUTOMOTIVE / SENSING / ELECTRONICS",
    shortDescription: "An electronic sensing system designed to measure wheel rotation and translate physical motion into usable speed data.",
    technologies: ["SENSING", "AUTOMOTIVE", "ELECTRONICS"],
    image: "/WSS_desk.png",
    mobileImage: "/WSS_mobile.png"
  },
  {
    id: "roadsense",
    title: "ROADSENSE",
    category: "EDGE AI / COMPUTER VISION / EMBEDDED",
    shortDescription: "An edge-based vision system exploring real-time detection of potholes, obstacles and road hazards using local processing.",
    technologies: ["EDGE AI", "COMPUTER VISION", "EMBEDDED"],
    image: "/roadsense_desk.png",
    mobileImage: "/roadsense_mobile.png"
  },
  {
    id: "gas-guard",
    title: "GAS GUARD",
    category: "IOT / EMBEDDED / PRODUCT DEVELOPMENT",
    shortDescription: "A smart LPG safety system currently being developed to detect leaks at the hose level, trigger automatic shutoff and alert the user remotely.",
    technologies: ["IOT", "EMBEDDED", "PRODUCT DEV"],
    status: "CURRENTLY BUILDING",
    image: "/GAS_desk.png",
    mobileImage: "/GAS_mobile.png"
  }
];
