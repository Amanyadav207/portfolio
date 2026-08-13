"use client";

import { useEffect } from "react";

/** Adds .shown to [data-reveal] elements as they scroll into view. */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      els.forEach((el) => el.classList.add("shown"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("shown");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
