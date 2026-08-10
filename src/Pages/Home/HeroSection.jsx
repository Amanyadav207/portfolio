import data from "../../data/index.json";
import { ArrowUpRight, Download, MapPin } from "../../components/Icons";

export default function HeroSection() {
  const { profile, metrics } = data;
  const github = data.socials.find((s) => s.id === "github");

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="shell hero__inner">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__dot" aria-hidden="true" />
          {profile.status}
        </p>

        <h1 className="hero__title" data-reveal style={{ "--delay": "60ms" }}>
          Backend &amp; systems
          <br />
          <span className="hero__title-accent">engineer.</span>
        </h1>

        <p className="hero__lede" data-reveal style={{ "--delay": "120ms" }}>
          {profile.tagline}
        </p>

        <p className="hero__meta" data-reveal style={{ "--delay": "160ms" }}>
          <MapPin size={15} />
          {profile.location}
        </p>

        <div className="hero__actions" data-reveal style={{ "--delay": "200ms" }}>
          <a
            className="btn btn--solid"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={16} />
            Résumé
          </a>
          <a
            className="btn btn--ghost"
            href={github.url}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>

        <ul className="metrics" data-reveal style={{ "--delay": "260ms" }}>
          {metrics.map((metric) => (
            <li key={metric.label} className="metric">
              <span className="metric__value">{metric.value}</span>
              <span className="metric__label">{metric.label}</span>
              <span className="metric__detail">{metric.detail}</span>
            </li>
          ))}
        </ul>

        <p className="hero__stack" data-reveal style={{ "--delay": "320ms" }}>
          {profile.stack.map((tech, index) => (
            <span key={tech}>
              {index > 0 && <span className="hero__stack-sep">·</span>}
              {tech}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
