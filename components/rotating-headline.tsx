"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * First line is the thesis; the rest open a loop this site then closes — each
 * links to the write-up that answers it, so curiosity converts into a click.
 * Every phrase is literally true, and kept under ~44 characters so the block
 * stays within the three lines reserved for it.
 */
const PHRASES: { text: string; href?: string }[] = [
  { text: "make slow systems fast." },
  { text: "found why adding workers stopped helping.", href: "/work/hierarchical-fan-out" },
  { text: "made two people edit one file, no locks.", href: "/work/conflux" },
  { text: "taught agents to click through real apps.", href: "/work/rl-environments" },
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
