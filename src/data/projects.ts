export interface ProjectSection {
  id: string;
  number: string;
  title: string;
  body?: string[];
  diagram?: {
    type: "flow" | "image";
    content?: string[]; // Flow steps for css-diagram
  };
  components?: {
    name: string;
    role: string;
  }[];
  testing?: {
    condition: string;
    result: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  status: string;
  year: string;
  type: string;
  domain: string;
  image?: string;
  mobileImage?: string;
  sections: ProjectSection[];
}

export const featuredProjects: Project[] = [
  {
    id: "invisible-security-system",
    title: "INVISIBLE SECURITY SYSTEM",
    category: "SECURITY / EMBEDDED / ELECTRONICS",
    shortDescription: "A concealed security system designed to detect unauthorized access and respond without relying on a visible conventional security device.",
    technologies: ["EMBEDDED", "SENSORS", "ELECTRONICS"],
    status: "PROTOTYPE",
    year: "2026",
    type: "HARDWARE",
    domain: "SECURITY / EMBEDDED",
    image: "/invisible_security_desk.png",
    mobileImage: "/invisible_security_mobile.png",
    sections: [
      {
        id: "the-idea",
        number: "01",
        title: "THE IDEA",
        body: [
          "The Invisible Security System was designed around a simple principle: detect unauthorized movement without making the security mechanism visually obvious.",
          "Instead of relying on a conventional visible security device, the system uses an invisible infrared beam and electronic detection circuitry to trigger an immediate alert upon intrusion."
        ]
      },
      {
        id: "the-problem",
        number: "02",
        title: "THE PROBLEM",
        body: [
          "Conventional security systems rely heavily on visible cameras and bulky motion sensors. While these serve as visual deterrents, they also provide intruders with obvious targets to avoid or disable.",
          "The objective of this project was to design a completely concealed, low-cost alternative that blends seamlessly into the environment while maintaining rapid, reliable detection."
        ]
      },
      {
        id: "how-it-works",
        number: "03",
        title: "HOW IT WORKS",
        diagram: {
          type: "flow",
          content: [
            "IR TRANSMITTER",
            "INVISIBLE IR BEAM",
            "IR RECEIVER",
            "SIGNAL CONDITIONING",
            "IC 741 COMPARATOR",
            "ALERT / ALARM"
          ]
        }
      },
      {
        id: "hardware-components",
        number: "04",
        title: "HARDWARE & COMPONENTS",
        components: [
          { name: "IR TRANSMITTER", role: "Generates IR beam" },
          { name: "IR RECEIVER", role: "Detects beam interruption" },
          { name: "IC 741", role: "Signal comparison / amplification" },
          { name: "RESISTORS", role: "Biasing and signal conditioning" },
          { name: "LED", role: "Status indication" },
          { name: "BUZZER", role: "Alert output" },
          { name: "POWER SUPPLY", role: "System power" }
        ]
      },
      {
        id: "architecture",
        number: "05",
        title: "CIRCUIT / SYSTEM ARCHITECTURE",
        body: [
          "The architecture relies on a continuous infrared transmission. The IR receiver remains saturated as long as the beam is unbroken. When interrupted, the voltage drop is processed by the IC 741 comparator.",
          "This state change triggers the output block, activating the local buzzer and LED indicators."
        ],
        diagram: {
          type: "image"
        }
      },
      {
        id: "build-implementation",
        number: "06",
        title: "BUILD & IMPLEMENTATION",
        body: [
          "01 / COMPONENT SELECTION: Chosen for rapid prototyping and robustness.",
          "02 / CIRCUIT ASSEMBLY: Initial validation performed on a breadboard before moving to a perfboard for physical stability.",
          "03 / ENCLOSURE: Built using a stealthy, low-profile 3D printed housing.",
          "04 / INTEGRATION: Mounted flush against the doorway framework.",
          "05 / PROTOTYPE TESTING: Extensive calibration to reject ambient lighting."
        ]
      },
      {
        id: "testing",
        number: "07",
        title: "TESTING & RESULTS",
        testing: [
          { condition: "Beam interrupted", result: "Alert triggered" },
          { condition: "Normal beam", result: "System remains idle" },
          { condition: "Repeated interruption", result: "Detection maintained" },
          { condition: "Power restart", result: "System reinitializes" }
        ]
      },
      {
        id: "challenges",
        number: "08",
        title: "CHALLENGES & LEARNINGS",
        body: [
          "Aligning the transmitter and receiver across wider gaps proved challenging due to beam divergence.",
          "I learned how sensitive basic IR receivers are to ambient sunlight, requiring careful physical shielding and electronic biasing to prevent false positives.",
          "In the future, I would implement a modulated 38kHz IR signal rather than a continuous beam to completely eliminate environmental interference."
        ]
      },
      {
        id: "whats-next",
        number: "09",
        title: "WHAT'S NEXT",
        body: [
          "• Custom PCB implementation for miniaturization",
          "• Improved enclosure for outdoor resilience",
          "• Modulated IR transmission",
          "• Wireless IoT notification capabilities"
        ]
      }
    ]
  },
  {
    id: "wheel-speed-sensor",
    title: "WHEEL SPEED SENSOR",
    category: "AUTOMOTIVE / SENSING / ELECTRONICS",
    shortDescription: "An electronic sensing system designed to measure wheel rotation and translate physical motion into usable speed data.",
    technologies: ["SENSING", "AUTOMOTIVE", "ELECTRONICS"],
    status: "COMPLETED",
    year: "2025",
    type: "HARDWARE",
    domain: "AUTOMOTIVE / SENSING",
    image: "/WSS_desk.png",
    mobileImage: "/WSS_mobile.png",
    sections: [
      {
        id: "the-idea",
        number: "01",
        title: "THE IDEA",
        body: [
          "The core idea was to build an accurate, highly responsive sensing unit capable of measuring wheel rotation speed in real-time.",
          "This data is critical for automotive safety systems, allowing microcontrollers to calculate vehicle speed, detect slippage, and apply anti-lock braking logic."
        ]
      },
      {
        id: "the-problem",
        number: "02",
        title: "THE PROBLEM",
        body: [
          "Sensing wheel rotation in harsh, high-vibration automotive environments requires durability and precision.",
          "Optical sensors suffer from dirt and debris. Mechanical sensors wear out. The requirement was to design a non-contact magnetic sensing solution capable of enduring dirt, water, and mechanical shock."
        ]
      },
      {
        id: "how-it-works",
        number: "03",
        title: "HOW IT WORKS",
        diagram: {
          type: "flow",
          content: [
            "WHEEL ROTATION",
            "MAGNETIC TARGET WHEEL",
            "HALL EFFECT SENSOR",
            "PULSE GENERATION",
            "SIGNAL CONDITIONING",
            "SPEED CALCULATION"
          ]
        }
      },
      {
        id: "hardware-components",
        number: "04",
        title: "HARDWARE & COMPONENTS",
        components: [
          { name: "HALL EFFECT SENSOR", role: "Detects magnetic field changes" },
          { name: "TARGET WHEEL", role: "Provides alternating magnetic poles" },
          { name: "OP-AMP", role: "Signal conditioning and noise filtering" },
          { name: "MICROCONTROLLER", role: "Pulse counting and RPM calculation" },
          { name: "RUGGED ENCLOSURE", role: "Environmental protection" }
        ]
      },
      {
        id: "architecture",
        number: "05",
        title: "CIRCUIT / SYSTEM ARCHITECTURE",
        body: [
          "The architecture is centered around a digital Hall Effect sensor positioned adjacent to a rotating toothed ring (or magnetic encoder).",
          "As teeth pass the sensor, magnetic flux variations are converted into a square wave output. This pulse train is routed into a microcontroller's hardware interrupt pin to measure frequency and derive RPM."
        ],
        diagram: { type: "image" }
      },
      {
        id: "build-implementation",
        number: "06",
        title: "BUILD & IMPLEMENTATION",
        body: [
          "01 / COMPONENT SELECTION: Industrial-grade Hall effect sensors chosen for thermal stability.",
          "02 / CIRCUIT ASSEMBLY: Designed with heavy noise filtering capacitors to handle alternator whine.",
          "03 / ENCLOSURE: Potted in epoxy resin to protect against moisture.",
          "04 / INTEGRATION: Mounted securely near the wheel hub with a calibrated air gap."
        ]
      },
      {
        id: "testing",
        number: "07",
        title: "TESTING & RESULTS",
        testing: [
          { condition: "Low speed (10 RPM)", result: "Accurate pulse detection" },
          { condition: "High speed (1000 RPM)", result: "Stable frequency output" },
          { condition: "Vibration test", result: "No false pulses generated" },
          { condition: "Debris exposure", result: "Operation unaffected" }
        ]
      },
      {
        id: "challenges",
        number: "08",
        title: "CHALLENGES & LEARNINGS",
        body: [
          "Maintaining a precise air gap between the sensor and the target wheel was mechanically difficult without proper mounting hardware.",
          "I learned the critical importance of hardware-level debouncing. Electrical noise from nearby motors initially caused erratic RPM readings.",
          "Implementing Schmitt triggers drastically improved the cleanliness of the digital signal sent to the microcontroller."
        ]
      },
      {
        id: "whats-next",
        number: "09",
        title: "WHAT'S NEXT",
        body: [
          "• CAN bus integration for vehicle networking",
          "• Dual-channel sensing for direction detection",
          "• Advanced fault diagnostic capabilities",
          "• Automotive-grade connector implementation"
        ]
      }
    ]
  },
  {
    id: "roadsense",
    title: "ROADSENSE",
    category: "EDGE AI / COMPUTER VISION / EMBEDDED",
    shortDescription: "An edge-based vision system exploring real-time detection of potholes, obstacles and road hazards using local processing.",
    technologies: ["EDGE AI", "COMPUTER VISION", "EMBEDDED"],
    status: "IN DEVELOPMENT",
    year: "2026",
    type: "SOFTWARE / HARDWARE",
    domain: "COMPUTER VISION / EDGE AI",
    image: "/roadsense_desk.png",
    mobileImage: "/roadsense_mobile.png",
    sections: [
      {
        id: "the-idea",
        number: "01",
        title: "THE IDEA",
        body: [
          "ROADSense attempts to bring advanced road-hazard awareness to standard vehicles without relying on cloud processing.",
          "By utilizing embedded vision models running directly at the edge, the system detects potholes, debris, and lane anomalies in real-time, functioning entirely offline."
        ]
      },
      {
        id: "the-problem",
        number: "02",
        title: "THE PROBLEM",
        body: [
          "Existing road hazard warning systems rely either on highly expensive LiDAR setups or cloud-connected dashcams with high latency.",
          "The goal was to build an inexpensive, localized inference engine that processes video feeds instantly, providing drivers with crucial reaction time without needing an internet connection."
        ]
      },
      {
        id: "how-it-works",
        number: "03",
        title: "HOW IT WORKS",
        diagram: {
          type: "flow",
          content: [
            "DASHCAM FEED",
            "FRAME EXTRACTION",
            "EDGE TPU ACCELERATION",
            "INFERENCE PIPELINE",
            "HAZARD CLASSIFICATION",
            "DRIVER ALERT"
          ]
        }
      },
      {
        id: "hardware-components",
        number: "04",
        title: "HARDWARE & COMPONENTS",
        components: [
          { name: "EDGE AI BOARD", role: "Local neural network execution" },
          { name: "CSI CAMERA", role: "High-framerate video capture" },
          { name: "CUSTOM DATASET", role: "Trained on thousands of road anomalies" },
          { name: "OLED DISPLAY", role: "Visual alert interface" }
        ]
      },
      {
        id: "architecture",
        number: "05",
        title: "SYSTEM ARCHITECTURE",
        body: [
          "Video frames are captured directly via CSI to minimize latency. They are resized and pushed to a quantized object detection model optimized for an Edge TPU.",
          "Bounding box coordinates are evaluated against vehicle trajectory logic to determine if an alert is necessary, suppressing warnings for hazards outside the vehicle's path."
        ],
        diagram: { type: "image" }
      },
      {
        id: "build-implementation",
        number: "06",
        title: "BUILD & IMPLEMENTATION",
        body: [
          "01 / DATA COLLECTION: Compiled and labeled a dataset of local road conditions.",
          "02 / MODEL TRAINING: Used transfer learning on a lightweight MobileNet SSD architecture.",
          "03 / OPTIMIZATION: Quantized the model to INT8 to hit the 30fps target on edge hardware.",
          "04 / INTEGRATION: Packaged the camera and compute module into a windshield-mounted unit."
        ]
      },
      {
        id: "testing",
        number: "07",
        title: "TESTING & RESULTS",
        testing: [
          { condition: "Daylight operation", result: "92% pothole detection accuracy" },
          { condition: "Low-light conditions", result: "Accuracy drops to 65%" },
          { condition: "High-speed processing", result: "Consistent 28-32 FPS inference" },
          { condition: "False positive rate", result: "Occasional triggering on shadows" }
        ]
      },
      {
        id: "challenges",
        number: "08",
        title: "CHALLENGES & LEARNINGS",
        body: [
          "Harsh shadows and patched asphalt frequently confused the model early on, acting as adversarial examples.",
          "I learned the extreme importance of diverse, hyper-local training data. Models trained on pristine highways completely failed on rugged local roads.",
          "Thermal management of the Edge TPU during continuous inference in a hot car interior remains an ongoing hardware challenge."
        ]
      },
      {
        id: "whats-next",
        number: "09",
        title: "WHAT'S NEXT",
        body: [
          "• Expanding the dataset for night-time operation",
          "• Implementing depth-estimation for size approximation",
          "• Improved thermal enclosure design",
          "• Integration with vehicle telemetry"
        ]
      }
    ]
  },
  {
    id: "gas-guard",
    title: "GAS GUARD",
    category: "IOT / EMBEDDED / PRODUCT DEVELOPMENT",
    shortDescription: "A smart LPG safety system currently being developed to detect leaks at the hose level, trigger automatic shutoff and alert the user remotely.",
    technologies: ["IOT", "EMBEDDED", "PRODUCT DEV"],
    status: "CURRENTLY BUILDING",
    year: "2026",
    type: "HARDWARE / IOT",
    domain: "SAFETY / PRODUCT DESIGN",
    image: "/GAS_desk.png",
    mobileImage: "/GAS_mobile.png",
    sections: [
      {
        id: "the-idea",
        number: "01",
        title: "THE IDEA",
        body: [
          "Gas Guard is a proactive safety mechanism designed to monitor domestic LPG systems.",
          "Rather than just sounding an alarm when a room fills with gas, the system detects leaks at the source, mechanically shuts off the cylinder valve, and pushes an alert to the user's phone."
        ]
      },
      {
        id: "the-problem",
        number: "02",
        title: "THE PROBLEM",
        body: [
          "Most domestic gas leak detectors are entirely passive—they beep but cannot stop the leak.",
          "If the user is asleep or not at home, a simple alarm is insufficient. The objective is to introduce a mechanical fail-safe that physically cuts off the fuel supply while notifying the user globally."
        ]
      },
      {
        id: "how-it-works",
        number: "03",
        title: "HOW IT WORKS",
        diagram: {
          type: "flow",
          content: [
            "MQ-6 GAS SENSOR",
            "PPM THRESHOLD ANALYSIS",
            "MICROCONTROLLER",
            "HIGH-TORQUE SERVO",
            "VALVE SHUTOFF",
            "IOT CLOUD ALERT"
          ]
        }
      },
      {
        id: "hardware-components",
        number: "04",
        title: "HARDWARE & COMPONENTS",
        components: [
          { name: "MQ-6 SENSOR", role: "Calibrated LPG gas detection" },
          { name: "ESP32", role: "Logic processing and WiFi connectivity" },
          { name: "SERVO MOTOR", role: "Mechanical valve actuation" },
          { name: "CUSTOM MOUNT", role: "Interfaces servo with standard cylinder valves" },
          { name: "LIPO BATTERY", role: "Backup power during grid failure" }
        ]
      },
      {
        id: "architecture",
        number: "05",
        title: "SYSTEM ARCHITECTURE",
        body: [
          "The ESP32 continuously polls the MQ-6 analog output, applying an exponential moving average filter to smooth the readings.",
          "Upon breaching the critical Parts Per Million (PPM) threshold, the system drives a servo via PWM to rotate the regulator knob. Simultaneously, an MQTT payload is dispatched to a cloud broker."
        ],
        diagram: { type: "image" }
      },
      {
        id: "build-implementation",
        number: "06",
        title: "BUILD & IMPLEMENTATION",
        body: [
          "01 / SENSOR CALIBRATION: Established a baseline in clean air and mapped analog values to estimated PPM.",
          "02 / MECHANISM DESIGN: CAD modeled a non-destructive attachment to grip the physical regulator valve.",
          "03 / IOT INTEGRATION: Set up an MQTT broker and push notification pipeline.",
          "04 / PROTOTYPE ASSEMBLY: Currently fabricating the mechanical actuation arm."
        ]
      },
      {
        id: "testing",
        number: "07",
        title: "TESTING & RESULTS",
        testing: [
          { condition: "Simulated leak", result: "Detection within 3 seconds" },
          { condition: "Valve actuation", result: "Successful closure on 4/5 attempts" },
          { condition: "Network latency", result: "Phone notification received in <2s" },
          { condition: "Power loss", result: "Battery fallback functions normally" }
        ]
      },
      {
        id: "challenges",
        number: "08",
        title: "CHALLENGES & LEARNINGS",
        body: [
          "The physical torque required to turn an aging gas regulator knob is significantly higher than initially anticipated, stalling standard hobby servos.",
          "I learned that mechanical interface design is often harder than the electronic logic. A custom geared mechanism is currently being developed to increase torque.",
          "Sensor pre-heating time (MQ-6 requires 24h burn-in) was a surprising operational constraint."
        ]
      },
      {
        id: "whats-next",
        number: "09",
        title: "WHAT'S NEXT",
        body: [
          "• Finalizing the high-torque gearbox design",
          "• Designing an inherently safe (spark-free) enclosure",
          "• Developing a dedicated companion mobile app",
          "• Long-term reliability testing of the valve actuator"
        ]
      }
    ]
  }
];
