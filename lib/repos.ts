/**
 * Curated from github.com/Amanyadav207 (77 public repos), filtered for
 * backend / systems / design signal.
 *
 * Every `note` below is taken from the repository's own README — nothing here
 * is written from guesswork. Repos whose READMEs said nothing useful are left
 * out rather than padded with invented copy.
 */
export interface Repo {
  name: string;
  url: string;
  language: string;
  note?: string;
}

const gh = (name: string) => `https://github.com/Amanyadav207/${name}`;

export const repoGroups: { group: string; repos: Repo[] }[] = [
  {
    group: "Backend & systems",
    repos: [
      {
        name: "redis-assignment",
        url: gh("redis-assignment"),
        language: "Go",
        note: "In-memory key-value cache service written in Go, built for high throughput and containerised with Docker.",
      },
      {
        name: "sheetguard",
        url: gh("sheetguard"),
        language: "Python · PostgreSQL",
        note: "Schema-aware ETL from Google Sheets into Postgres: multi-stage validation before insertion, idempotent ingestion so re-runs never duplicate, and a dead-letter queue that isolates bad records while the pipeline keeps running.",
      },
      {
        name: "secure-task-manager",
        url: gh("secure-task-manager"),
        language: "Java · Spring Boot",
        note: "Spring Boot 3 REST API for task management.",
      },
      {
        name: "Real-time-tracker",
        url: gh("Real-time-tracker"),
        language: "Node.js · Socket.io",
        note: "Real-time location tracking with bidirectional Socket.io communication, plotted live on a Leaflet map.",
      },
      {
        name: "Next-JS-Golang-POC",
        url: gh("Next-JS-Golang-POC"),
        language: "Go · Next.js",
        note: "Dockerised full-stack application pairing a Go backend with a Next.js front end.",
      },
    ],
  },
  {
    group: "Distributed systems & design",
    repos: [
      {
        name: "FB_Messenger",
        url: gh("FB_Messenger"),
        language: "Python · Cassandra",
        note: "Messenger-style backend built on Apache Cassandra as the distributed store.",
      },
      {
        name: "imdb-content-system",
        url: gh("imdb-content-system"),
        language: "Flask · MongoDB · React",
        note: "Full-stack system for bulk-uploading and managing movie data from CSV.",
      },
      {
        name: "ParkingLot-LLD",
        url: gh("ParkingLot-LLD"),
        language: "Low-level design",
      },
      {
        name: "ATM-LLD",
        url: gh("ATM-LLD"),
        language: "Low-level design",
      },
    ],
  },
  {
    group: "Data & tooling",
    repos: [
      {
        name: "Web_Scraper",
        url: gh("Web_Scraper"),
        language: "Python",
        note: "Scrapes product name and price from Amazon and Flipkart product URLs.",
      },
      {
        name: "Stock_Screener",
        url: gh("Stock_Screener"),
        language: "JavaScript",
        note: "Screens a static dataset of 500 stocks across configurable parameters.",
      },
    ],
  },
];
