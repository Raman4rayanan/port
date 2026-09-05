export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  isExperiment?: boolean;
}

export const featuredProjects: Project[] = [
  {
    id: "gas-leak-protection-system",
    title: "Gas Leak Protection System",
    category: "EMBEDDED SYSTEMS / IoT / PRODUCT DEVELOPMENT",
    shortDescription: "A safety-focused embedded system designed to detect gas leakage, trigger a physical shut-off mechanism and notify the user remotely.",
    technologies: ["ESP32", "MQ-SERIES GAS SENSOR", "SERVO MOTOR", "IoT", "SMS ALERTING", "EMBEDDED SYSTEMS"],
  },
  {
    id: "autonomous-navigation-bot",
    title: "Autonomous Navigation Bot",
    category: "ROBOTICS / C++ / HARDWARE",
    shortDescription: "An autonomous robotic platform exploring sensor-based navigation, motion control and embedded decision-making.",
    technologies: ["MICROCONTROLLER", "C++", "SENSORS", "MOTOR CONTROL", "ROBOTICS"],
  }
];
