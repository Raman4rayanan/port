export const aboutIdentity = {
  headline: "ABOUT ME",
  statement: "I BUILD.\nI EXPERIMENT.\nI ITERATE.",
  description: "I'm Ramanarayanan G, an Electronics & Communication Engineering student interested in the space where hardware, software and ideas become real products.",
  metadata: {
    id: "IMG_01 / PORTRAIT",
    field: "FIELD / ELECTRONICS",
    status: "STATUS / ACTIVE"
  }
};

export const profileRows = [
  {
    id: "01",
    title: "WHO I AM",
    content: "I'm an Electronics & Communication Engineering student who enjoys understanding how systems work and turning ideas into physical, working prototypes."
  },
  {
    id: "02",
    title: "WHAT I BUILD",
    content: "Embedded systems, IoT devices, electronics prototypes, robotics, software tools and product-oriented engineering projects."
  },
  {
    id: "03",
    title: "HOW I THINK",
    content: "I prefer understanding the problem first, breaking it into smaller parts, testing assumptions and iterating until the system actually works."
  },
  {
    id: "04",
    title: "WHAT I'M LEARNING",
    content: "Advanced embedded systems, IoT architecture, robotics, software development, system design and product development."
  }
];

export const engineeringProfile = [
  {
    category: "SYSTEMS",
    items: [
      { name: "Embedded Systems", annotation: "MICROCONTROLLERS / SENSORS / ACTUATORS" },
      { name: "IoT", annotation: "CONNECTIVITY / TELEMETRY / DATA" },
      { name: "Automation", annotation: "CONTROL SYSTEMS / LOGIC" },
      { name: "Robotics", annotation: "KINEMATICS / MOTOR CONTROL" }
    ]
  },
  {
    category: "HARDWARE",
    items: [
      { name: "Circuit Design", annotation: "SCHEMATICS / PCB ROUTING" },
      { name: "Sensors", annotation: "DATA ACQUISITION / CALIBRATION" },
      { name: "Microcontrollers", annotation: "AVR / ARM / ESP" },
      { name: "Prototyping", annotation: "3D PRINTING / FABRICATION" }
    ]
  },
  {
    category: "SOFTWARE",
    items: [
      { name: "C / C++", annotation: "FIRMWARE / RTOS / DRIVERS" },
      { name: "Python", annotation: "DATA / SCRIPTING / BACKEND" },
      { name: "Web Technologies", annotation: "REACT / NEXT.JS / UI" },
      { name: "System Development", annotation: "ARCHITECTURE / INTEGRATION" }
    ]
  }
];

export const currentlyBuilding = {
  tag: "CURRENTLY BUILDING / 001",
  mantra: "BUILD\nTEST\nITERATE",
  description: "A look into the systems, prototypes and experiments currently occupying my workbench.",
  image: "/workspace-placeholder.jpg"
};

export const timeline = [
  {
    year: "2026",
    event: "[ ADD FUTURE EVENT / LAUNCH ]"
  },
  {
    year: "2024",
    event: "[ ADD EXPERIENCE / PROJECT ]"
  },
  {
    year: "2022",
    event: "[ ADD EDUCATION / START ]"
  }
];

export const principles = [
  "UNDERSTAND\nBEFORE\nBUILDING.",
  "MAKE\nIT\nREAL.",
  "TEST\nWHAT\nYOU ASSUME.",
  "ITERATE\nUNTIL\nIT WORKS."
];

export const closing = {
  mantra: "BUILD.\nTEST.\nBREAK.\nREBUILD.",
  subtext: "The process is rarely linear.\nThat's part of the work.",
  linkText: "EXPLORE MY WORK →",
  linkHref: "/work",
  previewImage: "/project-preview-placeholder.jpg" // Will fall back or user can add this
};
