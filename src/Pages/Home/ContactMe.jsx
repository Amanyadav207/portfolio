import { useEffect, useRef, useState } from "react";
import data from "../../data/index.json";
import { ArrowUpRight, Check, Copy, Download, Mail } from "../../components/Icons";

export default function ContactMe() {
  const { profile, socials } = data;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin or denied permission) — the
      // mailto link beside this button is still a working fallback.
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <header className="section__head" data-reveal>
          <span className="section__index">05</span>
          <h2 className="section__title">Get in touch</h2>
          <p className="section__sub">
            Open to backend, systems, and infra roles — and always happy to talk
            about pipelines that are too slow.
          </p>
        </header>

        <div className="contact__email" data-reveal>
          <a className="contact__address" href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={copyEmail}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "copied" : "copy"}
          </button>
        </div>

        <ul className="contact__links" data-reveal style={{ "--delay": "80ms" }}>
          {socials.map((social) => (
            <li key={social.id}>
              <a
                className="linkcard"
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="linkcard__label">{social.label}</span>
                <span className="linkcard__handle">{social.handle}</span>
                <span className="linkcard__arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              className="linkcard linkcard--accent"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              <span className="linkcard__label">Résumé</span>
              <span className="linkcard__handle">PDF</span>
              <span className="linkcard__arrow" aria-hidden="true">
                <Download size={16} />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
