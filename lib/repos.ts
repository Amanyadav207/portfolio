/**
 * Curated selection from github.com/Amanyadav207 (77 public repos).
 *
 * Filtered for backend / systems / design signal — coursework-scale repos
 * (counter apps, colour pickers, tutorial follow-alongs) are deliberately left
 * off, since the site leads with depth rather than breadth. Add or remove
 * freely; this list is the only place it is defined.
 *
 * `note` is intentionally empty where GitHub carries no description. Write one
 * line each rather than letting me guess what these do.
 */
export interface Repo {
  name: string;
  url: string;
  language: string;
  note?: string;
}

export const repoGroups: { group: string; repos: Repo[] }[] = [
  {
    group: "Backend & systems",
    repos: [
      {
        name: "redis-assignment",
        url: "https://github.com/Amanyadav207/redis-assignment",
        language: "Go",
      },
      {
        name: "Go_Backend_Server",
        url: "https://github.com/Amanyadav207/Go_Backend_Server",
        language: "Go",
      },
      {
        name: "Next-JS-Golang-POC",
        url: "https://github.com/Amanyadav207/Next-JS-Golang-POC",
        language: "Go · Next.js",
      },
      {
        name: "secure-task-manager",
        url: "https://github.com/Amanyadav207/secure-task-manager",
        language: "Java",
      },
      {
        name: "Real-time-tracker",
        url: "https://github.com/Amanyadav207/Real-time-tracker",
        language: "JavaScript",
      },
    ],
  },
  {
    group: "System design",
    repos: [
      { name: "HLD", url: "https://github.com/Amanyadav207/HLD", language: "Python" },
      {
        name: "FB_Messenger",
        url: "https://github.com/Amanyadav207/FB_Messenger",
        language: "Python",
      },
      {
        name: "imdb-content-system",
        url: "https://github.com/Amanyadav207/imdb-content-system",
        language: "JavaScript",
      },
      {
        name: "ParkingLot-LLD",
        url: "https://github.com/Amanyadav207/ParkingLot-LLD",
        language: "Low-level design",
      },
      {
        name: "ATM-LLD",
        url: "https://github.com/Amanyadav207/ATM-LLD",
        language: "Low-level design",
      },
    ],
  },
  {
    group: "Data & tooling",
    repos: [
      {
        name: "sheetguard",
        url: "https://github.com/Amanyadav207/sheetguard",
        language: "Python",
      },
      {
        name: "Stock_Screener",
        url: "https://github.com/Amanyadav207/Stock_Screener",
        language: "JavaScript",
      },
      {
        name: "Web_Scraper",
        url: "https://github.com/Amanyadav207/Web_Scraper",
        language: "Python",
      },
      {
        name: "portswigger-web-security-academy",
        url: "https://github.com/Amanyadav207/portswigger-web-security-academy",
        language: "Web security",
      },
    ],
  },
];
