export const site = {
  name: "Aman Yadav",
  // One-line positioning. Backend/distributed systems, not generalist web dev.
  positioning:
    "Backend and distributed systems engineer building AI infrastructure — computer-use RL environments, the pipelines behind them, and the services that keep them fast.",
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
 * Headline figures. Every one came from Aman directly (résumé or positioning
 * brief) — nothing is inferred. Each `value` is a single scannable token; the
 * comparison lives in `detail` so the number itself stays readable at a
 * glance. Dataset size is deliberately absent — see the disclosure note on the
 * fan-out write-up.
 */
export const metrics = [
  { value: "10x", label: "faster pipeline", detail: "24 h → under 3 h" },
  { value: "8,000", label: "concurrent workers", detail: "up from ~800" },
  { value: "10+", label: "RL environments", detail: "agent training & eval" },
  { value: "500+", label: "users", detail: "as the only engineer" },
] as const;

/**
 * Bio. Leads with current work rather than the framing on the GitHub profile,
 * which predates the Scaler AI Labs role and buries the most significant thing
 * he does.
 */
export const bio = [
  "I build the environments AI agents are trained and evaluated in, and the data infrastructure behind them. At Scaler AI Labs that has meant computer-use environments across ten-plus enterprise applications, the pipeline that processes what those agents produce, and analytics split across Postgres and ClickHouse so operator dashboards stay responsive as event volume grows.",
  "The problems I like are the ones where a system stops scaling for reasons that have nothing to do with the work it is doing. A job with no dependency between its units should not have a concurrency ceiling — when it had one anyway, the bottleneck turned out to be manifest distribution, not the job. Splitting the timer by phase is what made that visible.",
  "Before that I was the only engineer alongside the founder on an AI stock-research platform, which meant I owned all of it: Go APIs over market data, scheduled ingestion, the tool-calling agent that answered equity questions in plain English, and the deployment underneath. On my own time I have built a CRDT collaborative editor, an ETL pipeline that quarantines bad rows instead of dropping them, and an in-memory cache in Go.",
] as const;

/**
 * Four positions, each one earned by a write-up on this site rather than
 * borrowed from a profile README.
 */
export const principles = [
  {
    k: "distribution > addition",
    v: "Past a point, more workers make things slower. What they all pull from is usually the real limit.",
  },
  {
    k: "correct under concurrency",
    v: "Convergence and idempotency by construction, so re-runs and races are ordinary cases rather than bugs.",
  },
  {
    k: "measure the phase",
    v: "A job timed end-to-end hides the phase that scales inversely. Split the timer before scaling anything.",
  },
  {
    k: "fail loudly, lose nothing",
    v: "Bad input gets quarantined with its reason attached — never silently skipped.",
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
      "Building computer-use RL environments that autonomous agents are trained and evaluated in, and the data infrastructure around them — a distribution redesign that took one pipeline from 24 hours to under 3, and analytics split across Postgres and ClickHouse to keep dashboards responsive as event volume grew. Also own the capture backend and dashboard for a cross-platform desktop monitoring app.",
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
      "The only engineer alongside the founder, from landing page to 500+ users. Built low-latency Go APIs over NASDAQ/NYSE data with concurrent vendor fetches, moved all vendor traffic off the request path into scheduled ingestion, and shipped a Python service where a tool-calling agent answered equity questions in plain English.",
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
