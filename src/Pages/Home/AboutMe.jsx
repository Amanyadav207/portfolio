import data from "../../data/index.json";
import { ArrowUpRight } from "../../components/Icons";

export default function AboutMe() {
  const { profile, education } = data;

  return (
    <section id="about" className="section section--alt">
      <div className="shell about">
        <header className="section__head" data-reveal>
          <span className="section__index">04</span>
          <h2 className="section__title">About</h2>
        </header>

        <div className="about__body">
          <div className="about__prose" data-reveal>
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <aside className="about__side" data-reveal style={{ "--delay": "80ms" }}>
            <h3 className="about__side-title">Education</h3>
            <ul className="edu">
              {education.map((school) => (
                <li key={school.institution} className="edu__item">
                  <a
                    className="edu__name"
                    href={school.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {school.institution}
                    <ArrowUpRight size={13} />
                  </a>
                  <p className="edu__degree">{school.degree}</p>
                  <p className="edu__meta">
                    {school.period} · {school.location}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
