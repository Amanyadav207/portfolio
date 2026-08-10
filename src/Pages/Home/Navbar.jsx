import { useCallback, useEffect, useState } from "react";
import { Link } from "react-scroll";
import data from "../../data/index.json";
import { Mail } from "../../components/Icons";

const SECTIONS = [
  { to: "home", label: "home" },
  { to: "work", label: "work" },
  { to: "projects", label: "projects" },
  { to: "about", label: "about" },
];

const scrollProps = {
  spy: true,
  smooth: true,
  offset: -72,
  duration: 500,
  activeClass: "is-active",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeMenu]);

  // Prevent the page behind the open drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Primary">
        <Link
          {...scrollProps}
          to="home"
          className="nav__brand"
          onClick={closeMenu}
          aria-label="Aman Yadav — back to top"
        >
          <span className="nav__monogram">AY</span>
          <span className="nav__brand-name">{data.profile.name}</span>
        </Link>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav__menu ${menuOpen ? "is-open" : ""}`}>
          <ul className="nav__list">
            {SECTIONS.map((section) => (
              <li key={section.to}>
                <Link
                  {...scrollProps}
                  to={section.to}
                  className="nav__link"
                  onClick={closeMenu}
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            {...scrollProps}
            to="contact"
            activeClass=""
            className="btn btn--ghost nav__cta"
            onClick={closeMenu}
          >
            <Mail size={15} />
            get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
