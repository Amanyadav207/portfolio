export const site = {
  name: "Aman Yadav",
  // One-line positioning. Backend/distributed systems, not generalist web dev.
  positioning:
    "Backend, distributed systems and AI infrastructure engineer. I build the environments, pipelines and services that AI systems run on — and make them fast.",
  role: "Backend & AI Infrastructure Engineer",
  location: "Bengaluru, India",
  email: "aman1374y@gmail.com",
  resume: "/Aman_Yadav_Resume.pdf",
  education: [
    { school: "Scaler School of Technology", detail: "Undergraduate Program in Computer Science" },
    { school: "BITS Pilani", detail: "B.Sc. (Hons.) Computer Science" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/Amanyadav207", handle: "Amanyadav207" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amanyadav207", handle: "amanyadav207" },
    { label: "LeetCode", href: "https://leetcode.com/u/amanyadav130904/", handle: "amanyadav130904" },
    {
      label: "Codeforces",
      href: "https://codeforces.com/profile/amanyadav130904",
      handle: "amanyadav130904",
    },
  ],
} as const;

/**
 * Headline figures. Every one of these came from Aman directly (résumé or
 * positioning brief) — nothing here is inferred. The dataset size is
 * deliberately absent; see the disclosure note on the fan-out page.
 */
export const metrics = [
  { value: "10x", label: "pipeline speedup", detail: "24 h → under 3 h" },
  { value: "800 → 8,000", label: "concurrent workers", detail: "after tree fan-out" },
  { value: "10+", label: "RL environments", detail: "built for agent training" },
  { value: "500+", label: "users shipped to", detail: "as founding engineer" },
] as const;

/**
 * Bio. Built from how Aman describes his own work on his GitHub profile —
 * correctness, maintainability and performance under real constraints —
 * rather than generic portfolio copy.
 */
export const bio = [
  "I'm a backend engineer. Most of what I care about sits below the interface: schema design, idempotent pipelines, authentication that holds up under attack, and API contracts that don't leak their implementation.",
  "The part I find interesting is everything past “it works”. A pipeline that runs is not the same as one that can be safely re-run. An endpoint returning 200 is not the same as one that stays correct when two clients race. Most of my work has been locating the point where a system quietly stops being correct — or stops being fast — and moving it.",
  "Lately that has meant AI infrastructure: computer-use RL environments that autonomous agents are trained and evaluated in, and the pipelines that process what they produce, at Scaler AI Labs. Before that I was the founding engineer on an AI stock-research platform — a Go backend, scheduled ingestion, and a tool-calling agent that answered equity questions in plain English.",
] as const;

/** How that philosophy shows up in practice — his own four themes. */
export const principles = [
  {
    k: "schema-aware",
    v: "Validate before insertion, so partial failures never corrupt downstream state.",
  },
  {
    k: "idempotent",
    v: "Re-running a pipeline should be safe, not a source of duplicates.",
  },
  {
    k: "secure by default",
    v: "Design auth for the attack surface, not the happy path.",
  },
  {
    k: "measured",
    v: "Time the phase, not the job — averages hide the bottleneck.",
  },
] as const;

/**
 * Roles, newest first. `context` matches the `context` frontmatter on work
 * write-ups, so each role automatically collects its own deep-dives.
 */
export const experience = [
  {
    company: "Scaler AI Labs",
    context: "Scaler AI Labs",
    role: "MTS Intern",
    period: "Feb 2026 — Present",
    location: "Bengaluru, India",
    current: true,
    url: "https://evaratus.com/",
    blurb:
      "Building computer-use RL environments for autonomous-agent training, the data pipelines that process what they produce, and the analytics serving operator dashboards. Also own the capture backend and dashboard for a cross-platform desktop monitoring app.",
  },
  {
    company: "Ticker360",
    context: "Ticker360",
    role: "Founding Engineering Intern",
    period: "Nov 2024 — Feb 2025",
    location: "Remote",
    current: false,
    url: "https://www.linkedin.com/company/ticker360/",
    blurb:
      "Sole engineer alongside the cofounder on a greenfield AI stock-research platform. Took it from landing page to 500+ users, owning the Next.js front end, Go backend, ingestion pipelines and deployment.",
  },
] as const;

/**
 * Section anchors on the single page. Absolute so they also work from the
 * project write-up pages.
 */
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Open source", href: "/#open-source" },
  { label: "Contact", href: "/#contact" },
] as const;
