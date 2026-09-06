export const aboutIdentity = {
  headline: "ABOUT ME",
  statement: "I BUILD.\nI EXPERIMENT.\nI ITERATE.",
  description: "I'm Ramanarayanan G, an Electronics & Communication Engineering student who likes understanding how things work — and then trying to build them myself.",
  metadata: {
    id: "IMG_01 / PORTRAIT",
    field: "FIELD / ELECTRONICS",
    status: "STATUS / ACTIVE"
  }
};

export const profileRows = [
  {
    id: "01",
    title: "CURIOUS BY DEFAULT",
    content: "I've always been the kind of person who wants to know what's behind the thing.\n\nHow it works.\nWhy it works.\nWhat happens if I change it.\n\nThat curiosity has shaped the way I learn, create and see the world."
  },
  {
    id: "02",
    title: "FROM IDEA TO PROTOTYPE",
    content: "I build embedded systems, IoT devices and robotics projects — usually starting with a rough idea and ending with something I can actually test, break and improve."
  },
  {
    id: "03",
    title: "BUILD. BREAK. REPEAT.",
    content: "I start with the problem, not the technology.\n\nBreak it down.\nBuild something.\nTest it.\nFind what fails.\nTry again.\n\nMost of what I learn comes from making things work — and figuring out why they didn't."
  },
  {
    id: "04",
    title: "WHAT'S NEXT",
    content: "Going deeper into embedded systems, intelligent devices, robotics and product development — while learning how to turn working prototypes into things that are genuinely useful."
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
      { name: "C / Embedded C", annotation: "FIRMWARE / RTOS / DRIVERS" },
      { name: "Python", annotation: "DATA / SCRIPTING / BACKEND" },
      { name: "Web Technologies", annotation: "REACT / NEXT.JS / UI" },
      { name: "MATLAB", annotation: "MODELING / SIMULATION" }
    ]
  }
];

export const currentlyBuilding = {
  tag: "CURRENTLY BUILDING / 001",
  index: "01",
  title: "SMART LPG\nDUAL-SLEEVE",
  subtitle: "HOSE MONITORING SYSTEM",
  description: "Early leak detection. Automatic shutoff.\nMaximum safety for your home.",
  tags: ["GAS SAFETY", "IoT", "EMBEDDED"],
  features: [
    { icon: "search", label: "CONTINUOUS\nMONITORING" },
    { icon: "shield", label: "AUTOMATIC\nSHUTOFF" },
    { icon: "bell", label: "INSTANT\nALERTS" },
    { icon: "home", label: "ENHANCED\nSAFETY" },
  ],
  cta: "VIEW PROJECT",
  ctaHref: "#",
  image: "/gas1.png"
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
    event: "VELAMMAL VIDHYASHRAM \nHIGHER SECONDARY EDUCATION \nGUDUVANCHERY / CHENGALPATTU"
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
