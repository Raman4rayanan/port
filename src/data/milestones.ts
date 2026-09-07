export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
  image: string;
  credentialUrl?: string;
  tags?: string[];
}

export interface Innovation {
  id: string;
  title: string;
  description: string;
  year: string;
  domain: string;
  status: string;
  projectSlug: string;
  image?: string;
  recognition?: string;
  documentationUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-01",
    title: "Embedded Systems Fundamentals",
    issuer: "Technical Learning Institute",
    year: "2025",
    description: "Core principles of microcontrollers, memory management, and low-level C programming.",
    image: "/WSS_desk.png", // Using placeholder image for now
    tags: ["C", "Microcontrollers", "RTOS"],
  },
  {
    id: "cert-02",
    title: "IoT & Connected Systems",
    issuer: "Technical Learning Institute",
    year: "2025",
    description: "Architecting edge devices, MQTT protocols, and wireless sensor networks.",
    image: "/Gas_desk.png",
    tags: ["IoT", "MQTT", "ESP32"],
  },
  {
    id: "cert-03",
    title: "PCB Design & Hardware Development",
    issuer: "Engineering Academy",
    year: "2026",
    description: "Schematic capture, board layout, signal integrity, and manufacturing prep using Altium.",
    image: "/ROAD_desk.png",
    tags: ["PCB Design", "Altium", "Hardware"],
  },
  {
    id: "cert-04",
    title: "C/C++ Programming for Embedded Systems",
    issuer: "Technical Learning Institute",
    year: "2026",
    description: "Advanced memory allocation, pointers, and object-oriented paradigms for constrained devices.",
    image: "/WSS_desk.png",
    tags: ["C++", "Memory Management", "Firmware"],
  }
];

export const innovations: Innovation[] = [
  {
    id: "invisible-security-system",
    title: "INVISIBLE SECURITY SYSTEM",
    description: "A concealed security system designed to detect unauthorized access and respond without relying on a visible conventional security device.",
    year: "2025",
    domain: "SECURITY / EMBEDDED",
    status: "PROTOTYPE",
    projectSlug: "invisible-security-system",
  },
  {
    id: "wheel-speed-sensor",
    title: "WHEEL SPEED SENSOR",
    description: "A robust wheel speed sensing apparatus designed to measure and transmit real-time rotational velocity for traction control applications.",
    year: "2024",
    domain: "AUTOMOTIVE / SENSORS",
    status: "TESTING",
    projectSlug: "wheel-speed-sensor",
  },
  {
    id: "roadsense",
    title: "ROADSENSE",
    description: "An adaptive environmental monitoring system deployed on roadside infrastructure to capture hyper-local atmospheric and traffic flow data.",
    year: "2025",
    domain: "INFRASTRUCTURE / IOT",
    status: "ACTIVE",
    projectSlug: "roadsense",
  },
  {
    id: "gas-guard",
    title: "GAS GUARD",
    description: "An intelligent autonomous leak detection and emergency shutoff system engineered for industrial pipeline safety.",
    year: "2025",
    domain: "INDUSTRIAL / SAFETY",
    status: "DEPLOYED",
    projectSlug: "gas-guard",
  }
];
