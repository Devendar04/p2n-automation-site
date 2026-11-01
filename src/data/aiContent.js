/**
 * STARTER CONTENT — AI-GENERATED PLACEHOLDERS
 * ---------------------------------------------------------------------
 * Everything in this file was drafted by AI so the Blog and the four
 * Service pages are not empty at launch. It is general, educational copy:
 * it contains no client names, statistics or certifications beyond the
 * facts in the company brief (ITMS pilots, drone arena, etc.).
 *
 * HOW TO REPLACE IT
 *   Admin Console (/admin) → "Service Pages" and "Blogs" tabs.
 *   Use "Import starter content" once to copy these rows into the
 *   database, then edit or delete them there. Rows still flagged
 *   "AI placeholder" in the admin list have not been reviewed yet.
 *   Once the database has content, the site shows the database — this
 *   file is only the fallback while the tables are empty.
 *
 * TEXT FORMAT (blog `content` and service `intro`)
 *   blank line = new paragraph · "## " = heading · "- " = bullet · **bold**
 */

const AUTHOR = "P2N Automation Team";

/* ------------------------------------------------------------------ */
/* SERVICE PAGES (one per core service)                                */
/* ------------------------------------------------------------------ */
export const SERVICE_PAGES = [
  {
    slug: "software",
    sort_order: 1,
    icon: "Code2",
    title: "Software Engineering",
    tagline: "Web platforms, dashboards and AI-enabled applications built to run in production.",
    seo_description:
      "Custom web applications, dashboards, APIs and AI/computer-vision software from P2N Automation, Udaipur.",
    intro: `Most software projects fail quietly: the demo works, but nobody planned for the data, the users or the handover. We build the whole thing, from the first interface sketch to a deployed system your team can maintain.

Our engineers work across web applications, internal tools, APIs and computer-vision features, and they sit close to our hardware team. That matters when your software has to talk to cameras, sensors or devices on a real site.`,
    capabilities: [
      { title: "Web Applications & Portals", description: "Responsive front ends and secure back ends for customer portals, admin consoles and internal tools." },
      { title: "Dashboards & Data Visualisation", description: "Live views of operational data, so decisions don't wait for someone to assemble a spreadsheet." },
      { title: "AI & Computer Vision Features", description: "Detection, counting and verification built into the product, as in our traffic-management and driver-verification systems." },
      { title: "APIs & System Integration", description: "Clean interfaces between new software and the systems you already run, so nothing has to be re-keyed by hand." },
      { title: "Device & IoT Software", description: "Gateways, companion apps and fleet dashboards for connected hardware." },
      { title: "Maintenance & Support", description: "Bug fixes, monitoring and iterative releases after launch, so the product keeps pace with your business." },
    ],
    process: [
      { title: "Discover", description: "Workshops to pin down users, constraints and what success looks like." },
      { title: "Design", description: "Wireframes, architecture and a scoped, prioritised backlog." },
      { title: "Build", description: "Short iterations with regular demos, so you see working software early and often." },
      { title: "Launch & Support", description: "Deployment, documentation, handover to your team and a support window." },
    ],
    tech_stack: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL", "OpenCV", "REST APIs", "CI/CD"],
    deliverables: [
      "Source code delivered to your repository",
      "Deployed, tested application",
      "Technical and user documentation",
      "Handover session for your team",
    ],
    faqs: [
      { q: "How long does a typical project take?", a: "It depends on scope. A focused internal tool can be ready in a few weeks, while a multi-role platform with integrations takes longer. After discovery we share a written plan with milestones, so the timeline is clear before development starts." },
      { q: "Can you work with the systems we already have?", a: "Yes. Many projects are about connecting to existing databases, ERPs or devices. We review what you run today and design integrations that fit it, rather than asking you to start over." },
      { q: "Can you add AI features to an existing product?", a: "Often, yes. We start by checking whether you have the data and a clear question the model should answer, then prototype the feature before committing to a full build." },
      { q: "What happens after launch?", a: "We offer support and iterative improvements. The scope, response times and cost are agreed up front so there are no surprises." },
    ],
    related_projects: ["itms", "driver-verification-device"],
    is_placeholder: true,
  },
  {
    slug: "cloud",
    sort_order: 2,
    icon: "Cloud",
    title: "Cloud Architecture",
    tagline: "Reliable, secure and cost-aware infrastructure for the applications you run.",
    seo_description:
      "Cloud migration, infrastructure-as-code, deployment pipelines, monitoring and security hardening from P2N Automation.",
    intro: `Moving to the cloud is easy; running there well is the hard part. We design environments that stay up, stay secure and don't surprise you on the monthly bill.

Whether you are hosting your first application, migrating from an on-premise server, or untangling an environment that has grown without a plan, we start from how your system is actually used and design from there.`,
    capabilities: [
      { title: "Cloud Strategy & Migration", description: "Assess what you run today and move it in stages, with a rollback plan for every step." },
      { title: "Infrastructure as Code", description: "Environments defined in version-controlled templates, so they can be rebuilt, reviewed and audited." },
      { title: "Containers & Deployment Pipelines", description: "Automated build, test and release pipelines that make deployments routine instead of risky." },
      { title: "Monitoring & Alerting", description: "Dashboards and alerts that tell you something is wrong before your users do." },
      { title: "Security Hardening", description: "Access control, secrets management, patching and encrypted backups, applied as defaults rather than extras." },
      { title: "Cost Optimisation", description: "Right-sizing, removal of idle resources and budgets with alerts, so spend follows value." },
    ],
    process: [
      { title: "Assess", description: "Review your applications, traffic patterns, risks and current costs." },
      { title: "Architect", description: "Design the target environment and agree trade-offs between cost, resilience and complexity." },
      { title: "Migrate / Build", description: "Stage the work, rehearse cut-overs and keep a tested way back." },
      { title: "Operate", description: "Monitor, patch and tune, or hand over to your team with runbooks." },
    ],
    tech_stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD", "Monitoring & Logging"],
    deliverables: [
      "Architecture diagrams and decision notes",
      "Infrastructure-as-code repository",
      "Runbooks and recovery procedures",
      "Security and cost review summary",
    ],
    faqs: [
      { q: "Which cloud provider do you recommend?", a: "The right one depends on your workload, team skills and budget. AWS is a common starting point for us, and we can advise on other major providers when they fit better." },
      { q: "Will a migration cause downtime?", a: "We plan migrations to keep downtime as short as possible, using rehearsals and staged cut-overs. The acceptable window is agreed with you before we begin." },
      { q: "Can you reduce our cloud bill?", a: "Often there is room: oversized servers, idle resources and missing budgets are common. After a review we give you specific, prioritised recommendations." },
      { q: "Do you set up backups and disaster recovery?", a: "Yes. We define how much data loss and downtime you can tolerate, then build and test backups and recovery steps to match." },
    ],
    related_projects: [],
    is_placeholder: true,
  },
  {
    slug: "hardware",
    sort_order: 3,
    icon: "Cpu",
    title: "Hardware / IoT",
    tagline: "From sensor to enclosure: connected devices designed, prototyped and deployed.",
    seo_description:
      "Embedded firmware, IoT devices, 3D design, prototyping and specialised installations from P2N Automation, Udaipur.",
    intro: `Hardware is unforgiving: a wiring mistake, a weak enclosure or an unreliable connection shows up in the field, not in the demo. We take devices from idea to deployed unit, with electronics, firmware, software and mechanical design under one roof.

Our work includes AI-vision verification devices for schools and organisations, an indoor drone arena built for the Indian Army in Kashmir, interactive 3D hologram displays, and industrial 3D design for complex machinery.`,
    capabilities: [
      { title: "Embedded Firmware", description: "Reliable microcontroller code, from drivers and communication protocols to over-the-air updates." },
      { title: "Sensors & Electronics Design", description: "Sensor selection, circuit design and PCB layout built for the environment the device will live in." },
      { title: "Rapid Prototyping", description: "Quick iterations with 3D-printed parts and development boards, so ideas are tested before money is committed." },
      { title: "Industrial 3D Design", description: "End-to-end CAD and digital prototyping for industrial machinery, from concept to manufacturing." },
      { title: "Specialised Installations", description: "Purpose-built systems such as indoor drone arenas and interactive 3D holographic displays." },
      { title: "Testing & Field Deployment", description: "Bench and on-site testing, installation and commissioning, with documentation for your team." },
    ],
    process: [
      { title: "Specify", description: "Define the problem, operating conditions, power and connectivity needs." },
      { title: "Prototype", description: "Build a working unit quickly and learn from it." },
      { title: "Validate", description: "Test on the bench and in the field, then refine the design." },
      { title: "Deploy", description: "Manufacture or assemble the units, install them and train your team." },
    ],
    tech_stack: ["ESP32", "Raspberry Pi", "STM32", "C / C++", "CAD & 3D printing", "Computer Vision", "Sensors"],
    deliverables: [
      "Working prototype or deployed units",
      "Schematics, PCB and CAD files",
      "Firmware source code",
      "Test report and bill of materials",
    ],
    faqs: [
      { q: "Do you build one-off prototypes or only volume production?", a: "Both. Most projects begin with a prototype, then move to a small batch once the design has been proven in the field." },
      { q: "Can you design the enclosure as well as the electronics?", a: "Yes. Mechanical design and 3D printing are part of our workflow, so the electronics and the enclosure are developed together." },
      { q: "Can the device connect to software or a dashboard?", a: "Yes. Our software team builds the gateways, dashboards and apps that go with the device, so you get a complete system." },
      { q: "How do you test before deployment?", a: "We test on the bench first, then in conditions that match the site: power, temperature, lighting and connectivity. Issues are fixed before the units are installed." },
    ],
    related_projects: ["indian-army-drone-arena", "driver-verification-device", "industrial-3d-design", "ai-3d-hologram"],
    is_placeholder: true,
  },
  {
    slug: "network",
    sort_order: 4,
    icon: "Network",
    title: "Network Infrastructure",
    tagline: "Wired and wireless networks that keep sites, cameras and devices connected.",
    seo_description:
      "Network design, structured cabling, Wi-Fi, segmentation and secure remote access from P2N Automation, Udaipur.",
    intro: `Smart systems depend on the unglamorous layer underneath: cabling, switches, access points and secure remote access. When that layer is planned well, cameras stream, sensors report and staff stop noticing the network at all.

We plan, install and document networks for offices, campuses, workshops and field sites, with particular attention to the demands of camera, IoT and automation traffic.`,
    capabilities: [
      { title: "Site Survey & Design", description: "Walk the site, map coverage and capacity needs, and design a network that fits the building and the budget." },
      { title: "Structured Cabling", description: "Neat, labelled copper and fibre installation that is easy to maintain and expand." },
      { title: "Wi-Fi Deployment", description: "Access-point placement and configuration for dependable coverage where people and devices actually are." },
      { title: "Switching, Routing & Segmentation", description: "Separate networks for staff, guests and devices, so a problem in one area doesn't spread." },
      { title: "Security & Remote Access", description: "Firewalls, access policies and VPN, so authorised people can reach what they need and no one else can." },
      { title: "Camera & IoT Connectivity", description: "Power-over-Ethernet and bandwidth planning for CCTV, sensors and edge devices that run all day." },
    ],
    process: [
      { title: "Survey", description: "Inspect the site and gather requirements for users, devices and growth." },
      { title: "Design", description: "Produce a network plan and equipment list for your approval." },
      { title: "Install", description: "Cable, mount and configure equipment with minimal disruption to daily work." },
      { title: "Test & Document", description: "Verify performance, label everything and hand over diagrams and settings." },
    ],
    tech_stack: ["Ethernet & Fibre", "Wi-Fi", "VLANs", "PoE", "Firewalls", "VPN", "Network Monitoring"],
    deliverables: [
      "Network design and diagrams",
      "Installed and labelled infrastructure",
      "Configuration backups",
      "Test results and admin handover",
    ],
    faqs: [
      { q: "Can you work with our existing network equipment?", a: "Often, yes. We audit what you have, keep what is sound and replace only what is limiting performance or security." },
      { q: "How do you plan Wi-Fi coverage?", a: "We start with a site survey and the layout of your space, then place access points to cover the areas that matter. After installation we test coverage and adjust." },
      { q: "Can cameras and sensors be connected securely?", a: "Yes. We place them on separate network segments with restricted access and plan the bandwidth they need, so they don't compete with everyday traffic." },
      { q: "What support is available after installation?", a: "You receive full documentation, and we can provide ongoing monitoring and support under a plan agreed with you." },
    ],
    related_projects: [],
    is_placeholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* BLOG POSTS                                                          */
/* ------------------------------------------------------------------ */
export const BLOG_POSTS = [
  {
    slug: "computer-vision-traffic-data",
    title: "How computer vision turns traffic cameras into traffic data",
    tag: "Software",
    author_name: AUTHOR,
    reading_time_minutes: 4,
    published_at: "2026-10-28T09:00:00+05:30",
    excerpt:
      "A camera on a pole only records. Add detection, tracking and counting, and it becomes a sensor that can retime signals and flag violations.",
    content: `A traffic camera on its own is a recording device. Someone has to watch the footage, and most of it is hours of nothing. Computer vision changes the job: instead of storing video, the system reads it.

## From pixels to counts

A typical pipeline has three steps:

- **Detection** finds vehicles, two-wheelers and pedestrians in each frame.
- **Tracking** links detections across frames, so one vehicle is counted once and not fifty times.
- **Analysis** turns tracks into numbers: volume per lane, speed estimates, queue length and direction of flow.

## What the numbers are for

Once traffic is measured, it can be managed. Signal timings can follow real demand instead of a fixed schedule, congested approaches become visible, and rule violations such as stop-line crossings can be flagged for review rather than waiting for someone to notice.

## Lessons from field pilots

We have run pilot versions of our Intelligent Traffic Management System in Udaipur and Jaipur, and a few lessons keep repeating:

- Camera placement matters as much as the model. A good angle beats a clever algorithm.
- Night, glare and rain need to be tested, not assumed.
- Start with one junction and one clear question, then expand.
- Plan for privacy early: process on site where possible and keep only what you need.

## Where to begin

If you are considering a pilot, pick a single problem, such as a junction with a known bottleneck, and agree how success will be measured before any hardware is mounted.`,
    is_placeholder: true,
  },
  {
    slug: "edge-or-cloud-ai-models",
    title: "Edge or cloud: where should your AI model run?",
    tag: "Software",
    author_name: AUTHOR,
    reading_time_minutes: 4,
    published_at: "2026-10-21T09:00:00+05:30",
    excerpt:
      "Latency, bandwidth, privacy and cost all pull in different directions. A short checklist for deciding where inference should happen.",
    content: `When a team builds an AI feature, the first demo usually runs on a laptop or a cloud server. The harder question comes later: where should the model run in production? The answer depends on the problem, not on fashion.

## When the edge makes sense

Running the model on a device close to the data, such as a camera or a gateway, is a good fit when:

- **Latency matters.** A decision that must happen in milliseconds cannot wait for a round trip to a data centre.
- **Bandwidth is limited.** Sending full video from every camera is expensive. Sending only results is cheap.
- **Privacy is a concern.** Raw images can stay on site while only counts or alerts leave.
- **Connectivity is unreliable.** The system keeps working when the network does not.

## When the cloud makes sense

The cloud is easier when models are large, when you need to retrain often, or when many sites share one pipeline. Updates are simple and compute scales on demand, but you pay for transfer and for always-on servers.

## The hybrid pattern

Many real systems combine both. A small model on the device filters and decides in real time, while the cloud collects results, monitors accuracy and trains better versions.

## A short checklist

- How fast must the answer arrive?
- How much data does each device produce, and what does it cost to move it?
- What are the privacy and compliance limits?
- How will you update models across many devices?

Answer those four questions on paper first, and the architecture is usually obvious.`,
    is_placeholder: true,
  },
  {
    slug: "from-breadboard-to-enclosure",
    title: "From breadboard to enclosure: how an IoT prototype becomes a product",
    tag: "Hardware",
    author_name: AUTHOR,
    reading_time_minutes: 5,
    published_at: "2026-10-14T09:00:00+05:30",
    excerpt:
      "A blinking LED on a breadboard is not a product. Here are the stages a connected device passes through before it can be installed on a wall.",
    content: `Every connected device starts as a tangle of jumper wires on a breadboard. Getting from there to a unit that can be bolted to a wall and left alone for years is a series of deliberate steps.

## 1. Proof of concept

The goal is to answer one question: does the idea work at all? Development boards, off-the-shelf sensors and rough code are enough. Speed matters more than neatness.

## 2. A firmware you can trust

Prototype code often works only while you are watching it. Production firmware handles power cuts, bad sensor readings, lost connections and restarts, and it can be updated safely without a visit to every site.

## 3. A custom circuit board

Moving from loose modules to a designed PCB removes the loose-wire failures, shrinks the device and makes assembly repeatable. This is also the moment to plan power, connectors and test points.

## 4. The enclosure

Housing is part of the design, not an afterthought. 3D printing lets us iterate on fit, ventilation, mounting and cable routing in days. A device for a school bus, a workshop or a roadside needs very different protection.

## 5. Field testing

The bench is kind. Real sites bring dust, heat, vibration, unstable power and poor connectivity. A small trial batch installed where the device will live reveals problems no lab test finds.

## 6. A small batch

Only after those steps does it make sense to build more units. The same path applies to devices such as a wall-mounted attendance and uniform-verification unit for vehicle operators: prototype, harden, house, trial, then deploy.

Skipping a stage rarely saves time. It usually moves the problem to the customer's site, where it costs more to fix.`,
    is_placeholder: true,
  },
  {
    slug: "why-indoor-drone-arenas",
    title: "Why an indoor drone arena makes training safer and testing repeatable",
    tag: "Hardware",
    author_name: AUTHOR,
    reading_time_minutes: 4,
    published_at: "2026-10-07T09:00:00+05:30",
    excerpt:
      "Wind, weather and open airspace make outdoor drone practice unpredictable. A purpose-built indoor arena removes those variables.",
    content: `Flying a drone outdoors means contending with wind, rain, glare, radio interference and open airspace. That is fine for real missions, but it is a poor environment for learning or for comparing one test with the next.

## Controlled conditions

Inside an arena the lighting, surfaces and obstacles are known and consistent. If a flight goes wrong, you can tell whether the cause was the pilot, the drone or the software, because the conditions did not change.

## Repeatable tests

A fixed course lets teams run the same manoeuvre dozens of times and measure the difference after every change. Flight hoops, gates and obstacles can be rearranged to create new exercises without losing comparability.

## Safer learning

Padded walls, netting and a defined flight volume reduce the damage from crashes, to people and to equipment. Trainees can make mistakes early, when mistakes are cheap.

## Training that scales

An indoor space runs on any day and at any hour. Instructors can run structured sessions, track progress and rotate groups through the same course.

## Our experience

We developed a specialised indoor drone arena in Kashmir for the Indian Army, engineered for tactical flight testing and soldier training. The key design decisions were the ones above: control the environment, keep the course configurable and make it safe to fail.

## Planning your own

Start with the space available, the size of the drones you will fly and what you need to measure. Lighting, flooring, safety barriers and a clear layout for observers are as important as the obstacles themselves.`,
    is_placeholder: true,
  },
  {
    slug: "what-a-good-engineering-internship-looks-like",
    title: "What a good engineering internship should actually look like",
    tag: "Training",
    author_name: AUTHOR,
    reading_time_minutes: 4,
    published_at: "2026-09-30T09:00:00+05:30",
    excerpt:
      "Real work, a mentor who reviews it and something you can show afterwards. Use this checklist when choosing an internship.",
    content: `An internship should leave you with skills, evidence and confidence. Many leave students with a certificate and little else. Here is what to look for.

## Real work, not busywork

The best internships put you on something that matters to someone: a feature, a prototype, a test rig or a client deliverable. It should be small enough to finish and real enough that quality counts.

## A mentor who reviews your work

Learning speeds up when an experienced engineer reads your code, questions your design and shows you a better way. Ask who will review your work and how often.

## Fundamentals before frameworks

Good programmes teach how to debug, read documentation, use version control and write clearly about what you built. Those skills outlast any tool.

## Something to show at the end

You should finish with at least one project you can demonstrate, explain and link to. Hiring managers value a working project and a clear explanation over a long list of tools.

## Questions to ask before you apply

- What will I build, and who will use it?
- How often will someone review my work?
- What will I be able to show when it ends?
- Will I work with hardware or deployed systems, or only tutorials?

## For students

Keep a short log of what you tried, what broke and what you learned. It makes interviews easier, and it makes your own progress visible to you.`,
    is_placeholder: true,
  },
  {
    slug: "first-five-things-embedded-systems",
    title: "The first five things to learn in embedded systems",
    tag: "Training",
    author_name: AUTHOR,
    reading_time_minutes: 5,
    published_at: "2026-09-23T09:00:00+05:30",
    excerpt:
      "Embedded engineering looks vast from the outside. These five topics give beginners a solid base to build on.",
    content: `Embedded systems sit at the meeting point of electronics and software, and the range of topics can feel overwhelming. If you are starting out, these five give the best return.

## 1. C, properly

Most firmware is written in C or C++. Learn pointers, memory layout, bit manipulation and what the compiler actually produces. You do not need advanced features, but you need to be comfortable close to the hardware.

## 2. Reading a datasheet

Datasheets are the real documentation. Practise finding the pin map, electrical limits, register descriptions and timing diagrams. Being able to answer your own questions from the datasheet is a core professional skill.

## 3. GPIO, timers and interrupts

Reading a button, driving an LED, generating a precise delay and responding to an event without constant polling are the building blocks of almost every device.

## 4. Communication protocols

Learn UART, I2C and SPI, and when to use each. Most sensors and peripherals speak one of them, and debugging them teaches you a great deal about how data moves.

## 5. Debugging with simple tools

Serial print statements, a multimeter and a basic logic analyser solve most problems. Learn to form a hypothesis, measure, and change one thing at a time.

## Putting it together

Build small, complete projects: a temperature logger, a sensor that sends data over Wi-Fi, a motor controlled by a button. Finishing something small teaches more than reading about something large.

Once these five feel comfortable, topics such as real-time operating systems, low-power design and wireless connectivity become much easier to approach.`,
    is_placeholder: true,
  },
];
