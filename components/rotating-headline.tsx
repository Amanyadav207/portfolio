"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Each line is a real claim backed by something on this page — the fan-out
 * work, the ETL pipeline, the CRDT editor, the RL environments.
 */
const PHRASES = [
  "make slow systems fast.",
  "build pipelines that stay correct.",
  "scale workers without saturating the source.",
  "ship the infrastructure AI agents run on.",
];

const TYPE_MS = 52;
const DELETE_MS = 24;
const HOLD_MS = 2100;
const GAP_MS = 340;

export function RotatingHeadline() {
  // Server renders the first phrase in full, so there is no hydration gap and
  // no layout jump before the animation takes over.
  const [text, setText] = useState(PHRASES[0]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let pos = PHRASES[0].length;
    let deleting = false;
    let cancelled = false;

    const schedule = (ms: number) => {
      timer.current = setTimeout(step, ms);
    };

    const step = () => {
      if (cancelled) return;
      const full = PHRASES[phrase];

      if (deleting) {
        pos -= 1;
        setText(full.slice(0, pos));
        if (pos <= 0) {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
          return schedule(GAP_MS);
        }
        return schedule(DELETE_MS);
      }

      pos += 1;
      setText(full.slice(0, pos));
      if (pos >= full.length) {
        deleting = true;
        return schedule(HOLD_MS);
      }
      return schedule(TYPE_MS);
    };

    schedule(HOLD_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <h1
      className="mt-5 min-h-[2.1em] text-[clamp(2.1rem,5.6vw,3.5rem)] font-medium leading-[1.05]"
      // The live phrase changes constantly; announcing every keystroke would
      // flood a screen reader, so expose the stable claim instead.
      aria-label={`I ${PHRASES[0]}`}
    >
      <span aria-hidden>
        <span className="grad-text">I </span>
        <span className="grad-text">{text}</span>
        <span className="cursor">▊</span>
      </span>
    </h1>
  );
}
