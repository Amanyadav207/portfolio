export const site = {
  name: "Aman Yadav",
  // One-line positioning. Backend/distributed systems, not generalist web dev.
  positioning:
    "Backend and distributed systems engineer. I work on data pipelines, concurrency, and the infrastructure that keeps them fast.",
  role: "Backend & Distributed Systems Engineer",
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
 * Section anchors on the single page. Absolute so they also work from the
 * project write-up pages.
 */
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Open source", href: "/#open-source" },
  { label: "Contact", href: "/#contact" },
] as const;
