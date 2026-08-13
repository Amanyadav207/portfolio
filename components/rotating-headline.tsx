"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Qualities and intent, not a list of deeds — what someone would get if they
 * hired him, rather than what he has already done. Kept concrete enough to be
 * recognisably him instead of the usual "passionate, eager to learn" filler.
 *
 * The first three still link to the write-up that demonstrates the trait, so
 * the claim is never just a claim. The last is an aspiration, so it stands on
 * its own.
 *
 * Similar lengths, so the reserved height fills evenly.
 */
const PHRASES: { text: string; href?: string }[] = [
  { text: "would rather understand it than work around it.", href: "/work/hierarchical-fan-out" },
  { text: "get suspicious when something works first try.", href: "/work/accessibility-tree-parity" },
  { text: "care more about correct than clever.", href: "/work/conflux" },
  { text: "want to build infrastructure people rely on." },
];

const TYPE_MS = 52;
const DELETE_MS = 24;
const HOLD_MS = 2400;
const GAP_MS = 340;

export function RotatingHeadline() {
  // Server renders the first phrase in full: no hydration gap, no layout jump,
  // and it still reads correctly with JavaScript unavailable.
  const [text, setText] = useState(PHRASES[0].text);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout>>();
  const phrase = useRef(0);
  const pos = useRef(PHRASES[0].text.length);
  const deleting = useRef(false);
  const pausedRef = useRef(false);
  const enabled = useRef(false);

  const step = useCallback(() => {
    if (pausedRef.current) return;
    const full = PHRASES[phrase.current].text;

    if (deleting.current) {
      pos.current -= 1;
      setText(full.slice(0, pos.current));
      if (pos.current <= 0) {
        deleting.current = false;
        phrase.current = (phrase.current + 1) % PHRASES.length;
        setIndex(phrase.current);
        timer.current = setTimeout(step, GAP_MS);
        return;
      }
      timer.current = setTimeout(step, DELETE_MS);
      return;
    }

    pos.current += 1;
    setText(full.slice(0, pos.current));
    if (pos.current >= full.length) {
      deleting.current = true;
      timer.current = setTimeout(step, HOLD_MS);
      return;
    }
    timer.current = setTimeout(step, TYPE_MS);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    enabled.current = true;
    timer.current = setTimeout(step, HOLD_MS);
    return () => clearTimeout(timer.current);
  }, [step]);

  // Hovering to click must not chase a moving target: freeze on the complete
  // phrase, then pick up again on leave.
  const hold = useCallback(() => {
    if (!enabled.current) return;
    pausedRef.current = true;
    setPaused(true);
    clearTimeout(timer.current);
    const full = PHRASES[phrase.current].text;
    pos.current = full.length;
    deleting.current = true;
    setText(full);
  }, []);

  const release = useCallback(() => {
    if (!enabled.current) return;
    pausedRef.current = false;
    setPaused(false);
    timer.current = setTimeout(step, HOLD_MS);
  }, [step]);

  const current = PHRASES[index];

  const line = (
    <span aria-hidden>
      <span className="grad-text">I </span>
      <span className="grad-text">{text}</span>
      {!paused && <span className="cursor">▊</span>}
    </span>
  );

  return (
    <h1
      className="mt-5 min-h-[4.3em] text-[clamp(2.1rem,5.6vw,3.5rem)] font-medium leading-[1.05] sm:min-h-[3.2em]"
      onMouseEnter={hold}
      onMouseLeave={release}
      // The live phrase changes constantly; announcing every keystroke would
      // flood a screen reader, so expose the stable claim instead.
      aria-label={`I ${PHRASES[0].text}`}
    >
      {current.href ? (
        <Link
          href={current.href}
          onFocus={hold}
          onBlur={release}
          className="group inline"
          aria-label={`I ${current.text} Read the write-up.`}
        >
          {line}
          <span
            className="ml-3 whitespace-nowrap align-middle text-[13px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ color: "var(--a1)" }}
          >
            read →
          </span>
        </Link>
      ) : (
        line
      )}
    </h1>
  );
}
